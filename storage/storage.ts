import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadProdukte = async () => {
  const existingProduktsString = await AsyncStorage.getItem('produkte');
  return existingProduktsString ? JSON.parse(existingProduktsString) : [];
};

export const saveProdukte = async (produkte) => {
  await AsyncStorage.setItem('produkte', JSON.stringify(produkte));
};
