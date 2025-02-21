import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


interface Produkt {
  name: string;
  preis: number;
  menge: number;
}

const Home = () => {

  const [name, setName] = useState('');
  const [preis, setPreis] = useState<string>('');
  const [menge, setMenge] = useState<string>('');
  const [produkte, setProdukte] = useState<Produkt[]>([]);
  const [bearbeiteIndex, setBearbeiteIndex] = useState<number | null>(null);

  // Produkte laden
  useEffect(() => {
    loadProdukte();
  }, []);

  const loadProdukte = async () => {
    const existingProduktsString = await AsyncStorage.getItem('produkte');
    if (existingProduktsString) {
      const parsedProdukte: Produkt[] = JSON.parse(existingProduktsString);
      setProdukte(parsedProdukte);
    }
  };

  const handleSubmit = async () => {
    if (name && preis && menge) {
      const produkt: Produkt = {
        name,
        preis: parseFloat(preis),
        menge: parseInt(menge, 10),
      };

      let newProdukte: Produkt[] = [...produkte];

      if (bearbeiteIndex !== null) {
        // Bearbeitung: Ersetze das Produkt
        newProdukte[bearbeiteIndex] = produkt;
        setBearbeiteIndex(null);
      } else {
        // Neues Produkt hinzufügen
        newProdukte.push(produkt);
      }

      setProdukte(newProdukte);
      await AsyncStorage.setItem('produkte', JSON.stringify(newProdukte));

      // Felder zurücksetzen
      setName('');
      setPreis('');
      setMenge('');
    } else {
      Alert.alert('Bitte alle Felder ausfüllen.');
    }
  };

  // Produkt löschen
  const handleDelete = async (index: number) => {
    const newProdukte = produkte.filter((_, i) => i !== index);
    setProdukte(newProdukte);
    await AsyncStorage.setItem('produkte', JSON.stringify(newProdukte));
  };

  // Produkt bearbeiten (Werte ins Eingabefeld laden)
  const handleEdit = (index: number) => {
    const produkt: Produkt = produkte[index];
    setName(produkt.name);
    setPreis(produkt.preis.toString());
    setMenge(produkt.menge.toString());
    setBearbeiteIndex(index);
  };

  // Berechne die Gesamtsumme aller Produkte
  const gesamtSumme = produkte.reduce(
    (acc: number, item: Produkt) => acc + item.preis * item.menge,
    0
  );

  const renderItem = ({ item, index }: { item: Produkt; index: number }) => {
    const produktSumme = item.preis * item.menge;
    // Alter Code. Eventuel wieder rückgängig machen
    // const produktSumme = Number(item.preis) * Number(item.menge);
    return (
      <View style={styles.produktListe}>
        <Text style={styles.produktName}>{item.name}</Text>
        <Text style={styles.produktPreis}>Einzelpreis: {item.preis}€</Text>
        <Text style={styles.produktMenge}>Menge: {item.menge}</Text>
        <Text style={styles.produktSumme}>
          Gesamt: {produktSumme.toFixed(2)}€
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => handleEdit(index)} style={styles.bearbeitenButton}>
            <Text>Bearbeiten</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDelete(index)} style={styles.loeschenButton}>
            <Text>Löschen</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{bearbeiteIndex !== null ? 'Produkt bearbeiten' : 'Neues Produkt hinzufügen'}</Text>

      <Text>Name</Text>
      <TextInput 
        style={styles.input} 
        value={name} 
        onChangeText={setName} 
      />

      <TextInput
        keyboardType="numeric"
        style={styles.input}
        value={preis} // Kein .toString() nötig, da preis bereits string ist
        onChangeText={setPreis}
      />

      <TextInput
        keyboardType="numeric"
        style={styles.input}
        value={menge}
        onChangeText={setMenge}
      />

      <Button title={bearbeiteIndex !== null ? 'Änderungen speichern' : 'Produkt hinzufügen'} onPress={handleSubmit} />

      {/* Produktliste unter dem Eingabeformular */}
      <FlatList data={produkte} renderItem={renderItem} keyExtractor={(item, index) => index.toString()} />

      <Text style={styles.gesamtSumme}>Gesamtsumme aller Produkte: {gesamtSumme.toFixed(2)}€</Text>
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
      fontSize: 14,
      borderColor: 'grey',
      borderWidth: 1,
      marginBottom: 10,
      padding: 20,
      paddingVertical: 5,
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
    buttonContainer: {
      
    },
    bearbeitenButton: {

    },
    loeschenButton: {

    },
    gesamtSumme: {

    }
  })