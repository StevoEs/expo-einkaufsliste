import { Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

const Add = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hinzufügen</Text>

      <Text>Name</Text>
      <TextInput style={styles.input}></TextInput>

      <Text>Preis</Text>
      <TextInput keyboardType='numeric' style={styles.input}></TextInput>

      <Text>Menge</Text>
      <TextInput keyboardType='numeric' style={styles.input}></TextInput>

      <Button title='Produkt Hinzufügen'></Button>
    </View>
  )
}

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
    input: {
      height: 40,
      minWidth: 150,
      borderColor: 'grey',
      borderWidth: 1,
      marginBottom: 10,
      paddingLeft: 10,
    }
  })