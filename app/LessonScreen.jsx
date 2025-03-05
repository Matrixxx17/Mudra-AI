
import React, { useEffect, useState } from 'react';
import { 
  View, Text, FlatList, TouchableOpacity, Image, 
  StyleSheet, ActivityIndicator, Dimensions, Modal 
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';

const { width } = Dimensions.get("window");

// Replace with your actual YouTube API key (or load from env)
const YOUTUBE_API_KEY = "AIzaSyC1XCuTUKNUWm5iW2EqNEsxyuf0uufCBBM";

const LessonScreen = () => {
  const route = useRoute();
  const { topic } = route.params; // e.g., "Intro to ISL"
  
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    fetchVideos();
  }, [topic]);

  const fetchVideos = async () => {
    try {
      // Query YouTube API for videos related to the module topic
      const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
        params: {
          key: YOUTUBE_API_KEY,
          q: `Indian Sign Language ${topic}`, // search query with the topic
          part: "snippet",
          type: "video",
          maxResults: 10,
        },
      });
      const fetchedVideos = response.data.items.map(item => ({
        id: item.id.videoId,
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
      }));
      setVideos(fetchedVideos);
    } catch (error) {
      console.error("Error fetching videos:", error.message);
    } finally {
      setLoading(false);
    }
  };

  const renderVideoItem = ({ item }) => (
    <TouchableOpacity style={styles.videoItem} onPress={() => setSelectedVideo(item.id)}>
      <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
      <Text style={styles.videoTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Videos for {topic}</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <FlatList 
          data={videos}
          keyExtractor={(item) => item.id}
          renderItem={renderVideoItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
      <Modal visible={!!selectedVideo} animationType="slide" onRequestClose={() => setSelectedVideo(null)}>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedVideo(null)}>
          <AntDesign name="close" size={24} color="white" style={styles.closeButtonText}/>
          </TouchableOpacity>
          {selectedVideo && (
            <YoutubePlayer height={300} width={width - 40} play={true} videoId={selectedVideo} />
          )}
        </View>
      </Modal>
    </View>
  );
};

export default LessonScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff"
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  listContainer: {
    paddingBottom: 20,
  },
  videoItem: {
    marginBottom: 15,
  },
  thumbnail: {
    width: width - 20,
    height: (width - 20) * 0.56, // 16:9 aspect ratio
    borderRadius: 8,
  },
  videoTitle: {
    fontSize: 16,
    marginTop: 5,
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    padding: 10,
    backgroundColor: "#ccc",
    borderRadius: 5,
    zIndex: 1,
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});
