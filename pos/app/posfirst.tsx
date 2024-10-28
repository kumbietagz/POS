import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { useMediaQuery } from 'react-responsive';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomTabs from './bottomtabs';

const { width, height } = Dimensions.get('window');

const COLORS = {
  PRIMARY: '#ECDAC3',
  SECONDARY: '#B38B6D',
  TEXT: '#403D39',
  INPUT_BG: '#F3EAE3',
  WHITE: '#FFFFFF',
};

interface Item {
  id: string;
  name: string;
  quantity: number;
  rate: number;
}

const PosFirst = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItems, setSelectedItems] = useState<Item[]>([
    { id: '1', name: 'Item 1', quantity: 2, rate: 10.99 },
    { id: '2', name: 'Item 2', quantity: 1, rate: 15.99 },
  ]);

  const insets = useSafeAreaInsets();
  const [statusBarHeight, setStatusBarHeight] = useState(0);

  useEffect(() => {
    if (Platform.OS === 'android') {
      setStatusBarHeight(StatusBar.currentHeight || 0);
    }
  }, []);

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  // Media query breakpoints
  const isTabletOrDesktop = useMediaQuery({ minWidth: 768 });
  const isLargeDesktop = useMediaQuery({ minWidth: 1224 });

  // Limit font size scaling and button/input sizing on larger screens
  const getResponsiveFontSize = (fontSize: number) => {
    if (isLargeDesktop) return fontSize * 0.7;
    if (isTabletOrDesktop) return fontSize * 0.85;
    return fontSize;
  };

  const calculateSubtotal = () => {
    return selectedItems.reduce((sum, item) => sum + item.quantity * item.rate, 0);
  };

  const calculateTax = () => {
    return calculateSubtotal() * 0.15; // Assuming 15% tax
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax();
  };

  const updateItemQuantity = (id: string, increment: number) => {
    setSelectedItems(prevItems =>
      prevItems.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + increment) }
          : item
      )
    );
  };

  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.itemContainer}>
      <Text style={[styles.itemName, { fontSize: getResponsiveFontSize(14) }]}>{item.name}</Text>
      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => updateItemQuantity(item.id, -1)}>
          <Ionicons name="remove-circle-outline" size={getResponsiveFontSize(24)} color={COLORS.SECONDARY} />
        </TouchableOpacity>
        <Text style={[styles.quantityText, { fontSize: getResponsiveFontSize(14) }]}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => updateItemQuantity(item.id, 1)}>
          <Ionicons name="add-circle-outline" size={getResponsiveFontSize(24)} color={COLORS.SECONDARY} />
        </TouchableOpacity>
      </View>
      <Text style={[styles.itemRate, { fontSize: getResponsiveFontSize(14) }]}>${item.rate.toFixed(2)}</Text>
      <Text style={[styles.itemTotal, { fontSize: getResponsiveFontSize(14) }]}>${(item.quantity * item.rate).toFixed(2)}</Text>
    </View>
  );

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView behavior="height" style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={[styles.content, { marginTop: Platform.OS === 'android' ? statusBarHeight : insets.top, marginBottom: height * 0.1 }]}>
            <View style={styles.header}>
              <TouchableOpacity style={styles.backButton}>
                <Feather name="arrow-left" size={getResponsiveFontSize(24)} color={COLORS.TEXT} />
              </TouchableOpacity>
              <Text style={[styles.greeting, { fontSize: getResponsiveFontSize(20) }]}>Hi, Chido</Text>
              <TouchableOpacity>
                <Ionicons name="notifications-outline" size={getResponsiveFontSize(24)} color={COLORS.TEXT} />
              </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
              <Ionicons name="search-outline" size={getResponsiveFontSize(20)} color={COLORS.TEXT} style={styles.searchIcon} />
              <TextInput
                style={[styles.searchInput, { fontSize: getResponsiveFontSize(16) }]}
                placeholder="Search items..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                placeholderTextColor={COLORS.TEXT}
              />
            </View>

            <FlatList
              data={selectedItems}
              renderItem={renderItem}
              keyExtractor={(item: Item) => item.id}
              style={styles.itemList}
              ListHeaderComponent={
                <View style={styles.listHeader}>
                  <Text style={[styles.headerText, { fontSize: getResponsiveFontSize(14) }]}>Item</Text>
                  <Text style={[styles.headerText, { fontSize: getResponsiveFontSize(14) }]}>Qty</Text>
                  <Text style={[styles.headerText, { fontSize: getResponsiveFontSize(14) }]}>Rate</Text>
                  <Text style={[styles.headerText, { fontSize: getResponsiveFontSize(14) }]}>Total</Text>
                </View>
              }
            />

            <View style={styles.summaryContainer}>
              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, { fontSize: getResponsiveFontSize(16) }]}>Subtotal:</Text>
                <Text style={[styles.summaryValue, { fontSize: getResponsiveFontSize(16) }]}>${calculateSubtotal().toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, { fontSize: getResponsiveFontSize(16) }]}>Tax (15%):</Text>
                <Text style={[styles.summaryValue, { fontSize: getResponsiveFontSize(16) }]}>${calculateTax().toFixed(2)}</Text>
              </View>
              <View style={styles.summaryRow}>
                <Text style={[styles.summaryLabel, { fontSize: getResponsiveFontSize(16) }]}>Total:</Text>
                <Text style={[styles.summaryValue, { fontSize: getResponsiveFontSize(16) }]}>${calculateTotal().toFixed(2)}</Text>
              </View>
            </View>

            <TouchableOpacity style={styles.checkoutButton}>
              <Text style={[styles.checkoutButtonText, { fontSize: getResponsiveFontSize(18) }]}>Proceed to Checkout</Text>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
      {/* Bottom Navigation */}
      <View style={styles.bottomTabsContainer}>
        <BottomTabs />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.PRIMARY,
  },
  content: {
    flex: 1,
    padding: width * 0.04,
  },
  bottomTabsContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: COLORS.PRIMARY,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    paddingVertical: '2%',
    alignItems: 'center',
    marginBottom: height * 0.02,
  },
  backButton: {
    marginRight: '3%',
  },
  greeting: {
    fontFamily: 'Poppins_700Bold',
    color: COLORS.TEXT,
    flex: 1,
    textAlign: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.INPUT_BG,
    borderRadius: 10,
    paddingHorizontal: width * 0.03,
    marginBottom: height * 0.02,
  },
  searchIcon: {
    marginRight: width * 0.02,
  },
  searchInput: {
    flex: 1,
    height: height * 0.05,
    color: COLORS.TEXT,
    fontFamily: 'Poppins_400Regular',
  },
  itemList: {
    flex: 1,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: height * 0.01,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.SECONDARY,
  },
  headerText: {
    fontFamily: 'Poppins_600SemiBold',
    color: COLORS.TEXT,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: height * 0.015,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.INPUT_BG,
  },
  itemName: {
    flex: 2,
    color: COLORS.TEXT,
    fontFamily: 'Poppins_400Regular',
  },
  quantityContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  quantityText: {
    color: COLORS.TEXT,
    fontFamily: 'Poppins_400Regular',
    marginHorizontal: width * 0.02,
  },
  itemRate: {
    flex: 1,
    textAlign: 'right',
    color: COLORS.TEXT,
    fontFamily: 'Poppins_400Regular',
  },
  itemTotal: {
    flex: 1,
    textAlign: 'right',
    color: COLORS.TEXT,
    fontFamily: 'Poppins_600SemiBold',
  },
  summaryContainer: {
    marginTop: height * 0.02,
    borderTopWidth: 1,
    borderTopColor: COLORS.SECONDARY,
    paddingTop: height * 0.02,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: height * 0.01,
  },
  summaryLabel: {
    color: COLORS.TEXT,
    fontFamily: 'Poppins_400Regular',
  },
  summaryValue: {
    color: COLORS.TEXT,
    fontFamily: 'Poppins_600SemiBold',
  },
  checkoutButton: {
    backgroundColor: COLORS.SECONDARY,
    paddingVertical: height * 0.02,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: height * 0.02,
  },
  checkoutButtonText: {
    color: COLORS.WHITE,
    fontFamily: 'Poppins_600SemiBold',
  },
});

export default PosFirst;