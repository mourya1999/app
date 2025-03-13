import React, { useEffect, useState } from 'react';
import {Text, View, Image, TouchableOpacity, ScrollView, Alert} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import tw from 'twrnc';
import {Colors} from '../../assets/AppColors';
import {useDispatch, useSelector} from 'react-redux';
import { clearToken } from '../../redux/AuthSlice';
import apiService from '../../redux/apiService';
import { useProfile } from '../../redux/ProfileContext';

const Account = ({navigation}) => {
  const token = useSelector(state=>state.auth.token)
  const dispatch = useDispatch()
  const [user, setUser] = useState({})
  const handleLogout = () => {
    dispatch(clearToken())
  };
  const getProfileData = async () => {
    try {
      const res = await apiService({
        endpoint: 'truck_owner/get/profile',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('profile data Response:', res.data[0]);
      setUser(res.data[0]);
    } catch (error) {
      console.error('Company Error:', error);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);

  const handleDeleteAccount = async () => {
    Alert.alert(
      "Delete Account",
      "Are you sure you want to delete your account?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Deletion Cancelled"),
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: async () => {
            try {
              const res = await apiService({
                endpoint: "truck_owner/delete/account",
                method: "POST",
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
                data: {},
              });
              Alert.alert("Success", "Your account has been deleted.");
              console.log("Delete Response:", res.data);
            } catch (error) {
              console.error("Delete Error:", error);
              Alert.alert("Error", "Failed to delete account.");
            }
          },
          style: "destructive", // Makes the button red (iOS only)
        },
      ],
      { cancelable: true }
    );
  };
  
  return (
    <View style={tw`p-4 bg-gray-100 h-full`}>
      {/* Profile Header */}
      <View style={tw`p-4 bg-[#1E9891] rounded-lg`}>
        <View style={tw`flex-row items-center`}>
          <Image
            source={{
              uri: user?.profile_image
                ? `https://uat.hindustantruckers.com/storage/app/public/${user.profile_image}`
                : 'https://via.placeholder.com/100', // Default placeholder image
            }}
            style={tw`w-16 h-16 rounded-full border-2 border-white`}
          />
          <View style={tw`ml-4 flex-1`}>
            <Text style={tw`text-white text-lg font-bold`}>
              {user?.UserName || 'N/A'}
            </Text>
            <Text style={tw`text-white text-sm`}>{user?.phone || 'N/A'}</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
            <Feather name="edit" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content Section */}
      <ScrollView style={tw`mt-4`}>
        {[
          {
            title: 'Personal Information',
            subtitle: 'Your name, mobile number, email, address',
            screen: 'Personal',
          },
          {
            title: 'Company Information',
            subtitle: 'Your company name, address',
            screen: 'Company',
          },
          {
            title: 'KYC Information',
            subtitle: 'Your KYC information',
            screen: 'KYCScreen',
          },
          {
            title: 'Bank Details',
            subtitle: 'Your bank information',
            screen: 'BankDetails',
          },
          {title: 'Contact Support', screen: 'Support'},
        ].map((item, index) => (
          <TouchableOpacity
            key={index}
            style={tw`bg-white p-4 rounded-lg mb-2 shadow`}
            onPress={() => navigation.navigate(item.screen)}>
            <Text style={tw`text-black font-semibold`}>{item.title}</Text>
            {item.subtitle && (
              <Text style={tw`text-gray-500 text-sm`}>{item.subtitle}</Text>
            )}
          </TouchableOpacity>
        ))}

        {/* Delete Account */}

        {/* Logout Account */}
        <TouchableOpacity
          onPress={handleLogout}
          style={tw`bg-white p-4 rounded-lg mb-2 shadow`}>
          <Text style={tw`text-black font-semibold`}>Logout</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`border border-red-500 p-4 rounded-lg mt-2`}
          onPress={handleDeleteAccount}>
          <Text style={tw`text-red-500 font-semibold text-center`}>
            Delete Account
          </Text>
        </TouchableOpacity>

        {/* Version Info */}
        <Text style={tw`text-center text-[${Colors.appColor}] mt-4`}>
          Current Version v1.0
        </Text>
      </ScrollView>
    </View>
  );
};

export default Account;
