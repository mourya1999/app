import React, {useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Heading from '../../../../common/Heading';
import tailwind from 'twrnc';
import SpaceBetween from '../../../../common/SpaceBetween';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Colors} from '../../../../assets/AppColors';
import {responsiveFontSize} from '../../../../utility/utility';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Octicons from 'react-native-vector-icons/Octicons';
import {useNavigation} from '@react-navigation/native';
import CustomModal from '../../../../common/CustomModal';
import apiService from '../../../../redux/apiService';
import {useSelector} from 'react-redux';
import moment from 'moment';

const TruckList = () => {
  const token = useSelector(state => state.auth.token);
  const navigation = useNavigation();
  const [assignDriver, setAssignDriver] = useState(false);
  const [trucks, setTrucks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [drivers, setDrivers] = useState();
  const [truckId, setTruckId] = useState();

  const getTruckList = async () => {
    try {
      const res = await apiService({
        endpoint: 'truck_owner/trucks_list',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('truck list API Response:', res.data);

      // Set the data in the state
      setTrucks(res.data || []); // Ensure data is an array even if API returns null
      setLoading(false); // Stop loading
    } catch (error) {
      console.log('Error fetching truck list:', error);
      setLoading(false); // Stop loading in case of error
    }
  };

  const getDriver = async () => {
    try {
      const res = await apiService({
        endpoint: 'truck_owner/driver/list',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setDrivers(res.data || []);
    } catch (error) {
      console.log('Error fetching truck list:', error);
    }
  };

  useEffect(() => {
    getDriver();
  }, []);
  useEffect(() => {
    getTruckList();
  }, []);

  const handleAssign = async (truckId, driverId) => {
    try {
      const res = await apiService({
        endpoint: 'truck_owner/trucks/assign/driver',
        method: 'POST',
        data: {
          TruckId: truckId,
          DriverId: driverId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('assign res : ', res);
      Alert.alert('success ', res.message);
      setAssignDriver(false);
    } catch (error) {
      Alert.alert(
        'warning ',
        `${
          error.message || 'Driver already assigned to this trucks.'
        } Driver Id : ${driverId}`,
      );
      console.log('Error fetching truck list:', error);
    }
  };
  // Render each truck item
  const renderItem = ({item}) => (
    <View
      style={tailwind`bg-[#fff] w-[94%] shadow h-auto mt-3 mx-3  rounded-lg`}>
      {/* First Row */}
      <SpaceBetween style={tailwind`p-3`}>
        {/* Left Section */}
        <View style={tailwind`w-[50%]`}>
          <SpaceBetween>
            <View style={styles.labelText}>
              <SpaceBetween padding={0} justify="" style={tailwind`gap-1`}>
                <Text>Status : </Text>
                {item.Status === 0 ? (
                  <>
                    <Octicons name="skip" size={12} color={'red'} />
                    <Text
                      style={{color: '#000', fontSize: responsiveFontSize(12)}}>
                      Not Verified
                    </Text>
                  </>
                ) : (
                  <>
                    <Octicons name="skip" size={12} color={'green'} />{' '}
                    <Text
                      style={{color: '#000', fontSize: responsiveFontSize(12)}}>
                      Verified
                    </Text>
                  </>
                )}
              </SpaceBetween>

              <Text style={[styles.labelText, {color: Colors.textDark}]}>
                Date:{' '}
                <Text>{moment(item.created_at).format('DD-MM-YYYY')}</Text>
              </Text>
              <Text style={[styles.labelText, {color: Colors.textDark}]}>
                Route:<Text>{item.OriginRoute}</Text>
              </Text>
              <TouchableOpacity
                onPress={() => {
                  if (item.document_status === 0) {
                    navigation.navigate('UpdateDoc', {item});
                  }
                }}>
                <Text style={[styles.labelText, {color: Colors.textDark}]}>
                  Documentation Status:
                  <Text
                    style={{
                      color:
                        item.document_status === 0
                          ? Colors.pendingolor
                          : 'green',
                    }}>
                    {item.document_status === 0 ? 'Pending' : 'Completed'}
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </SpaceBetween>
        </View>
        {/* Right Section */}
        <View
          style={tailwind`w-[50%] border border-gray-300 rounded-lg overflow-hidden`}>
          <Image
            style={tailwind`w-full h-32`}
            source={{
              uri: `https://api.hindustantruckers.com/storage/truck_images/${item.TruckImage}`,
            }}
            resizeMode="cover" // Ensure the image fits properly
          />
        </View>
      </SpaceBetween>

      {/* Second Row */}
      <SpaceBetween style={tailwind`p-3`}>
        {/* Left Column */}
        <View>
          <Text style={[styles.labelText, {color: Colors.textLight}]}>
            Width
          </Text>
          <Text style={[styles.valueText, {color: Colors.textDark}]}>
            <MaterialIcons
              name="width-wide"
              size={14}
              color={Colors.appColor}
            />
            {item.Width} Feets
          </Text>
          <Text style={[styles.labelText, {color: Colors.textLight}]}>
            Capacity
          </Text>
          <Text style={[styles.valueText, {color: Colors.textDark}]}>
            <MaterialIcons
              name="reduce-capacity"
              size={14}
              color={Colors.appColor}
            />{' '}
            {item.Capacity} {item.CapacityUnit}
          </Text>
        </View>
        {/* Right Column */}
        <View>
          <Text style={[styles.labelText, {color: Colors.textLight}]}>
            Height
          </Text>
          <Text style={[styles.valueText, {color: Colors.textDark}]}>
            <MaterialIcons name="height" size={14} color={Colors.appColor} />{' '}
            {item.Height} Feets
          </Text>
          <Text style={[styles.labelText, {color: Colors.textLight}]}>
            Expected Price
          </Text>
          <Text style={[styles.valueText, {color: Colors.textDark}]}>
            <MaterialIcons
              name="currency-rupee"
              size={14}
              color={Colors.appColor}
            />{' '}
            {item.Rate} /KM
          </Text>
        </View>
      </SpaceBetween>

      {/* Divider */}
      <View style={tailwind`border-b border-gray-300 mx-3`} />

      {/* Assign Driver Button */}
      <SpaceBetween justify="space-between" style={tailwind`p-3`}>
        <Text
          style={[tailwind`text-gray-500`, {fontSize: responsiveFontSize(12)}]}>
          {item.TruckType} | {item.TruckNumber}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setTruckId(item.id);
            setAssignDriver(true);
          }}
          style={[
            {backgroundColor: Colors.appColor},
            tailwind`px-4 py-2 rounded-sm`,
          ]}>
          <Text style={[styles.buttonText, {color: '#fff'}]}>
            Assign Driver
          </Text>
        </TouchableOpacity>
      </SpaceBetween>
    </View>
  );

  return (
    <View>
      {/* Header */}
      <Heading
        leftIcon={true}
        heading={''}
        rightAction={
          <TouchableOpacity
            onPress={() => navigation.navigate('TruckRegistration')}
            style={tailwind`bg-[#fff] px-3 py-1 rounded-sm`}>
            <Text
              style={[
                {fontSize: responsiveFontSize(12), color: Colors.appColor},
              ]}>
              <Entypo name="plus" size={12} color={Colors.appColor} /> Add Truck
            </Text>
          </TouchableOpacity>
        }
      />

      {/* FlatList to display trucks */}
      <FlatList
        data={trucks} // Pass the array of trucks
        keyExtractor={item => item.id.toString()} // Use unique ID as the key
        renderItem={renderItem} // Render each item
        ListEmptyComponent={
          !loading && (
            <Text style={tailwind`text-center text-gray-500 mt-5`}>
              No trucks available.
            </Text>
          )
        }
        style={[tailwind`bg-white`, {borderRadius: 10}]} // Rounded corners
        contentContainerStyle={[
          tailwind`pb-20`, // Center content if empty
        ]}
      />

      {/* Loading Indicator */}
      {loading && (
        <View style={tailwind`flex-1 justify-center items-center`}>
          <Text style={tailwind`text-gray-500`}>Loading...</Text>
        </View>
      )}

      {/* Assign Driver Modal */}
      {assignDriver && (
        <CustomModal
          modalTitle={'Driver List'}
          isVisible={assignDriver}
          onClose={() => setAssignDriver(false)}
          content={
            <>
              <FlatList
                data={drivers} // Pass the array of trucks
                keyExtractor={item => item.id.toString()} // Use unique ID as the key
                renderItem={({item}) => (
                  <View
                    style={tailwind`w-[96%] rounded-lg mx-2 mt-2 p-2 bg-white shadow border border-[teal]`}>
                    {/* First Row: Profile Image, Name, and Location */}
                    <View
                      style={tailwind`flex-row justify-between items-center`}>
                      {/* Left Section: Profile Image and Details */}
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('DriverDetail', {item})
                        }
                        style={tailwind`flex-row gap-2 items-center`}>
                        {/* Profile Image or Placeholder */}
                        {item.SelfieImage ? (
                          <Image
                            source={{
                              uri: `https://api.hindustantruckers.com/storage/app/publics/${item.SelfieImage}`,
                            }}
                            style={tailwind`w-10 h-10 rounded-full border border-teal`}
                          />
                        ) : (
                          <View
                            style={tailwind`w-10 h-10 rounded-full border border-teal justify-center items-center`}>
                            <Text style={tailwind`text-gray-500`}>No</Text>
                          </View>
                        )}

                        {/* Name and City */}
                        <View>
                          <Text
                            style={[
                              styles.nameText,
                              {fontSize: responsiveFontSize(16), color: '#000'},
                            ]}>
                            {item.FullName}
                          </Text>
                          <Text
                            style={[
                              styles.infoText,
                              {fontSize: responsiveFontSize(14)},
                            ]}>
                            <FontAwesome5
                              name="map-marker-alt"
                              size={14}
                              color={Colors.appColor}
                            />{' '}
                            {item.City}
                          </Text>
                        </View>
                      </TouchableOpacity>

                      {/* Right Section: Document Status */}
                      <TouchableOpacity
                        onPress={() => handleAssign(truckId, item.id)}
                        style={tailwind`flex-row items-center gap-2`}>
                        <Text
                          style={[
                            styles.infoText,
                            {fontSize: responsiveFontSize(14)},
                          ]}>
                          Document Status
                        </Text>
                        {item.document_status === 0 ? (
                          <MaterialIcons
                            name="dangerous"
                            size={24}
                            color={'red'}
                          />
                        ) : (
                          <AntDesign
                            name="checkcircle"
                            size={24}
                            color={'green'}
                          />
                        )}
                      </TouchableOpacity>
                    </View>
                  </View>
                )} // Render each item
                ListEmptyComponent={
                  !loading && (
                    <Text style={tailwind`text-center text-gray-500 mt-5`}>
                      No trucks available.
                    </Text>
                  )
                }
                style={[tailwind`bg-white`, {borderRadius: 10}]} // Rounded corners
                contentContainerStyle={[tailwind`pb-20`]}
              />
            </>
          }
        />
      )}
    </View>
  );
};

export default TruckList;

const styles = StyleSheet.create({
  // Label Text Style
  labelText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  // Value Text Style
  valueText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 8,
  },
  // Button Text Style
  buttonText: {
    fontFamily: 'Poppins-Medium',
    fontSize: responsiveFontSize(14),
    fontWeight: '600',
    textAlign: 'center',
  },
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
