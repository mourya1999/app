import React, { useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import tailwind from 'twrnc';
import SpaceBetween from '../../common/SpaceBetween';
import { Colors } from '../../assets/AppColors';
import Recent from './Recent';
import Completed from './Completed';
import Cancelled from './Cancelled';
import Ongoing from './Ongoing';
import Heading from '../../common/Heading';

const Orders = () => {
  const [activeIndex, setActiveIndex] = useState('0');
  return (
    <>
      {/* <StatusBar
        backgroundColor={Colors.appColor} // Background color of the status bar (Android only)
        barStyle="light-content" // Content color (white icons and text)
      /> */}
      <Heading leftIcon={true} heading={"Order"} rightAction={<Text></Text>}/>
      <View style={tailwind`py-2 px-1 my-2`}>
        <SpaceBetween>
          {['Recent', 'Ongoing', 'Completed', 'Cancelled'].map((item, index) => (
            <TouchableOpacity
              key={index} // Add a unique key for each item in the list
              style={[
                tailwind`py-3 px-2 border border-[#ff6] rounded-sm`,
                activeIndex === index
                  ? tailwind`border-[#1E9891] bg-teal-50`
                  : tailwind`border-[${Colors.borderColor}]`,
              ]}
              onPress={() => setActiveIndex(index)}>
              <Text>{item}</Text>
            </TouchableOpacity>
          ))}
        </SpaceBetween>
      </View>

      {/* Conditional Rendering */}
      {activeIndex === 0 ? (
        <Recent />
      ) : activeIndex === 1 ? (
        <Ongoing />
      ) : activeIndex === 2 ? (
        <Completed />
      ) : activeIndex === 3 ? (
        <Cancelled />
      ) : null}
    </>
  );
};

export default Orders;

const styles = StyleSheet.create({});