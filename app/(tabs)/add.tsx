import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Add = () => {


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Archiv</Text>
      <Text style={styles.text}>Hier werden die Einkaufslisten gespeichert</Text>
    </View>
  );
};

export default Add

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      alignItems: 'center',
      backgroundColor: 'white',
    },
    title: {
      fontSize: 32,
      fontWeight: 'bold',
      textDecorationLine: 'underline'
    },
    text: {
      
    }
  })