import React from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import ImageItem from './ImageItem';

type Props = {
  images: {
    id: string;
    uri: string;
    location?: {
      latitude: number;
      longitude: number;
    };
  }[];
  onPressImage: (uri: string, location?: { latitude: number; longitude: number }) => void;
};

export default function ImageList ({
  images,
  onPressImage,
}: Props) {
  return (
    <FlatList
      data={images}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <ImageItem
            image={item}
            onPress={onPressImage}
          />
        </View>
      )}
      keyExtractor={(item) => item.id}
      numColumns={3}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1 / 3,
    padding: 5,
  },
});