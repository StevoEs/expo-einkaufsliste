import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Produkt } from '../src/types';


interface ProductItemProps {
  item: Produkt;
  onEdit: () => void;
  onDelete: () => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ item, onEdit, onDelete }) => {
  const produktSumme = Number(item.preis) * Number(item.menge);

  return (
    <View style={styles.produktListe}>
      <Text style={styles.produktName}>{item.name}</Text>
      <Text style={styles.produktPreis}>Einzelpreis: {item.preis}€</Text>
      <Text style={styles.produktMenge}>Menge: {item.menge}</Text>
      <Text style={styles.produktSumme}>Gesamt: {produktSumme.toFixed(2)}€</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onEdit} style={styles.bearbeitenButton}>
          <Text>Bearbeiten</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onDelete} style={styles.loeschenButton}>
          <Text>Löschen</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProductItem;


const styles = StyleSheet.create({
  produktListe: {
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5
  },
  bearbeitenButton: {
    margin: 4,
    padding: 8,
    backgroundColor: 'rgba(33, 150, 243, 1)',
  },
  loeschenButton: {
    margin: 4,
    padding: 8,
    backgroundColor: 'rgba(33, 150, 243, 1)',
  },
  buttonText: {
    color: 'white',
  },
  gesamtSumme: {

  }
})