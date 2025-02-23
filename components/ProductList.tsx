import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ProductItem from './ProductItem';

const ProductList = ({ produkte, onEdit, onDelete }) => (
  <FlatList
    style={styles.listContainer}
    data={produkte}
    renderItem={({ item, index }) => (
      <ProductItem item={item} index={index} onEdit={onEdit} onDelete={onDelete} />
    )}
    keyExtractor={(item, index) => index.toString()}
  />
);

export default ProductList;

const styles = StyleSheet.create({
    listContainer: {
      width: '100%',
    },

  })