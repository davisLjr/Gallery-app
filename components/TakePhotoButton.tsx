import React from 'react';
import { Alert, StyleSheet, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

type TakePhotoButtonProps = {
  onPhotoTaken: (uri: string, location?: { latitude: number; longitude: number }) => void;
};

export default function TakePhotoButton ({ onPhotoTaken }: TakePhotoButtonProps) {
  const handleTakePhoto = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert('Permission to access camera is required!');
      return;
    }

    const locationPermission = await Location.requestForegroundPermissionsAsync();

    if (locationPermission.status !== 'granted') {
      Alert.alert('Permission to access location is required!');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      const { latitude, longitude } = location.coords;
      onPhotoTaken(uri, { latitude, longitude });
    }
  };

  return (
    <TouchableOpacity onPress={handleTakePhoto} style={styles.buttonTakePhoto}>
      <Ionicons name='camera-outline' size={35} color='white' style={styles.iconCamera} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  buttonTakePhoto: {
    width: 70,
    height: 70,
    backgroundColor: '#0e0e0e',
    borderRadius: 50,
    marginBottom: 10
  },
  iconCamera: {
    left: 0,
    right: 0,
    margin: 'auto'
  },
})