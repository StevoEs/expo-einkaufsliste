import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TotalSum = ({ produkte }) => {
  const gesamtSumme = produkte.reduce((acc, item) => acc + Number(item.preis) * Number(item.menge), 0);

  return (
    <View style={styles.container}>
      <Text style={styles.gesamtSumme}>Gesamtsumme: {gesamtSumme.toFixed(2)}€</Text>
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
    }
  })