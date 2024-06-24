import React from 'react';
import { View, StyleSheet, TouchableWithoutFeedback, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import useStoredImages from '@/hooks/useStoredImages';
import TakePhotoButton from '@/components/TakePhotoButton';
import ImageList from '@/components/ImageList';

type RootStackParamList = {
  'img-detail': {
    imageUri: string;
    location?: {
      latitude: number;
      longitude: number;
    };
  };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'img-detail'>;

export default function Gallery () {
  const navigation = useNavigation<NavigationProp>();
  const { images, addImage } = useStoredImages();

  const handlePhotoTaken = (uri: string, location?: { latitude: number; longitude: number }) => {
    const newImage = {
      id: Date.now().toString(),
      uri,
      location,
    };
    addImage(newImage);
  };

  const handlePressImage = (uri: string, location?: { latitude: number; longitude: number }) => {
    navigation.navigate('img-detail', { imageUri: uri, location });
  };

  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <Text style={styles.title}>Photos</Text>
        <ImageList
          images={images}
          onPressImage={handlePressImage}
        />
        <View style={styles.buttonContainer}>
          <TakePhotoButton onPhotoTaken={handlePhotoTaken} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  title: {
    padding: 10,
    fontSize: 18,
    marginTop: 20,
    fontWeight: 'bold'
  },
  buttonContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
});
