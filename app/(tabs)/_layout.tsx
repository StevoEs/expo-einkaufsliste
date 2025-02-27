import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

const TabsLayout = () => {
  return (
    <Tabs>
        <Tabs.Screen name='home' options={{
            tabBarIcon: ({ color, size}) => (
                <Ionicons style={styles.container} name="home" color={color} size={size}></Ionicons>
            ),
        }}></Tabs.Screen>
        <Tabs.Screen name='add' options={{
            tabBarIcon: ({ color, size}) => (
                <Ionicons name="book" color={color} size={size}></Ionicons>
            ),
        }}></Tabs.Screen>
        <Tabs.Screen name='statistik' options={{
            tabBarIcon: ({ color, size}) => (
                <Ionicons name="information-circle-outline" color={color} size={size}></Ionicons>
            ),
        }}></Tabs.Screen>
    </Tabs>
  )
}

export default TabsLayout

const styles = StyleSheet.create({
    container: {
    }
})