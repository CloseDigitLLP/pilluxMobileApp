import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoginScreen from './screens/Auth/index'
import EventScreen from './screens/Events/index'
import Navigation from './navigation';
import { Provider } from 'react-redux';
import { persistor, store } from './services/store';
import { PersistGate } from 'redux-persist/integration/react';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <Provider store={store} >
      <PersistGate loading={<ActivityIndicator />} persistor={persistor} >
        <Navigation />
        <Toast
        position='bottom'
        bottomOffset={40}
      />
      </PersistGate>
    </Provider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
