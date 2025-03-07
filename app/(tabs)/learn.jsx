import {
  StyleSheet, Text, View, ScrollView, SafeAreaView, StatusBar, Dimensions,
  ActivityIndicator, TouchableOpacity, Platform, Alert
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from 'expo-router';
import * as Progress from "react-native-progress";
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get("window");
const API_KEY = 'AIzaSyC1XCuTUKNUWm5iW2EqNEsxyuf0uufCBBM';
const API_BASE_URL = "http://192.168.0.123:5000"; // ✅ Replace with your backend Uimport


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

const Learn = () => {
  const navigation = useNavigation();
  const [progress, setProgress] = useState(0);
  const [uuid, setUuid] = useState(null); // ✅ Store UUID

  const [fontsLoaded] = useFonts({
    'BeVietnamPro-Bold': require('../../assets/fonts/BeVietnamPro-Bold.ttf'),
  });

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
    initializeSession();
  }, []);

  // ✅ Load or Create UUID Session
  const initializeSession = async () => {
    try {
      let storedUuid = await AsyncStorage.getItem('uuid');

      if (!storedUuid) {
        storedUuid = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
        await AsyncStorage.setItem('uuid', storedUuid);
      }
      setUuid(storedUuid);

      // Send UUID to backend
      const response = await fetch(`${API_BASE_URL}/session`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": API_KEY },
        body: JSON.stringify({ uuid: storedUuid })
      });

      const data = await response.json();
      if (data.success) {
        console.log("✅ Session Initialized:", data.session);
      }
    } catch (error) {
      console.error("❌ Error initializing session:", error);
    }
  };

  // ✅ Update Module Progress in Backend
  const handleModuleClick = async (topic) => {
    Alert.alert("Tracking Progress", "Your progress is being tracked!");

    if (!uuid) {
      Alert.alert("Error", "Session not initialized.");
      return;
    }

    try {
      // Send module completion update to backend
      const response = await fetch(`${API_BASE_URL}/update-progress`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": API_KEY },
        body: JSON.stringify({ uuid, topicKey: topic.topicKey })
      });

      const data = await response.json();
      if (data.success) {
        console.log(`✅ Progress Updated for ${topic.title}`);
        // ✅ Update UI progress
        let newProgress = Math.min(progress + 10, 100);
        setProgress(newProgress);
        await AsyncStorage.setItem('learningProgress', newProgress.toString());
      } else {
        console.error("❌ Progress Update Failed:", data.message);
      }
    } catch (error) {
      console.error("❌ Error updating progress:", error);
    }

    // Navigate to lesson screen
    navigation.push(topic.route, { topic: topic.topicKey });
  };

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
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

      {/* Progress Bar UI */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>Progress: {progress}%</Text>
        <Progress.Bar
          progress={progress / 100}
          width={width * 0.9}
          height={12}
          color="#4CAF50"
          borderRadius={10}
          borderWidth={2}
          borderColor="#ccc"
          style={styles.progressBar}
        />
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
  headerText: { fontSize: 20, fontFamily: "BeVietnamPro-Bold" },
  searchIcon: { marginLeft: width * 0.02 },
  progressContainer: { alignItems: "center", marginVertical: 15 },
  progressText: { fontSize: 16, marginBottom: 5 },
  progressBar: { alignSelf: "center" },
  modulesContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around" },
  moduleBox: {
    width: width * 0.4,
    height: width * 0.4,
    backgroundColor: "#F8FBFF",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    elevation: 3,
  },
  moduleText: { fontSize: 16, fontFamily: "BeVietnamPro-Bold", textAlign: "center" },
});

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
  const [uuid, setUuid] = useState(null); // ✅ Store UUID

  const [fontsLoaded] = useFonts({
    'BeVietnamPro-Bold': require('../../assets/fonts/BeVietnamPro-Bold.ttf'),
  });

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
    initializeSession();
  }, []);

  // ✅ Load or Create UUID Session
  const initializeSession = async () => {
    try {
      let storedUuid = await AsyncStorage.getItem('uuid');

      if (!storedUuid) {
        storedUuid = `${Date.now()}-${Math.floor(Math.random() * 10000)}`;
        await AsyncStorage.setItem('uuid', storedUuid);
      }
      setUuid(storedUuid);

      // Send UUID to backend
      const response = await fetch(`${API_BASE_URL}/session`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": API_KEY },
        body: JSON.stringify({ uuid: storedUuid })
      });

      const data = await response.json();
      if (data.success) {
        console.log("✅ Session Initialized:", data.session);
      }
    } catch (error) {
      console.error("❌ Error initializing session:", error);
    }
  };

  // ✅ Update Module Progress in Backend
  const handleModuleClick = async (topic) => {
    Alert.alert("Tracking Progress", "Your progress is being tracked!");

    if (!uuid) {
      Alert.alert("Error", "Session not initialized.");
      return;
    }

    try {
      // Send module completion update to backend
      const response = await fetch(`${API_BASE_URL}/update-progress`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-api-key": API_KEY },
        body: JSON.stringify({ uuid, topicKey: topic.topicKey })
      });

      const data = await response.json();
      if (data.success) {
        console.log(`✅ Progress Updated for ${topic.title}`);
        // ✅ Update UI progress
        let newProgress = Math.min(progress + 10, 100);
        setProgress(newProgress);
        await AsyncStorage.setItem('learningProgress', newProgress.toString());
      } else {
        console.error("❌ Progress Update Failed:", data.message);
      }
    } catch (error) {
      console.error("❌ Error updating progress:", error);
    }

    // Navigate to lesson screen
    navigation.push(topic.route, { topic: topic.topicKey });
  };

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
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

      {/* Progress Bar UI */}
      <View style={styles.progressContainer}>
        <Text style={styles.progressText}>Progress: {progress}%</Text>
        <Progress.Bar
          progress={progress / 100}
          width={width * 0.9}
          height={12}
          color="#4CAF50"
          borderRadius={10}
          borderWidth={2}
          borderColor="#ccc"
          style={styles.progressBar}
        />
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
  headerText: { fontSize: 20, fontFamily: "BeVietnamPro-Bold" },
  searchIcon: { marginLeft: width * 0.02 },
  progressContainer: { alignItems: "center", marginVertical: 15 },
  progressText: { fontSize: 16, marginBottom: 5 },
  progressBar: { alignSelf: "center" },
  modulesContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-around" },
  moduleBox: {
    width: width * 0.4,
    height: width * 0.4,
    backgroundColor: "#F8FBFF",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    elevation: 3,
  },
  moduleText: { fontSize: 16, fontFamily: "BeVietnamPro-Bold", textAlign: "center" },
});
