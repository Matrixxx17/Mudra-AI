import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { modules } from "../../data/quizData"; // ✅ Ensure modules have title

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select a Module</Text>
      <FlatList
        data={modules}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2} // ✅ Keeps the grid layout
        columnWrapperStyle={styles.row} // ✅ Ensures even spacing
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.moduleBox}
            onPress={() => navigation.navigate("QuizScreen", { moduleId: item.id, setId: 1 })}
          >
            <Text style={styles.moduleText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" }, // ✅ Soft background
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#333",
    top: 15,
  },
  row: { justifyContent: "space-between" }, // ✅ Ensures even spacing for 2 columns
  moduleBox: {
    width: width * 0.38,
    height: width * 0.38,
    backgroundColor: "#4CAF50", // ✅ Green background as requested
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    elevation: 5, // ✅ Adds depth
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  moduleText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
