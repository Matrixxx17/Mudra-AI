import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
<<<<<<< HEAD
// import HomeScreen from "./screen/HomeScreen";
// import QuizScreen from "./(tabs)_backup/QuizScreen";
import ResultScreen from "./screen/ResultScreen";
=======

>>>>>>> 8bf36f11 (Initial commit)
import { useColorScheme } from '@/hooks/useColorScheme';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false  }} />
        <Stack.Screen name="index" options={{ headerShown: false  }} />
        <Stack.Screen name="LessonScreen" options={{ headerShown: false  }} />
        <Stack.Screen name="RecordScreen" options={{ headerShown: false  }} />
        <Stack.Screen name="screen/communicate" options={{ headerShown: false  }} />
        <Stack.Screen name="screen/homescreen" options={{ headerShown: false  }}/>
        <Stack.Screen name="screen/QuizScreen" options={{ headerShown: false  }} />
        <Stack.Screen name="screen/ResultScreen" options={{ headerShown: false  }} />
        <Stack.Screen name="(tabs)/dictionary" options={{ headerShown: false  }} />
        
        
      

        <Stack.Screen name="+not-found" />

      </Stack>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
