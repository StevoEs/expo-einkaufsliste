import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ProductItem from './ProductItem';
import { Produkt, ProductListProps } from '../src/types/productTypes';


const ProductList: React.FC<ProductListProps> = React.memo(({ produkte, onEdit, onDelete }) => {
  const renderItem = React.useCallback(
    ({ item }: { item: Produkt }) => (
      <ProductItem
        item={item}
        onEdit={() => onEdit(item.id)}
        onDelete={() => onDelete(item.id)}
      />
    ),
    [onEdit, onDelete]
  );

 //const keyExtractor = (item: Produkt) => item.id;

  return (
    <FlatList
      style={styles.listContainer}
      data={produkte}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
});

export default ProductList;

const styles = StyleSheet.create({
  listContainer: {
    width: '100%',
    maxWidth: 500,
  },
});