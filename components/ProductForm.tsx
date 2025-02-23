import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';

const ProductForm = ({ onSubmit, produkt }) => {
  const [name, setName] = useState('');
  const [preis, setPreis] = useState('');
  const [menge, setMenge] = useState('');

  useEffect(() => {
    if (produkt) {
      setName(produkt.name);
      setPreis(produkt.preis.toString());
      setMenge(produkt.menge.toString());
    }
  }, [produkt]);

  const handleSubmit = () => {
    if (name && preis && menge) {
      onSubmit({ name, preis: parseFloat(preis), menge: parseInt(menge, 10) });
      setName('');
      setPreis('');
      setMenge('');
    } else {
      Alert.alert('Bitte alle Felder ausfüllen.');
    }
  };

  return (
    <View>
      <Text>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />

      <Text>Preis</Text>
      <TextInput keyboardType="numeric" style={styles.input} value={preis} onChangeText={setPreis} />

      <Text>Menge</Text>
      <TextInput keyboardType="numeric" style={styles.input} value={menge} onChangeText={setMenge} />

      <Button title="Speichern" onPress={handleSubmit} />
    </View>
  );
};

export default ProductForm;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  input: {
    height: 30,
    minWidth: 150,
    fontSize: 14,
    borderColor: 'grey',
    borderWidth: 1,
    marginBottom: 6,
    padding: 20,
    paddingVertical: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },
  text: {

  }
})