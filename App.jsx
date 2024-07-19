import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, View, Button, Alert } from 'react-native';
import RNUpiPayment from 'react-native-upi-payment';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

const PaymentPage = ({ navigation }) => {
  const [amount, setAmount] = useState('');
  const [transactionRef, setTransactionRef] = useState('');

  useEffect(() => {
    const generateTransactionRef = () => 'TRANS_' + Date.now();
    setTransactionRef(generateTransactionRef());
  }, []);

  const handlePayment = () => {
    if (!amount) {
      Alert.alert('Error', 'Please enter a valid amount');
      return;
    }

    RNUpiPayment.initializePayment(
      {
        vpa: '7318114969@freecharge',
        payeeName: 'Ecom Business',
        amount,
        transactionRef,
      },
      successCallback,
      failureCallback
    );
  };

  const successCallback = (data) => {
    navigation.navigate('Success', { data });
  };

  const failureCallback = (data) => {
    navigation.navigate('Failure', { data });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>UPI Payment</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Amount"
        placeholderTextColor="#aaa"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      <Text style={styles.transactionRef}>Transaction Reference: {transactionRef}</Text>
      <Button title="Pay Now" onPress={handlePayment} color="#55AD9B" />
    </View>
  );
};

const SuccessPage = ({ route }) => {
  const { data } = route.params;
  return (
    <View style={styles.resultContainer}>
      <Text style={styles.resultTitle}>Payment Success</Text>
      <Text style={styles.resultText}>{JSON.stringify(data)}</Text>
    </View>
  );
};

const FailurePage = ({ route }) => {
  const { data } = route.params;
  return (
    <View style={styles.resultContainer}>
      <Text style={styles.resultTitle}>Payment Failure</Text>
      <Text style={styles.resultText}>{JSON.stringify(data)}</Text>
    </View>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Payment">
        <Stack.Screen name="Payment" component={PaymentPage} options={{ title: 'Payment' }} />
        <Stack.Screen name="Success" component={SuccessPage} options={{ title: 'Success' }} />
        <Stack.Screen name="Failure" component={FailurePage} options={{ title: 'Failure' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F1F8E8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#55AD9B',
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: '#95D2B3',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    color: 'black',
    backgroundColor: '#D8EFD3',
  },
  transactionRef: {
    fontSize: 16,
    marginBottom: 16,
    color: '#55AD9B',
  },
  resultContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#F1F8E8',
  },
  resultTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#55AD9B',
  },
  resultText: {
    fontSize: 16,
    color: 'black',
  },
});