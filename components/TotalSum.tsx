import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Produkt } from '../src/types/Produkt';

interface TotalSumProps {
  produkte: (Produkt | null)[];
}

const TotalSum: React.FC<TotalSumProps> = ({ produkte }) => {
  // Filtere alle null-Elemente heraus
  const validProdukte = produkte.filter((item) => item !== null) as Produkt[];
  const gesamtSumme = validProdukte.reduce(
    (acc, item) => acc + Number(item.preis) * Number(item.menge),
    0
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sumText}>Gesamtsumme: {gesamtSumme.toFixed(2)}€</Text>
    </View>
  );
};

export default TotalSum;


const styles = StyleSheet.create({
  container: {
    marginTop: 10
  },
  gesamtSumme: {
    fontWeight: 'bold',
    fontSize: 16
  },
  sumText: {

  }
  })