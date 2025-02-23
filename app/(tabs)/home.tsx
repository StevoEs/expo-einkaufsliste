import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ProductList from '../../components/ProductList';
import TotalSum from '../../components/TotalSum';
import { loadProdukte, saveProdukte } from '../../storage/storage';
import ProductForm from '@/components/ProductForm';

type Produkt = {
  name: string;
  preis: number;
  menge: number;
};

const Home = () => {
  const [produkte, setProdukte] = useState<Produkt[]>([]);
  const [bearbeiteIndex, setBearbeiteIndex] = useState<number | null>(null);


  useEffect(() => {
    async function fetchProdukte() {
      setProdukte(await loadProdukte());
    }
    fetchProdukte();
  }, []);

  const handleSubmit = async (produkt: Produkt) => {
    let newProdukte = [...produkte];
    if (bearbeiteIndex !== null) {
      newProdukte[bearbeiteIndex] = produkt;
      setBearbeiteIndex(null);
    } else {
      newProdukte.push(produkt);
    }

    setProdukte(newProdukte);
    await saveProdukte(newProdukte);
  };

  const handleDelete = async (index: number) => {
    const newProdukte = produkte.filter((_, i) => i !== index);
    setProdukte(newProdukte);
    await saveProdukte(newProdukte);
  };

  const handleEdit = (index: number) => {
    setBearbeiteIndex(index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Einkaufsliste</Text>
      <ProductForm onSubmit={handleSubmit} produkt={bearbeiteIndex !== null ? produkte[bearbeiteIndex] : null} />
      <ProductList produkte={produkte} onEdit={handleEdit} onDelete={handleDelete} />
      <TotalSum produkte={produkte} />
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '80%',
        alignSelf: 'center',
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
