import { FlatList } from 'react-native-gesture-handler';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from 'expo-router';

const Home = () => {
  const [name, setName] = useState('');
  const [preis, setPreis] = useState('');
  const [menge, setMenge] = useState('');
  const [produkte, setProdukte] = useState([]);

  // Lade Produkte beim ersten Rendern
  useEffect(() => {
    loadProdukte();
  }, []);

  const loadProdukte = async () => {
    const existingProduktsString = await AsyncStorage.getItem('produkte');
    if (existingProduktsString) {
      setProdukte(JSON.parse(existingProduktsString));
    }
  };

  const handleSubmit = async () => {
    if (name && preis && menge) {
      // Umwandlung in Zahlen, um Rechnungen zu ermöglichen
      const produkt = {
        name,
        preis: parseFloat(preis),
        menge: parseInt(menge, 10)
      };

      const newProdukte = [...produkte, produkt];
      setProdukte(newProdukte);
      await AsyncStorage.setItem('produkte', JSON.stringify(newProdukte));

      setName('');
      setPreis('');
      setMenge('');
      
      console.log('Produkt wurde hinzugefügt');
    } else {
      Alert.alert('Bitte alle Felder ausfüllen.');
    }
  };

  // Berechne die Gesamtsumme aller Produkte
  const gesamtSumme = produkte.reduce(
    (acc, item) => acc + (Number(item.preis) * Number(item.menge)),
    0
  );

  const renderItem = ({ item }) => {
    const produktSumme = Number(item.preis) * Number(item.menge);
    return (
      <View style={styles.produktListe}>
        <Text style={styles.produktName}>{item.name}</Text>
        <Text style={styles.produktPreis}>Einzelpreis: {item.preis}€</Text>
        <Text style={styles.produktMenge}>Menge: {item.menge}</Text>
        <Text style={styles.produktSumme}>
          Gesamt: {produktSumme.toFixed(2)}€
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hinzufügen</Text>

      <Text>Name</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
      />

      <Text>Preis</Text>
      <TextInput
        keyboardType="numeric"
        style={styles.input}
        value={preis}
        onChangeText={setPreis}
      />

      <Text>Menge</Text>
      <TextInput
        keyboardType="numeric"
        style={styles.input}
        value={menge}
        onChangeText={setMenge}
      />

      <Button title="Produkt Hinzufügen" onPress={handleSubmit} />

      {/* Produktliste unter dem Eingabeformular */}
      <FlatList
        data={produkte}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />

      <Text style={styles.gesamtSumme}>
        Gesamtsumme aller Produkte: {gesamtSumme.toFixed(2)}€
      </Text>
    </View>
  );
};


export default Home

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
    produktListe: {
      padding: 15,
      width: 250,
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: '#ccc'
    },
    input: {
      height: 30,
      minWidth: 150,
      borderColor: 'grey',
      borderWidth: 1,
      marginBottom: 10,
      paddingLeft: 10,
    },
    produktName: {
      fontWeight: 'bold'
    },
    produktPreis: {

    },
    produktMenge: {

    },
    produktSumme: {

    },
    gesamtSumme: {

    }
  })