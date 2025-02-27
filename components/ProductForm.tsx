import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { Produkt } from '../src/types';

export interface ProductFormProps {
  onSubmit: (produkt: Omit<Produkt, 'id'>) => void;
  produkt?: Produkt | null;
}


const ProductForm: React.FC<ProductFormProps> = ({ onSubmit, produkt }) => {
  const [name, setName] = useState(produkt ? produkt.name : '');
  const [preis, setPreis] = useState(produkt ? produkt.preis.toString() : '');
  const [menge, setMenge] = useState(produkt ? produkt.menge.toString() : '1');

  // Refs für die Input-Felder
  const nameInputRef = useRef<TextInput>(null);
  const preisInputRef = useRef<TextInput>(null);
  const mengeInputRef = useRef<TextInput>(null);

  // Aktualisiere die Felder, wenn sich die produkt-Prop ändert
  useEffect(() => {
    if (produkt) {
      setName(produkt.name);
      setPreis(produkt.preis.toString());
      setMenge(produkt.menge.toString());
    } else {
      setName('');
      setPreis('');
      setMenge('1');
    }
  }, [produkt]);

  const handleSubmit = () => {
    if (name && preis && menge) {
      onSubmit({
        name,
        preis: parseFloat(preis),
        menge: parseInt(menge, 10),
      });
      // Felder zurücksetzen
      setName('');
      setPreis('');
      setMenge('1');
      // Fokus auf Namensfeld setzen
      nameInputRef.current?.focus();
    } else {
      Alert.alert('Bitte alle Felder ausfüllen.');
    }
  };


  return (
    <View>
      <Text>Name</Text>
      <TextInput 
        ref={nameInputRef}
        style={styles.input} 
        value={name} 
        onChangeText={setName} 
        returnKeyType="next"
        onSubmitEditing={() => preisInputRef.current?.focus()}
        />

      <Text>Preis</Text>
      <TextInput
        ref={preisInputRef}
        keyboardType="numeric"
        style={styles.input}
        value={preis}
        onChangeText={setPreis}
        returnKeyType="next"
        onSubmitEditing={() => mengeInputRef.current?.focus()}
      />

      <Text>Menge</Text>
      <TextInput
        ref={mengeInputRef}
        keyboardType="numeric"
        style={styles.input}
        value={menge}
        onChangeText={setMenge}
        returnKeyType="done"
        onSubmitEditing={handleSubmit}
      />

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
    padding: 10,
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