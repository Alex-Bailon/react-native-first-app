import { View, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import ProductCard, { Product } from '../../components/ProductCard';

type RootStackParamList = {
  Home: undefined;
  Details: { productId: string };
  Profile: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

// Sample product data
export const PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Wireless Headphones',
    description: 'Premium noise-canceling wireless headphones with 30-hour battery life',
    price: 299.99,
    discountedPrice: 249.99,
    imageUrl: 'https://picsum.photos/id/3/400/400',
  },
  {
    id: '2',
    title: 'Smart Watch',
    description: 'Feature-rich smartwatch with health tracking and notifications',
    price: 199.99,
    imageUrl: 'https://picsum.photos/id/2/400/400',
  },
  {
    id: '3',
    title: 'Laptop Stand',
    description: 'Ergonomic aluminum laptop stand for better posture',
    price: 79.99,
    discountedPrice: 59.99,
    imageUrl: 'https://picsum.photos/id/1/400/400',
  },
  {
    id: '4',
    title: 'Wireless Charger',
    description: 'Fast wireless charging pad compatible with all devices',
    price: 49.99,
    imageUrl: 'https://picsum.photos/id/4/400/400',
  },
  {
    id: '5',
    title: 'Mechanical Keyboard',
    description: 'RGB mechanical keyboard with custom switches',
    price: 159.99,
    discountedPrice: 129.99,
    imageUrl: 'https://picsum.photos/id/5/400/400',
  },
  {
    id: '6',
    title: 'USB-C Hub',
    description: '7-in-1 USB-C hub with multiple ports and card readers',
    price: 89.99,
    imageUrl: 'https://picsum.photos/id/6/400/400',
  },
];

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();

  const handleProductPress = (productId: string) => {
    navigation.navigate('Details', { productId });
  };

  const renderProduct = ({ item }: { item: Product }) => (
    <ProductCard
      product={item}
      onPress={() => handleProductPress(item.id)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={PRODUCTS}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  productList: {
    padding: 8,
  },
});

export default HomeScreen; 