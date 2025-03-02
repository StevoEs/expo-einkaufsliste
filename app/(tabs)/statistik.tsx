import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProductForm from '../../components/ProductForm';
import ProductList from '../../components/ProductList';
import TotalSum from '../../components/TotalSum';
import { loadProdukte, saveProdukte } from '../../storage/storage';


const Statistik = () => {


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Archiv</Text>
      <Text style={styles.text}>Hier werden Einkaufslisten abgespeichert und Archiviert</Text>

    </View>
  );
};

export default Statistik;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      alignItems: 'center',
      backgroundColor: 'white',
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      textDecorationLine: 'underline'
    },
    text: {
      
    }
  })