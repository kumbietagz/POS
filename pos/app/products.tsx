import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Modal,
  Platform,
  StatusBar,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { ScaledSheet, scale, moderateScale, verticalScale } from 'react-native-size-matters';
import { useMediaQuery } from 'react-responsive';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomTabs from './bottomtabs'

// Color constants
const PRIMARY_COLOR = '#ECDAC3';
const SECONDARY_COLOR = '#B38B6D';
const TEXT_COLOR = '#403D39';
const ICON_COLOR = TEXT_COLOR;
const INPUT_BG = '#F3EAE3';
const WHITE = '#FFFFFF';
const DELETE_COLOR = '#FF6B6B';

interface Product {
  id: string;
  name: string;
  price: number;
  tax: number;
}

const AllProducts: React.FC = () => {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const insets = useSafeAreaInsets();
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const [screenWidth, setScreenWidth] = useState(Dimensions.get('window').width);
  const [screenHeight, setScreenHeight] = useState(Dimensions.get('window').height);

  useEffect(() => {
    if (Platform.OS === 'android') {
      setStatusBarHeight(StatusBar.currentHeight || 0);
    }

    const updateLayout = () => {
      setScreenWidth(Dimensions.get('window').width);
      setScreenHeight(Dimensions.get('window').height);
    };

    const subscription = Dimensions.addEventListener('change', updateLayout);

    return () => subscription.remove();
  }, []);

  const isTabletOrMobileDevice = useMediaQuery({ maxWidth: 1224 });
  const isDesktop = useMediaQuery({ minWidth: 1224 });
  
  const getResponsiveFontSize = (baseSize: number) => {
    if (isDesktop) return baseSize * 0.7;
    if (isTabletOrMobileDevice) return baseSize * 0.85;
    return baseSize;
  };

  const [products, setProducts] = useState<Product[]>([
    { id: '1', name: 'Product 1', price: 10.99, tax: 0.15 },
    { id: '2', name: 'Product 2', price: 15.99, tax: 0.15 },
    { id: '3', name: 'Product 3', price: 20.99, tax: 0.15 },
  ]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id'>>({ name: '', price: 0, tax: 0 });

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addProduct = () => {
    if (newProduct.name && newProduct.price) {
      setProducts([...products, { ...newProduct, id: Date.now().toString() }]);
      setNewProduct({ name: '', price: 0, tax: 0 });
      setModalVisible(false);
    }
  };

  const deleteProduct = (id: string) => {
    setProducts(products.filter(product => product.id !== id));
  };

  const editProduct = (product: Product) => {
    setEditingProduct(product);
    setNewProduct({ name: product.name, price: product.price, tax: product.tax });
    setModalVisible(true);
  };

  const updateProduct = () => {
    if (editingProduct) {
      setProducts(products.map(product => 
        product.id === editingProduct.id ? { ...product, ...newProduct, id: editingProduct.id } : product
      ));
      setModalVisible(false);
      setEditingProduct(null);
      setNewProduct({ name: '', price: 0, tax: 0 });
    }
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <View style={styles.productItem}>
      <View style={styles.productInfo}>
        <Text style={[styles.productName, { fontSize: getResponsiveFontSize(18) }]}>{item.name}</Text>
        <Text style={[styles.productPrice, { fontSize: getResponsiveFontSize(14) }]}>Price: ${item.price.toFixed(2)}</Text>
        <Text style={[styles.productTax, { fontSize: getResponsiveFontSize(14) }]}>Tax: {(item.tax * 100).toFixed(0)}%</Text>
      </View>
      <View style={styles.productActions}>
        <TouchableOpacity onPress={() => editProduct(item)} style={styles.editButton}>
          <Ionicons name="create-outline" size={getResponsiveFontSize(24)} color={SECONDARY_COLOR} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteProduct(item.id)} style={styles.deleteButton}>
          <Ionicons name="trash-outline" size={getResponsiveFontSize(24)} color={DELETE_COLOR} />
        </TouchableOpacity>
      </View>
    </View>
  );

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={[
        styles.header,
        { paddingTop: Platform.OS === 'android' ? statusBarHeight : insets.top }
      ]}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Feather name="arrow-left" size={getResponsiveFontSize(24)} color={ICON_COLOR} />
        </TouchableOpacity>
        <Text style={[styles.headerText, { fontSize: getResponsiveFontSize(20) }]}>All Products</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.addButton}>
          <Ionicons name="add-circle-outline" size={getResponsiveFontSize(28)} color={SECONDARY_COLOR} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={getResponsiveFontSize(20)} color={TEXT_COLOR} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { fontSize: getResponsiveFontSize(16) }]}
          placeholder="Search products..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={TEXT_COLOR}
        />
      </View>

      <KeyboardAwareFlatList
        data={filteredProducts}
        renderItem={renderProductItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContentContainer}
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.modalContainer}
        >
          <ScrollView contentContainerStyle={styles.modalScrollView}>
            <View style={[styles.modalContent, { width: screenWidth * 0.9, maxHeight: screenHeight * 0.8 }]}>
              <Text style={[styles.modalTitle, { fontSize: getResponsiveFontSize(20) }]}>
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </Text>
              <TextInput
                style={[styles.input, { fontSize: getResponsiveFontSize(16) }]}
                placeholder="Product Name"
                value={newProduct.name}
                onChangeText={(text) => setNewProduct({...newProduct, name: text})}
              />
              <TextInput
                style={[styles.input, { fontSize: getResponsiveFontSize(16) }]}
                placeholder="Price"
                value={newProduct.price.toString()}
                onChangeText={(text) => setNewProduct({...newProduct, price: parseFloat(text) || 0})}
                keyboardType="numeric"
              />
              <TextInput
                style={[styles.input, { fontSize: getResponsiveFontSize(16) }]}
                placeholder="Tax (as decimal, e.g., 0.15 for 15%)"
                value={newProduct.tax.toString()}
                onChangeText={(text) => setNewProduct({...newProduct, tax: parseFloat(text) || 0})}
                keyboardType="numeric"
              />
              <View style={styles.modalButtonsContainer}>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.submitButton]} 
                  onPress={editingProduct ? updateProduct : addProduct}
                >
                  <Text style={[styles.submitButtonText, { fontSize: getResponsiveFontSize(16) }]}>
                    {editingProduct ? 'Update' : 'Add'} Product
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={[styles.modalButton, styles.cancelButton]} 
                  onPress={() => {
                    setModalVisible(false);
                    setEditingProduct(null);
                    setNewProduct({ name: '', price: 0, tax: 0 });
                  }}
                >
                  <Text style={[styles.cancelButtonText, { fontSize: getResponsiveFontSize(16) }]}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Modal>
      <BottomTabs />
      {/* Bottom Navigation */}
      <BottomTabs />
    </SafeAreaView>
  );
};

