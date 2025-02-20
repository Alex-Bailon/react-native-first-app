import { View, Text, StyleSheet, TextInput, FlatList, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { PRODUCTS } from './Home/HomeScreen';
import ProductCard, { Product } from '../components/ProductCard';

type SearchStackParamList = {
  Search: undefined;
  Details: { productId: string; fromSearch?: boolean };
};

type NavigationProp = StackNavigationProp<SearchStackParamList, 'Search'>;

const MAX_HISTORY_ITEMS = 10;

const SearchScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Load search history from storage (you can implement AsyncStorage here)
  useEffect(() => {
    // Mock search history for now
    setSearchHistory(['Headphones', 'Laptop', 'Wireless', 'Keyboard']);
  }, []);

  const addToSearchHistory = (query: string) => {
    if (query.trim() === '') return;
    
    setSearchHistory(prevHistory => {
      // Remove the query if it already exists (to move it to the top)
      const filteredHistory = prevHistory.filter(item => item.toLowerCase() !== query.toLowerCase());
      // Add the new query to the beginning
      const newHistory = [query, ...filteredHistory];
      // Keep only the most recent MAX_HISTORY_ITEMS
      return newHistory.slice(0, MAX_HISTORY_ITEMS);
    });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);

    if (query.trim() === '') {
      setFilteredProducts([]);
      setIsSearching(false);
      return;
    }

    // Filter products based on search query
    const results = PRODUCTS.filter(product => 
      product.title.toLowerCase().includes(query.toLowerCase()) ||
      product.description.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredProducts(results);
  };

  const handleHistoryItemPress = (item: string) => {
    setSearchQuery(item);
    handleSearch(item);
    // Move the clicked item to the top of history
    addToSearchHistory(item);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setFilteredProducts([]);
    setIsSearching(false);
  };

  const handleSearchSubmit = () => {
    if (searchQuery.trim()) {
      addToSearchHistory(searchQuery.trim());
    }
  };

  const handleClearHistory = () => {
    setSearchHistory([]);
  };

  const handleProductPress = (productId: string) => {
    // Add to history when a product is selected
    addToSearchHistory(searchQuery.trim());
    navigation.navigate('Details', { productId, fromSearch: true });
  };

  const renderHistoryItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.historyItem}
      onPress={() => handleHistoryItemPress(item)}
    >
      <MaterialCommunityIcons name="history" size={20} color="#666" />
      <Text style={styles.historyText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderProduct = ({ item }: { item: Product }) => (
    <ProductCard
      product={item}
      onPress={() => handleProductPress(item.id)}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <MaterialCommunityIcons name="magnify" size={24} color="#666" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            value={searchQuery}
            onChangeText={handleSearch}
            onSubmitEditing={handleSearchSubmit}
            returnKeyType="search"
            autoCapitalize="none"
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={handleClearSearch}>
              <MaterialCommunityIcons name="close" size={24} color="#666" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {!isSearching && searchHistory.length > 0 && (
        <View style={styles.historyContainer}>
          <View style={styles.historyHeader}>
            <Text style={styles.historyTitle}>Recent Searches</Text>
            <TouchableOpacity onPress={handleClearHistory}>
              <Text style={styles.clearHistoryText}>Clear All</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={searchHistory}
            renderItem={renderHistoryItem}
            keyExtractor={(item) => item}
          />
        </View>
      )}

      {isSearching && (
        <FlatList
          data={filteredProducts}
          renderItem={renderProduct}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.productList}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No products found</Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  searchInput: {
    flex: 1,
    height: 44,
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  historyContainer: {
    padding: 16,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  clearHistoryText: {
    fontSize: 14,
    color: '#e41e31',
    fontWeight: '500',
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  historyText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  productList: {
    padding: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});

export default SearchScreen; 