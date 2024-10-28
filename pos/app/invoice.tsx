import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PRIMARY_COLOR = '#ECDAC3';
const SECONDARY_COLOR = '#B38B6D';
const TEXT_COLOR = '#403D39';
const BUTTON_COLOR = SECONDARY_COLOR;
const BUTTON_TEXT_COLOR = '#FFFFFF';

const InvoiceLayout = () => {
  const [streetName, setStreetName] = useState('');
  const [town, setTown] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [taxPercentage, setTaxPercentage] = useState('');
  const [complimentaryMessage, setComplimentaryMessage] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Invoice Details</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="home-outline" size={20} color={SECONDARY_COLOR} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Street Name"
            placeholderTextColor="#999"
            value={streetName}
            onChangeText={(text) => setStreetName(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="business-outline" size={20} color={SECONDARY_COLOR} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Town"
            placeholderTextColor="#999"
            value={town}
            onChangeText={(text) => setTown(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="location-outline" size={20} color={SECONDARY_COLOR} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="City"
            placeholderTextColor="#999"
            value={city}
            onChangeText={(text) => setCity(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="earth-outline" size={20} color={SECONDARY_COLOR} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Country"
            placeholderTextColor="#999"
            value={country}
            onChangeText={(text) => setCountry(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="calculator-outline" size={20} color={SECONDARY_COLOR} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Tax Percentage"
            placeholderTextColor="#999"
            keyboardType="numeric"
            value={taxPercentage}
            onChangeText={(text) => setTaxPercentage(text)}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="chatbox-outline" size={20} color={SECONDARY_COLOR} style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Complimentary Message"
            placeholderTextColor="#999"
            value={complimentaryMessage}
            onChangeText={(text) => setComplimentaryMessage(text)}
          />
        </View>

        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Update invoice details</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: PRIMARY_COLOR,
  },
  scrollContainer: {
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: TEXT_COLOR,
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Roboto_700Bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#B38B6D',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 1.41,
    elevation: 2,
  },
  input: {
    flex: 1,
    height: 50,
    paddingLeft: 10,
    fontSize: 16,
    color: TEXT_COLOR,
    fontFamily: 'Roboto_400Regular',
  },
  inputIcon: {
    marginRight: 10,
  },
  submitButton: {
    backgroundColor: BUTTON_COLOR,
    paddingVertical: 15,
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3.84,
    elevation: 5,
    marginTop: 20,
  },
  submitButtonText: {
    color: BUTTON_TEXT_COLOR,
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Roboto_500Medium',
  },
});

export default InvoiceLayout;