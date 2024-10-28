import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    SafeAreaView,
    KeyboardAvoidingView,
    ScrollView,
    TouchableWithoutFeedback,
    Keyboard,
    StatusBar,
    Platform,
  } from 'react-native';
  import { useState, useEffect } from 'react';
  import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';
  import { Feather } from '@expo/vector-icons';
  import DropDownPicker from 'react-native-dropdown-picker';
  import { useMediaQuery } from 'react-responsive';
  import { useSafeAreaInsets } from 'react-native-safe-area-context';
  import BottomTabs from './bottomtabs'

  // Get the device dimensions for responsive design
  const { width, height } = Dimensions.get('window');
  
  // Defining color constants based on your theme
  const PRIMARY_COLOR = '#ECDAC3';
  const SECONDARY_COLOR = '#B38B6D';
  const TEXT_COLOR = '#403D39';
  const ICON_COLOR = TEXT_COLOR;
  const BUTTON_COLOR = SECONDARY_COLOR;
  const INPUT_BACKGROUND_COLOR = '#F3EAE3';
  const BUTTON_TEXT_COLOR = PRIMARY_COLOR;
  
  const AccountSettings = () => {
    const [paymentOpen, setPaymentOpen] = useState(false);
    const [selectedPaymentType, setSelectedPaymentType] = useState('Cash');
    const [paymentTypes, setPaymentTypes] = useState([
      { label: 'Cash', value: 'Cash' },
      { label: 'Swipe', value: 'Swipe' },
      { label: 'EcoCash', value: 'EcoCash' },
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
  
    if (!fontsLoaded) {
      return null;
    }
  
    return (
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView behavior="height" style={styles.container}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={[styles.content, { marginTop: Platform.OS === 'android' ? statusBarHeight : insets.top }]}>
              <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backButton}>
                  <Feather name="arrow-left" size={getResponsiveFontSize(24)} color={ICON_COLOR} />
                </TouchableOpacity>
                <Text style={[styles.headerText, { fontSize: getResponsiveFontSize(20) }]}>Account Settings</Text>
              </View>
  
              <ScrollView
                contentContainerStyle={styles.scrollContainer}
                bounces={false}
                scrollEnabled={!paymentOpen}
              >
                <View style={styles.formContainer}>
                  {[
                    'Company Name',
                    'Company Address',
                    'Receipt Header',
                    'Receipt Footer',
                    'Cashier Name',
                    'Device Id',
                    'TIN number',
                  ].map((placeholder) => (
                    <TextInput
                      key={placeholder}
                      style={[styles.input, { fontSize: getResponsiveFontSize(16) }]}
                      placeholder={placeholder}
                      placeholderTextColor={TEXT_COLOR}
                    />
                  ))}
                  <View style={styles.inputDropdownContainer}>
                    <Text style={[styles.dropdownLabel, { fontSize: getResponsiveFontSize(16) }]}>Payment Type</Text>
                    <DropDownPicker
                      open={paymentOpen}
                      value={selectedPaymentType}
                      items={paymentTypes}
                      setOpen={setPaymentOpen}
                      setValue={setSelectedPaymentType}
                      setItems={setPaymentTypes}
                      style={styles.dropdownPicker}
                      containerStyle={styles.pickerWrapper}
                      dropDownContainerStyle={styles.dropDownContainer}
                      textStyle={{
                        fontFamily: 'Poppins_400Regular',
                        fontSize: getResponsiveFontSize(16),
                        color: TEXT_COLOR,
                      }}
                      placeholderStyle={{
                        color: TEXT_COLOR,
                      }}
                      listMode="SCROLLVIEW"
                    />
                  </View>
                </View>
  
                <TouchableOpacity style={styles.saveButton}>
                  <Text style={[styles.saveButtonText, { fontSize: getResponsiveFontSize(18) }]}>Save Settings</Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
        {/* Bottom Navigation */}
      <BottomTabs />
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: PRIMARY_COLOR,
    },
    content: {
      flex: 1,
    },
    scrollContainer: {
      flexGrow: 1,
      paddingBottom: '5%',
    },
    headerContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: '5%',
      paddingVertical: '2%',
    },
    backButton: {
      marginRight: '3%',
    },
    headerText: {
      fontFamily: 'Poppins_700Bold',
      color: TEXT_COLOR,
    },
    formContainer: {
      paddingHorizontal: '5%',
      marginTop: '2%',
      width: '100%',
      alignItems: 'center',
    },
    input: {
      backgroundColor: INPUT_BACKGROUND_COLOR,
      borderRadius: 10,
      paddingVertical: '2%',
      paddingHorizontal: '4%',
      marginBottom: '3%',
      fontFamily: 'Poppins_400Regular',
      color: TEXT_COLOR,
      width: '100%',
      maxWidth: 400,
    },
    inputDropdownContainer: {
      marginBottom: '4%',
      zIndex: 1000,
      width: '100%',
      maxWidth: 400,
    },
    dropdownLabel: {
      fontFamily: 'Poppins_600SemiBold',
      color: TEXT_COLOR,
      marginBottom: '1%',
    },
    pickerWrapper: {
      marginBottom: '2%',
    },
    dropdownPicker: {
      backgroundColor: INPUT_BACKGROUND_COLOR,
      borderRadius: 10,
      borderColor: '#B38B6D',
    },
    dropDownContainer: {
      backgroundColor: INPUT_BACKGROUND_COLOR,
      borderColor: '#B38B6D',
    },
    saveButton: {
      backgroundColor: BUTTON_COLOR,
      paddingVertical: '2%',
      marginHorizontal: '5%',
      marginTop: '6%',
      borderRadius: 10,
      alignItems: 'center',
      maxHeight: 60,
      width: '90%',
      maxWidth: 400,
      alignSelf: 'center',
    },
    saveButtonText: {
      fontFamily: 'Poppins_600SemiBold',
      color: BUTTON_TEXT_COLOR,
    },
  });
  
  export default AccountSettings;