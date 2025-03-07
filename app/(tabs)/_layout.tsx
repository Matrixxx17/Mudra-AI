import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import Entypo from '@expo/vector-icons/Entypo';

import { HapticTab } from '@/components/HapticTab';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: { position: 'absolute' },
          default: {},
        }),
      }}
    >
      {/* Home Tab */}
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarStyle: { display: 'none' },
          tabBarIcon: ({ color }) => <AntDesign name="home" size={28} color={color} />,
        }}
      />

      {/* Learn Tab */}
      <Tabs.Screen
        name="learn"
        options={{
          title: 'Learn',
          tabBarStyle: { display: 'flex' },
          tabBarIcon: ({ color }) => <AntDesign name="book" size={28} color={color} />,
        }}
      />

      {/* Quiz Tab - Fixed */}
      <Tabs.Screen
        name="challenge" // Changed from "Quiz" to "quiz" for consistency
        options={{
          title: 'Quiz',
          tabBarStyle: { display: 'flex' }, // Ensuring the tab remains visible
          tabBarIcon: ({ color }) => <Ionicons name="list" size={28} color={color} />,
        }}
      />

      {/* My Profile Tab */}
      <Tabs.Screen
        name="dictionary"
        options={{
          title: 'Dictionary',
          tabBarStyle: { display: 'flex' },
          tabBarIcon: ({ color }) => <Entypo name="open-book" size={28} color={color} />,
        }}
        
      />
 <Tabs.Screen
  name="QuizScreen"
  options={{
    title: 'QuizScreen',
    tabBarButton: () => null, // Completely hides the tab
    tabBarStyle: { display: 'none' }, // Ensures it's not displayed
  }}
/>

      
      
    </Tabs>
  );
}
