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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const BankDetails = () => {
  const token = useSelector(state => state.auth.token);
  const navigation = useNavigation();
  const [bankDetailData, setBankDetailData] = useState({});
  const [input, setInput] = useState({
    bank_name: '',
    account_number: '',
    ifsc_code: '',
    account_holder: '',
  });
  const [imageBase64, setImageBase64] = useState(null);
  const [imgName, setImgName] = useState('');

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
      if (bankDetailData.verification_file) {
        setImageBase64(bankDetailData.verification_file);
      }
    }
  }, [bankDetailData]);

  const handleChange = (name, value) => {
    setInput(prevInput => ({
      ...prevInput,
      [name]: value,
    }));
  };

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
      navigation.goBack();
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

        {imageBase64 ? (
          <View style={styles.uploadContainer}>
            <MaterialIcons name="check-circle" size={40} color="green" />
            <Text style={styles.uploadText}>File Uploaded</Text>
          </View>
        ) : (
          <ImagePickerComponent
            buttonTitle="Upload Passbook"
            imageBase64={imageBase64}
            setImageBase64={setImageBase64}
            imgName={imgName}
            setImgName={setImgName}
          />
        )}
        {bankDetailData.verified_status !== 0 && (
          <CommonButton
            title={'Submit'}
            textColor={'#fff'}
            backgroundColor={Colors.appColor}
            onPress={handleSubmit}
          />
        )}
      </ScrollView>
    </>
  );
};

export default BankDetails;

const styles = StyleSheet.create({
  uploadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  uploadText: {
    color: 'green',
    fontSize: responsiveFontSize(16),
    marginLeft: 10,
  },
});
