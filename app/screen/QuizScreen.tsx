import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { ResizeMode } from "expo-av";
import { AntDesign } from "@expo/vector-icons";
import { getQuizQuestions, Question } from "../../data/quizData";
import { useLocalSearchParams, router } from "expo-router";
import { Video } from "expo-av";
import * as FileSystem from "expo-file-system";

export default function QuizScreen() {
  const params = useLocalSearchParams();
  console.log("Received route params:", params);

  const moduleId = Number(params.moduleId);
  const setId = Number(params.setId);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isVideoLoading, setIsVideoLoading] = useState(true);
  const [videoError, setVideoError] = useState<string | null>(null);

  const videoRef = useRef<Video | null>(null);
  const feedbackAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    try {
      const quizQuestions = getQuizQuestions(moduleId, setId);
      if (!quizQuestions || quizQuestions.length === 0) {
        console.error("No questions found for moduleId:", moduleId, "setId:", setId);
      } else {
        console.log("Loaded questions:", quizQuestions.length);
        // Log the first question's video URI to debug
        if (quizQuestions.length > 0) {
          console.log("First question video URI:", quizQuestions[0].videoUri);
        }
      }
      setQuestions(quizQuestions);
    } catch (error) {
      console.error("Error fetching quiz questions:", error);
    }
  }, [moduleId, setId]);

  useEffect(() => {
    if (videoRef.current && questions.length > 0) {
      setIsVideoLoading(true);
      setVideoError(null);
      
      // Reset and play the video when the question changes
      videoRef.current.stopAsync().then(() => {
        videoRef.current?.playAsync().catch(err => {
          console.error("Error playing video:", err);
          setVideoError("Failed to play video");
        });
      }).catch(err => {
        console.error("Error stopping video:", err);
      });
    }
  }, [currentQuestionIndex, questions]);

  const handleVideoLoad = () => {
    setIsVideoLoading(false);
  };

  const handleVideoError = (error: string) => {
    console.error("Video error:", error);
    setIsVideoLoading(false);
    setVideoError(error);
  };

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
        router.replace({
          pathname: "/screen/ResultScreen",
          params: {
            score: score + (correct ? 1 : 0),
            total: questions.length,
            moduleId,
          },
        });
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
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Loading questions...</Text>
      </View>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  console.log("Current Video URI:", currentQuestion.videoUri);

  // Check if the video URI is valid
  const isValidVideoUri = currentQuestion.videoUri && 
    (typeof currentQuestion.videoUri === 'string' || 
     typeof currentQuestion.videoUri === 'number');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollContainer}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
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

        <View style={styles.videoContainer}>
          {isValidVideoUri ? (
            <>
              <Video
                ref={(ref) => (videoRef.current = ref)}
                source={currentQuestion.videoUri}
                style={styles.video}
                useNativeControls
                resizeMode={ResizeMode.CONTAIN}
                isLooping
                shouldPlay
                onLoad={handleVideoLoad}
                onError={(error) => handleVideoError(error.error.message)}
              />
              {isVideoLoading && (
                <View style={styles.videoLoadingOverlay}>
                  <ActivityIndicator size="large" color="#ffffff" />
                  <Text style={styles.videoLoadingText}>Loading video...</Text>
                </View>
              )}
              {videoError && (
                <View style={styles.videoErrorOverlay}>
                  <AntDesign name="warning" size={40} color="#ffcc00" />
                  <Text style={styles.videoErrorText}>
                    Error loading video. Please try again.
                  </Text>
                </View>
              )}
            </>
          ) : (
            <View style={styles.videoErrorOverlay}>
              <AntDesign name="warning" size={40} color="#ffcc00" />
              <Text style={styles.videoErrorText}>Video not available</Text>
            </View>
          )}
        </View>

        <Text style={styles.question}>{currentQuestion.question}</Text>

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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  scrollContainer: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingBottom: 20 },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  loadingText: { marginTop: 10, fontSize: 16, color: "#666" },
  errorContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#ffcccc" },
  errorText: { fontSize: 18, color: "red", fontWeight: "bold" },
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
    position: "relative"
  },
  video: { width: "100%", height: "100%" },
  videoLoadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)"
  },
  videoLoadingText: {
    color: "#ffffff",
    marginTop: 10
  },
  videoErrorOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)"
  },
  videoErrorText: {
    color: "#ffffff",
    marginTop: 10,
    textAlign: "center",
    paddingHorizontal: 20
  },
  question: { fontSize: 20, fontWeight: "bold", marginHorizontal: 16, marginBottom: 20, color: "#333" },
  optionsContainer: { paddingHorizontal: 16 },
  optionButton: { 
    backgroundColor: "white", 
    borderRadius: 10, 
    padding: 16, 
    marginBottom: 12, 
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4
  },
  correctOption: { backgroundColor: "#27AE60" },
  incorrectOption: { backgroundColor: "#E74C3C" },
  optionText: { fontSize: 16, color: "#333" },
  feedbackOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: "center", alignItems: "center", zIndex: 10 },
  feedbackText: { fontSize: 32, fontWeight: "bold", color: "white", marginTop: 16 },
  correctAnswerText: { fontSize: 18, color: "white", marginTop: 16, textAlign: "center", paddingHorizontal: 20 },
});