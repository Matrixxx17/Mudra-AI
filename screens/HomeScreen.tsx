// import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView } from "react-native";
// import { StackScreenProps } from "@react-navigation/stack";
// import { RootStackParamList } from "../data/types";
// import { modules } from "../data/quizData"

// export default function HomeScreen({ navigation }) {
//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>Indian Sign Language Quiz</Text>
//       <Text style={styles.subtitle}>Select a module to start learning</Text>

//       <FlatList
//         data={modules}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             style={styles.moduleCard}
//             onPress={() =>
//               navigation.navigate("Module", {
//                 moduleId: item.id,
//                 title: item.title,
//               })
//             }
//           >
//             <Text style={styles.moduleTitle}>{item.title}</Text>
//             <Text style={styles.moduleDescription}>{item.description}</Text>
//           </TouchableOpacity>
//         )}
//         contentContainerStyle={styles.listContainer}
//       />
//     </SafeAreaView>
//   )
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginTop: 20,
//     color: "#333",
//   },
//   subtitle: {
//     fontSize: 16,
//     textAlign: "center",
//     marginBottom: 20,
//     color: "#666",
//   },
//   listContainer: {
//     padding: 16,
//   },
//   moduleCard: {
//     backgroundColor: "white",
//     borderRadius: 10,
//     padding: 20,
//     marginBottom: 16,
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//   },
//   moduleTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 8,
//     color: "#333",
//   },
//   moduleDescription: {
//     fontSize: 14,
//     color: "#666",
//   },
// })


import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParamList } from "../data/types";
import { modules } from "../data/quizData"; // ✅ Import module names

// ✅ Fix: Explicitly type `Props` to include `navigation`
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

