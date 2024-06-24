import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Image = {
  id: string;
  uri: string;
  location?: {
    latitude: number;
    longitude: number;
  };
};

const STORAGE_KEY = '@stored_images';

const useStoredImages = () => {
  const [images, setImages] = useState<Image[]>([]);

  useEffect(() => {
    const loadStoredImages = async () => {
      try {
        const storedImages = await AsyncStorage.getItem(STORAGE_KEY);
        if (storedImages !== null) {
          setImages(JSON.parse(storedImages));
        }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        // console.error('Error loading images from AsyncStorage:', error);
      }
    };

    loadStoredImages();
  }, []);

  const addImage = async (image: Image) => {
    try {
      const newImages = [...images, image];
      setImages(newImages);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newImages));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // console.error('Error saving images to AsyncStorage:', error);
    }
  };

  const removeImage = async (id: string) => {
    try {
      const updatedImages = images.filter(image => image.id !== id);
      setImages(updatedImages);
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedImages));
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // console.error('Error removing image from AsyncStorage:', error);
    }
  };

  const getImageById = (id: string): Image | undefined => {
    return images.find((image) => image.id === id);
  };

  return {
    images,
    addImage,
    removeImage,
    getImageById,
  };
};

export default useStoredImages;
