// "use client"

// import { useState, useEffect, useRef } from "react"
// import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Animated, Dimensions } from "react-native"
// import { Video } from "expo-av"
// import { AntDesign } from "@expo/vector-icons"
// import { getQuizQuestions } from "../data/quizData"

// const { width } = Dimensions.get("window")

// export default function QuizScreen({ route, navigation }) {
//   const { moduleId, setId } = route.params
//   const [questions, setQuestions] = useState([])
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
//   const [selectedOption, setSelectedOption] = useState(null)
//   const [isCorrect, setIsCorrect] = useState(null)
//   const [score, setScore] = useState(0)
//   const [showFeedback, setShowFeedback] = useState(false)

//   const videoRef = useRef(null)
//   const feedbackAnim = useRef(new Animated.Value(0)).current

//   useEffect(() => {
//     // Get 10 random questions for this module and set
//     const quizQuestions = getQuizQuestions(moduleId, setId)
//     setQuestions(quizQuestions)
//   }, [moduleId, setId])

//   useEffect(() => {
//     // Reset video when question changes
//     if (videoRef.current) {
//       videoRef.current.replayAsync()
//     }
//   }, [videoRef])

//   const handleOptionPress = (optionIndex) => {
//     if (showFeedback) return // Prevent selecting another option during feedback

//     const currentQuestion = questions[currentQuestionIndex]
//     const correct = optionIndex === currentQuestion.correctOptionIndex

//     setSelectedOption(optionIndex)
//     setIsCorrect(correct)
//     setShowFeedback(true)

//     if (correct) {
//       setScore(score + 1)
//     }

//     // Animate feedback
//     Animated.timing(feedbackAnim, {
//       toValue: 1,
//       duration: 300,
//       useNativeDriver: true,
//     }).start()

//     // Move to next question after delay
//     setTimeout(() => {
//       if (currentQuestionIndex < questions.length - 1) {
//         setCurrentQuestionIndex(currentQuestionIndex + 1)
//       } else {
//         // Quiz completed
//         navigation.replace("Result", {
//           score,
//           total: questions.length,
//           moduleId,
//         })
//       }

//       // Reset for next question
//       setSelectedOption(null)
//       setIsCorrect(null)
//       setShowFeedback(false)
//       feedbackAnim.setValue(0)
//     }, 1500)
//   }

//   if (questions.length === 0) {
//     return (
//       <View style={styles.loadingContainer}>
//         <Text>Loading questions...</Text>
//       </View>
//     )
//   }

//   const currentQuestion = questions[currentQuestionIndex]

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.progressContainer}>
//         <Text style={styles.progressText}>
//           Question {currentQuestionIndex + 1} of {questions.length}
//         </Text>
//         <View style={styles.progressBar}>
//           <View style={[styles.progressFill, { width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }]} />
//         </View>
//       </View>

//       <View style={styles.videoContainer}>
//         <Video
//           ref={videoRef}
//           source={{ uri: currentQuestion.videoUri }}
//           style={styles.video}
//           useNativeControls
//           resizeMode="contain"
//           isLooping
//           shouldPlay
//         />
//       </View>

//       <Text style={styles.question}>{currentQuestion.question}</Text>

