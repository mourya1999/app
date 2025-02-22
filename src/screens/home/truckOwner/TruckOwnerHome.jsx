import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View, StyleSheet, Image, ScrollView, Dimensions, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import tailwind from 'twrnc';
import SpaceBetween from '../../../common/SpaceBetween';
import Heading from '../../../common/Heading';
import { Colors } from '../../../assets/AppColors';
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize } from '../../../utility/utility';
import apiService from '../../../redux/apiService';

const TruckOwnerHome = () => {
  const token = useSelector(state => state.auth.token);
  const navigation = useNavigation();
  const [profileData, setProfileData] = useState(null); // State to store profile data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null);
  const getProfile = async () => {
    try {
      const res = await apiService({
        endpoint: "truck_owner/get/profile",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Profile Response:", res.data[0]);
      // Assuming the API returns data in `res.data.j.data[0]`
      setProfileData(res.data[0]); // Update state with profile data
    } catch (error) {
      console.error("Profile Error:", error);
      setError("Failed to load profile. Please try again.");
    } finally {
      setLoading(false); // Stop loading
    }
  };


  useEffect(() => {
    getProfile()
  }, [])
  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Error Message
  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }
  return (
    <View style={styles.container}>
      {/* Header */}
      <Heading leftIcon={true} heading="Profile" rightAction={true} />

      <ScrollView contentContainerStyle={styles.scrollView}>
        {/* Profile Section */}
        <SpaceBetween style={tailwind`shadow w-[94%] bg-[#fff] h-auto p-5 mx-3 mt-3 rounded-xl`}>
          <View style={tailwind`w-[25%]`}>
            <Image source={{
              uri: profileData?.profile_image
                ? `${profileData.image_base_url}${profileData.profile_image}`
                : "https://via.placeholder.com/100", // Default placeholder image
            }} style={styles.profileImage} />
          </View>
          <View style={tailwind`w-[75%]`}>
            <Text style={[styles.nameText, { fontSize: responsiveFontSize(16) }]}>{profileData?.UserName || "User Name"}</Text>
            <Text style={[styles.nameText, { fontSize: responsiveFontSize(14) }]}>{profileData?.role_name || "User Name"}</Text>
            <SpaceBetween justify='' padding={0} style={tailwind`gap-1 items-center`}>
              <FontAwesome6 name="location-dot" color={Colors.appColor} size={responsiveFontSize(16)} />
              <Text style={[{ fontSize: responsiveFontSize(12) }]}>
              {profileData?.Address || "N/A"}
              </Text>
            </SpaceBetween>
          </View>
        </SpaceBetween>

        {/* Stats Section */}
        <SpaceBetween style={tailwind`shadow w-[94%] bg-[#fff] h-auto p-5 mx-3 mt-3 rounded-xl`}>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { fontSize: responsiveFontSize(20) }]}>{profileData?.truck_owner_counts?.trucks || 0}</Text>
            <Text style={[styles.statLabel, { fontSize: responsiveFontSize(18) }]}>Trucks</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { fontSize: responsiveFontSize(20) }]}>{profileData?.truck_owner_counts?.drivers || 0}</Text>
            <Text style={[styles.statLabel, { fontSize: responsiveFontSize(18) }]}>Drivers</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statNumber, { fontSize: responsiveFontSize(20) }]}>{profileData?.truck_owner_counts?.orders || 0}</Text>
            <Text style={[styles.statLabel, { fontSize: responsiveFontSize(18) }]}>Trips</Text>
          </View>
        </SpaceBetween>

        {/* Truck List Section */}
        <SpaceBetween style={tailwind`shadow w-[94%] bg-[#fff] h-auto p-5 mx-3 mt-3 rounded-xl`}>
          <View style={tailwind`w-[30%]`}>
            <Image style={styles.iconImage} source={require("../../../assets/img/registration/truck.png")} />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("TruckList")} style={tailwind`w-[70%]`}>
            <Text style={[styles.buttonText, { fontSize: responsiveFontSize(22) }]}>Truck List</Text>
          </TouchableOpacity>
        </SpaceBetween>

        {/* Driver List Section */}
        <SpaceBetween style={tailwind`shadow w-[94%] bg-[#fff] h-auto p-5 mx-3 mt-3 rounded-xl`}>
          <View style={tailwind`w-[30%]`}>
            <Image style={styles.iconImage} source={require("../../../assets/img/registration/driver.png")} />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("DriverList")} style={tailwind`w-[70%]`}>
            <Text style={[styles.buttonText, { fontSize: responsiveFontSize(22) }]}>Driver List</Text>
          </TouchableOpacity>
        </SpaceBetween>

        {/* Banner Section */}
        <View style={tailwind`shadow w-[94%] bg-[#fff] h-auto mx-3 mt-3 mb-16 rounded-xl`}>
          <Image style={styles.bannerImage} source={require("../../../assets/img/banner.png")} />
        </View>
      </ScrollView>
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.appColor,
  },
  nameText: {
    fontFamily: 'Poppins-Bold',
    color: Colors.textDark,
    textAlign: 'left',
  },
  locationText: {
    fontFamily: 'Poppins-Regular',
    color: Colors.textLight,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontFamily: 'Poppins-Bold',
    color: "#000",
  },
  statLabel: {
    fontFamily: 'Poppins-Regular',
    color: Colors.textDark,
  },
  iconImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  buttonText: {
    fontFamily: 'Poppins-Medium',
    color: Colors.textDark,
    textAlign: 'center',
    fontWeight: '700'
  },
  bannerImage: {
    width: '100%',
    height: 100,
    resizeMode: 'cover',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TruckOwnerHome;
