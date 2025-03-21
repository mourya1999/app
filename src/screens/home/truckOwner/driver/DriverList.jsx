import React, {useEffect, useState} from 'react';
import {Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import tailwind from 'twrnc';
import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import Heading from '../../../../common/Heading';
import {Colors} from '../../../../assets/AppColors';
import {responsiveFontSize} from '../../../../utility/utility';
import {useSelector} from 'react-redux';
import apiService from '../../../../redux/apiService';
import {FlatList} from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

const DriverList = () => {
  const navigation = useNavigation();
  const token = useSelector(state => state.auth.token);
  const [drivers, setDrivers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false); // For pull-to-refresh

  const getDriver = async () => {
    try {
      const res = await apiService({
        endpoint: 'truck_owner/driver/list',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('API Response driver list :', res.data);

      setDrivers(res.data || []); // Ensure data is an array even if API returns null
      setLoading(false);
      setRefreshing(false); // Stop refreshing
    } catch (error) {
      console.log('Error fetching truck list:', error);
      setLoading(false);
      setRefreshing(false); // Stop refreshing in case of error
    }
  };

  useEffect(() => {
    getDriver();
  }, []);

  // Handle pull-to-refresh
  const onRefresh = () => {
    setRefreshing(true);
    getDriver();
  };

  const renderItem = ({item}) => (
    <View
      style={tailwind`w-[96%] rounded-lg mx-2 mt-2 p-2 bg-white shadow border border-[teal]`}>
      <View style={tailwind`flex-row justify-between items-center`}>
        <TouchableOpacity
          onPress={() => navigation.navigate('DriverDetail', {item})}
          style={tailwind`flex-row gap-2 items-center`}>
          {item.SelfieImage ? (
            <Image
              source={{
                uri: `https://api.hindustantruckers.com/storage/app/public/${item.SelfieImage}`,
              }}
              style={tailwind`w-10 h-10 rounded-full border border-teal`}
            />
          ) : (
            <View
              style={tailwind`w-10 h-10 rounded-full border border-teal justify-center items-center`}>
              <Text style={tailwind`text-gray-500`}>No</Text>
            </View>
          )}
          <View>
            <Text
              style={[
                styles.nameText,
                {fontSize: responsiveFontSize(16), color: '#000'},
              ]}>
              {item.FullName}
            </Text>
            <Text style={[styles.infoText, {fontSize: responsiveFontSize(14)}]}>
              <FontAwesome5
                name="map-marker-alt"
                size={14}
                color={Colors.appColor}
              />{' '}
              {item.City}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('DriverUpdateDoc', {item})}
          style={tailwind`flex-row items-center gap-2`}>
          <Text style={[styles.infoText, {fontSize: responsiveFontSize(14)}]}>
            Document Status
          </Text>
          {item.document_status === 0 ? (
            <MaterialIcons name="dangerous" size={24} color={'red'} />
          ) : (
            <AntDesign name="checkcircle" size={24} color={'green'} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <>
      <Heading
        leftIcon={true}
        heading={''}
        rightAction={
          <TouchableOpacity
            onPress={() => navigation.navigate('AddDriver')}
            style={tailwind`bg-[#fff] px-3 py-1 rounded-sm`}>
            <Text
              style={[
                {fontSize: responsiveFontSize(12), color: Colors.appColor},
              ]}>
              <Entypo name="plus" size={12} color={Colors.appColor} /> Add
              Driver
            </Text>
          </TouchableOpacity>
        }
      />

      <FlatList
        data={drivers}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh} // Handle pull-to-refresh
            colors={['#00A6B4']} // Loader color (optional)
            tintColor="#00A6B4" // iOS loader color (optional)
          />
        }
        ListEmptyComponent={
          !loading && (
            <Text style={tailwind`text-center text-gray-500 mt-5`}>
              No drivers available.
            </Text>
          )
        }
        style={[tailwind`bg-white`, {borderRadius: 10}]}
        contentContainerStyle={[tailwind`pb-20`]}
      />
    </>
  );
};

export default DriverList
const styles = StyleSheet.create({
  nameText: {
    fontFamily: 'Poppins-Bold',
    color: Colors.textDark,
  },

  // Info Text Style
  infoText: {
    fontFamily: 'Poppins-Regular',
    color: Colors.textLight,
  },
});
