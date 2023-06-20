import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoginScreen from './screens/Auth/index' 
import EventScreen from './screens/Events/index'
import ExamPlace from './screens/Exams/place';
import ExamReadyStudent from './screens/Exams';
import ExamHours from './screens/Exams/hours';
import StepedStudent from './screens/StespWorked';

export default function App() {
  return (
    // <LoginScreen></LoginScreen>
    <EventScreen></EventScreen>
    // <StepedStudent />
    // <ExamHours />
    // <ExamPlace />
    // <ExamReadyStudent />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    display:'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
