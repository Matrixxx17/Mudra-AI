import { 
  StyleSheet, Text, View, 
  ActivityIndicator, Dimensions, TouchableOpacity, 
  StatusBar, Alert 
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useNavigation } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';

const { height, width } = Dimensions.get("window");

const Home = () => {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const [fontsLoaded] = useFonts({
    'BeVietnamPro-Bold': require("../../assets/fonts/BeVietnamPro-Bold.ttf"),
  });

  if (!fontsLoaded) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  // Function to handle selection and navigation
  // const handleContinue = () => {
  //   if (!selectedOption) {
  //     Alert.alert("Selection Required", "Please select one option before proceeding.");
  //     return;
  //   }

  //   // Navigate based on the selected option
  //   if (selectedOption === "learn") {
  //     navigation.navigate("learn");
  //   } else if (selectedOption === "communicate") {
  //     navigation.navigate("screen/communicate"); 
  //   }
  // };

  return (
    <View style={styles.container}>
      {/* Status Bar - Matches Background Color */}
      <StatusBar backgroundColor="#F5F0E5" barStyle="dark-content" />

      <View style={styles.text}>
        <Text style={styles.textline}>Select your motive for the app</Text>
      </View>
      
      <View style={styles.formPage}>
        {/* To Learn Button */}
        <TouchableOpacity
          style={[
            styles.inputContainer, 
            selectedOption === "learn" && styles.selectedButton
          ]}
          onPress={() => navigation.navigate("learn")}
        >
          <AntDesign name="book" size={28} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>LearnEasy</Text>
        </TouchableOpacity>

        {/* To Communicate Button */}
        <TouchableOpacity
          style={[
            styles.inputContainer, 
            selectedOption === "communicate" && styles.selectedButton
          ]}
          onPress={() => navigation.navigate("screen/communicate")}
        >
          <FontAwesome6 name="people-group" size={24} color="white" style={styles.icon} />
          <Text style={styles.buttonText}>SpeakEasy</Text>
        </TouchableOpacity>

        <View>
          <Text style={styles.manText}>
            Select one of the above fields <Text style={styles.star}>*</Text>
          </Text>
        </View>

        {/* Continue Button */}
        {/* <TouchableOpacity 
          style={styles.continueButton} 
          onPress={handleContinue}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F0E5',
  },
  text: {
    alignItems: 'center',
    marginTop: height * 0.3,
    marginBottom: 20,
  },
  textline: {
    color: '#0D141C',
    fontSize: 20,
    fontFamily: "BeVietnamPro-Bold",
  },
  formPage: {
    flex: 1,
    height: '70%',
    backgroundColor: '#fff',
    zIndex: 2,
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    alignItems: 'center',
    paddingVertical: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#388FE5',
    borderRadius: 20,
    width: '80%',
    height: height * 0.08,
    marginTop: 40,
    paddingHorizontal: 15,
  },
  selectedButton: {
    backgroundColor: '#2C6BB2', // Darker blue when selected
  },
  icon: {
    marginLeft: 20,
  },
  buttonText: {
    flex: 1,
    color: '#ffffff',
    marginLeft: 20,
    fontSize: 20,
    fontWeight: '400',
    fontFamily: "BeVietnamPro-Bold",
  },
  manText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '700',
    marginTop: height * 0.1,
    fontFamily: "BeVietnamPro-Bold",
  },
  star: {
    color: '#FD2B2B',
  },
  continueButton: {
    marginTop: 20,
    backgroundColor: '#388FE5',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 20,
  },
  continueText: {
    color: 'white',
    fontSize: 18,
    fontFamily: "BeVietnamPro-Bold",
  }
});
