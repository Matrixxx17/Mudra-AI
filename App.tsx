// import { NavigationContainer } from "@react-navigation/native"
// import { createNativeStackNavigator } from "@react-navigation/native-stack"
// import HomeScreen from "./screens/HomeScreen"
// import ModuleScreen from "./screens/ModuleScreen"
// import QuizScreen from "./screens/QuizScreen"
// import ResultScreen from "./screens/ResultScreen"

// const Stack = createNativeStackNavigator()

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen name="Home" component={HomeScreen} options={{ title: "ISL Quiz App" }} />
//         <Stack.Screen
//           name="Module"
//           component={ModuleScreen}
//           options={({ route }) => ({ title: route.params?.title || "Module" })}
//         />
//         <Stack.Screen
//           name="Quiz"
//           component={QuizScreen}
//           options={{
//             title: "Quiz",
//             headerBackVisible: false,
//           }}
//         />
//         <Stack.Screen
//           name="Result"
//           component={ResultScreen}
//           options={{
//             title: "Quiz Results",
//             headerBackVisible: false,
//           }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   )
// }

// import { createStackNavigator } from "@react-navigation/stack";
// import { NavigationContainer } from "@react-navigation/native";
// import HomeScreen from "./screens/HomeScreen";
// import QuizScreen from "./screens/QuizScreen";
// import ResultScreen from "./screens/ResultScreen";
// import { RootStackParamList } from "./data/types"; 

// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="Quiz" component={QuizScreen} />
//         <Stack.Screen name="Result" component={ResultScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }


import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

// ✅ Import the RootStackParamList type
import { RootStackParamList } from "./data/types"; 

import HomeScreen from "./screens/HomeScreen";
import QuizScreen from "./screens/QuizScreen";
import ResultScreen from "./screens/ResultScreen";

// ✅ Fix: Ensure Stack Navigator uses RootStackParamList
const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Quiz" component={QuizScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
