import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'
import Checkbox from 'expo-checkbox';
import { Produkt } from '../src/types';


interface ProductItemProps {
  item: Produkt;
  onEdit: () => void;
  onDelete: () => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ item, onEdit, onDelete }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  const produktSumme = Number(item.preis) * Number(item.menge);

  return (
    <View style={styles.produktListe}>
      <View style={styles.headerRow}>
        <Checkbox 
          value={isChecked}
          onValueChange={setIsChecked}
          style={styles.checkbox}
        />
        <Text style={[styles.produktName, isChecked && styles.checked]}>
          {item.name}
        </Text>
        {/* Icon, das beim Anklicken ein Menü öffnet */}
        <TouchableOpacity onPress={() => setShowOptions(!showOptions)}>
          <Ionicons name="ellipsis-vertical" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Menü mit den Optionen, das bei Klick auf das Icon eingeblendet wird */}
      {showOptions && (
        <View style={styles.optionsContainer}>
          <TouchableOpacity onPress={onEdit} style={styles.optionButton}>
            <Text style={styles.optionText}>Bearbeiten</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onDelete} style={styles.optionButton}>
            <Text style={styles.optionText}>Löschen</Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.produktPreis}>Einzelpreis: {item.preis}€</Text>
      <Text style={styles.produktMenge}>Menge: {item.menge}</Text>
      <Text style={styles.produktSumme}>Gesamt: {produktSumme.toFixed(2)}€</Text>
    </View>
  );
};

export default ProductItem;


const styles = StyleSheet.create({
  produktListe: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  checkbox: {
    marginRight: 10,
  },
  produktName: {
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
  },
  // Wird angewendet, wenn das Produkt abgehakt wurde
  checked: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 5,
  },
  optionButton: {
    marginHorizontal: 5,
    padding: 8,
    backgroundColor: 'rgba(33, 150, 243, 1)',
    borderRadius: 5,
  },
  optionText: {
    color: 'white',
  },
  produktPreis: {
    // Weitere Styles nach Bedarf
  },
  produktMenge: {
    // Weitere Styles nach Bedarf
  },
  produktSumme: {
    // Weitere Styles nach Bedarf
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
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
    // Weitere Styles nach Bedarf
  },
})