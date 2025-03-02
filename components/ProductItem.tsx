import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Produkt } from '../src/types/productTypes';

interface ProductItemProps {
  item: Produkt;
  onEdit: () => void;
  onDelete: () => void;
}

const ProductItem: React.FC<ProductItemProps> = ({ item, onEdit, onDelete }) => {
  return (
    <View style={styles.container}>
      <Text>{item.name || 'Kein Name'}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
    marginBottom: 8,
  },
  produktListe: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemContainer: {
    // Beispielwerte:
    padding: 10,
    backgroundColor: '#fff',
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