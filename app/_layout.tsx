import React from 'react';
import { Stack } from 'expo-router';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AuthContextProvider from './provider/authProvider';

export default function RootLayout  ()  {
  return (
    <GestureHandlerRootView>
      <AuthContextProvider>
    <Stack initialRouteName='home'>
      <Stack.Screen name='home' options={{headerShown : false}} />
      <Stack.Screen name='auth' />
    </Stack>
    </AuthContextProvider>
    </GestureHandlerRootView>
  );
};

;