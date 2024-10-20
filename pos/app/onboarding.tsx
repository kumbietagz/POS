import React from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet, SafeAreaView } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useFonts, Poppins_400Regular, Poppins_600SemiBold, Poppins_700Bold } from '@expo-google-fonts/poppins';

// Defining color constants based on your theme
const PRIMARY_COLOR = '#ECDAC3';
const SECONDARY_COLOR = '#B38B6D';
const TEXT_COLOR = '#403D39';
const BUTTON_COLOR = SECONDARY_COLOR;
const BUTTON_TEXT_COLOR = '#FFFFFF';

export default function Index() {
  let [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.contentContainer}>
        <Text style={styles.title}>Manage Your Business Stress-free</Text>
        <Image source={require("../assets/images/react-logo.png")} style={styles.logo} />
        <Text style={styles.subheading}>With Amaney Nexus, fiscalization is simple, efficient, and designed to keep your business compliant.</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => import('expo-router').then(({ router }) => router.push('/home'))}>
          <Text style={styles.buttonText}>Create an Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => import('expo-router').then(({ router }) => router.push('/home'))}>
          <Text style={styles.buttonText}>I Already Have an Account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    marginTop: 80,
  },
  title: {
    fontFamily: 'Poppins_700Bold',
    fontSize: 26,
    textAlign: 'center',
    color: TEXT_COLOR,
    marginBottom: 20,
  },
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  subheading: {
    fontFamily: 'Poppins_400Regular',
    fontSize: 18,
    textAlign: 'center',
    color: TEXT_COLOR,
    marginBottom: 30,
  },
  buttonContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: BUTTON_COLOR,
    paddingVertical: 15,
    width: '90%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 15,
  },
  buttonText: {
    fontFamily: 'Poppins_600SemiBold',
    color: BUTTON_TEXT_COLOR,
    fontSize: 16,
  },
});
