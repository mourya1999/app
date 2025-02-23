import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import apiService from '../../redux/apiService';
import {useSelector} from 'react-redux';
import {responsiveFontSize} from '../../utility/utility';
import Heading from '../../common/Heading';
import {Colors} from '../../assets/AppColors';
import tailwind from 'twrnc';
import ImagePickerComponent from '../../common/ImagePickerComponent';
import Feather from 'react-native-vector-icons/Feather';

const KYCScreen = () => {
  const token = useSelector(state => state.auth.token);
  const [kycInfo, setKycInfo] = useState({});
  const [imageUri, setImageUri] = useState(null);
  const [imageUriPan, setImageUriPan] = useState(null);
  const [imageUriGST, setImageUriGST] = useState(null);
  const getKYCDetails = async () => {
    try {
      const res = await apiService({
        endpoint: 'truck_owner/get/kyc/status',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('kyc Response:', res);
      setKycInfo(res);
    } catch (error) {
      console.error('conpany Error:', error);
    }
  };
  useEffect(() => {
    getKYCDetails();
  }, []);
  return (
    <View>
      <Heading
        leftIcon={true}
        heading={'KYC Information'}
        rightAction={<Text></Text>}
      />
      <ScrollView style={styles.containerView}>
        <Text style={styles.title}>Aadhar Number</Text>
        <Text style={[styles.nameText, {fontSize: responsiveFontSize(16)}]}>
          {kycInfo?.AadharNumber || '0000-0000-0000-0000'}
        </Text>
        <View
          style={tailwind`w-full h-50 mt-2 flex items-center justify-center border border-[${Colors.borderColor}] rounded-lg`}>
          <Feather name="download" color={Colors.appColor} size={80} />
          <ImagePickerComponent
            buttonTitle="Upload Aadhar"
            imageUri={imageUri}
            setImageUri={setImageUri}
            disabled={kycInfo.IsAadharVerify === 1 ? false : true}
          />
          <Text style={tailwind`text-orange-400`}>
            Aadhar {kycInfo.aadhar_verification_status || 'N/A'}
          </Text>
        </View>
        <Text style={styles.title}>Pan Number</Text>
        <Text style={[styles.nameText, {fontSize: responsiveFontSize(14)}]}>
          {kycInfo?.PanNumber || 'JG899GBJ09'}
        </Text>
        <View
          style={tailwind`w-full h-50 mt-2 flex items-center justify-center border border-[${Colors.borderColor}] rounded-lg`}>
          <Feather name="download" color={Colors.appColor} size={80} />
          <ImagePickerComponent
            buttonTitle="Pan Aadhar"
            imageUri={imageUriPan}
            setImageUri={setImageUriPan}
            disabled={kycInfo.IsPanVerify === 1 ? false : true}
          />
          <Text style={tailwind`text-orange-400`}>
            Pan {kycInfo.pan_verification_status || 'N/A'}
          </Text>
        </View>
        <Text style={styles.title}>GST Number</Text>
        <Text style={[styles.nameText, {fontSize: responsiveFontSize(12)}]}>
          {kycInfo?.GstinNumber || 'N/A'}
        </Text>
        <View
          style={tailwind`w-full h-50 mt-2 mb-16 flex items-center justify-center border border-[${Colors.borderColor}] rounded-lg`}>
          <Feather name="download" color={Colors.appColor} size={80} />
          <ImagePickerComponent
            buttonTitle="GST Aadhar"
            imageUri={imageUriGST}
            setImageUri={setImageUriGST}
            disabled={kycInfo.IsGSTVerify === 1 ? false : true}
          />
          <Text style={tailwind`text-orange-400`}>
            Aadhar {kycInfo.gstin_verification_status || 'N/A'}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default KYCScreen;
const styles = StyleSheet.create({
  nameText: {
    borderWidth: 1,
    borderColor: Colors.borderColor,
    padding: 10,
    borderRadius: 5,
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
  title: {
    color: Colors.appColor,
    fontSize: responsiveFontSize(18),
    paddingVertical: 10,
  },
  containerView: {
    paddingHorizontal: 10,
  },
});