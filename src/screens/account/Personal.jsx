import React, { useEffect, useState } from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import Heading from '../../common/Heading';
import {responsiveFontSize} from '../../utility/utility';
import {Colors} from '../../assets/AppColors';
import { useProfile } from '../../redux/ProfileContext';
import apiService from '../../redux/apiService';

const Personal = () => {
  const token = useSelector(state=>state.auth.token)
  const [profileData, setProfileData] = useState({})

  const getProfileData = async () => {
    try {
      const res = await apiService({
        endpoint: 'truck_owner/get/profile',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('personal data Response:', res.data[0]);
      setProfileData(res.data[0]);
    } catch (error) {
      console.error('Company Error:', error);
    }
  };
  useEffect(()=>{
    getProfileData()
  },[token])
  return (
    <View>
      <Heading
        leftIcon={true}
        heading={'Personal Information'}
        rightAction={<Text></Text>}
      />
      <Image
        source={{
          uri: profileData?.profile_image
            ? `https://uat.hindustantruckers.com/storage/app/public/${profileData.profile_image}`
            : 'https://via.placeholder.com/100', 
        }}
        style={styles.profileImage}
      />
      <View style={styles.containerView}>
        <Text style={styles.title}>Full Name</Text>
        <Text style={[styles.nameText, {fontSize: responsiveFontSize(16)}]}>
          {profileData?.UserName || 'User Name'}
        </Text>
        <Text style={styles.title}>Email Address</Text>
        <Text style={[styles.nameText, {fontSize: responsiveFontSize(14)}]}>
          {profileData?.UserEmail || 'example@gmail.com'}
        </Text>
        <Text style={styles.title}>Mobile No.</Text>
        <Text style={[styles.nameText, {fontSize: responsiveFontSize(12)}]}>
          {profileData?.phone || 'N/A'}
        </Text>
      </View>
    </View>
  );
};

export default Personal;
const styles = StyleSheet.create({
  nameText: {
    borderWidth:1,
    borderColor:Colors.borderColor,
    padding:10,
    borderRadius:5
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 50,
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: Colors.borderColor,
    marginVertical: 10,
  },
  title:{
    color:Colors.appColor,
    fontSize:responsiveFontSize(18),
    paddingVertical:10
  },
  containerView:{
    paddingHorizontal:10
  }
});
