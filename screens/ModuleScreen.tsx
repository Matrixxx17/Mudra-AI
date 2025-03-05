import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from "react-native"
import { modules } from "../data/quizData"

export default function ModuleScreen({ route, navigation }) {
  const { moduleId } = route.params
  const module = modules.find((m) => m.id === moduleId)

  if (!module) {
    return (
      <View style={styles.container}>
        <Text>Module not found</Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{module.title}</Text>
      <Text style={styles.description}>{module.description}</Text>

      <Text style={styles.setsTitle}>Quiz Sets</Text>
      <FlatList
        data={Array.from({ length: 5 }, (_, i) => i + 1)}
        keyExtractor={(item) => item.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.setCard}
            onPress={() =>
              navigation.navigate("Quiz", {
                moduleId,
                setId: item,
              })
            }
          >
            <Text style={styles.setTitle}>Set {item}</Text>
            <Text style={styles.setDescription}>10 questions</Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    color: "#333",
  },
  description: {
    fontSize: 16,
    textAlign: "center",
    marginHorizontal: 20,
    marginBottom: 20,
    color: "#666",
  },
  setsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: 16,
    marginBottom: 10,
    color: "#333",
  },
  listContainer: {
    padding: 16,
  },
  setCard: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  setTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  setDescription: {
    fontSize: 14,
    color: "#666",
  },
})

