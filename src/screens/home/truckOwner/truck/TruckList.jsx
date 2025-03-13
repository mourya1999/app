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
  const [refreshing, setRefreshing] = useState(false); // State for refreshing

  const getTruckList = async () => {
    try {
      if (!refreshing) setLoading(true); // Only show loading indicator if not refreshing
      const res = await apiService({
        endpoint: 'truck_owner/trucks_list',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("truck list : ", res.data)
      setTrucks(res.data || []);
    } catch (error) {
      console.log('Error fetching truck list:', error);
    } finally {
      setLoading(false);
      setRefreshing(false); // Stop refreshing state
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
      style={tailwind`bg-white w-[94%] shadow-lg h-auto mt-3 mx-3 rounded-2xl border border-gray-200`}>
      <SpaceBetween style={tailwind`p-2`}>
        {/* Left Section */}
        <View style={tailwind`w-[50%]`}>
          <SpaceBetween>
            <View style={styles.labelText}>
              <SpaceBetween padding={0} justify="" style={tailwind`gap-1`}>
                <Text style={tailwind`text-gray-700 font-semibold`}>
                  Status :
                </Text>
                {item.Status === 0 ? (
                  <>
                    <Octicons name="skip" size={14} color={'#e53e3e'} />
                    <Text style={tailwind`text-black text-sm`}>
                      Not Verified
                    </Text>
                  </>
                ) : (
                  <>
                    <Octicons name="skip" size={14} color={'#38a169'} />
                    <Text style={tailwind`text-black text-sm`}>Verified</Text>
                  </>
                )}
              </SpaceBetween>

              <Text style={tailwind`text-gray-600 mt-1`}>
                Date: {moment(item.created_at).format('DD-MM-YYYY')}
              </Text>
              <Text style={tailwind`text-gray-600 mt-1`}>
                Route: {item.OriginRoute}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  if (item.document_status === 0) {
                    navigation.navigate('UpdateDoc', {item});
                  }
                }}>
                <Text style={tailwind`text-gray-600 mt-1`}>
                  Documentation Status:{' '}
                  <Text
                    style={{
                      color: item.document_status === 0 ? '#e53e3e' : '#38a169',
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
          style={tailwind`w-[50%] rounded-xl overflow-hidden border border-gray-300`}>
          <Image
            style={tailwind`w-full h-32`}
            source={{
              uri: `https://api.hindustantruckers.com/storage/truck_images/${item.TruckImage}`,
            }}
            resizeMode="cover"
          />
        </View>
      </SpaceBetween>
      {/* Second Row */}
      <SpaceBetween style={tailwind`px-4`}>
        {/* Left Column */}
        <View>
          <Text style={tailwind`text-gray-500 font-semibold mb-1`}>Width</Text>
          <Text style={tailwind`text-gray-700 flex-row items-center`}>
            <MaterialIcons
              name="width-wide"
              size={14}
              color={Colors.appColor}
            />
            {item.Width} Feets
          </Text>

          <Text style={tailwind`text-gray-500 font-semibold mt-3 mb-1`}>
            Capacity
          </Text>
          <Text style={tailwind`text-gray-700 flex-row items-center`}>
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
          <Text style={tailwind`text-gray-500 font-semibold mb-1`}>Height</Text>
          <Text style={tailwind`text-gray-700 flex-row items-center`}>
            <MaterialIcons name="height" size={14} color={Colors.appColor} />{' '}
            {item.Height} Feets
          </Text>

          <Text style={tailwind`text-gray-500 font-semibold mt-3 mb-1`}>
            Expected Price
          </Text>
          <Text style={tailwind`text-gray-700 flex-row items-center`}>
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
      <SpaceBetween justify="space-between" style={tailwind`px-4 py-2`}>
        <Text style={tailwind`text-gray-500 text-sm`}>
          {item.TruckType} | {item.TruckNumber}
        </Text>
        <TouchableOpacity
          onPress={() => {
            setTruckId(item.id);
            setAssignDriver(true);
          }}
          style={tailwind`bg-[${Colors.appColor}] px-5 py-2 rounded-md shadow`}>
          <Text style={tailwind`text-white font-semibold`}>Assign Driver</Text>
        </TouchableOpacity>
      </SpaceBetween>
    </View>
  );

  const onRefresh = () => {
    setRefreshing(true);
    getTruckList(); // Trigger data fetching on refresh
  };
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
        data={trucks}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        onRefresh={onRefresh} // Add refresh prop
        refreshing={refreshing} // Pass refreshing state
        ListEmptyComponent={
          !loading && (
            <Text style={tailwind`text-center text-gray-500 mt-5`}>
              No trucks available.
            </Text>
          )
        }
        style={[tailwind`bg-white`, {borderRadius: 10}]}
        contentContainerStyle={[tailwind`pb-20`]}
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
    fontSize: responsiveFontSize(14),
    fontWeight: '500',
    marginBottom: 4,
  },
  // Value Text Style
  valueText: {
    fontFamily: 'Poppins-Bold',
    fontSize: responsiveFontSize(16),
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
