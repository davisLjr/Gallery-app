import React, { useEffect, useState } from 'react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';

export default function RootLayout () {
  const [fontLoaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const [isSplashVisible, setSplashVisible] = useState(true);

  useEffect(() => {
    async function prepareApp () {
      try {
        await SplashScreen.preventAutoHideAsync();

        if (fontLoaded) {
          setTimeout(async () => {
            await SplashScreen.hideAsync();
            setSplashVisible(false);
          }, 2000);
        }
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (e) {
        // console.warn(e);
      }
    }

    prepareApp();
  }, [fontLoaded]);

  if (!fontLoaded || isSplashVisible) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#FFF',
        },
        headerTintColor: '#0e0e0e',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen
        name='index'
        options={{
          title: 'Gallery'
        }}
      />
      <Stack.Screen
        name='img-detail'
        options={{
          title: 'Detail'
        }}
      />
      <Stack.Screen name='+not-found' />
    </Stack>
  );
}
