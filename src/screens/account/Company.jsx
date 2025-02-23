import React, {Component, useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {responsiveFontSize} from '../../utility/utility';
import {useSelector} from 'react-redux';
import Heading from '../../common/Heading';
import { Colors } from '../../assets/AppColors';
import apiService from '../../redux/apiService';

const Company = () => {
  const token = useSelector(state => state.auth.token);
  const [companyData, setCompanyData] = useState({})
  const getCompany = async () => {
    try {
      const res = await apiService({
        endpoint: "truck_owner/get/company/details",
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("conpany Response:", res.data[0]);
      setCompanyData(res.data[0])

    } catch (error) {
      console.error("conpany Error:", error);
    } 
  };
  useEffect(() => {
    getCompany()
  }, [])
  return (
    <View>
      <Heading
        leftIcon={true}
        heading={'Company Informations'}
        rightAction={<Text></Text>}
      />
      <View style={styles.containerView}>
        <Text style={styles.title}>Company Name</Text>
        <Text style={[styles.nameText, {fontSize: responsiveFontSize(16)}]}>
          {companyData?.CompanyName || 'xyz'}
        </Text>
        <Text style={styles.title}>Conpany State</Text>
        <Text style={[styles.nameText, {fontSize: responsiveFontSize(14)}]}>
          {companyData?.CompanyState || 'mp'}
        </Text>
        <Text style={styles.title}>Company city</Text>
        <Text style={[styles.nameText, {fontSize: responsiveFontSize(12)}]}>
          {companyData?.CompanyCity || 'N/A'}
        </Text>
        <Text style={styles.title}>Pincode</Text>
        <Text style={[styles.nameText, {fontSize: responsiveFontSize(12)}]}>
          {companyData?.CompanyPincode || 'N/A'}
        </Text>
        <Text style={styles.title}>Gst No</Text>
        <Text style={[styles.nameText, {fontSize: responsiveFontSize(12)}]}>
          {companyData?.GstinNumber || 'N/A'}
        </Text>
      </View>
    </View>
  );
};

export default Company;
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
