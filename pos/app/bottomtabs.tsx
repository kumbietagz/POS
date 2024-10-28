import React from 'react';
import { View, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';



import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const { width } = Dimensions.get('window');

const PRIMARY_COLOR = '#ECDAC3';
const SECONDARY_COLOR = '#B38B6D';
const TEXT_COLOR = '#403D39';
const CARD_BACKGROUND_COLOR = '#F3EAE3';

const BottomTabs = () => {
  return (
    <View style={styles.bottomNav}>
    {/* Home Tab */}
    <TouchableOpacity style={styles.navItem}  onPress={() => router.push('/posfirst')}>
      <Ionicons name="home" size={28} color={TEXT_COLOR} />
    </TouchableOpacity>

    {/* All Products Tab */}
    <TouchableOpacity style={styles.navItem}>
      <Ionicons name="pricetags" size={28} color={TEXT_COLOR} />
    </TouchableOpacity>

    {/* Dashboard (Analytics) Tab */}
    <TouchableOpacity style={styles.navItem}  onPress={() => router.push('/home')}>
      <MaterialIcons name="analytics" size={28} color={TEXT_COLOR} />
    </TouchableOpacity>

    {/* Settings Tab */}
    <TouchableOpacity style={styles.navItem} onPress={() => router.push('/settings')}>
      <Ionicons name="settings" size={28} color={TEXT_COLOR} />
    </TouchableOpacity>
  </View>
  );   
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: verticalScale(10),
    backgroundColor: CARD_BACKGROUND_COLOR,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(10),
  },
});

export default BottomTabs;
