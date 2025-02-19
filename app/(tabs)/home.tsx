import { FlatList } from 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Home = () => {
  const produkte = [
    {
      "name": "Milch",
      "preis": 1,
      "menge": 1
    },
    {
      "name": "Brot",
      "preis": 1.99,
      "menge": 1
    },
    {
      "name": "Quark",
      "preis": 1.09,
      "menge": 1
    }
  ];

  const renderItem = ({ item }) => 
    <View style={styles.produktListe}>
      <Text style={styles.produktName}>{item.name}</Text>
      <Text style={styles.produktPreis}>{item.preis}€</Text>
      <Text style={styles.produktMenge}>{item.menge}Stk.</Text>
    </View>
  ;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Einkaufsliste</Text>
      <FlatList data={produkte} renderItem={renderItem} keyExtractor={(item, index) => index.toString()}></FlatList>
    </View>
  )
}

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
      borderBottomWidth: 1,
      borderBottomColor: '#ccc'
    },
    produktName: {
      fontWeight: 'bold'
    },
    produktPreis: {

    },
    produktMenge: {

    }
  })