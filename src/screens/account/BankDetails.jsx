import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useSelector} from 'react-redux';
import Heading from '../../common/Heading';
import {responsiveFontSize} from '../../utility/utility';
import {Colors} from '../../assets/AppColors';
import CommonInput from '../../common/CommonInput';
import CommonButton from '../../common/CommonButton';
import tailwind from 'twrnc';
import apiService from '../../redux/apiService';
import ImagePickerComponent from '../../common/ImagePickerComponent';

const BankDetails = () => {
  const token = useSelector(state => state.auth.token);
  const [bankDetailData, setBankDetailData] = useState({});
  const [input, setInput] = useState({
    bank_name: '',
    account_number: '',
    ifsc_code: '',
    account_holder: '',
  });
  const [imageBase64, setImageBase64] = useState(null);
  const [imgName, setImgName] = useState('');
  // Fetch bank details
  const getBankDetail = async () => {
    try {
      const res = await apiService({
        endpoint: 'truck_owner/get/bank_details',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('Bank Detail Response:', res.data);
      setBankDetailData(res.data);
    } catch (error) {
      console.error('Company Error:', error);
    }
  };

  useEffect(() => {
    getBankDetail();
  }, []);

  useEffect(() => {
    if (bankDetailData) {
      setInput(prevInput => ({
        ...prevInput,
        bank_name: bankDetailData.bank_name || prevInput.bank_name,
        account_number:
          bankDetailData.account_number || prevInput.account_number,
        ifsc_code: bankDetailData.ifsc_code || prevInput.ifsc_code,
        account_holder:
          bankDetailData.account_holder || prevInput.account_holder,
      }));
    }
  }, [bankDetailData]);

  // Handle input change
  const handleChange = (name, value) => {
    setInput(prevInput => ({
      ...prevInput,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    const data = {
      ...input,
      verification_file: imageBase64,
    };
    try {
      const res = await apiService({
        endpoint: 'truck_owner/add/bank_details',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data,
      });
      Alert.alert('Success', 'Bank details updated successfully!');
      console.log('Update Response:', res.data);
    } catch (error) {
      console.error('Update Error:', error);
      Alert.alert('Error', 'Failed to update bank details.');
    }
  };

  return (
    <>
      <Heading
        leftIcon={true}
        heading={'Bank Details'}
        rightAction={<Text></Text>}
      />
      <ScrollView style={tailwind`px-2 py-3`}>
        <CommonInput
          placeholder={'Bank Name'}
          value={input.bank_name}
          onChangeText={text => handleChange('bank_name', text)}
        />
        <CommonInput
          placeholder={'Account Number'}
          value={input.account_number}
          onChangeText={text => handleChange('account_number', text)}
        />
        <CommonInput
          placeholder={'IFSC Code'}
          value={input.ifsc_code}
          onChangeText={text => handleChange('ifsc_code', text)}
        />
        <CommonInput
          placeholder={'Account Holder Name'}
          value={input.account_holder}
          onChangeText={text => handleChange('account_holder', text)}
        />

        <ImagePickerComponent
          buttonTitle="Upload Passbook"
          imageBase64={imageBase64}
          setImageBase64={setImageBase64}
          imgName={imgName}
          setImgName={setImgName}
        />
        <CommonButton
          title={'Submit'}
          textColor={'#fff'}
          backgroundColor={Colors.appColor}
          onPress={handleSubmit}
        />
      </ScrollView>
    </>
  );
};

export default BankDetails;

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
  uploadButton: {
    backgroundColor: Colors.appColor,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  uploadText: {
    color: '#fff',
    fontSize: responsiveFontSize(16),
  },
  previewImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    alignSelf: 'center',
    marginVertical: 10,
  },
});
