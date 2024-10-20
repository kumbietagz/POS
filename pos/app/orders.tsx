import React, { useState, useRef } from 'react';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TextInput,
  ListRenderItem,
  Keyboard,
  Animated,
  useWindowDimensions,
} from 'react-native';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { Feather } from '@expo/vector-icons';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';

const PRIMARY_COLOR = '#ECDAC3';
const SECONDARY_COLOR = '#B38B6D';
const TEXT_COLOR = '#403D39';
const ICON_COLOR = TEXT_COLOR;
const BUTTON_COLOR = SECONDARY_COLOR;
const BUTTON_TEXT_COLOR = '#FFFFFF';

interface Order {
  id: string;
  date: Date;
  status: string;
  paymentMethod: string;
  total: string;
}

const OrderListingScreen: React.FC = () => {
  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;

  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const [searchActive, setSearchActive] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [statusOpen, setStatusOpen] = useState(false);
  const [statusValue, setStatusValue] = useState<string | null>(null);
  const [statusItems, setStatusItems] = useState([
    { label: 'Completed', value: 'completed' },
    { label: 'Processing', value: 'processing' },
    { label: 'Shipped', value: 'shipped' },
    { label: 'Cancelled', value: 'cancelled' },
  ]);
  const [paymentMethodOpen, setPaymentMethodOpen] = useState(false);
  const [paymentMethodValue, setPaymentMethodValue] = useState<string | null>(null);
  const [paymentMethodItems, setPaymentMethodItems] = useState([
    { label: 'Credit Card', value: 'credit_card' },
    { label: 'PayPal', value: 'paypal' },
    { label: 'Cash', value: 'cash' },
    { label: 'EcoCash', value: 'ecocash' },
  ]);

  // Animation references
  const searchAnimation = useRef(new Animated.Value(0)).current;
  const searchInputRef = useRef<TextInput>(null);
  const headerTextOpacity = useRef(new Animated.Value(1)).current;

  const orders: Order[] = [
    { id: '1001', date: new Date('2023-05-01'), status: 'Completed', paymentMethod: 'Credit Card', total: '$199.99' },
    { id: '1002', date: new Date('2023-05-02'), status: 'Processing', paymentMethod: 'PayPal', total: '$149.50' },
    { id: '1003', date: new Date('2023-05-03'), status: 'Shipped', paymentMethod: 'Cash', total: '$299.99' },
    { id: '1004', date: new Date('2023-05-04'), status: 'Cancelled', paymentMethod: 'Credit Card', total: '$89.99' },
    { id: '1005', date: new Date('2023-05-05'), status: 'Completed', paymentMethod: 'EcoCash', total: '$249.99' },
    { id: '1006', date: new Date('2023-05-06'), status: 'Processing', paymentMethod: 'PayPal', total: '$179.99' },
    { id: '1007', date: new Date('2023-05-07'), status: 'Shipped', paymentMethod: 'Credit Card', total: '$129.99' },
    { id: '1008', date: new Date('2023-05-08'), status: 'Completed', paymentMethod: 'Cash', total: '$219.99' },
  ];

  if (!fontsLoaded) {
    return null;
  }

  const toggleSearch = () => {
    setSearchActive(!searchActive);
    Animated.parallel([
      Animated.timing(searchAnimation, {
        toValue: searchActive ? 0 : 1,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(headerTextOpacity, {
        toValue: searchActive ? 1 : 0,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();

    if (!searchActive) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    } else {
      setSearchText('');
      Keyboard.dismiss();
    }
  };

  const toggleFilter = () => {
    setFilterVisible(!filterVisible);
  };

  const applyFilter = () => {
    setFilterVisible(false);
    console.log('Filters applied:', { startDate, endDate, statusValue, paymentMethodValue });
  };

  const handleDateChange = (
    setDateFunction: React.Dispatch<React.SetStateAction<Date>>,
    setShowPickerFunction: React.Dispatch<React.SetStateAction<boolean>>
  ) => (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowPickerFunction(false);
    if (selectedDate) {
      setDateFunction(selectedDate);
    }
  };

  const onStatusOpen = () => {
    setPaymentMethodOpen(false);
  };

  const onPaymentMethodOpen = () => {
    setStatusOpen(false);
  };

  const renderOrderItem: ListRenderItem<Order> = ({ item }) => (
    <View style={styles({ width, height }).orderItem}>
      <Text style={styles({ width, height }).orderId}>Order #{item.id}</Text>
      <Text style={styles({ width, height }).orderDate}>{item.date.toLocaleDateString()}</Text>
      <Text style={styles({ width, height }).orderStatus}>{item.status}</Text>
      <Text style={styles({ width, height }).orderPayment}>{item.paymentMethod}</Text>
      <Text style={styles({ width, height }).orderTotal}>{item.total}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles({ width, height }).container}>
      <View style={styles({ width, height }).header}>
        <TouchableOpacity style={styles({ width, height }).iconButton}>
          <Feather name="arrow-left" size={24} color={ICON_COLOR} />
        </TouchableOpacity>
        <Animated.Text style={[styles({ width, height }).headerText, { opacity: headerTextOpacity }]}>Orders</Animated.Text>
        <View style={styles({ width, height }).headerRightIcons}>
          <Animated.View style={[styles({ width, height }).searchContainer, { width: searchAnimation.interpolate({ inputRange: [0, 1], outputRange: [40, width * 0.65] as [number, number] }) }]}>
            <TouchableOpacity onPress={toggleSearch}>
              <Feather name="search" size={20} color={ICON_COLOR} />
            </TouchableOpacity>
            <Animated.View style={[styles({ width, height }).inputContainer, { opacity: searchAnimation }]}>
              <TextInput
                ref={searchInputRef}
                style={styles({ width, height }).searchInput}
                placeholder="Search order ID..."
                placeholderTextColor={TEXT_COLOR}
                value={searchText}
                onChangeText={setSearchText}
              />
              <TouchableOpacity onPress={toggleSearch}>
                <Feather name="x" size={20} color={ICON_COLOR} />
              </TouchableOpacity>
            </Animated.View>
          </Animated.View>
          <TouchableOpacity style={styles({ width, height }).iconButton} onPress={toggleFilter}>
            <Feather name="filter" size={24} color={ICON_COLOR} />
          </TouchableOpacity>
        </View>
      </View>

      {filterVisible && (
        <View style={[styles({ width, height }).filterContainer, { zIndex: 2000 }]}>
          <Text style={styles({ width, height }).filterTitle}>Filter Orders</Text>
          <View style={styles({ width, height }).dateContainer}>
            <TouchableOpacity style={styles({ width, height }).dateButton} onPress={() => setShowStartDatePicker(true)}>
              <Text style={styles({ width, height }).dateButtonText}>Start Date: {startDate.toLocaleDateString()}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles({ width, height }).dateButton} onPress={() => setShowEndDatePicker(true)}>
              <Text style={styles({ width, height }).dateButtonText}>End Date: {endDate.toLocaleDateString()}</Text>
            </TouchableOpacity>
          </View>
          {showStartDatePicker && (
            <DateTimePicker
              value={startDate}
              mode="date"
              display="spinner"
              onChange={handleDateChange(setStartDate, setShowStartDatePicker)}
              textColor={TEXT_COLOR}
              themeVariant="light"
            />
          )}
          {showEndDatePicker && (
            <DateTimePicker
              value={endDate}
              mode="date"
              display="spinner"
              onChange={handleDateChange(setEndDate, setShowEndDatePicker)}
              textColor={TEXT_COLOR}
              themeVariant="light"
            />
          )}

          <View style={{ zIndex: 3000, marginBottom: 15 }}>
            <DropDownPicker
              open={statusOpen}
              value={statusValue}
              items={statusItems}
              setOpen={setStatusOpen}
              setValue={setStatusValue}
              setItems={setStatusItems}
              style={styles({ width, height }).dropdown}
              dropDownContainerStyle={styles({ width, height }).dropdownList}
              placeholder="Select status"
              onOpen={onStatusOpen}
              zIndex={3000}
            />
          </View>

          <View style={{ zIndex: 2500 }}>
            <DropDownPicker
              open={paymentMethodOpen}
              value={paymentMethodValue}
              items={paymentMethodItems}
              setOpen={setPaymentMethodOpen}
              setValue={setPaymentMethodValue}
              setItems={setPaymentMethodItems}
              style={styles({ width, height }).dropdown}
              dropDownContainerStyle={styles({ width, height }).dropdownList}
              placeholder="Select payment method"
              onOpen={onPaymentMethodOpen}
              zIndex={2500}
            />
          </View>

          <TouchableOpacity style={styles({ width, height }).applyFilterButton} onPress={applyFilter}>
            <Text style={styles({ width, height }).applyFilterButtonText}>Apply Filters</Text>
          </TouchableOpacity>
        </View>
      )}

      <KeyboardAvoidingView behavior="height" style={{ flex: 1 }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <FlatList<Order>
            data={orders}
            renderItem={renderOrderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles({ width, height }).orderList}
            style={{ flex: 1 }}
          />
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = ({ width, height }: { width: number; height: number }) =>
  StyleSheet.create({
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
      fontSize: width > height ? width * 0.035 : width * 0.05,
      color: TEXT_COLOR,
      position: 'absolute',
      left: 0,
      right: 0,
      textAlign: 'center',
    },
    headerRightIcons: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    searchContainer: {
      height: 40,
      backgroundColor: '#FFFFFF',
      borderRadius: 20,
      marginRight: '1%',
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
      fontSize: width > height ? width * 0.035 : width * 0.05,
      color: TEXT_COLOR,
      marginRight: 10,
    },
    filterContainer: {
      backgroundColor: '#FFFFFF',
      padding: width * 0.05,
      margin: width * 0.05,
      borderRadius: width * 0.01,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: Math.round(width * 0.005) },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    filterTitle: {
      fontFamily: 'Poppins_600SemiBold',
      fontSize: width * 0.04,
      color: TEXT_COLOR,
      marginBottom: width * 0.03,
    },
    dateContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: width * 0.03,
    },
    dateButton: {
      backgroundColor: PRIMARY_COLOR,
      padding: '2%',
      borderRadius: width * 0.01,
      flex: 0.48,
    },
    dateButtonText: {
      fontFamily: 'Poppins_400Regular',
      fontSize: width * 0.04,
      color: TEXT_COLOR,
      textAlign: 'center',
    },
    dropdownContainer: {
      marginBottom: width * 0.03,
    },
    dropdown: {
      backgroundColor: PRIMARY_COLOR,
      borderColor: SECONDARY_COLOR,
      borderRadius: width * 0.01,
    },
    dropdownList: {
      backgroundColor: PRIMARY_COLOR,
      borderColor: SECONDARY_COLOR,
      maxHeight: 150,
    },
    applyFilterButton: {
      backgroundColor: BUTTON_COLOR,
      padding: '3%',
      borderRadius: width * 0.01,
      alignItems: 'center',
      marginTop: '2%',
    },
    applyFilterButtonText: {
      fontFamily: 'Poppins_600SemiBold',
      fontSize: width * 0.04,
      color: BUTTON_TEXT_COLOR,
    },
    orderList: {
      paddingHorizontal: '5%',
      paddingBottom: '20%',
    },
    orderItem: {
      backgroundColor: '#FFFFFF',
      borderRadius: width * 0.01,
      padding: '4%',
      marginBottom: '4%',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    orderId: {
      fontFamily: 'Poppins_600SemiBold',
      fontSize: width * 0.04,
      color: TEXT_COLOR,
    },
    orderDate: {
      fontFamily: 'Poppins_400Regular',
      fontSize: width * 0.04,
      color: TEXT_COLOR,
    },
    orderStatus: {
      fontFamily: 'Poppins_400Regular',
      fontSize: width * 0.04,
      color: SECONDARY_COLOR,
    },
    orderPayment: {
      fontFamily: 'Poppins_400Regular',
      fontSize: width * 0.04,
      color: TEXT_COLOR,
    },
    orderTotal: {
      fontFamily: 'Poppins_600SemiBold',
      fontSize: width * 0.04,
      color: SECONDARY_COLOR,
      marginTop: '2%',
    },
  });

export default OrderListingScreen;
