import React from 'react';
import { Image, View, TouchableWithoutFeedback } from 'react-native';
import { StyleSheet } from 'react-native';

type Props = {
  image: {
    id: string;
    uri: string;
    location?: {
      latitude: number;
      longitude: number;
    };
  };
  onPress: (uri: string, location?: { latitude: number; longitude: number }) => void;
};

export default function ImageItem ({ image, onPress }: Props) {
  return (
    <TouchableWithoutFeedback
      key={image.id}
      onPress={() => onPress(image.uri, image.location)}
    >
      <View style={{ position: 'relative' }}>
        <Image source={{ uri: image.uri }} style={styles.image} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  deleteButtonContainer: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 10,
  },
  deleteButton: {
    padding: 10,
  },
});
