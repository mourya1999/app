import React, {useEffect, useState} from 'react';
import {Alert, ScrollView, StyleSheet, Text, View} from 'react-native';
import apiService from '../../redux/apiService';
import {useSelector} from 'react-redux';
import {responsiveFontSize} from '../../utility/utility';
import Heading from '../../common/Heading';
import {Colors} from '../../assets/AppColors';
import tailwind from 'twrnc';
import ImagePickerComponent from '../../common/ImagePickerComponent';
import Feather from 'react-native-vector-icons/Feather';
import CommonInput from '../../common/CommonInput';
import CommonButton from '../../common/CommonButton';

const KYCScreen = () => {
  const token = useSelector(state => state.auth.token);
  const [kycInfo, setKycInfo] = useState({});
  const [imageUri, setImageUri] = useState(null);
  const [imageUriPan, setImageUriPan] = useState(null);
  const [imageUriGST, setImageUriGST] = useState(null);
  const [imageBase64Aadhar, setImageBase64Aadhar] = useState(null);
  const [imageBase64Pan, setImageBase64Pan] = useState(null);
  const [imageBase64GST, setImageBase64GST] = useState(null);
  const [gstNumber, setGstNumber] = useState('');

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
      console.error('Company Error:', error);
    }
  };

  useEffect(() => {
    getKYCDetails();
  }, []);

  const handleSubmit = async () => {
    const data = {
      gst_no: kycInfo?.GstinNumber ? kycInfo?.GstinNumber : gstNumber,
      gst_file: imageBase64GST,
    };
console.log("gst data : ", data)
    try {
      const res = await apiService({
        endpoint: 'truck_owner/upload/kyc/documents',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data,
      });
      Alert.alert('Success', 'KYC details updated successfully!');
      console.log('Update gst Response:', res.data);
    } catch (error) {
      console.error('Update Error:', error);
      Alert.alert('Error', 'Failed to update bank details.');
    }
  };

  useEffect(() => {
    if (kycInfo?.GstinNumber) {
      setGstNumber({
        gst_no: kycInfo?.GstinNumber || gstNumber,
      });
    }
  }, [token]);
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
          style={tailwind`w-full h-70 mt-2 flex items-center justify-center border border-[${Colors.borderColor}] rounded-lg`}>
          {!imageUri && (
            <Feather name="download" color={Colors.appColor} size={80} />
          )}
          <ImagePickerComponent
            buttonTitle="Upload Aadhar"
            imgName={imageUri}
            setImgName={setImageUri}
            imageBase64={imageBase64Aadhar}
            setImageBase64={setImageBase64Aadhar}
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
          style={tailwind`w-full h-70 mt-2 flex items-center justify-center border border-[${Colors.borderColor}] rounded-lg`}>
          {!imageUriPan && (
            <Feather name="download" color={Colors.appColor} size={80} />
          )}
          <ImagePickerComponent
            buttonTitle="Upload Pan"
            imgName={imageUriPan}
            setImgName={setImageUriPan}
            imageBase64={imageBase64Pan}
            setImageBase64={setImageBase64Pan}
            disabled={kycInfo.IsPanVerify === 1 ? false : true}
          />
          <Text style={tailwind`text-orange-400`}>
            Pan {kycInfo.pan_verification_status || 'N/A'}
          </Text>
        </View>
        <Text style={styles.title}>GST Number</Text>
        {/* <Text style={[styles.nameText, {fontSize: responsiveFontSize(12)}]}>
          {kycInfo?.GstinNumber || 'N/A'}
        </Text> */}
        <CommonInput
          value={gstNumber}
          onChangeText={e => setGstNumber(e)}
          // editable={!kycInfo?.GstinNumber} // Disable input if GST number already exists
        />

        <View
          style={tailwind`w-full h-70 mt-2 flex items-center justify-center border border-[${Colors.borderColor}] rounded-lg`}>
          {!imageUriGST && (
            <Feather name="download" color={Colors.appColor} size={80} />
          )}
          <ImagePickerComponent
            buttonTitle="Upload GST"
            imgName={imageUriGST}
            setImgName={setImageUriGST}
            imageBase64={imageBase64GST}
            setImageBase64={setImageBase64GST}
            // disabled={kycInfo.IsGSTVerify === 1 ? false : true}
          />
          <Text style={tailwind`text-orange-400`}>
            GST {kycInfo.gstin_verification_status || 'N/A'}
          </Text>
        </View>
        <CommonButton
          title={'Submit'}
          textColor={'#fff'}
          backgroundColor={Colors.appColor}
          onPress={handleSubmit}
        />
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
    marginBottom: '20%',
  },
});
