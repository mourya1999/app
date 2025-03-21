import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
  Linking,
  ActivityIndicator,
  Image,
  StatusBar,
} from 'react-native';
import tailwind from 'twrnc';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import apiService from '../../../redux/apiService';
import {Colors} from '../../../assets/AppColors';
import Heading from '../../../common/Heading';
import SpaceBetween from '../../../common/SpaceBetween';
import {responsiveFontSize} from '../../../utility/utility';
import CommonButton from '../../../common/CommonButton';
import {useProfile} from '../../../redux/ProfileContext';
import {AirbnbRating} from 'react-native-ratings';
import CustomStarRating from '../../../common/CustomStartRating';

const {width, height} = Dimensions.get('screen');

const TruckDriverHome = () => {
  const navigation = useNavigation();
  const token = useSelector(state => state.auth.token);
  const profileData = useSelector(state => state.auth);
  const [activeIndex, setActiveIndex] = useState(0);
  const [drivers, setDriver] = useState([]);
  const [loading, setLoading] = useState(true);
  const {profile} = useProfile();


  const getDriver = async () => {
    try {
      const res = await apiService({
        endpoint: `truck_owner/driver/booking/list?order_status=${activeIndex}`,
        method: 'GET',
        headers: {Authorization: `Bearer ${token}`},
      });
      setDriver(res.data || []);
      console.log("driver order list : ", res?.data)
    } catch (error) {
      console.log('Error fetching truck list:', error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
      getDriver();
  }, [activeIndex]);
  
  const handleCall = phoneNumber => {
    if (!phoneNumber) {
      ToastAndroid.show('Phone number is missing!', ToastAndroid.SHORT);
      return;
    }
    Linking.openURL(`tel:${phoneNumber}`).catch(err =>
      console.log('Error opening dialer:', err),
    );
  };

  const renderItem = ({item}) => (
    <TouchableOpacity
      style={[
        tailwind`w-[96%] mx-2 p-4 bg-white rounded-lg border border-gray-200`,
        {
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.15,
          shadowRadius: 4,
          elevation: 4, // For Android shadow
        },
      ]}>
      {/* Header */}
      <View style={tailwind`flex-row justify-between items-center mb-2`}>
        <TouchableOpacity
          onPress={() => navigation.navigate('OrderDetail', {item})}>
          <Text style={tailwind`text-black font-semibold text-base`}>
            Order Id:{' '}
            <Text
              style={[
                tailwind`text-gray-600`,
                {fontSize: responsiveFontSize(14)},
              ]}>
              {item.OrderId}
            </Text>
          </Text>
        </TouchableOpacity>
        {item.StatusId === 4 && (
          <TouchableOpacity
            style={tailwind`bg-[${Colors.borderColor}] px-4 py-1 rounded-full`}>
            <Text style={tailwind`text-white font-medium`}>Track</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Status */}
      <Text style={tailwind`text-red-500 font-semibold text-sm mb-1`}>
        {item.StatusName}
      </Text>
      <View style={tailwind`border-b border-gray-300 mb-1`} />

      {/* Route */}
      <View>
        <Text style={tailwind`text-gray-700 font-medium`}>
          🔴 {item.OriginRoute.slice(0, 40)}...
        </Text>
        <View style={tailwind`border-l-2 border-gray-400 ml-2 h-4`} />
        <Text style={tailwind`text-gray-700 font-medium`}>
          🟢 {item.DestinationRoute}
        </Text>
      </View>

      {/* Order Details */}
      <View style={tailwind`flex-row justify-between mt-2`}>
        {/* Left Column */}
        <View>
          <Text style={tailwind`text-gray-500 font-medium mb-1`}>
            Booking Date
          </Text>
          <View style={tailwind`flex-row items-center`}>
            <MaterialIcons
              name="date-range"
              size={18}
              color={Colors.appColor}
            />
            <Text style={tailwind`ml-1 text-gray-800 font-semibold`}>
              {moment(item.BookingDate).format('MM-DD-YYYY')}
            </Text>
          </View>

          <Text style={tailwind`text-gray-500 font-medium mt-2 mb-1`}>
            Load Weight
          </Text>
          <View style={tailwind`flex-row items-center`}>
            <MaterialIcons name="speed" size={18} color={Colors.appColor} />
            <Text style={tailwind`ml-1 text-gray-800 font-semibold`}>
              {item.Weight} {item.WeightType}
            </Text>
          </View>
        </View>

        {/* Right Column */}
        <View>
          <Text style={tailwind`text-gray-500 font-medium mb-1`}>Material</Text>
          <View style={tailwind`flex-row items-center`}>
            <FontAwesome5 name="box-open" size={16} color={Colors.appColor} />
            <Text style={tailwind`ml-1 text-gray-800 font-semibold`}>
              {item.GoodsTypeName}
            </Text>
          </View>

          <Text style={tailwind`text-gray-500 font-medium mt-2 mb-1`}>
            Order Amount
          </Text>
          <View style={tailwind`flex-row items-center`}>
            <MaterialIcons
              name="currency-rupee"
              size={18}
              color={Colors.appColor}
            />
            <Text style={tailwind`ml-1 text-gray-800 font-semibold`}>
              {item.Amount}
            </Text>
          </View>
        </View>
      </View>

      <View style={tailwind`border-b border-gray-300 my-2`} />

      {/* Company Info */}
      <View style={tailwind`flex-row justify-between items-center`}>
        <View style={tailwind`flex-row items-center`}>
          {/* Profile Image */}
          <View
            style={[
              tailwind`w-12 h-12 rounded-full border border-gray-400 justify-center items-center bg-gray-100`,
              {
                shadowColor: '#000',
                shadowOffset: {width: 0, height: 1},
                shadowOpacity: 0.1,
                shadowRadius: 2,
                elevation: 3,
              },
            ]}>
            <Image
              source={{
                uri: `https://uat.hindustantruckers.com/storage/app/public/${item.profile_image}`,
              }}
              style={styles.profileImage}
            />
          </View>
          <View style={tailwind`ml-3`}>
            <Text style={tailwind`text-black font-bold text-base`}>
              {item.CompanyName}
            </Text>
            <Text style={tailwind`text-gray-500 text-sm`}>
              {item.TruckNumber}
            </Text>
          </View>
        </View>

        {/* Call Button */}
        <TouchableOpacity
          onPress={() => handleCall(item.CompanyPhoneNumber)}
          style={tailwind`bg-teal-500 px-5 py-2 rounded-lg`}>
          <Text style={tailwind`text-white font-semibold`}>Call</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

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
      <StatusBar backgroundColor={Colors.appColor} barStyle="light-content" />
      <View
        style={tailwind`bg-[#1E9891] h-[30vh] py-2 px-4 rounded-b-[20px] border-b-none`}>
        <Text style={tailwind`text-center text-white font-normal`}>Today</Text>
        <Text style={tailwind`text-center text-white font-bold text-lg`}>
          {currentTime}
        </Text>

        <View style={tailwind`h-[18vh] bg-[#fff] rounded-lg px-2 py-4`}>
          <SpaceBetween justify="" style={tailwind`flex gap-4`}>
            <Image
              style={tailwind`h-12 w-12 border rounded-full shadow`}
              source={{
                uri: `https://uat.hindustantruckers.com/storage/app/public/${profile?.profile_image}`,
              }}
            />
            <View>
              <Text style={{fontSize: responsiveFontSize(14)}}>
                {profile?.UserName ?? 'N/A'}
              </Text>
              <Text style={{fontSize: responsiveFontSize(12)}}>
                ({profile?.role_name ?? 'N/A'})
              </Text>
              {/* <Text>{profile?.driver_trucks?.rating}</Text> */}
              <CustomStarRating
                maxStars={profile?.driver_trucks?.rating}
                size={13}
                color="#f39c12"
                inactiveColor="#e0e0e0"
              />
            </View>
            <Text style={tailwind`bg-[#9ee] py-1 px-3 rounded-lg`}>
              {profile?.driver_trucks?.status ?? 'N/A'}
            </Text>
          </SpaceBetween>
          <CommonButton
            backgroundColor={Colors.appColor}
            textColor={'#fff'}
            title={`Logged from : ${profile?.driver_trucks?.login_from}`}
          />
        </View>
      </View>
      <View style={tailwind`my-2`}>
        <SpaceBetween justify="space-between">
          {[
            {id: 0, name: 'All'},
            {id: 1, name: 'Recent'},
            {id: 4, name: 'Ongoing'},
            {id: 3, name: 'Completed'},
            {id: 2, name: 'Cancelled'},
          ].map(item => (
            <TouchableOpacity
              key={item.id}
              style={[
                tailwind`py-3 px-2 border rounded-sm`,
                activeIndex == item.id
                  ? tailwind`border-[#1E9891] bg-teal-50`
                  : tailwind`border-gray-300`,
              ]}
              onPress={() => setActiveIndex(item.id)}>
              <Text style={tailwind`px-[0.1rem]`}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </SpaceBetween>
      </View>
      <View style={tailwind`flex-1 p-2`}>
        {loading ? (
          <ActivityIndicator size="large" color={Colors.appColor} />
        ) : drivers.length > 0 ? (
          <FlatList
            data={drivers}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
          />
        ) : (
          <Text style={tailwind`text-center text-gray-500 mt-5`}>
            No Orders Found
          </Text>
        )}
      </View>
    </>
  );
};

export default TruckDriverHome;
const styles = StyleSheet.create({
  profileImage: {
    borderColor: Colors.borderColor,
  },
});