const styles = ScaledSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '5%',
    paddingVertical: '2%',
    backgroundColor: PRIMARY_COLOR,
    zIndex: 1,
  },
  headerText: {
    fontFamily: 'Poppins_700Bold',
    color: TEXT_COLOR,
  },
  backButton: {
    marginRight: '3%',
  } ,
  addButton: {
    padding: scale(10),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: INPUT_BG,
    borderRadius: moderateScale(10),
    paddingHorizontal: scale(10),
    marginHorizontal: scale(20),
    marginBottom: verticalScale(20),
  },
  searchIcon: {
    marginRight: scale(10),
  },
  searchInput: {
    flex: 1,
    height: verticalScale(40),
    color: TEXT_COLOR,
    fontFamily: 'Poppins_400Regular',
  },
  listContentContainer: {
    paddingHorizontal: '5%',
  },
  productItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: WHITE,
    borderRadius: moderateScale(10),
    padding: scale(15),
    marginBottom: verticalScale(15),
  },
  productInfo: {
    flex: 1,
  },
  productName: {
    fontFamily: 'Poppins_600SemiBold',
    color: TEXT_COLOR,
    marginBottom: verticalScale(5),
  },
  productPrice: {
    fontFamily: 'Poppins_400Regular',
    color: TEXT_COLOR,
  },
  productTax: {
    fontFamily: 'Poppins_400Regular',
    color: TEXT_COLOR,
  },
  productActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  editButton: {
    padding: scale(10),
    marginRight: scale(5),
  },
  deleteButton: {
    padding: scale(10),
    marginLeft: scale(5),
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalScrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: WHITE,
    borderRadius: moderateScale(20),
    padding: scale(20),
  },
  modalTitle: {
    fontFamily: 'Poppins_700Bold',
    color: TEXT_COLOR,
    marginBottom: verticalScale(15),
    textAlign: 'center',
  },
  input: {
    backgroundColor: INPUT_BG,
    borderRadius: moderateScale(10),
    padding: scale(10),
    marginBottom: verticalScale(15),
    color: TEXT_COLOR,
    fontFamily: 'Poppins_400Regular',
  },
  modalButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(15),
  },
  modalButton: {
    flex: 1,
    borderRadius: moderateScale(10),
    padding: scale(15),
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: SECONDARY_COLOR,
    marginRight: scale(5),
  },
  submitButtonText: {
    color: WHITE,
    fontFamily: 'Poppins_600SemiBold',
  },
  cancelButton: {
    backgroundColor: DELETE_COLOR,
    marginLeft: scale(5),
  },
  cancelButtonText: {
    color: WHITE,
    fontFamily: 'Poppins_600SemiBold',
  },
});

export default AllProducts;