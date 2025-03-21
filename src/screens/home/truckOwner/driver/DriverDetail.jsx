import React, {useEffect, useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Linking,
  Alert,
} from 'react-native';
import Heading from '../../../../common/Heading';
import {Colors} from '../../../../assets/AppColors';
import SpaceBetween from '../../../../common/SpaceBetween';
import tailwind from 'twrnc';
import {useSelector} from 'react-redux';
import apiService from '../../../../redux/apiService';
import {responsiveFontSize} from '../../../../utility/utility';

const DriverDetail = ({route}) => {
  const {item: driverId} = route.params;
  const token = useSelector(state => state.auth.token);
  const IMAGE_BASE_URL = 'https://api.hindustantruckers.com/api/';
  const [driver, setDrivers] = useState({});

  const renderStars = (rating = 5) => {
    return Array.from({length: rating}, (_, i) => (
      <Text key={i} style={styles.star}>
        ★
      </Text>
    ));
  };

  const getDriverDetail = async () => {
    try {
      const res = await apiService({
        endpoint: 'truck_owner/driver/details',
        method: 'POST',
        data: {
          driver_id: driverId.UserId,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('driver details Response:', res);
      setDrivers(res?.data);
    } catch (error) {
      console.log('Error fetching truck list:', error);
      setLoading(false); // Stop loading in case of error
    }
  };

  // Fetch data when the component mounts or when the token changes
  useEffect(() => {
    getDriverDetail();
  }, []);

  const handleCall = phoneNumber => {
    if (!phoneNumber) {
      Alert.alert('Error', 'Phone number not available');
      return;
    }
    Linking.openURL(`tel:${phoneNumber}`).catch(err =>
      Alert.alert('Error', 'Failed to open dialer'),
    );
  };

  return (
    <View>
      <Heading
        leftIcon={true}
        heading={'Driver Details'}
        rightAction={<Text></Text>}
      />
      <View style={styles.container}>
        <View style={[styles.header, {backgroundColor:driver.status? "green":"red"}]}>
          <Text style={styles.onlineStatus}>{driver.status ? "Online" : "Offline"}</Text>
        </View>

        {/* Profile Image with fallback */}
        <SpaceBetween justify="center" style={{flexDirection: 'column'}}>
          <Image
            source={
              driver.SelfieImage
                ? {uri: driver.image_base_url+driver.profile_image}
                : require('../../../../assets/img/registration/agent.png')
            }
            style={styles.profileImage}
          />
          <Text style={styles.name}>{driver.FullName}</Text>
          {/* Dynamic Star Rating */}
          <View style={styles.ratingContainer}>{renderStars(driver.rating)}</View>
        </SpaceBetween>

        <Text style={styles.label}>
          Contact Number:{' '}
          <Text style={styles.value}>{driver.ContactNumber}</Text>
        </Text>
        <Text style={styles.label}>
          Emergency Contact:{' '}
          <Text style={styles.value}>{driver.EmergencyContactNumber}</Text>
        </Text>
        <Text style={styles.label}>
          Address: <Text style={styles.value}>{driver.Address}</Text>
        </Text>
        <Text style={styles.label}>
          Location: <Text style={styles.value}>{driver.City}</Text>
        </Text>
        <Text style={styles.label}>
          License Number:{' '}
          <Text style={styles.value}>{driver.DrivingLicenseNumber}</Text>
        </Text>
        <Text style={styles.label}>
          License Expiry:{' '}
          <Text style={styles.value}>{driver.LicenseExpiryDate}</Text>
        </Text>
        <Text style={styles.label}>
          Police Verification:
          <Text style={styles.value}>
            {' '}
            {driver.IsPoliceVerification ? 'Completed' : 'Pending'}
          </Text>
        </Text>
        <SpaceBetween
        direction='column'
          justify=""
          style={tailwind`p-4 bg-gray-100 rounded-lg`}>
          <Text style={tailwind`text-lg font-semibold text-gray-800 mb-2`}>
            Assign Truck
          </Text>

          {driver?.assigned_trucks ? (
            driver.assigned_trucks.map((item, index) => (
              <View
                key={index}
                style={tailwind`border px-4 py-2 bg-white rounded-lg shadow-sm mb-2`}>
                <Text style={tailwind`text-base font-medium text-gray-700`}>
                Truck Number :  {item.TruckNumber}
                </Text>
                <Text style={tailwind`text-sm text-gray-500`}>
                 Truck Name :  {item.TruckType}
                </Text>
              </View>
            ))
          ) : (
            <Text style={tailwind`text-gray-500`}>No trucks assigned</Text>
          )}
        </SpaceBetween>

        <SpaceBetween justify="space-between">
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleCall(driver.ContactNumber)}>
            <Text style={styles.buttonText}>Call Driver</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Find Location</Text>
          </TouchableOpacity>
        </SpaceBetween>
      </View>
    </View>
  );
};

export default DriverDetail;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    // alignItems: "center",
    elevation: 1,
    margin: 10,
  },
  header: {
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginBottom: 10,
  },
  onlineStatus: {
    color: '#fff',
    fontWeight: 'bold',
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 50,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.borderColor,
  },
  name: {
    fontSize: responsiveFontSize(18),
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  star: {
    color: 'gold',
    fontSize: responsiveFontSize(18),
    marginHorizontal: 2,
  },
  label: {
    fontSize: responsiveFontSize(14),
    color: Colors.borderColor,
    fontWeight: '700',
    marginTop: 10,
  },
  value: {
    fontWeight: '400',
    color: '#000',
  },
  button: {
    borderWidth: 1,
    borderColor: Colors.appColor,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: '5%',
    // width: "40%",
    alignItems: 'center',
  },
  buttonText: {
    color: Colors.appColor,
    fontWeight: '400',
  },
});
