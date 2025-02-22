import React from 'react';
import { StatusBar, StyleSheet, ScrollView, Dimensions, View } from 'react-native';
import { Colors } from '../assets/AppColors';

const { width, height } = Dimensions.get('screen'); // Corrected typo here

const Container = ({ children }) => {
  return (
    <>
      <StatusBar
        backgroundColor={Colors.appColor} // Background color of the status bar (Android only)
        barStyle="light-content" // Content color (white icons and text)
      /> {/* Moved StatusBar outside ScrollView */}
      <ScrollView contentContainerStyle={styles.container}>
        <View>
          {children} 
        </View>
       
      </ScrollView>
    </>
  );
};

export default Container;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    flexGrow: 1, // Ensure the container takes up available space
  },
});