import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Record = () => {
    const [hasPermission, setHasPermission] = useState(null);
    const cameraRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
            if (status !== 'granted') {
                Alert.alert(
                    'Camera Permission',
                    'Please grant camera permissions to use this feature.',
                    [{ text: 'OK' }]
                );
            }
        })();
    }, []);

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} ref={cameraRef} />

            {/* Back Button */}
            <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <Icon name="arrow-back" size={32} color="white" />
            </TouchableOpacity>

            {/* Record Button */}
            <TouchableOpacity
                style={styles.recordButton}
                onPress={() => console.log('Recording started')} // Replace with your logic
            >
                <Text style={styles.recordText}>Start Recording</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Record;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
        backgroundColor: 'rgba(0,0,0,0.5)',
        padding: 10,
        borderRadius: 50,
    },
    recordButton: {
        position: 'absolute',
        bottom: 40,
        alignSelf: 'center',
        backgroundColor: 'red',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    recordText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});