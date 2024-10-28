import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Platform,
  StatusBar,
  ViewStyle,
  TextStyle,
} from 'react-native';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { Feather } from '@expo/vector-icons';
import { ScaledSheet, scale, moderateScale, verticalScale } from 'react-native-size-matters';
import { useMediaQuery } from 'react-responsive';
import { router } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomTabs from './bottomtabs'

// Color constants
const PRIMARY_COLOR = '#ECDAC3';
const SECONDARY_COLOR = '#B38B6D';
const TEXT_COLOR = '#403D39';
const ICON_COLOR = TEXT_COLOR;
const UNREAD_COLOR = '#FFE6C1';
const BORDER_COLOR = '#D0B89E';

interface Notification {
  id: number;
  message: string;
  isRead: boolean;
}

const Notifications: React.FC = () => {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_700Bold,
  });

  const insets = useSafeAreaInsets();
  const [statusBarHeight, setStatusBarHeight] = useState<number>(0);

  useEffect(() => {
    if (Platform.OS === 'android') {
      setStatusBarHeight(StatusBar.currentHeight || 0);
    }
  }, []);

  const isTabletOrMobileDevice = useMediaQuery({ maxWidth: 1224 });
  const isDesktop = useMediaQuery({ minWidth: 1224 });
  
  const getResponsiveFontSize = (baseSize: number): number => {
    if (isDesktop) return baseSize * 0.7;
    if (isTabletOrMobileDevice) return baseSize * 0.85;
    return baseSize;
  };

  const [viewUnreadOnly, setViewUnreadOnly] = useState<boolean>(false);
  const notifications: Notification[] = [
    { id: 1, message: 'Your payment was successful!', isRead: true },
    { id: 2, message: 'New update available.', isRead: false },
    { id: 3, message: 'Your order has been shipped!', isRead: false },
    { id: 4, message: 'Welcome to our service!', isRead: true },
  ];

  if (!fontsLoaded) {
    return null;
  }

  const filteredNotifications = viewUnreadOnly
    ? notifications.filter(notification => !notification.isRead)
    : notifications;

  const styles = ScaledSheet.create({
    container: {
      flex: 1,
      backgroundColor: PRIMARY_COLOR,
    } as ViewStyle,
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: '5%',
      paddingVertical: '2%',
      marginTop: Platform.OS === 'android' ? statusBarHeight : insets.top,
    } as ViewStyle,
    backButton: {
      marginRight: '3%',
    } as ViewStyle,
    headerText: {
      fontFamily: 'Poppins_700Bold',
      color: TEXT_COLOR,
      flex: 1,
    } as TextStyle,
    filterContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      paddingVertical: verticalScale(10),
    } as ViewStyle,
    filterButton: {
      paddingVertical: verticalScale(8),
      paddingHorizontal: scale(15),
      borderRadius: moderateScale(8),
      borderWidth: 1,
      borderColor: BORDER_COLOR,
      backgroundColor: PRIMARY_COLOR,
    } as ViewStyle,
    activeFilterButton: {
      backgroundColor: SECONDARY_COLOR,
    } as ViewStyle,
    filterButtonText: {
      fontFamily: 'Poppins_500Medium',
      color: TEXT_COLOR,
    } as TextStyle,
    activeFilterText: {
      color: PRIMARY_COLOR,
    } as TextStyle,
    scrollContainer: {
      flexGrow: 1,
      paddingHorizontal: '5%',
      paddingBottom: '10%',
    } as ViewStyle,
    tableRow: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: verticalScale(12),
      paddingHorizontal: scale(12),
      borderBottomWidth: 1,
      borderBottomColor: BORDER_COLOR,
      borderRadius: moderateScale(10),
      backgroundColor: '#FFFFFF',
      marginBottom: verticalScale(8),
    } as ViewStyle,
    lastTableRow: {
      borderBottomWidth: 0,
    } as ViewStyle,
    statusCell: {
      width: '10%',
      alignItems: 'center',
    } as ViewStyle,
    messageCell: {
      flex: 1,
      fontFamily: 'Poppins_400Regular',
      color: TEXT_COLOR,
      marginLeft: '3%',
    } as TextStyle,
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Feather name="arrow-left" size={getResponsiveFontSize(24)} color={ICON_COLOR} />
        </TouchableOpacity>
        <Text style={[styles.headerText, { fontSize: getResponsiveFontSize(20) }]}>Notifications</Text>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          onPress={() => setViewUnreadOnly(false)}
          style={[styles.filterButton, !viewUnreadOnly && styles.activeFilterButton]}
        >
          <Text style={[
            styles.filterButtonText,
            !viewUnreadOnly && styles.activeFilterText,
            { fontSize: getResponsiveFontSize(14) }
          ]}>
            View All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setViewUnreadOnly(true)}
          style={[styles.filterButton, viewUnreadOnly && styles.activeFilterButton]}
        >
          <Text style={[
            styles.filterButtonText,
            viewUnreadOnly && styles.activeFilterText,
            { fontSize: getResponsiveFontSize(14) }
          ]}>
            Unread
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        {filteredNotifications.map((notification, index) => (
          <View
            key={notification.id}
            style={[
              styles.tableRow,
              !notification.isRead && { backgroundColor: UNREAD_COLOR },
              index === filteredNotifications.length - 1 && styles.lastTableRow,
            ]}
          >
            <View style={styles.statusCell}>
              <Feather
                name={notification.isRead ? "check-circle" : "circle"}
                size={getResponsiveFontSize(24)}
                color={notification.isRead ? SECONDARY_COLOR : ICON_COLOR}
              />
            </View>
            <Text style={[styles.messageCell, { fontSize: getResponsiveFontSize(16) }]}>
              {notification.message}
            </Text>
          </View>
        ))}
      </ScrollView>
      {/* Bottom Navigation */}
      <BottomTabs />
    </SafeAreaView>
  );
};

export default Notifications;
