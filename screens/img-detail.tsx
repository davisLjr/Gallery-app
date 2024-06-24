import React from 'react';
import { StyleSheet, Image, View, Text, TouchableOpacity, Animated } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import * as Sharing from 'expo-sharing';

type ImageDetailScreenRouteProp = RouteProp<{ params: { imageUri: string, location?: { latitude: number, longitude: number } } }, 'params'>;

const ImageDetail = () => {
  const route = useRoute<ImageDetailScreenRouteProp>();
  const { imageUri, location } = route.params;

  const [isTextBoxVisible, setIsTextBoxVisible] = React.useState(false);
  const textBoxAnimation = React.useRef(new Animated.Value(0)).current;

  const toggleTextBox = () => {
    setIsTextBoxVisible(!isTextBoxVisible);
    Animated.timing(textBoxAnimation, {
      toValue: isTextBoxVisible ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const textBoxTranslateY = textBoxAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [100, 0],
  });

  const handleShareImage = async () => {
    try {
      await Sharing.shareAsync(imageUri);
    } catch (error: any) {
      console.warn('Error sharing image:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.image} resizeMode='contain' />
      {location && (
        <View style={styles.locationText}>
          <View style={styles.boxButton}>
            <TouchableOpacity onPress={toggleTextBox} style={styles.iconBox}>
              <Ionicons name='map-outline' size={35} color='#0e0e0e' style={styles.icon} />
            </TouchableOpacity>
            <TouchableOpacity onPress={handleShareImage} style={styles.shareButton}>
              <Ionicons name='share-social-outline' size={30} color='#0e0e0e' />
            </TouchableOpacity>
          </View>
          <Animated.View style={[styles.textBox, { transform: [{ translateY: textBoxTranslateY }] }]}>
            <Text>
              Latitud {location.latitude}
            </Text>
            <Text>
              Longitud {location.longitude}
            </Text>
          </Animated.View>
        </View>
      )}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0e0e0e',
  },
  image: {
    flex: 1,
    width: '100%',
    backgroundColor: '#0e0e0e',
  },
  locationText: {
    width: '100%',
    fontSize: 12,
    position: 'absolute',
    bottom: 0,
  },
  boxButton: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: 10,
  },
  iconBox: {
    padding: 5,
    backgroundColor: '#fff',
    width: 50,
    borderRadius: 50,
    alignSelf: 'center',
  },
  shareButton: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 50,
    width: 50,
    alignSelf: 'center',
  },
  icon: {
    alignSelf: 'center',
  },
  textBox: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    padding: 15,
    marginTop: 10,
  },

});

export default ImageDetail;
