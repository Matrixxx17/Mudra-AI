
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../../data/types";
import { modules } from "../../data/quizData"; // ✅ Import module names

// ✅ Fix: Explicitly type Props to include navigation
type Props = StackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) { // ✅ Now correctly typed
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Select a Module</Text>
      <FlatList
        data={modules}
        keyExtractor={(item) => item.id.toString()} // Ensure unique keys
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.moduleButton}
            onPress={() => navigation.navigate("Quiz", { moduleId: item.title, setId: 1 })} // ✅ Ensure correct navigation
          >
            <Text style={styles.moduleText}>{item.title}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#f5f5f5" },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 16, textAlign: "center" },
  moduleButton: { backgroundColor: "#4CAF50", padding: 16, borderRadius: 8, marginBottom: 10 },
  moduleText: { color: "white", fontSize: 18, fontWeight: "bold", textAlign: "center" },
});