import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { ProductItemProps } from '../src/types/productTypes';
import Icon from 'react-native-vector-icons/FontAwesome';



const ProductItem: React.FC<ProductItemProps> = React.memo(({ item, onEdit, onDelete }) => {
  const [isChecked, setIsChecked] = React.useState(false);
  const [showOptions, setShowOptions] = React.useState(false);

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
        <Text style={styles.produktName}>
          <Text style={styles.produktMenge}>{item.menge}x </Text>
          {item.name}
        </Text>
        <TouchableOpacity
          onPress={() => setShowOptions(!showOptions)}
          style={styles.optionsButton}
        >
          <Ionicons name="ellipsis-vertical" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.dragHandle}>
          <Icon name="bars" size={20} />
        </TouchableOpacity>
      </View>

      {showOptions && (
        <View style={styles.optionsContainer}>
          <TouchableOpacity
            onPress={() => handleOptionPress(() => onEdit(item.id))}
            style={[styles.optionButton, styles.editButton]}
          >
            <Text style={styles.optionText}>Bearbeiten</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleOptionPress(() => onDelete(item.id))}
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
});

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
  dragHandle: {
    padding: 10,
  },
  activeDrag: {
    backgroundColor: '#f0f0f0',
  },
});

export default ProductItem;