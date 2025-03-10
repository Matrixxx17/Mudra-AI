import React, { useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StatusBar,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from 'expo-router';

const Timeline = ({ text }) => (
  <View style={styles.timelineRow}>
    <View style={styles.timelineLeft}>
      <View style={styles.dot} />
      <View style={styles.line} />
    </View>
    <View style={styles.timelineContent}>
      <Text style={styles.timelineText}>{text}</Text>
    </View>
  </View>
);

const SignLanguageTranslator = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
    <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate("(tabs)/home")}>
        <Icon name="arrow-back" size={28} color="#111418" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Communicate</Text>
        <View style={styles.headerSpace} />
      </View>

      {/* Title */}
      <Text style={styles.title}>Translate sign language to text</Text>

      {/* Timeline */}
      <View style={styles.timeline}>
        <Timeline text="Take a video of the person signing" />
        <Timeline text="AI processes the video and translates it to text" />
        <Timeline text="Text is displayed on the screen" />
        <Timeline text="You can listen to the text" />
      </View>

      {/* Video Preview */}
      <View style={styles.videoContainer}>
        <TouchableOpacity style={styles.playButton}>
       
<Icon name="play-arrow" size={24} color="white" />

        </TouchableOpacity>
      </View>

      {/* Input Section */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Translation will appear here"
            placeholderTextColor="#637588"
          />
          <TouchableOpacity style={styles.speakerButton}>
          <Icon name="volume-up" size={24} color="#637588" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Capture Button */}
      <View style={styles.captureButtonContainer}>
        <TouchableOpacity style={styles.captureButton} onPress={() => navigation.navigate("RecordScreen")}>
          <Text style={styles.captureButtonText}>Turn speech to text</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingBottom: 8,
  },
  backButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontSize: 22,
    fontWeight: '700',
    color: '#111418',
    
  },
  headerSpace: {
    width: 48,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#111418',
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 20,
  },
  timeline: {
    paddingHorizontal: 16,
  },
  timelineRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timelineLeft: {
    width: 40,
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#111418',
  },
  line: {
    width: 1.5,
    flex: 1,
    backgroundColor: '#dce0e5',
    marginTop: 4,
  },
  timelineContent: {
    flex: 1,
    paddingLeft: 8,
    paddingTop: 12,
  },
  timelineText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111418',
  },
  videoContainer: {
    margin: 16,
    aspectRatio: 16 / 9,
    backgroundColor: '#111418',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  playButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f2f4',
    borderRadius: 12,
    maxWidth: 480,
  },
  input: {
    flex: 1,
    height: 56,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#111418',
  },
  speakerButton: {
    padding: 16,
  },
  captureButtonContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  captureButton: {
    height: 48,
    backgroundColor: '#1980e6',
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    maxWidth: 480,
  },
  captureButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default SignLanguageTranslator;
