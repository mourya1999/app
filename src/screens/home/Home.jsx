import React, {Component, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  StatusBar,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import tw from 'twrnc';
import SpaceBetween from '../../common/SpaceBetween';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import CommonInput from '../../common/CommonInput';
import {Colors} from '../../assets/AppColors';
import CommonButton from '../../common/CommonButton';
import { useProfile } from '../../redux/ProfileContext';
import { AirbnbRating } from 'react-native-ratings';

const {width, height} = Dimensions.get('screen');
const Home = () => {
  const { profile, getProfile } = useProfile();
  const [activeIndex, setActiveIndex] = useState(0);
  // Get the current date and time
  const now = new Date();

  // Extract hours, minutes, and seconds
  const hours = now.getHours(); // 0-23
  const minutes = now.getMinutes(); // 0-59

  // Format the time as HH:MM:SS
  const currentTime = `${String(hours).padStart(2, '0')}:${String(
    minutes,
  ).padStart(2, '0')}`;

  return (
    <>
      <StatusBar
        backgroundColor={Colors.appColor} // Background color of the status bar (Android only)
        barStyle="light-content" // Content color (white icons and text)
      />
      <View
        style={tw`bg-[#1E9891] h-[38%] py-2 px-4 rounded-b-[20px] border-b-none`}>
        <Text style={tw`text-center text-white font-normal`}>Today</Text>
        <Text style={tw`text-center text-white font-bold text-lg`}>
          {currentTime}
        </Text>

        <View style={tw`h-[70%] bg-[#fff] rounded-lg px-2 py-4`}>
          <SpaceBetween justify="" style={tw`flex gap-4`}>
            <Image
              style={tw`h-12 w-12 border rounded-full`}
              source={{uri: ''}}
            />
            <View>
              <Text>0</Text>
              <Text>🌟🌟🌟</Text>
            </View>
            <Text style={tw`bg-[#ff67] py-1 px-3 rounded-lg`}>Online</Text>
          </SpaceBetween>
          <CommonButton
            backgroundColor={Colors.appColor}
            textColor={'#fff'}
            title={'Logged from'}
          />
        </View>
      </View>
      <View style={tw`py-2 px-1 my-2`}>
        <SpaceBetween>
          {['Recent', 'Ongoing', 'Completed', 'Cancelled'].map(
            (item, index) => (
              <TouchableOpacity
                style={[
                  tw`py-3 px-2 border border-[#ff6] rounded-sm`,
                  activeIndex === index
                    ? tw`border-[#1E9891] bg-teal-50`
                    : tw`border-[#fff]`,
                ]}
                onPress={() => setActiveIndex(index)}>
                <Text>{item}</Text>
              </TouchableOpacity>
            ),
          )}
        </SpaceBetween>
      </View>
      {activeIndex && (
        <Text style={tw`mt-4 text-center`}>
          Active Index: {String(activeIndex)}
        </Text>
      )}
    </>
  );
};

export default Home;
const styles = StyleSheet.create({});
