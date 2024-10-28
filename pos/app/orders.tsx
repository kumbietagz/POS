import React, { useState, useEffect } from 'react';
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ViewStyle,
  Platform,
  StatusBar,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { ScaledSheet, scale, moderateScale, verticalScale } from 'react-native-size-matters';
import { useMediaQuery } from 'react-responsive';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import BottomTabs from './bottomtabs'

// Color constants
const PRIMARY_COLOR = '#ECDAC3';
const SECONDARY_COLOR = '#B38B6D';
const TEXT_COLOR = '#403D39';
const ICON_COLOR = TEXT_COLOR;
const INPUT_BG = '#F3EAE3';
const WHITE = '#FFFFFF';
const DELETE_COLOR = '#FF6B6B';
const FILTER_ICON_COLOR = SECONDARY_COLOR;

interface Order {
  id: string;
  date: string;
  status: string;
  paymentMethod: string;
  total: string;
}

const OrderListingScreen: React.FC = () => {
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

  const [orders, setOrders] = useState<Order[]>([
    { id: '1001', date: '2023-05-01', status: 'Completed', paymentMethod: 'Credit Card', total: '$199.99' },
    { id: '1002', date: '2023-05-02', status: 'Processing', paymentMethod: 'PayPal', total: '$149.50' },
    { id: '1003', date: '2023-05-03', status: 'Shipped', paymentMethod: 'Cash', total: '$299.99' },
    { id: '1004', date: '2023-05-04', status: 'Cancelled', paymentMethod: 'Credit Card', total: '$89.99' },
    { id: '1005', date: '2023-05-05', status: 'Completed', paymentMethod: 'EcoCash', total: '$249.99' },
  ]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterVisible, setFilterVisible] = useState(false);
  const [statusFilters, setStatusFilters] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const filteredOrders = orders.filter(order => {
    const orderDate = new Date(order.date);
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilters.length === 0 || statusFilters.includes(order.status);
    const matchesStartDate = !startDate || orderDate >= startDate;
    const matchesEndDate = !endDate || orderDate <= endDate;
    return matchesSearch && matchesStatus && matchesStartDate && matchesEndDate;
  });

  const toggleFilter = () => {
    setFilterVisible(!filterVisible);
  };

  const applyFilter = (status: string) => {
    setStatusFilters(prevFilters =>
      prevFilters.includes(status)
        ? prevFilters.filter(filter => filter !== status)
        : [...prevFilters, status]
    );
  };

  const handleStartDateChange = (event: any, selectedDate?: Date) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const handleEndDateChange = (event: any, selectedDate?: Date) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  const renderOrderItem = ({ item }: { item: Order }) => (
    <View style={styles.orderItem}>
      <View style={styles.orderInfo}>
        <Text style={[styles.orderId, { fontSize: getResponsiveFontSize(18) }]}>Order #{item.id}</Text>
        <Text style={[styles.orderDate, { fontSize: getResponsiveFontSize(14) }]}>Date: {item.date}</Text>
        <Text style={[styles.orderStatus, { fontSize: getResponsiveFontSize(14) }]}>Status: {item.status}</Text>
        <Text style={[styles.orderPayment, { fontSize: getResponsiveFontSize(14) }]}>Payment: {item.paymentMethod}</Text>
        <Text style={[styles.orderTotal, { fontSize: getResponsiveFontSize(14) }]}>Total: {item.total}</Text>
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
        <Text style={[styles.headerText, { fontSize: getResponsiveFontSize(20) }]}>All Orders</Text>
        <TouchableOpacity onPress={toggleFilter} style={styles.filterButton}>
          <Ionicons name="filter-outline" size={getResponsiveFontSize(20)} color={TEXT_COLOR} />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={getResponsiveFontSize(20)} color={TEXT_COLOR} style={styles.searchIcon} />
        <TextInput
          style={[styles.searchInput, { fontSize: getResponsiveFontSize(16) }]}
          placeholder="Search orders..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={TEXT_COLOR}
        />
      </View>

      {filterVisible && (
        <View style={[styles.filterContainer, { width: screenWidth * 0.9, maxWidth: 600 }]}>
          <TouchableOpacity onPress={() => applyFilter('Completed')} style={styles.filterOption}>
            <Text style={styles.filterText}>Completed</Text>
            {statusFilters.includes('Completed') && <Ionicons name="checkmark" size={getResponsiveFontSize(20)} color={FILTER_ICON_COLOR} />}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => applyFilter('Processing')} style={styles.filterOption}>
            <Text style={styles.filterText}>Processing</Text>
            {statusFilters.includes('Processing') && <Ionicons name="checkmark" size={getResponsiveFontSize(20)} color={FILTER_ICON_COLOR} />}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => applyFilter('Shipped')} style={styles.filterOption}>
            <Text style={styles.filterText}>Shipped</Text>
            {statusFilters.includes('Shipped') && <Ionicons name="checkmark" size={getResponsiveFontSize(20)} color={FILTER_ICON_COLOR} />}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => applyFilter('Cancelled')} style={styles.filterOption}>
            <Text style={styles.filterText}>Cancelled</Text>
            {statusFilters.includes('Cancelled') && <Ionicons name="checkmark" size={getResponsiveFontSize(20)} color={FILTER_ICON_COLOR} />}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={styles.filterOption}>
            <Text style={styles.filterText}>Start Date: {startDate ? startDate.toLocaleDateString() : 'Not set'}</Text>
            {startDate && <Ionicons name="calendar-outline" size={getResponsiveFontSize(20)} color={FILTER_ICON_COLOR} />}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setShowEndDatePicker(true)} style={styles.filterOption}>
            <Text style={styles.filterText}>End Date: {endDate ? endDate.toLocaleDateString() : 'Not set'}</Text>
            {endDate && <Ionicons name="calendar-outline" size={getResponsiveFontSize(20)} color={FILTER_ICON_COLOR} />}
          </TouchableOpacity>
        </View>
      )}

      {showStartDatePicker && (
        <DateTimePicker
          value={startDate || new Date()}
          mode="date"
          display="default"
          onChange={handleStartDateChange}
          textColor={TEXT_COLOR}
          accentColor={SECONDARY_COLOR}
        />
      )}

      {showEndDatePicker && (
        <DateTimePicker
          value={endDate || new Date()}
          mode="date"
          display="default"
          onChange={handleEndDateChange}
          textColor={TEXT_COLOR}
          accentColor={SECONDARY_COLOR}
        />
      )}

      <FlatList
        data={filteredOrders}
        renderItem={renderOrderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContentContainer}
      />
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
  filterButton: {
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
  filterContainer: {
    backgroundColor: WHITE,
    padding: scale(10),
    marginHorizontal: scale(20),
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(10),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  filterOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(10),
  },
  filterText: {
    fontFamily: 'Poppins_400Regular',
    color: TEXT_COLOR,
    fontSize: moderateScale(16),
  },
  listContentContainer: {
    paddingHorizontal: '5%',
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: WHITE,
    borderRadius: moderateScale(10),
    padding: scale(15),
    marginBottom: verticalScale(15),
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    fontFamily: 'Poppins_600SemiBold',
    color: TEXT_COLOR,
    marginBottom: verticalScale(5),
  },
  orderDate: {
    fontFamily: 'Poppins_400Regular',
    color: TEXT_COLOR,
  },
  orderStatus: {
    fontFamily: 'Poppins_400Regular',
    color: TEXT_COLOR,
  },
  orderPayment: {
    fontFamily: 'Poppins_400Regular',
    color: TEXT_COLOR,
  },
  orderTotal: {
    fontFamily: 'Poppins_600SemiBold',
    color: TEXT_COLOR,
    marginTop: verticalScale(5),
  },
  backButton: {
    marginRight: '3%',
  } as ViewStyle,
});

export default OrderListingScreen;
