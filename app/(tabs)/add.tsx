import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Add = () => {
  const [name, setName] = useState('');
  const [preis, setPreis] = useState('');
  const [menge, setMenge] = useState('');

  const handleSubmit = async () => {
    if(name && preis && menge) {
      const produkt = {name, preis, menge};
      const existingProduktsString = await AsyncStorage.getItem('produkte');
      let produkte = [];
      if(existingProduktsString) {
        produkte = JSON.parse(existingProduktsString);
      }

      produkte.push(produkt);
      await AsyncStorage.setItem('produkte', JSON.stringify(produkte));

      setName('');
      setPreis('');
      setMenge('');
      
      console.log('Produkt wurde hinzugefügt');
    } else {
      Alert.alert('Bitte alle Felder ausfüllen.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hinzufügen</Text>

      <Text>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName}></TextInput>

      <Text>Preis</Text>
      <TextInput keyboardType='numeric' style={styles.input} value={preis} onChangeText={setPreis}></TextInput>

      <Text>Menge</Text>
      <TextInput keyboardType='numeric' style={styles.input} value={menge} onChangeText={setMenge}></TextInput>

      <Button title='Produkt Hinzufügen' onPress={handleSubmit}></Button>
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