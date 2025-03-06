"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Dimensions,
  ScrollView,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import { AntDesign } from "@expo/vector-icons";
import { getQuizQuestions, Question } from "../data/quizData";

const { width, height } = Dimensions.get("window");

export default function Quiz() {
  const router = useRouter();
  const { moduleId = "", setId = "" } = useLocalSearchParams(); // ✅ Ensuring values are not undefined

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const videoRef = useRef<Video | null>(null);
  const feedbackAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const quizQuestions = getQuizQuestions(moduleId, setId);
    if (quizQuestions.length > 0) {
      setQuestions(quizQuestions);
    }
  }, [moduleId, setId]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.stopAsync().then(() => videoRef.current?.playAsync());
    }
  }, [currentQuestionIndex]);

  const handleOptionPress = (optionIndex: number) => {
    if (showFeedback) return;

    const currentQuestion = questions[currentQuestionIndex];
    const correct = optionIndex === currentQuestion.correctOptionIndex;

    setSelectedOption(optionIndex);
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore((prevScore) => prevScore + 1);
    }

    Animated.timing(feedbackAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      } else {
        // ✅ Fixed router.replace() to avoid TypeScript errors
        router.replace(
          `/result?score=${String(score + (correct ? 1 : 0))}&total=${String(
            questions.length
          )}&moduleId=${encodeURIComponent(moduleId)}`
        );
      }

      setSelectedOption(null);
      setIsCorrect(null);
      setShowFeedback(false);
      feedbackAnim.setValue(0);
    }, 1500);
  };

  if (questions.length === 0) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading questions...</Text>
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* ✅ Progress Tracker */}
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>
            Question {currentQuestionIndex + 1} of {questions.length}
          </Text>
          <View style={styles.progressBar}>
            <View
              style={[
                styles.progressFill,
                { width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` },
              ]}
            />
          </View>
        </View>

        {/* ✅ Video Player */}
        <View style={styles.videoContainer}>
          <Video
            ref={videoRef}
            source={currentQuestion.videoUri}
            style={styles.video}
            useNativeControls
            resizeMode={ResizeMode.CONTAIN}
            isLooping
            shouldPlay
          />
        </View>

        {/* ✅ Question Text */}
        <Text style={styles.question}>{currentQuestion.question}</Text>

        {/* ✅ Options */}
        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option: string, index: number) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedOption === index &&
                  (isCorrect ? styles.correctOption : styles.incorrectOption),
              ]}
              onPress={() => handleOptionPress(index)}
              disabled={showFeedback}
            >
              <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      {/* ✅ Feedback Overlay */}
      {showFeedback && (
        <Animated.View
          style={[
            styles.feedbackOverlay,
            {
              opacity: feedbackAnim,
              backgroundColor: isCorrect ? "rgba(39, 174, 96, 0.9)" : "rgba(231, 76, 60, 0.9)",
            },
          ]}
        >
          <AntDesign name={isCorrect ? "checkcircleo" : "closecircleo"} size={80} color="white" />
          <Text style={styles.feedbackText}>{isCorrect ? "Correct!" : "Incorrect!"}</Text>
          {!isCorrect && (
            <Text style={styles.correctAnswerText}>
              Correct answer: {currentQuestion.options[currentQuestion.correctOptionIndex]}
            </Text>
          )}
        </Animated.View>
      )}
    </SafeAreaView>
  );
}

// ✅ Updated Styles
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  scrollContainer: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingBottom: 20 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  progressContainer: { padding: 16 },
  progressText: { fontSize: 14, color: "#666", marginBottom: 8 },
  progressBar: { height: 8, backgroundColor: "#e0e0e0", borderRadius: 4, overflow: "hidden" },
  progressFill: { height: "100%", backgroundColor: "#4CAF50" },

  videoContainer: {
    height: 300,
    width: "90%",
    alignSelf: "center",
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#000",
  },

  video: { width: "100%", height: "100%" },
  question: { fontSize: 20, fontWeight: "bold", marginHorizontal: 16, marginBottom: 20, color: "#333" },
  optionsContainer: { paddingHorizontal: 16 },
  optionButton: { backgroundColor: "white", borderRadius: 10, padding: 16, marginBottom: 12, elevation: 2 },
  correctOption: { backgroundColor: "#27AE60" },
  incorrectOption: { backgroundColor: "#E74C3C" },
  optionText: { fontSize: 16, color: "#333" },
  feedbackOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: "center", alignItems: "center", zIndex: 10 },
  feedbackText: { fontSize: 32, fontWeight: "bold", color: "white", marginTop: 16 },
  correctAnswerText: { fontSize: 18, color: "white", marginTop: 16, textAlign: "center", paddingHorizontal: 20 },
});
