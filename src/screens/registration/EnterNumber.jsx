import {
  Alert,
  Dimensions,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { Colors } from '../../assets/AppColors';
import Fontisto from 'react-native-vector-icons/Fontisto';
import AntDesign from 'react-native-vector-icons/AntDesign';
import apiService from '../../redux/apiService';
import { useDispatch } from 'react-redux';
import { savePhoneNumber } from '../../redux/AuthSlice';
import { useNavigation } from '@react-navigation/native';
import { responsiveFontSize } from '../../utility/utility';

const {height, width} = Dimensions.get("screen")
const EnterNumber = () => {
  const navigation = useNavigation()
  const dispatch = useDispatch();
  const [number, setNumber] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false)

  const handleSendOtp = async () => {
    setLoading(true)
    const data = {
      //// driver
      // phone: "7800106847",
      //// owner
      // phone: "9616027387",
      phone: number,
    };
    if (!isChecked) {
      Alert.alert('please check terms and condition');
      return
    }
    try {
      const res = await apiService({
        endpoint: 'truck_owner/send/otp',
        method: 'POST',
        data,
      });
      dispatch(savePhoneNumber(number));
      setLoading(false)
      ToastAndroid.show(
        res.message || 'OTP sent successfully!',
        ToastAndroid.SHORT,
      );

      navigation.navigate('VerifyOtp', number);
    } catch (error) {
      setLoading(false)
      console.error('Error sending OTP:', error);
      ToastAndroid.show(
        error.message || 'Failed to send OTP. Please try again.',
        ToastAndroid.SHORT,
      );
    }
  };

  return (
    <View
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
    
        <View>
          <Image
            source={require('../../assets/img/registration/verifyIntro.png')}
            style={styles.image}
          />
        </View>

        <View>
          <Text style={styles.title}>Welcome to{'\n'}Hindustan Truckers</Text>
          <Text style={styles.subtitle}>
            Get best in Class Transport Service with easy booking and User
            Friendly experience
          </Text>
        </View>

        <View>
          <Text style={styles.inputLabel}>Please Enter your Mobile Number</Text>
          <Text style={styles.description}>We will send you a 4 digit OTP</Text>
        </View>

        <KeyboardAvoidingView>
          <View style={styles.inputContainer}>
            <TextInput style={styles.countryCodeInput} value="+91" />
            <TextInput
              style={styles.mobileInput}
              placeholder="Mobile Number"
              keyboardType="numeric"
              value={number}
              onChangeText={setNumber}
            />
          </View>
        </KeyboardAvoidingView>
        <TouchableOpacity style={styles.button} onPress={handleSendOtp}>
          <Text style={styles.buttonText}>{loading ? "Loading..." :"Send OTP"}</Text>
        </TouchableOpacity>

        <Text style={styles.termsText}>
          {isChecked ? (
            <AntDesign name="checksquare" size={18} color={Colors.appColor} />
          ) : (
            <Fontisto
              name={'checkbox-passive'}
              size={14}
              color={Colors.appColor}
              onPress={() => setIsChecked(true)}
            />
          )}{' '}
          By continuing, I agree to the
          <Text style={styles.linkText}>Terms and Conditions</Text>
          {' '}and <Text style={styles.linkText}>Privacy Policy</Text>.
        </Text>
    </View>
  );
};

export default EnterNumber;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    height:height
  },

  image: {
    // width: 300,
    height: 150,
    resizeMode: 'contain',
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    fontFamily: 'Poppins-Black',
  },
  title: {
    fontSize: responsiveFontSize(30),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    fontFamily: 'Poppins-Black',
  },
  subtitle: {
    fontSize: responsiveFontSize(16),
    color: '#666',
    marginBottom: '15%',
    fontFamily: 'Poppins-Black',
  },
  inputLabel: {
    fontSize: responsiveFontSize(16),
    fontWeight: '500',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
    fontFamily: 'Poppins-Black',
  },
  description: {
    fontSize: responsiveFontSize(14),
    color: '#666',
    marginBottom: 15,
    textAlign: 'center',
    fontFamily: 'Poppins-Black',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 20,
    width: '100%',
  },
  countryCodeInput: {
    fontSize: responsiveFontSize(16),
    fontWeight: '500',
    color: '#333',
    width: 50,
    textAlign: 'center',
    borderRightWidth: 1,
    borderRightColor: '#ccc',
    paddingVertical: 10,
  },
  mobileInput: {
    flex: 1,
    fontSize: responsiveFontSize(16),
    paddingVertical: 10,
    paddingHorizontal: 10,
    color: '#333',
  },
  button: {
    backgroundColor: Colors.appColor,
    borderRadius: 5,
    paddingVertical: 15,
    paddingHorizontal: 50,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: responsiveFontSize(18),
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Poppins-Black',
  },
  termsText: {
    fontSize: responsiveFontSize(12),
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
    fontFamily: 'Poppins-Black',
    marginBottom: 20,
  },
  linkText: {
    color: Colors.appColor,
    fontFamily: 'Poppins-Black',
  },
});
