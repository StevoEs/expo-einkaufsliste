import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Index = () => {
  return (
    //<View style={styles.container}>
    <GestureHandlerRootView  style={styles.container}>
      <Text style={styles.headline}>Startseite</Text>
      <Link style={styles.link} href={"/(tabs)/home"}>Home</Link>
    {/* //</View> */}
  </GestureHandlerRootView>
  )
}

export default Index

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    headline: {
      fontSize: 20
    },
    link: {
        color: 'white',
        backgroundColor: 'blue',
        fontSize: 16,
        padding: 16
      }
})