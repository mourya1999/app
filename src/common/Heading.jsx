import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Colors } from '../assets/AppColors';
import { useNavigation } from '@react-navigation/native';
import tailwind from 'twrnc';
import SpaceBetween from './SpaceBetween';
import Octicons from "react-native-vector-icons/Octicons"

const Heading = ({ heading, leftIcon, rightAction }) => {
  const navigation = useNavigation()
  return (
    <>
      <StatusBar backgroundColor={Colors.appColor} barStyle={"light-content"} />
      <SpaceBetween style={tailwind`bg-[#1E9891] border-0 rounded-bl-2xl rounded-br-2xl px-5 py-2`}>
        {leftIcon ?
          <TouchableOpacity onPress={() => navigation.goBack()} >
            <Octicons name="arrow-left" size={24} color={"#fff"} style={tailwind`pt-3`} />
          </TouchableOpacity> : <View>{leftIcon}</View>}
        {heading &&
          <Text style={styles.headingText}>{heading}</Text>}
        {rightAction &&
          <View>
            {rightAction}
          </View>
          }
      </SpaceBetween>

    </>
  );
};

export default Heading;

const styles = StyleSheet.create({
  headingText: {
    fontFamily: 'Poppins-Medium',
    color: "#fff",
    textAlign: 'center',
    fontWeight: '700',
    fontSize: 18,
  },
});
