import { TouchableOpacity, Text, StyleSheet, type ViewStyle, type TextStyle } from "react-native"

interface QuizOptionProps {
  text: string
  onPress: () => void
  isSelected?: boolean
  isCorrect?: boolean | null
  disabled?: boolean
  style?: ViewStyle
  textStyle?: TextStyle
}

export default function QuizOption({
  text,
  onPress,
  isSelected = false,
  isCorrect = null,
  disabled = false,
  style,
  textStyle,
}: QuizOptionProps) {
  // Determine the background color based on selection and correctness
  const getBackgroundColor = () => {
    if (isSelected) {
      if (isCorrect === true) return "#27AE60" // Green for correct
      if (isCorrect === false) return "#E74C3C" // Red for incorrect
      return "#3498DB" // Blue for selected but not yet evaluated
    }
    return "white" // Default
  }

  // Determine the text color based on selection
  const getTextColor = () => {
    if (isSelected && isCorrect !== null) {
      return "white"
    }
    return "#333"
  }

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: getBackgroundColor() }, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Text style={[styles.text, { color: getTextColor() }, textStyle]}>{text}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
})