//       <View style={styles.optionsContainer}>
//         {currentQuestion.options.map((option, index) => (
//           <TouchableOpacity
//             key={index}
//             style={[
//               styles.optionButton,
//               selectedOption === index && (isCorrect ? styles.correctOption : styles.incorrectOption),
//             ]}
//             onPress={() => handleOptionPress(index)}
//             disabled={showFeedback}
//           >
//             <Text style={styles.optionText}>{option}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Feedback overlay */}
//       {showFeedback && (
//         <Animated.View
//           style={[
//             styles.feedbackOverlay,
//             {
//               opacity: feedbackAnim,
//               backgroundColor: isCorrect ? "rgba(39, 174, 96, 0.9)" : "rgba(231, 76, 60, 0.9)",
//             },
//           ]}
//         >
//           <AntDesign name={isCorrect ? "checkcircleo" : "closecircleo"} size={80} color="white" />
//           <Text style={styles.feedbackText}>{isCorrect ? "Correct!" : "Incorrect!"}</Text>
//           {!isCorrect && (
//             <Text style={styles.correctAnswerText}>
//               Correct answer: {currentQuestion.options[currentQuestion.correctOptionIndex]}
//             </Text>
//           )}
//         </Animated.View>
//       )}
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   progressContainer: {
//     padding: 16,
//   },
//   progressText: {
//     fontSize: 14,
//     color: "#666",
//     marginBottom: 8,
//   },
//   progressBar: {
//     height: 8,
//     backgroundColor: "#e0e0e0",
//     borderRadius: 4,
//     overflow: "hidden",
//   },
//   progressFill: {
//     height: "100%",
//     backgroundColor: "#4CAF50",
//   },
//   videoContainer: {
//     height: 250,
//     marginHorizontal: 16,
//     marginBottom: 20,
//     borderRadius: 10,
//     overflow: "hidden",
//     backgroundColor: "#000",
//   },
//   video: {
//     width: "100%",
//     height: "100%",
//   },
//   question: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginHorizontal: 16,
//     marginBottom: 20,
//     color: "#333",
//   },
//   optionsContainer: {
//     paddingHorizontal: 16,
//   },
//   optionButton: {
//     backgroundColor: "white",
//     borderRadius: 10,
//     padding: 16,
//     marginBottom: 12,
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
//   correctOption: {
//     backgroundColor: "#27AE60",
//   },
//   incorrectOption: {
//     backgroundColor: "#E74C3C",
//   },
//   optionText: {
//     fontSize: 16,
//     color: "#333",
//   },
//   feedbackOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 10,
//   },
//   feedbackText: {
//     fontSize: 32,
//     fontWeight: "bold",
//     color: "white",
//     marginTop: 16,
//   },
//   correctAnswerText: {
//     fontSize: 18,
//     color: "white",
//     marginTop: 16,
//     textAlign: "center",
//     paddingHorizontal: 20,
//   },
// })



// "use client";

// import { useState, useEffect, useRef } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   SafeAreaView,
//   Animated,
//   Dimensions,
// } from "react-native";
// import { Video, ResizeMode } from "expo-av"; // Fix resizeMode error
// import { AntDesign } from "@expo/vector-icons";
// import { getQuizQuestions } from "../data/quizData";
// import { StackScreenProps } from "@react-navigation/stack";
// import { RootStackParamList } from "../data/types";
// import { Question } from "../data/quizData";

// // Import the type for route parameters
// //import { RootStackParamList } from "../data/types";

// const { width } = Dimensions.get("window");

// // ✅ Define the props type for navigation and route
// type Props = StackScreenProps<RootStackParamList, "Quiz">;

// export default function QuizScreen({ route, navigation }: Props) {
//   const { moduleId, setId } = route.params;

//   // ✅ Explicitly type questions as an array of Question objects
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedOption, setSelectedOption] = useState<number | null>(null);
//   const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
//   const [score, setScore] = useState(0);
//   const [showFeedback, setShowFeedback] = useState(false);

//   const videoRef = useRef<Video | null>(null);
//   const feedbackAnim = useRef(new Animated.Value(0)).current;

//   useEffect(() => {
//     // Load quiz questions when component mounts
//     const quizQuestions = getQuizQuestions(moduleId, setId);
//     setQuestions(quizQuestions); // ✅ Fix: Ensure `questions` state matches `Question[]`
//   }, [moduleId, setId]);

//   useEffect(() => {
//     // Reset video when question changes
//     if (videoRef.current) {
//       videoRef.current.stopAsync().then(() => videoRef.current?.playAsync());
//     }
//   }, [currentQuestionIndex]); // ✅ Fix: Depend on `currentQuestionIndex`

//   const handleOptionPress = (optionIndex: number) => {
//     if (showFeedback) return; // Prevent multiple selections

//     const currentQuestion = questions[currentQuestionIndex];
//     const correct = optionIndex === currentQuestion.correctOptionIndex;

//     setSelectedOption(optionIndex);
//     setIsCorrect(correct);
//     setShowFeedback(true);

//     if (correct) {
//       setScore((prevScore) => prevScore + 1); // ✅ Ensure correct state update
//     }

//     // Animate feedback overlay
//     Animated.timing(feedbackAnim, {
//       toValue: 1,
//       duration: 300,
//       useNativeDriver: true,
//     }).start();

