import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';
import Heading from '../../common/Heading';
import {responsiveFontSize} from '../../utility/utility';
import {Colors} from '../../assets/AppColors';

const BankDetails = () => {
  const profileData = useSelector(state => state.auth);

  return (
    <View>
      <Heading
        leftIcon={true}
        heading={'Bank Details'}
        rightAction={<Text></Text>}
      />
      <View style={styles.containerView}>
        <Text style={styles.title}>Full Name</Text>
        <Text style={[styles.nameText, {fontSize: responsiveFontSize(16)}]}>
          {profileData?.UserName || 'User Name'}
        </Text>
        <Text style={styles.title}>Email Address</Text>
        <Text style={[styles.nameText, {fontSize: responsiveFontSize(14)}]}>
          {profileData?.Email || 'example@gmail.com'}
        </Text>
        <Text style={styles.title}>Mobile No.</Text>
        <Text style={[styles.nameText, {fontSize: responsiveFontSize(12)}]}>
          {profileData?.phone || 'N/A'}
        </Text>
      </View>
    </View>
  );
};

export default BankDetails;
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
