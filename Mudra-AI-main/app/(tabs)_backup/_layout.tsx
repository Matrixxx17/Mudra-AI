import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

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

      {/* Challenge Tab */}
      <Tabs.Screen
        name="challenge"
        options={{
          title: 'Challenge',
          tabBarStyle: { display: 'flex' },
          tabBarIcon: ({ color }) => <Ionicons name="list" size={28} color={color} />,
        }}
      />

      {/* My Profile Tab */}
      <Tabs.Screen
        name="myprofile"
        options={{
          title: 'My Profile',
          tabBarStyle: { display: 'flex' },
          tabBarIcon: ({ color }) => <Ionicons name="person" size={28} color={color} />, // Corrected icon
        }}
      />
    </Tabs>
  );
}
