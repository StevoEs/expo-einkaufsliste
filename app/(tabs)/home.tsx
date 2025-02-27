import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProductList from '../../components/ProductList';
import TotalSum from '../../components/TotalSum';
import { loadProdukte, saveProdukte } from '../../storage/storage';
import ProductForm from '@/components/ProductForm';
import { Produkt } from '../../src/types';

const Home = () => {
  const [produkte, setProdukte] = useState<Produkt[]>([]);
  const [editingProduct, setEditingProduct] = useState<Produkt | null>(null);

  useEffect(() => {
    async function fetchProdukte() {
      const loaded = await loadProdukte();
      // Filtere ungültige Einträge raus
      const validProducts = loaded.filter((p): p is Produkt => p !== null);
      setProdukte(validProducts);
    }
    fetchProdukte();
  }, []);

  const handleSubmit = async (produkt: Omit<Produkt, 'id'>) => {
    if (editingProduct) {
      // Produkt bearbeiten – anhand der eindeutigen ID
      const updatedProducts = produkte.map((p) =>
        p.id === editingProduct.id ? { ...produkt, id: editingProduct.id } : p
      );
      setProdukte(updatedProducts);
      await saveProdukte(updatedProducts);
      setEditingProduct(null);
    } else {
      // Neues Produkt hinzufügen
      const newProdukt: Produkt = { ...produkt, id: Date.now().toString() };
      const updatedProducts = [...produkte, newProdukt];
      setProdukte(updatedProducts);
      await saveProdukte(updatedProducts);
    }
  };

  const handleEdit = (id: string) => {
    const productToEdit = produkte.find((p) => p.id === id);
    if (productToEdit) {
      setEditingProduct(productToEdit);
    }
  };

  const handleDelete = (id: string) => {
    const updatedProducts = produkte.filter((p) => p.id !== id);
    setProdukte(updatedProducts);
    saveProdukte(updatedProducts);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Einkaufsliste</Text>
      <ProductForm onSubmit={handleSubmit} produkt={editingProduct} />
      <ProductList
        produkte={produkte}
        onEdit={(id: string) => handleEdit(id)}
        onDelete={(id: string) => handleDelete(id)}
      />
      <TotalSum produkte={produkte} />
    </View>
  );
};



export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: 'white',
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      textDecorationLine: 'underline'
    }

  })