//     // Move to next question after delay
//     setTimeout(() => {
//       if (currentQuestionIndex < questions.length - 1) {
//         setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
//       } else {
//         // Quiz completed - navigate to result screen
//         navigation.replace("Result", {
//           score: score + (correct ? 1 : 0), // ✅ Ensure correct final score
//           total: questions.length,
//           moduleId,
//         });
//       }

//       // Reset for next question
//       setSelectedOption(null);
//       setIsCorrect(null);
//       setShowFeedback(false);
//       feedbackAnim.setValue(0);
//     }, 1500);
//   };

//   if (questions.length === 0) {
//     return (
//       <View style={styles.loadingContainer}>
//         <Text>Loading questions...</Text>
//       </View>
//     );
//   }

//   const currentQuestion = questions[currentQuestionIndex];

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.progressContainer}>
//         <Text style={styles.progressText}>
//           Question {currentQuestionIndex + 1} of {questions.length}
//         </Text>
//         <View style={styles.progressBar}>
//           <View
//             style={[
//               styles.progressFill,
//               { width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` },
//             ]}
//           />
//         </View>
//       </View>

//       <View style={styles.videoContainer}>
//         <Video
//           ref={videoRef}
//           source={currentQuestion.videoUri} // ✅ No need for `{ uri: ... }` for local videos
//           style={styles.video}
//           useNativeControls
//           resizeMode={ResizeMode.CONTAIN} // ✅ Fix: Use correct `resizeMode` type
//           isLooping
//           shouldPlay
//         />
//       </View>

//       <Text style={styles.question}>{currentQuestion.question}</Text>

//       <View style={styles.optionsContainer}>
//         {currentQuestion.options.map((option: string, index: number) => ( // ✅ Explicitly type `option` and `index`
//           <TouchableOpacity
//             key={index}
//             style={[
//               styles.optionButton,
//               selectedOption === index &&
//                 (isCorrect ? styles.correctOption : styles.incorrectOption),
//             ]}
//             onPress={() => handleOptionPress(index)}
//             disabled={showFeedback}
//           >
//             <Text style={styles.optionText}>{option}</Text>
//           </TouchableOpacity>
//         ))}
//       </View>

