import { 
  StyleSheet, Text, View, ScrollView, SafeAreaView, StatusBar, Platform, 
  Image, Dimensions, ActivityIndicator, TouchableOpacity 
} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFonts } from 'expo-font';
import { useRouter } from 'expo-router';
import uuid from 'react-native-uuid'; // ✅ Use react-native-uuid instead

const { height, width } = Dimensions.get("window");

const Index = () => {
  const router = useRouter();
  const [fontsLoaded] = useFonts({
    'BeVietnamPro-Bold': require('../assets/fonts/BeVietnamPro-Bold.ttf'),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // ✅ Function to generate and store UUID & send it to backend
  const generateUUID = async () => {
    try {
      const uniqueID = uuid.v4(); // Generate UUID correctly
      await AsyncStorage.setItem('userUUID', uniqueID); // Store in AsyncStorage

      // ✅ Send UUID to backend for tracking
      await fetch('http://192.168.0.123:5000/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ uuid: uniqueID })
      });

      // ✅ Navigate to home screen
      router.push('/home'); 
      
    } catch (error) {
      console.error("Error storing UUID:", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Mudra AI</Text>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/images/landing.png")}
            style={styles.image}
            resizeMode="cover"
          />
        </View>
        <View style={styles.middle}>
          <Text style={styles.middleText}>
            Break the {"\n"}
            communication barrier {"\n"}
            with Mudra AI
          </Text>
          <Text style={styles.lowerText}>
            Mudra AI uses computer vision to understand sign language and translates it into text and speech in real time. This allows for more effective communication between those who use sign language and those who don't.
          </Text>
        </View>

        {/* ✅ Call generateUUID when the button is clicked */}
        <TouchableOpacity onPress={generateUUID}>  
          <View style={styles.button}>
            <Text style={styles.buttontext}>Get Started</Text>
          </View>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;

// 🎨 Styles for UI
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  scrollView: {
    flexGrow: 1,
    alignItems: "center",
  },
  header: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
  },
  headerText: {
    fontSize: 28,
    fontWeight: "700",
    fontFamily: "BeVietnamPro-Bold",
  },
  imageContainer: {
    width: "100%",
    alignItems: "center",
  },
  image: {
    width: width * 1,
    height: width * 0.6,
  },
  middle: {
    marginTop: 20,
    width: "90%", 
  },
  middleText: {
    fontSize: 40,
    fontFamily: "BeVietnamPro-Bold",
    textAlign: "center",
    alignSelf: "center",
    lineHeight: 42, 
  },
  lowerText: {
    paddingVertical: 20,
    fontSize: 20,
  },
  button: {
    marginTop: 50,
    width: width * 0.75,
    height: height * 0.06,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2194F2",
    borderRadius: 24,
  },
  buttontext: {
    fontSize: 20,
    color: "#fff",
    fontFamily: "BeVietnamPro-Bold",
  }
});
