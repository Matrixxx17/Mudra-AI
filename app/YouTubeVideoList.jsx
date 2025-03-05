import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, ActivityIndicator, StyleSheet, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Icons for better UI
import * as WebBrowser from "expo-web-browser";

const { width } = Dimensions.get("window");

const API_KEY = "AIzaSyC1XCuTUKNUWm5iW2EqNEsxyuf0uufCBBM"; // Replace with your actual API key

// Your two playlists
const PLAYLISTS = [
  "PLxYMaKXKMMcMgg4f47WkG7AM0bb3AyjTi",
  "PLFjydPMg4DapfRTBMokl09Ht-fhMOAYf6"
];

// Keywords for each topic to filter videos
const TOPIC_KEYWORDS = {
  intro: ["introduction", "basics", "overview"],
  alphabets: ["alphabet", "letters", "numbers"],
  greetings: ["greetings", "hello", "good morning"],
  days: ["days", "months", "calendar", "time"],
  family: ["family", "relationships", "members"],
  colors: ["colors", "adjectives", "description"],
  objects: ["objects", "places", "things"],
  action: ["action", "verbs", "movements"],
  question: ["questions", "sentences", "phrases"],
  sentences: ["sentence", "grammar", "formation"],
};

const YouTubeVideoList = ({ topicKey }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        let allVideos = [];

        for (const playlistId of PLAYLISTS) {
          const response = await fetch(
            `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=20&playlistId=${playlistId}&key=${API_KEY}`
          );
          const data = await response.json();
          allVideos = [...allVideos, ...data.items];
        }

        // Filter videos based on topic keywords
        const keywords = TOPIC_KEYWORDS[topicKey] || [];
        const filteredVideos = allVideos.filter((video) =>
          keywords.some((keyword) => video.snippet.title.toLowerCase().includes(keyword))
        );

        setVideos(filteredVideos);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, [topicKey]);

  const openVideo = (videoId) => {
    WebBrowser.openBrowserAsync(`https://www.youtube.com/watch?v=${videoId}`);
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#FF0000" style={{ marginTop: 20 }} />;
  }

  return (
    <View style={styles.container}>
      {videos.length === 0 ? (
        <Text style={styles.noVideosText}>No videos available for this module</Text>
      ) : (
        <FlatList
          data={videos}
          keyExtractor={(item) => item.snippet.resourceId.videoId}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.videoContainer}
              onPress={() => openVideo(item.snippet.resourceId.videoId)}
              activeOpacity={0.8}
            >
              <Image source={{ uri: item.snippet.thumbnails.high.url }} style={styles.thumbnail} />
              <View style={styles.videoDetails}>
                <Text numberOfLines={2} style={styles.videoTitle}>{item.snippet.title}</Text>
                <Text style={styles.channelTitle}>{item.snippet.channelTitle}</Text>
                <View style={styles.videoMeta}>
                  <Ionicons name="time-outline" size={14} color="#666" />
                  <Text style={styles.metaText}>15 mins</Text>
                  <Ionicons name="heart-outline" size={14} color="#666" style={{ marginLeft: 10 }} />
                  <Text style={styles.metaText}>1.2K Likes</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

export default YouTubeVideoList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: "#fff", 
  },
  noVideosText: {
    textAlign: "center",
    fontSize: 16,
    color: "#666",
    marginTop: 50,
  },
  videoContainer: {
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  thumbnail: {
    width: width,
    height: width * 0.55,
    borderRadius: 0, 
  },
  videoDetails: {
    padding: 10,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 4,
  },
  channelTitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
  },
  videoMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaText: {
    fontSize: 12,
    color: "#666",
    marginLeft: 4,
  },
});
