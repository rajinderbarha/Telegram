import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import AuthContextProvider from './provider/authProvider';
import { PermissionsAndroid, Platform } from 'react-native';

export default function RootLayout  ()  {

  useEffect(() => {
    const run = async () => {
      if(Platform.OS === 'android'){
        await PermissionsAndroid.requestMultiple(
          [
            'android.permission.POST_NOTIFICATIONS',
            'android.permission.BLUETOOTH_CONNECT'
          ]
        )
      }
    }
    run();
  }, []);



  return (
    <GestureHandlerRootView>
      <AuthContextProvider>
    <Stack initialRouteName='home'>
      <Stack.Screen name='home' options={{headerShown : false}} />
      <Stack.Screen name='auth' options={{ title : 'Sign In' }}/>
    </Stack>
    </AuthContextProvider>
    </GestureHandlerRootView>
  );
};

;