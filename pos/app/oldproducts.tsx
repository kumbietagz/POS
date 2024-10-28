import React, { useState, useRef } from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  FlatList,
  Image,
  TextInput,
  ListRenderItem,
  Keyboard,
  TouchableWithoutFeedback,
  Animated,
} from 'react-native';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const PRIMARY_COLOR = '#ECDAC3';
const SECONDARY_COLOR = '#B38B6D';
const TEXT_COLOR = '#403D39';
const ICON_COLOR = TEXT_COLOR;
const BUTTON_COLOR = SECONDARY_COLOR;
const BUTTON_TEXT_COLOR = '#FFFFFF';

interface Product {
  id: string;
  name: string;
  price: string;
  image: string;
}

const ProductListingScreen: React.FC = () => {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const [isGridView, setIsGridView] = useState(true);
  const [searchActive, setSearchActive] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const searchAnimation = useRef(new Animated.Value(0)).current;
  const searchInputRef = useRef<TextInput>(null);

  const products: Product[] = [
    { id: '1', name: 'Classic Chair', price: '$199', image: 'https://via.placeholder.com/150' },
    { id: '2', name: 'Modern Sofa', price: '$599', image: 'https://via.placeholder.com/150' },
    { id: '3', name: 'Wooden Table', price: '$299', image: 'https://via.placeholder.com/150' },
    { id: '4', name: 'Pendant Light', price: '$89', image: 'https://via.placeholder.com/150' },
    { id: '5', name: 'Bookshelf', price: '$249', image: 'https://via.placeholder.com/150' },
    { id: '6', name: 'Area Rug', price: '$159', image: 'https://via.placeholder.com/150' },
  ];

  if (!fontsLoaded) {
    return null;
  }

  const toggleSearch = () => {
    setSearchActive(!searchActive);
    Animated.timing(searchAnimation, {
      toValue: searchActive ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();

    if (!searchActive) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      setSearchText('');
      Keyboard.dismiss();
    }
  };

  const toggleFilter = () => {
    setFilterVisible((prev) => !prev);
  };

  const applyFilter = (filterType: string) => {
    setFilterVisible(false);
    console.log(`Filter applied: ${filterType}`);
    // Add filter logic here
  };

  const renderProductItem: ListRenderItem<Product> = ({ item }) => (
    <View style={isGridView ? styles.gridItem : styles.listItem}>
      <Image source={{ uri: item.image }} style={isGridView ? styles.gridImage : styles.listImage} />
      <View style={isGridView ? styles.gridTextContainer : styles.listTextContainer}>
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>{item.price}</Text>
      </View>
    </View>
  );

  const searchWidth = searchAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [40, width * 0.65],
  });

  const searchOpacity = searchAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton}>
            <Feather name="arrow-left" size={24} color={ICON_COLOR} />
          </TouchableOpacity>
          <Text style={styles.headerText}>Products</Text>
          <View style={styles.headerRightIcons}>
            <Animated.View style={[styles.searchContainer, { width: searchWidth }]}>
              <TouchableOpacity onPress={toggleSearch}>
                <Feather name="search" size={20} color={ICON_COLOR} />
              </TouchableOpacity>
              <Animated.View style={[styles.inputContainer, { opacity: searchOpacity }]}>
                <TextInput
                  ref={searchInputRef}
                  style={styles.searchInput}
                  placeholder="Search products..."
                  placeholderTextColor={TEXT_COLOR}
                  value={searchText}
                  onChangeText={setSearchText}
                />
                <TouchableOpacity onPress={toggleSearch}>
                  <Feather name="x" size={20} color={ICON_COLOR} />
                </TouchableOpacity>
              </Animated.View>
            </Animated.View>
            <TouchableOpacity style={styles.iconButton} onPress={toggleFilter}>
              <Feather name="filter" size={24} color={ICON_COLOR} />
            </TouchableOpacity>
            {filterVisible && (
              <View style={styles.dropdown}>
                <TouchableOpacity onPress={() => applyFilter('Price Low to High')}>
                  <Text style={styles.dropdownText}>Price Low to High</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => applyFilter('Price High to Low')}>
                  <Text style={styles.dropdownText}>Price High to Low</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => applyFilter('Newest Arrivals')}>
                  <Text style={styles.dropdownText}>Newest Arrivals</Text>
                </TouchableOpacity>
              </View>
            )}
            <TouchableOpacity style={styles.iconButton} onPress={() => setIsGridView(!isGridView)}>
              <Feather name={isGridView ? 'list' : 'grid'} size={24} color={ICON_COLOR} />
            </TouchableOpacity>
          </View>
        </View>

        <FlatList<Product>
          data={products}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id}
          numColumns={isGridView ? 2 : 1}
          key={isGridView ? 'grid' : 'list'}
          contentContainerStyle={styles.productList}
        />

        <TouchableOpacity style={styles.floatingButton} onPress={() => {}}>
          <Feather name="plus" size={24} color={BUTTON_TEXT_COLOR} />
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: width * 0.05,
    justifyContent: 'space-between',
  },
  iconButton: {
    marginHorizontal: width * 0.01,
  },
  headerText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: width * 0.05,
    color: TEXT_COLOR,
    flex: 1,
    textAlign: 'center',
  },
  headerRightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  searchContainer: {
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginRight: width * 0.01,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  searchInput: {
    flex: 1,
    fontFamily: 'Poppins_400Regular',
    fontSize: width * 0.04,
    color: TEXT_COLOR,
    marginRight: 10,
  },
  dropdown: {
    position: 'absolute',
    top: 40,
    right: 40,
    backgroundColor: '#FFFFFF',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1000,
  },
  dropdownText: {
    fontFamily: 'Poppins_400Regular',
    fontSize: width * 0.04,
    color: TEXT_COLOR,
    paddingVertical: 5,
  },
  productList: {
    paddingHorizontal: width * 0.05,
    paddingBottom: width * 0.2,
  },
  gridItem: {
    flex: 1,
    margin: width * 0.02,
    backgroundColor: '#FFFFFF',
    borderRadius: width * 0.02,
    padding: width * 0.04,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  listItem: {
    flexDirection: 'row',
    marginBottom: width * 0.04,
    backgroundColor: '#FFFFFF',
    borderRadius: width * 0.02,
    padding: width * 0.04,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gridImage: {
    width: width * 0.35,
    height: width * 0.35,
    marginBottom: width * 0.02,
    borderRadius: width * 0.01,
  },
  listImage: {
    width: width * 0.25,
    height: width * 0.25,
    marginRight: width * 0.04,
    borderRadius: width * 0.01,
  },
  gridTextContainer: {
    alignItems: 'center',
  },
  listTextContainer: {
    flex: 1,
  },
  productName: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: width * 0.04,
    color: TEXT_COLOR,
  },
  productPrice: {
    fontFamily: 'Poppins_400Regular',
    fontSize: width * 0.035,
    color: SECONDARY_COLOR,
    marginTop: width * 0.01,
  },
  floatingButton: {
    position: 'absolute',
    bottom: width * 0.1,
    right: width * 0.05,
    backgroundColor: BUTTON_COLOR,
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: width * 0.075,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default ProductListingScreen;
