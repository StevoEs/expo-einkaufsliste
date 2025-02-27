import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Statistik = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Statistiken</Text>
      <Text style={styles.text}>hier werden Statistiken über die vergangenen Einkäufe angezeigt.</Text>
    </View>
  )
}

export default Statistik

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