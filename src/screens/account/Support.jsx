import React from 'react';
import { Text, View } from 'react-native';
import Heading from '../../common/Heading';
import tailwind from 'twrnc';

const Support = () => {
  return (
    <View style={tailwind``}>
      <Heading leftIcon={true} heading={"Contact Support"} rightAction={<Text></Text>} />
      
      <View style={tailwind`bg-white shadow-lg rounded-lg p-4 m-2`}>
        <Text style={tailwind`text-lg font-bold pb-2 text-gray-700`}>Contact Information</Text>

        <Text style={tailwind`text-sm font-semibold text-gray-600 pt-2`}>Address:</Text>
        <Text style={tailwind`text-gray-800`}>53 Vinoba Market</Text>
        <Text style={tailwind`text-gray-800`}>Near Durga Mandir Shri Ganga Nagar,</Text>
        <Text style={tailwind`text-gray-800 pb-2`}>Rajasthan - 335001</Text>

        <Text style={tailwind`text-sm font-semibold text-gray-600 pt-2`}>Phone:</Text>
        <Text style={tailwind`text-gray-800 pb-2`}>18001234374, 01542940374, +91 9001932711</Text>

        <Text style={tailwind`text-sm font-semibold text-gray-600 pt-2`}>Email:</Text>
        <Text style={tailwind`text-blue-600`}>contact@hindustantruckers.com</Text>
      </View>
    </View>
  );
};

export default Support;
