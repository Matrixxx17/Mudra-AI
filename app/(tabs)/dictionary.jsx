import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  StyleSheet,
} from "react-native";
import axios from "axios";
import YoutubeIframe from "react-native-youtube-iframe";

const YOUTUBE_API_KEY = "AIzaSyC1XCuTUKNUWm5iW2EqNEsxyuf0uufCBBM"; // Replace with your actual API Key
const PLAYLIST_ID = "PLFjydPMg4Dapq9vcdmGyHs8uJhiqMgUrX"; // Your Playlist ID

const dictionary = () => {
  const [videos, setVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [playingVideo, setPlayingVideo] = useState(null); // Currently playing video
  const [isPlaying, setIsPlaying] = useState(false); // Play state

  useEffect(() => {
    fetchAllPlaylistVideos();
  }, []);

  const fetchAllPlaylistVideos = async () => {
    let allVideos = [];
    let nextPageToken = "";
    let videoIdsSet = new Set();

    try {
      do {
        const response = await axios.get("https://www.googleapis.com/youtube/v3/playlistItems", {
          params: {
            part: "snippet",
            playlistId: PLAYLIST_ID,
            maxResults: 50,
            pageToken: nextPageToken,
            key: YOUTUBE_API_KEY,
          },
        });

        const newVideos = response.data.items
          .filter((item) => item.snippet?.resourceId?.videoId && item.snippet?.thumbnails)
          .map((item) => ({
            id: item.snippet.resourceId.videoId,
            title: item.snippet.title.trim(),
            thumbnail: item.snippet.thumbnails?.medium?.url || "https://via.placeholder.com/150",
          }));

        newVideos.forEach((video) => {
          if (!videoIdsSet.has(video.id)) {
            videoIdsSet.add(video.id);
            allVideos.push(video);
          }
        });

        nextPageToken = response.data.nextPageToken || "";
      } while (nextPageToken);

      allVideos.sort((a, b) => a.title.localeCompare(b.title));

      setVideos(allVideos);
      setFilteredVideos(allVideos);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching videos:", error.response?.data || error.message);
      setLoading(false);
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);
    if (!text) {
      setFilteredVideos(videos);
      return;
    }

    const query = text.toLowerCase();
    const filtered = videos.filter((video) => video.title.toLowerCase().includes(query)); // Fixed

    setFilteredVideos(filtered);
  };

  const handleVideoPress = (videoId) => {
    if (playingVideo === videoId) {
      setPlayingVideo(null);
      setIsPlaying(false);
    } else {
      setPlayingVideo(videoId);
      setIsPlaying(true);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="blue" style={styles.loader} />
      ) : (
        <FlatList
          data={filteredVideos}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.videoContainer}
              onPress={() => handleVideoPress(item.id)}
            >
              {playingVideo === item.id ? (
                <View style={styles.videoWrapper}>
                  <YoutubeIframe
                    height={250} // Set a fixed height to make it visible
                    width={"100%"}
                    videoId={item.id}
                    play={isPlaying}
                    onChangeState={(state) => {
                      if (state === "ended") {
                        setPlayingVideo(null);
                        setIsPlaying(false);
                      }
                    }}
                  />
                </View>
              ) : (
                <>
                  <Image
                    source={{ uri: item.thumbnail }}
                    style={styles.thumbnail}
                    resizeMode="cover"
                  />
                  <Text style={styles.videoTitle}>{item.title}</Text>
                </>
              )}
            </TouchableOpacity>
          )}
          ListFooterComponent={<Text style={styles.totalCount}>{filteredVideos.length} videos found</Text>}
        />
      )}

      {/* Search Bar at Bottom */}
      <TextInput
        placeholder="Search videos..."
        value={searchText}
        onChangeText={handleSearch}
        style={styles.searchBar}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#f9f9f9",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  videoContainer: {
    marginBottom: 15,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    alignItems: "center",
    width: "100%",
  },
  videoWrapper: {
    width: "100%",
    height: 250,
    overflow: "hidden",
    borderRadius: 8,
    backgroundColor: "black",
  },
  thumbnail: {
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  videoTitle: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  searchBar: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 25,
    backgroundColor: "white",
    paddingHorizontal: 15,
    fontSize: 16,
    marginBottom: 10,
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    elevation: 5,
  },
  totalCount: {
    textAlign: "center",
    fontSize: 14,
    color: "#777",
    marginTop: 10,
  },
});

export default dictionary;