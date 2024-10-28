import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
  StatusBar,
} from 'react-native';
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
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
const BUTTON_COLOR = SECONDARY_COLOR;
const BUTTON_TEXT_COLOR = '#FFFFFF';
const DISABLED_COLOR = '#D3D3D3';
const ACTIVE_BUTTON_COLOR = '#4CAF50';

const SettingsTab: React.FC = () => {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  const insets = useSafeAreaInsets();
  const [statusBarHeight, setStatusBarHeight] = useState(0);

  useEffect(() => {
    if (Platform.OS === 'android') {
      setStatusBarHeight(StatusBar.currentHeight || 0);
    }
  }, []);

  const isTabletOrMobileDevice = useMediaQuery({ maxWidth: 1224 });
  const isDesktop = useMediaQuery({ minWidth: 1224 });
  
  const getResponsiveFontSize = (baseSize: number) => {
    if (isDesktop) return baseSize * 0.7;
    if (isTabletOrMobileDevice) return baseSize * 0.85;
    return baseSize;
  };

  const [dayNumber, setDayNumber] = useState(1);
  const [isDayOpen, setIsDayOpen] = useState(false);
  const [isDayClosed, setIsDayClosed] = useState(true);

  if (!fontsLoaded) {
    return null;
  }

  const handleOpenDay = () => {
    if (isDayClosed) {
      setIsDayOpen(true);
      setIsDayClosed(false);
    }
  };

  const handleCloseDay = () => {
    if (isDayOpen) {
      setIsDayOpen(false);
      setIsDayClosed(true);
      setDayNumber((prevDayNumber) => prevDayNumber + 1);
    }
  };

  const styles = ScaledSheet.create({
    container: {
      flex: 1,
      backgroundColor: PRIMARY_COLOR,
    },
    content: {
      flex: 1,
      paddingHorizontal: '5%',
      paddingTop: verticalScale(20),
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: '5%',
      paddingVertical: '2%',
      marginTop: Platform.OS === 'android' ? statusBarHeight : insets.top,
    },
    backButton: {
      marginRight: '3%',
    },
    headerText: {
      fontFamily: 'Poppins_700Bold',
      color: TEXT_COLOR,
      flex: 1,
    },
    fiscalDayRow: {
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: '2%',
      borderBottomWidth: 1,
      borderBottomColor: SECONDARY_COLOR,
    },
    fiscalDayText: {
      fontFamily: 'Poppins_600SemiBold',
      color: TEXT_COLOR,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: verticalScale(30),
    },
    button: {
      backgroundColor: BUTTON_COLOR,
      paddingVertical: verticalScale(12),
      paddingHorizontal: scale(20),
      borderRadius: moderateScale(8),
      flex: 0.48,
      alignItems: 'center',
    },
    buttonDisabled: {
      backgroundColor: DISABLED_COLOR,
    },
    buttonActive: {
      backgroundColor: ACTIVE_BUTTON_COLOR,
    },
    buttonText: {
      fontFamily: 'Poppins_600SemiBold',
      color: BUTTON_TEXT_COLOR,
    },
    settingRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: '#FFFFFF',
      paddingVertical: verticalScale(15),
      paddingHorizontal: scale(15),
      borderRadius: moderateScale(8),
      marginBottom: verticalScale(10),
      shadowColor: '#000',
      shadowOffset: { width: 0, height: scale(2) },
      shadowOpacity: 0.1,
      shadowRadius: scale(3.84),
      elevation: 2,
    },
    settingText: {
      fontFamily: 'Poppins_400Regular',
      color: TEXT_COLOR,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Feather name="arrow-left" size={getResponsiveFontSize(24)} color={ICON_COLOR} />
        </TouchableOpacity>
        <Text style={[styles.headerText, { fontSize: getResponsiveFontSize(20) }]}>Settings</Text>
      </View>

      <View style={styles.fiscalDayRow}>
        <Text style={[styles.fiscalDayText, { fontSize: getResponsiveFontSize(16) }]}>Fiscal Day: {dayNumber}</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, !isDayClosed ? styles.buttonDisabled : null]}
            onPress={handleOpenDay}
            disabled={!isDayClosed}
          >
            <Text style={[styles.buttonText, { fontSize: getResponsiveFontSize(16) }]}>Open Day</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              isDayOpen ? styles.buttonActive : null,
              !isDayOpen ? styles.buttonDisabled : null,
            ]}
            onPress={handleCloseDay}
            disabled={!isDayOpen}
          >
            <Text style={[styles.buttonText, { fontSize: getResponsiveFontSize(16) }]}>Close Day</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.settingRow} onPress={() => router.push('/accountsettings')}>
          <Text style={[styles.settingText, { fontSize: getResponsiveFontSize(16) }]}>Account Settings</Text>
          <Feather name="chevron-right" size={getResponsiveFontSize(24)} color={ICON_COLOR} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingRow}>
          <Text style={[styles.settingText, { fontSize: getResponsiveFontSize(16) }]}>Notifications</Text>
          <Feather name="chevron-right" size={getResponsiveFontSize(24)} color={ICON_COLOR} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingRow}>
          <Text style={[styles.settingText, { fontSize: getResponsiveFontSize(16) }]}>Privacy Settings</Text>
          <Feather name="chevron-right" size={getResponsiveFontSize(24)} color={ICON_COLOR} />
        </TouchableOpacity>
      </ScrollView>
      {/* Bottom Navigation */}
      <BottomTabs />
    </SafeAreaView>
  );
};

export default SettingsTab;