import React from 'react'
import { Stack } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const RootLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack>
        <Stack.Screen name="index" options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name="(tabs)" options={{headerShown: false}}></Stack.Screen>
      </Stack>
    </GestureHandlerRootView>
  )
}

export default RootLayout

