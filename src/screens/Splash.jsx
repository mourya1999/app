import React, {useEffect, useRef} from 'react';
import {Animated, Dimensions, ScrollView, StatusBar, StyleSheet, View} from 'react-native';
import IMG from '../assets/img/logo.png';
import {Colors} from '../assets/AppColors';
import {useNavigation} from '@react-navigation/native';

const {height, width} = Dimensions.get('screen');

const Splash = () => {
  const translateY = useRef(new Animated.Value(height / 2 + 100)).current;
  const navigation = useNavigation();
  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 1500,
      useNativeDriver: true,
    }).start();
  }, [translateY]);

  setTimeout(() => {
    navigation.navigate('Onboarding');
  }, 2000);
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.appColor}  barStyle="light-content"/>
      <Animated.Image
        source={IMG}
        style={[styles.logo, {transform: [{translateY}]}]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.appColor,
  },
  logo: {
    width: 150,
    height: 150,
  },
});

export default Splash;