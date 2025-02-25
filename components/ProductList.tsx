import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ProductItem from './ProductItem';
import { Produkt } from '../src/types';

interface ProductListProps {
  produkte: Produkt[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const ProductList: React.FC<ProductListProps> = ({ produkte, onEdit, onDelete }) => (
  <FlatList
    data={produkte}
    renderItem={({ item }) => (
      <ProductItem
        item={item}
        onEdit={() => onEdit(item.id)}
        onDelete={() => onDelete(item.id)}
      />
    )}
    keyExtractor={(item, index) => item.id || index.toString()}
  />
);


export default ProductList;

const styles = StyleSheet.create({
    listContainer: {
      width: 300,
    },

  })