//       {/* Feedback overlay */}
//       {showFeedback && (
//         <Animated.View
//           style={[
//             styles.feedbackOverlay,
//             {
//               opacity: feedbackAnim,
//               backgroundColor: isCorrect ? "rgba(39, 174, 96, 0.9)" : "rgba(231, 76, 60, 0.9)",
//             },
//           ]}
//         >
//           <AntDesign name={isCorrect ? "checkcircleo" : "closecircleo"} size={80} color="white" />
//           <Text style={styles.feedbackText}>{isCorrect ? "Correct!" : "Incorrect!"}</Text>
//           {!isCorrect && (
//             <Text style={styles.correctAnswerText}>
//               Correct answer: {currentQuestion.options[currentQuestion.correctOptionIndex]}
//             </Text>
//           )}
//         </Animated.View>
//       )}
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   progressContainer: {
//     padding: 16,
//   },
//   progressText: {
//     fontSize: 14,
//     color: "#666",
//     marginBottom: 8,
//   },
//   progressBar: {
//     height: 8,
//     backgroundColor: "#e0e0e0",
//     borderRadius: 4,
//     overflow: "hidden",
//   },
//   progressFill: {
//     height: "100%",
//     backgroundColor: "#4CAF50",
//   },
//   videoContainer: {
//     height: 250,
//     marginHorizontal: 16,
//     marginBottom: 20,
//     borderRadius: 10,
//     overflow: "hidden",
//     backgroundColor: "#000",
//   },
//   video: {
//     width: "100%",
//     height: "100%",
//   },
//   question: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginHorizontal: 16,
//     marginBottom: 20,
//     color: "#333",
//   },
//   optionsContainer: {
//     paddingHorizontal: 16,
//   },
//   optionButton: {
//     backgroundColor: "white",
//     borderRadius: 10,
//     padding: 16,
//     marginBottom: 12,
//     elevation: 2,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.1,
//     shadowRadius: 2,
//   },
//   correctOption: {
//     backgroundColor: "#27AE60",
//   },
//   incorrectOption: {
//     backgroundColor: "#E74C3C",
//   },
//   optionText: {
//     fontSize: 16,
//     color: "#333",
//   },
//   feedbackOverlay: {
//     ...StyleSheet.absoluteFillObject,
//     justifyContent: "center",
//     alignItems: "center",
//     zIndex: 10,
//   },
//   feedbackText: {
//     fontSize: 32,
//     fontWeight: "bold",
//     color: "white",
//     marginTop: 16,
//   },
//   correctAnswerText: {
//     fontSize: 18,
//     color: "white",
//     marginTop: 16,
//     textAlign: "center",
//     paddingHorizontal: 20,
//   },
// });



//Implemented commented code
"use client";

import { ScrollView } from "react-native";
import { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Animated,
  Dimensions,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import { AntDesign } from "@expo/vector-icons";
import { getQuizQuestions, Question, ModuleName } from "../data/quizData";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../data/types"; 

const { width } = Dimensions.get("window");

// ✅ Define Props for Navigation and Route
type Props = StackScreenProps<RootStackParamList, "Quiz">;

export default function QuizScreen({ route, navigation }: Props) {
  // ✅ Correctly type `moduleId` and `setId`
  const moduleId = route.params.moduleId as ModuleName;
  const setId = route.params.setId;

  // ✅ Correctly type questions as an array of `Question`
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const videoRef = useRef<Video | null>(null);
  const feedbackAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // ✅ Load quiz questions when the component mounts
    const quizQuestions = getQuizQuestions(moduleId, setId);
    setQuestions(quizQuestions);
  }, [moduleId, setId]);

  useEffect(() => {
    // ✅ Reset video when the question changes
    if (videoRef.current) {
      videoRef.current.stopAsync().then(() => videoRef.current?.playAsync());
    }
  }, [currentQuestionIndex]);

  const handleOptionPress = (optionIndex: number) => {
    if (showFeedback) return; // Prevent multiple selections

    const currentQuestion = questions[currentQuestionIndex];
    const correct = optionIndex === currentQuestion.correctOptionIndex;

    setSelectedOption(optionIndex);
    setIsCorrect(correct);
    setShowFeedback(true);

    if (correct) {
      setScore((prevScore) => prevScore + 1); // ✅ Ensure correct state update
    }

    // ✅ Animate feedback overlay
    Animated.timing(feedbackAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    // ✅ Move to the next question after delay
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      } else {
        // ✅ Quiz completed - navigate to result screen
        navigation.replace("Result", {
          score: score + (correct ? 1 : 0), // ✅ Ensure correct final score
          total: questions.length,
          moduleId,
        });
      }

      // ✅ Reset for next question
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
      <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
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

// ✅ Define styles at the bottom of the file
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  loadingContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  progressContainer: { padding: 16 },
  progressText: { fontSize: 14, color: "#666", marginBottom: 8 },
  progressBar: { height: 8, backgroundColor: "#e0e0e0", borderRadius: 4, overflow: "hidden" },
  progressFill: { height: "100%", backgroundColor: "#4CAF50" },
  
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20, // Ensures enough space for scrolling
  },

  videoContainer: { height: "50%", width: "90%", marginHorizontal: 16, marginBottom: 20, borderRadius: 10, alignSelf: "center", overflow: "hidden", backgroundColor: "#000" },


  video: { width: "100%", height: "100%" },
  question: { fontSize: 20, fontWeight: "bold", marginHorizontal: 16, marginBottom: 20, color: "#333" },
  optionsContainer: { paddingHorizontal: 16 },
  optionButton: { backgroundColor: "white", borderRadius: 10, padding: 16, marginBottom: 12, elevation: 2, shadowColor: "#000", shadowOffset: { width: 0, height: 1 }, shadowOpacity: 0.1, shadowRadius: 2 },
  correctOption: { backgroundColor: "#27AE60" },
  incorrectOption: { backgroundColor: "#E74C3C" },
  optionText: { fontSize: 16, color: "#333" },
  feedbackOverlay: { ...StyleSheet.absoluteFillObject, justifyContent: "center", alignItems: "center", zIndex: 10 },
  feedbackText: { fontSize: 32, fontWeight: "bold", color: "white", marginTop: 16 },
  correctAnswerText: { fontSize: 18, color: "white", marginTop: 16, textAlign: "center", paddingHorizontal: 20 },
});
