import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import Heading from '../../common/Heading';
import MapComponent from './MapComponent';

const MapScreen = () => {
  return (
    <View>
      <Heading
        heading={'Current Location'}
        leftIcon={false}
        rightAction={<Text></Text>}
      />
      {/* <MapComponent/> */}
    </View>
  );
};

export default MapScreen;
const styles = StyleSheet.create({});
