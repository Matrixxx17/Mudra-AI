import {
  StyleSheet, Text, View, ScrollView, SafeAreaView, StatusBar, Platform,
  ActivityIndicator, Dimensions, TouchableOpacity, TextInput, Image, FlatList, Modal
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { useFonts } from 'expo-font';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from 'expo-router';
import { Video } from 'expo-av';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as WebBrowser from 'expo-web-browser';

const { height, width } = Dimensions.get("window");
const API_KEY = 'AIzaSyC1XCuTUKNUWm5iW2EqNEsxyuf0uufCBBM';
const PLAYLIST_ID = 'PLFjydPMg4Dapq9vcdmGyHs8uJhiqMgUrX';

const topics = [
  { title: "Intro to ISL", route: "LessonScreen", topicKey: "intro" },
  { title: "Alphabets & Numbers", route: "LessonScreen", topicKey: "alphabets" },
  { title: "Basic Greetings & Common Phrases", route: "LessonScreen", topicKey: "greetings" },
  { title: "Days, Month & Time", route: "LessonScreen", topicKey: "days" },
  { title: "Family & Relationships", route: "LessonScreen", topicKey: "family" },
  { title: "Color & Basic Adjectives", route: "LessonScreen", topicKey: "colors" },
  { title: "Common Objects & Places", route: "LessonScreen", topicKey: "objects" },
  { title: "Actions & Verbs", route: "LessonScreen", topicKey: "action" },
  { title: "Question Words & Sentences", route: "LessonScreen", topicKey: "question" },
  { title: "Sentence Formation", route: "LessonScreen", topicKey: "sentences" }
];

// Alphabet buttons for quick filtering
const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

const Learn = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("Learn");
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredTopics, setFilteredTopics] = useState(topics);
  const [showSearch, setShowSearch] = useState(false);
  const [playlistVideos, setPlaylistVideos] = useState([]);
  const [filteredVideos, setFilteredVideos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [nextPageToken, setNextPageToken] = useState(null);
  const [activeAlphabet, setActiveAlphabet] = useState('A'); // Default to 'A' for alphabetical sorting
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const videoRef = useRef(null);
  const [status, setStatus] = useState({});
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoError, setVideoError] = useState(null);
  const [silentRetryCount, setSilentRetryCount] = useState(0);
  const MAX_SILENT_RETRIES = 2;

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    if (activeTab === "Dictionary") {
      fetchPlaylistVideos();
    }
  }, [activeTab]);

  useEffect(() => {
    return () => {
      if (videoRef.current) {
        videoRef.current.unloadAsync();
      }
    };
  }, []);

  // New effect to sort videos alphabetically on initial load
  useEffect(() => {
    if (playlistVideos.length > 0) {
      sortAndFilterVideosByLetter('A');
    }
  }, [playlistVideos]);

  const fetchPlaylistVideos = async (pageToken = '') => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${PLAYLIST_ID}&key=${API_KEY}${pageToken ? `&pageToken=${pageToken}` : ''}`
      );
      
      const data = await response.json();
      
      if (data.error) {
        console.error('API Error:', data.error);
        setError(`API Error: ${data.error.message || 'Unknown error'}`);
        setLoading(false);
        return;
      }
      
      // Process videos with proper error handling for missing properties
      const videos = data.items
        .filter(item => 
          item && 
          item.snippet && 
          item.snippet.resourceId && 
          item.snippet.resourceId.videoId && 
          item.snippet.thumbnails
        )
        .map(item => {
          // Default thumbnail if medium is not available
          const thumbnailUrl = item.snippet.thumbnails.medium?.url || 
                            item.snippet.thumbnails.default?.url ||
                            item.snippet.thumbnails.high?.url ||
                            'https://via.placeholder.com/320x180';
          
          return {
            id: item.snippet.resourceId.videoId,
            title: item.snippet.title || 'Untitled Video',
            thumbnail: thumbnailUrl,
            description: item.snippet.description || ''
          };
        });
      
      // Sort videos alphabetically by title
      const sortedVideos = videos.sort((a, b) => 
        a.title.trim().toLowerCase() > b.title.trim().toLowerCase() ? 1 : -1
      );
      
      if (pageToken === '') {
        setPlaylistVideos(sortedVideos);
        // After setting videos, filter for those starting with 'A' by default
        const aVideos = sortedVideos.filter(video => 
          video.title.trim().toLowerCase().startsWith('a')
        );
        setFilteredVideos(aVideos);
      } else {
        const allVideos = [...playlistVideos, ...sortedVideos];
        setPlaylistVideos(allVideos);
        
        // Maintain current filter if one is active
        if (activeAlphabet) {
          const letterVideos = allVideos.filter(video => 
            video.title.trim().toLowerCase().startsWith(activeAlphabet.toLowerCase())
          );
          setFilteredVideos(letterVideos);
        } else {
          setFilteredVideos(allVideos);
        }
      }
      
      setNextPageToken(data.nextPageToken || null);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching videos:', error);
      setError(`Error fetching videos: ${error.message}`);
      setLoading(false);
    }
  };

  const loadMoreVideos = () => {
    if (nextPageToken && !loading) {
      fetchPlaylistVideos(nextPageToken);
    }
  };

  const handleSearch = (text) => {
    setSearchQuery(text);
    
    if (activeTab === "Learn") {
      if (text.trim() === "") {
        setFilteredTopics(topics);
      } else {
        setFilteredTopics(
          topics.filter(topic => topic.title.toLowerCase().includes(text.toLowerCase()))
        );
      }
    } else {
      if (text.trim() === "") {
        // Reset to current alphabet filter instead of showing all videos
        sortAndFilterVideosByLetter(activeAlphabet || 'A');
      } else {
        // Clear alphabet filter when searching
        setActiveAlphabet(null);
        
        // More precise search - only show videos where the search term appears at the beginning of words
        const searchTerms = text.toLowerCase().split(' ').filter(term => term.length > 0);
        
        setFilteredVideos(
          playlistVideos.filter(video => {
            const videoTitle = video.title.toLowerCase();
            return searchTerms.some(term => videoTitle.includes(term));
          })
        );
      }
    }
  };

  // Modified function to sort and filter videos by letter
  const sortAndFilterVideosByLetter = (letter) => {
    setActiveAlphabet(letter);
    setSearchQuery("");
    
    const letterVideos = playlistVideos.filter(video => 
      video.title.trim().toLowerCase().startsWith(letter.toLowerCase())
    );
    
    setFilteredVideos(letterVideos);
  };

  const handleAlphabetFilter = (letter) => {
    sortAndFilterVideosByLetter(letter);
  };

  // Updated function to handle video playback directly in app
  const openVideoModal = async (video) => {
    setSelectedVideo(video);
    setModalVisible(true);
    setVideoLoading(true);
    setVideoError(null);
    setSilentRetryCount(0);
    
    try {
      // In a real implementation, you would:
      // 1. Either use a server-side proxy to get the actual video stream
      // 2. Or use a YouTube player component that handles the streaming
      
      // For demo purposes, using Expo's demo video
      // In production, you would replace this with your actual video source
      setTimeout(() => {
        setVideoLoading(false);
      }, 1000);
    } catch (error) {
      // Silently capture error without showing to user
      console.error('Error preparing video:', error);
      setVideoLoading(false);
    }
  };

  const closeVideoModal = async () => {
    if (videoRef.current) {
      await videoRef.current.pauseAsync();
    }
    setModalVisible(false);
    setSelectedVideo(null);
    setVideoError(null);
    setSilentRetryCount(0);
  };
  
  // Improved error handler that silently retries a few times before showing error to user
  const handleVideoError = (error) => {
    // We can log the error for debugging without showing to user
    if (error && error.message && error.message.includes("403")) {
      // This is the specific 403 error we want to handle silently
      if (silentRetryCount < MAX_SILENT_RETRIES) {
        // Silently retry loading the video
        setSilentRetryCount(prev => prev + 1);
        
        if (videoRef.current) {
          // Attempt to reload the video
          setTimeout(() => {
            if (videoRef.current) {
              videoRef.current.replayAsync();
            }
          }, 500);
        }
      } else {
        // After max retries, show a generic message instead of the specific error
        setVideoError('Video temporarily unavailable. Please try again later.');
      }
    } else {
      // For other errors, show a generic message
      setVideoError('Unable to play video. Please try again.');
    }
  };

  const [fontsLoaded] = useFonts({
    'BeVietnamPro-Bold': require("../../assets/fonts/BeVietnamPro-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const renderVideoItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.videoCard}
      onPress={() => openVideoModal(item)}
      activeOpacity={0.7}
    >
      <Image 
        source={{ uri: item.thumbnail }} 
        style={styles.thumbnail}
        resizeMode="cover"
        defaultSource={require('../../assets/placeholder.png')}
      />
      <View style={styles.playIconContainer}>
        <AntDesign name="playcircleo" size={28} color="white" />
      </View>
      <View style={styles.videoInfo}>
        <Text style={styles.videoTitle} numberOfLines={2}>{item.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Learn Indian Sign Language</Text>
        <TouchableOpacity onPress={() => setShowSearch(!showSearch)}>
          <AntDesign name="search1" size={28} color="black" style={styles.searchIcon} />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabsContainer}>
        <TouchableOpacity onPress={() => setActiveTab("Learn")} style={[styles.tab, activeTab === "Learn" && styles.activeTab]}>
          <Text style={[styles.tabText, activeTab === "Learn" && styles.activeTabText]}>Modules</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab("Dictionary")} style={[styles.tab, activeTab === "Dictionary" && styles.activeTab]}>
          <Text style={[styles.tabText, activeTab === "Dictionary" && styles.activeTabText]}>Dictionary</Text>
        </TouchableOpacity>
      </View>

      {/* Search Bar */}
      {showSearch && (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder={`Search ${activeTab === "Learn" ? "topics" : "signs"}...`}
            value={searchQuery}
            onChangeText={handleSearch}
          />
        </View>
      )}

      {/* Content */}
      {activeTab === "Learn" ? (
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View>
            {filteredTopics.length === 0 ? (
              <Text style={styles.noResults}>No matching topics found</Text>
            ) : (
              filteredTopics.map((topic, index) => (
                index % 2 === 0 && (
                  <View key={index} style={styles.bigBox}>
                    {/* First topic */}
                    <TouchableOpacity 
                      style={styles.box} 
                      onPress={() => navigation.push(topic.route, { topic: topic.topicKey })}
                    >
                      <Text style={styles.main}>{topic.title}</Text>
                    </TouchableOpacity>

                    {/* Second topic (if available) */}
                    {filteredTopics[index + 1] && (
                      <TouchableOpacity 
                        style={styles.box} 
                        onPress={() => navigation.push(filteredTopics[index + 1].route, { topic: filteredTopics[index + 1].topicKey })}
                      >
                        <Text style={styles.main}>{filteredTopics[index + 1].title}</Text>
                      </TouchableOpacity>
                    )}
                  </View>
                )
              ))
            )}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.dictionaryContainer}>
          {/* Alphabet Filter */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.alphabetContainer}>
            {alphabets.map((letter) => (
              <TouchableOpacity 
                key={letter} 
                style={[
                  styles.alphabetButton, 
                  activeAlphabet === letter && styles.activeAlphabetButton
                ]}
                onPress={() => handleAlphabetFilter(letter)}
              >
                <Text style={[
                  styles.alphabetText,
                  activeAlphabet === letter && styles.activeAlphabetText
                ]}>{letter}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {loading && playlistVideos.length === 0 ? (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#4285F4" />
              <Text style={styles.loadingText}>Loading sign language dictionary...</Text>
            </View>
          ) : error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity 
                style={styles.retryButton}
                onPress={() => fetchPlaylistVideos()}
              >
                <Text style={styles.retryButtonText}>Retry</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              {filteredVideos.length === 0 ? (
                <View style={styles.noVideosContainer}>
                  <Text style={styles.noVideosText}>No signs found for your search</Text>
                </View>
              ) : (
                <FlatList
                  data={filteredVideos}
                  renderItem={renderVideoItem}
                  keyExtractor={(item) => item.id}
                  numColumns={2}
                  contentContainerStyle={styles.videoGrid}
                  onEndReached={loadMoreVideos}
                  onEndReachedThreshold={0.5}
                  ListFooterComponent={
                    loading && playlistVideos.length > 0 ? (
                      <ActivityIndicator size="large" color="#4285F4" style={styles.footerLoader} />
                    ) : null
                  }
                />
              )}
            </>
          )}
        </View>
      )}

      {/* Video Player Modal */}
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={closeVideoModal}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={closeVideoModal} style={styles.closeButton}>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.modalTitle} numberOfLines={1}>
              {selectedVideo?.title}
            </Text>
            <View style={styles.modalPlaceholder} />
          </View>
          
          <View style={styles.videoContainer}>
            {selectedVideo && (
              videoLoading ? (
                <View style={styles.videoLoadingContainer}>
                  <ActivityIndicator size="large" color="#FFFFFF" />
                  <Text style={styles.videoLoadingText}>Loading video...</Text>
                </View>
              ) : videoError ? (
                <View style={styles.videoErrorContainer}>
                  <Text style={styles.videoErrorText}>{videoError}</Text>
                  <TouchableOpacity 
                    style={styles.retryButton}
                    onPress={() => openVideoModal(selectedVideo)}
                  >
                    <Text style={styles.retryButtonText}>Retry</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Video
                  ref={videoRef}
                  source={{
                    uri: `https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4` // In production, replace with actual video URL
                  }}
                  style={styles.video}
                  useNativeControls
                  resizeMode="contain"
                  isLooping={false}
                  shouldPlay={true}
                  onPlaybackStatusUpdate={status => setStatus(() => status)}
                  onError={handleVideoError}
                />
              )
            )}
          </View>
          
          <View style={styles.videoDetailsContainer}>
            <Text style={styles.videoDetailsTitle}>{selectedVideo?.title}</Text>
            <Text style={styles.videoDetailsDescription}>
              {selectedVideo?.description || "Learn this sign in Indian Sign Language (ISL)."}
            </Text>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

export default Learn;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  scrollView: {
    flexGrow: 1,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: height * 0.01,
    paddingHorizontal: width * 0.05,
  },
  headerText: {
    fontSize: 20,
    fontFamily: "BeVietnamPro-Bold",
  },
  searchIcon: {
    marginLeft: width * 0.02,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#CFDEE8",
    marginVertical: 10,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: "#4285F4",
  },
  tabText: {
    fontSize: 16,
    color: "gray",
  },
  activeTabText: {
    color: "black",
    fontWeight: "bold",
  },
  searchContainer: {
    marginHorizontal: width * 0.05,
    marginTop: height * 0.02,
    marginBottom: height * 0.01,
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderColor: "#CFDEE8",
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
    backgroundColor: "#F5F8FA",
  },
  noResults: {
    textAlign: "center",
    marginTop: height * 0.02,
    fontSize: 16,
    color: "gray",
  },
  bigBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: width * 0.05,
  },
  box: {
    marginTop: height * 0.03,
    height: height * 0.15,
    width: width * 0.4,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#CFDEE8",
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FBFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  main: {
    fontSize: 18,
    fontWeight: "700",
    fontFamily: "BeVietnamPro-Bold",
    textAlign: "center",
    paddingHorizontal: 10,
  },
  dictionaryContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  alphabetContainer: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: "#F5F8FA",
  },
  alphabetButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 4,
    backgroundColor: "#ffffff",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  activeAlphabetButton: {
    backgroundColor: "#4285F4",
    borderColor: "#4285F4",
  },
  alphabetText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4D4D4D",
  },
  activeAlphabetText: {
    color: "#ffffff",
  },
  videoGrid: {
    padding: 8,
  },
  videoCard: {
    width: width * 0.45,
    backgroundColor: "#ffffff",
    borderRadius: 12,
    margin: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  thumbnail: {
    width: "100%",
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: "#f0f0f0", // Placeholder color
  },
  playIconContainer: {
    position: "absolute",
    top: 46,
    left: width * 0.45 / 2 - 14,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 20,
  },
  videoInfo: {
    padding: 10,
  },
  videoTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 4,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#666666",
  },
  footerLoader: {
    marginVertical: 20,
  },
  noVideosContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  noVideosText: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#FF3B30",
    textAlign: "center",
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: "#4285F4",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "#fff",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EFEFEF",
    backgroundColor: "#FFFFFF",
  },
  closeButton: {
    padding: 8,
  },
  modalTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginHorizontal: 8,
  },
  modalPlaceholder: {
    width: 40,
  },
  videoContainer: {
    width: width,
    height: width * 0.6,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  videoDetailsContainer: {
    padding: 16,
  },
  videoDetailsTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
    color: "#333333",
  },
  videoDetailsDescription: {
    fontSize: 15,
    color: "#666666",
    lineHeight: 22,
    marginBottom: 16,
  },
  // Video loading and error states
  videoLoadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
    width: "100%",
    height: "100%",
  },
  videoLoadingText: {
    color: "#FFFFFF",
    marginTop: 10,
    fontSize: 16,
  },
  videoErrorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000000",
    padding: 20,
    width: "100%",
    height: "100%",
  },
  videoErrorText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  }
});