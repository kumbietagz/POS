import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, SafeAreaView, ScrollView } from 'react-native';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
import { Feather } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// Defining color constants based on your theme
const PRIMARY_COLOR = '#ECDAC3';
const SECONDARY_COLOR = '#B38B6D';
const TEXT_COLOR = '#403D39';
const ICON_COLOR = TEXT_COLOR;
const UNREAD_COLOR = '#FFE6C1';
const BORDER_COLOR = '#D0B89E';

const NotificationsScreen = () => {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const [viewUnreadOnly, setViewUnreadOnly] = useState(false);
  const notifications = [
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton}>
          <Feather name="arrow-left" size={24} color={ICON_COLOR} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Notifications</Text>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          onPress={() => setViewUnreadOnly(false)}
          style={[styles.filterButton, !viewUnreadOnly && styles.activeFilterButton]}
        >
          <Text style={styles.filterButtonText}>View All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setViewUnreadOnly(true)}
          style={[styles.filterButton, viewUnreadOnly && styles.activeFilterButton]}
        >
          <Text style={styles.filterButtonText}>Unread</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.tableContainer}>
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
                size={20} 
                color={notification.isRead ? SECONDARY_COLOR : ICON_COLOR} 
              />
            </View>
            <Text style={styles.messageCell}>{notification.message}</Text>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: width * 0.05,
  },
  backButton: {
    marginRight: width * 0.03,
  },
  headerText: {
    fontFamily: 'Poppins_700Bold',
    fontSize: width * 0.05,
    color: TEXT_COLOR,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: width * 0.03,
  },
  filterButton: {
    paddingVertical: width * 0.02,
    paddingHorizontal: width * 0.05,
    backgroundColor: PRIMARY_COLOR,
    borderRadius: width * 0.02,
  },
  activeFilterButton: {
    backgroundColor: SECONDARY_COLOR,
  },
  filterButtonText: {
    fontFamily: 'Poppins_600SemiBold',
    color: TEXT_COLOR,
    fontSize: width * 0.04,
  },
  tableContainer: {
    flex: 1,
    marginHorizontal: width * 0.05,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: width * 0.03,
    borderBottomWidth: 1,
    borderBottomColor: BORDER_COLOR,
  },
  lastTableRow: {
    borderBottomWidth: 0,
  },
  statusCell: {
    width: width * 0.1,
    alignItems: 'center',
  },
  messageCell: {
    flex: 1,
    fontFamily: 'Poppins_400Regular',
    fontSize: width * 0.04,
    color: TEXT_COLOR,
    marginLeft: width * 0.02,
  },
});

export default NotificationsScreen;