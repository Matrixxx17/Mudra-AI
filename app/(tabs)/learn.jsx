import {
  StyleSheet, Text, View, ScrollView, SafeAreaView, StatusBar, Dimensions,
  TouchableOpacity, Platform, Alert, Animated
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width } = Dimensions.get("window");

const API_KEY = 'AIzaSyC1XCuTUKNUWm5iW2EqNEsxyuf0uufCBBM';
const API_BASE_URL = "http://192.168.0.123:5000";

const topics = [
  { title: "Introduction to ISL", route: "LessonScreen", topicKey: "intro" },
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

const Learn = () => {
  const navigation = useNavigation();
  const [progress, setProgress] = useState(0);
  const animatedProgress = useState(new Animated.Value(0))[0];

  const [fontsLoaded] = useFonts({
    'BeVietnamPro-Bold': require('../../assets/fonts/BeVietnamPro-Bold.ttf'),
  });

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
    loadProgress();
  }, []);

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false
    }).start();
  }, [progress]);

  const loadProgress = async () => {
    try {
      const savedProgress = await AsyncStorage.getItem('learningProgress');
      if (savedProgress) setProgress(parseInt(savedProgress));
    } catch (error) {
      console.error("❌ Error loading progress:", error);
    }
  };

  const handleModuleClick = async (topic) => {
    Alert.alert("Tracking Progress", "Your progress is being tracked!");

    try {
      let newProgress = Math.min(progress + 10, 100);
      setProgress(newProgress);
      await AsyncStorage.setItem('learningProgress', newProgress.toString());
    } catch (error) {
      console.error("❌ Error updating progress:", error);
    }

    navigation.push(topic.route, { topic: topic.topicKey });
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Learn Indian Sign Language</Text>
        <TouchableOpacity>
          <AntDesign name="search1" size={28} color="black" style={styles.searchIcon} />
        </TouchableOpacity>
      </View>

      {/* Smooth Liquid Progress Bar */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>Progress: {progress}%</Text>
        <View style={styles.progressBarBackground}>
          <Animated.View
            style={[
              styles.progressBarFill,
              { width: animatedProgress.interpolate({ inputRange: [0, 100], outputRange: ["0%", "100%"] }) }
            ]}
          />
        </View>
      </View>

      {/* Modules List */}
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.modulesContainer}>
          {topics.map((topic, index) => (
            <TouchableOpacity
              key={index}
              style={styles.moduleBox}
              onPress={() => handleModuleClick(topic)}
            >
              <Text style={styles.moduleText}>{topic.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
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
  scrollView: { flexGrow: 1 },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: width * 0.05,
    marginTop: 10,
  },
  headerText: { fontSize: 20, fontFamily: "BeVietnamPro-Bold", color: "#333" },
  searchIcon: { marginLeft: width * 0.02 },
  progressContainer: { alignItems: "center", marginVertical: 20 },
  progressText: { fontSize: 16, marginBottom: 10, color: "#333" },
  progressBarBackground: {
    width: width * 0.9,
    height: 12,
    backgroundColor: "#e0e0e0",
    borderRadius: 10,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 10,
  },
  modulesContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around" },
  moduleBox: {
    width: width * 0.42,
    height: width * 0.42,
    backgroundColor: "#F8FBFF",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    elevation: 3,
  },
  moduleText: { fontSize: 16, fontFamily: "BeVietnamPro-Bold", textAlign: "center", color: "#333" },
});
