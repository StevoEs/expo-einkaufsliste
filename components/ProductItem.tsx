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

  const handleOptionPress = (action: () => void) => {
    action();
    setShowOptions(false);
  };

  return (
    <View style={styles.produktListe}>
      <View style={styles.headerRow}>
        <Checkbox 
          value={isChecked}
          onValueChange={setIsChecked}
          style={styles.checkbox}
        />
        <Text style={[styles.produktName, isChecked && styles.checked]}>
          <Text style={styles.produktMenge}>{item.menge}x </Text>
          {item.name}
        </Text>
        <TouchableOpacity 
          onPress={() => setShowOptions(!showOptions)}
          style={styles.optionsButton}
        >
          <Ionicons name="ellipsis-vertical" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {showOptions && (
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            onPress={() => handleOptionPress(onEdit)}
            style={[styles.optionButton, styles.editButton]}
          >
            <Text style={styles.optionText}>Bearbeiten</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleOptionPress(onDelete)}
            style={[styles.optionButton, styles.deleteButton]}
          >
            <Text style={styles.optionText}>Löschen</Text>
          </TouchableOpacity>
        </View>
      )}

      <Text style={styles.produktPreis}>Einzelpreis: {item.preis.toFixed(2)}€</Text>
      <Text style={styles.produktSumme}>Gesamt: {produktSumme.toFixed(2)}€</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  produktListe: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
  checked: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  optionsButton: {
    padding: 8,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
    marginVertical: 5,
  },
  optionButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  editButton: {
    backgroundColor: '#2196F3',
  },
  deleteButton: {
    backgroundColor: '#ff4444',
  },
  optionText: {
    color: 'white',
  },
  produktPreis: {
    color: '#666',
    fontSize: 14,
  },
  produktMenge: {
    color: '#666',
  },
  produktSumme: {
    fontWeight: 'bold',
    marginTop: 4,
  },
});

export default ProductItem;