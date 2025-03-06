import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from "react-native"
import { AntDesign } from "@expo/vector-icons"
import { modules } from "../data/quizData"

export default function ResultScreen({ route, navigation }) {
  const { score, total, moduleId } = route.params
  const percentage = Math.round((score / total) * 100)
  const module = modules.find((m) => m.id === moduleId)

  const getResultMessage = () => {
    if (percentage >= 90) return "Excellent!"
    if (percentage >= 70) return "Great job!"
    if (percentage >= 50) return "Good effort!"
    return "Keep practicing!"
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.resultCard}>
        <Text style={styles.moduleTitle}>{module?.title || "Quiz"} Completed</Text>

        <View style={styles.scoreCircle}>
          <Text style={styles.scoreText}>{percentage}%</Text>
        </View>

        <Text style={styles.resultMessage}>{getResultMessage()}</Text>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{score}</Text>
            <Text style={styles.statLabel}>Correct</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{total - score}</Text>
            <Text style={styles.statLabel}>Incorrect</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>{total}</Text>
            <Text style={styles.statLabel}>Total</Text>
          </View>
        </View>
      </View>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={[styles.button, styles.retryButton]}
          onPress={() => navigation.replace("Quiz", route.params)}
        >
          <AntDesign name="reload1" size={20} color="white" />
          <Text style={styles.buttonText}>Try Again</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.homeButton]}
          onPress={() =>
            navigation.navigate("Module", {
              moduleId,
              title: module?.title,
            })
          }
        >
          <AntDesign name="arrowleft" size={20} color="white" />
          <Text style={styles.buttonText}>Back to Sets</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  resultCard: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  moduleTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 24,
    textAlign: "center",
  },
  scoreCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 24,
  },
  scoreText: {
    fontSize: 36,
    fontWeight: "bold",
    color: "white",
  },
  resultMessage: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 24,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  statDivider: {
    width: 1,
    height: "100%",
    backgroundColor: "#e0e0e0",
  },
  statValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  buttonsContainer: {
    marginTop: 24,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
  },
  retryButton: {
    backgroundColor: "#4CAF50",
  },
  homeButton: {
    backgroundColor: "#2196F3",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginLeft: 8,
  },
})

