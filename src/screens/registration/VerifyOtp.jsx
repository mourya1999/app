import React, { useState, useEffect } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ToastAndroid,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../assets/AppColors';
import SpaceBetween from '../../common/SpaceBetween';
import apiService from '../../redux/apiService';
import { useDispatch, useSelector } from 'react-redux';
import CommonButton from '../../common/CommonButton';
import { saveOwner, saveRole, saveToken } from '../../redux/AuthSlice';
import { OtpInput } from "react-native-otp-entry";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { responsiveFontSize } from '../../utility/utility';

const VerifyOtp = ({ navigation }) => {
  const dispatch = useDispatch();
  const oldNum = useSelector((state) => state.auth.phoneNumber);
  const [timer, setTimer] = useState(210);
  const [enteredOtp, setEnteredOtp] = useState(''); // State to store the OTP

  // Handle OTP submission
  const handleOtpSubmit = async () => {
    try {
      // if (enteredOtp.length !== 4) {
      //   Alert.alert('Error', 'Please enter a valid 4-digit OTP.');
      //   return;
      // }
// owner 9616027387
// driver 7800106847
      const requestData = {
        phone: oldNum, 
        otp: enteredOtp,
        source: 'truck_owner_app',
      };
      console.log("Request Data:", requestData);

      const response = await apiService({
        endpoint: 'truck_owner/verify/otp',
        method: 'POST',
        data: requestData,
      });

      console.log("API Response:", response);
      dispatch(saveToken(response.access_token));
      AsyncStorage.setItem("storeToken", response.access_token)
      if (response.user_type === "new") {
        Alert.alert('Success', `New user ${response?.message}` || 'OTP verified successfully!');
        navigation.navigate('SelectUser');
      } else if (response.user_type === "old" && response.data?.role_name === "Driver") {
        navigation.navigate("AppTabs");
        dispatch(saveRole(response.data?.role_name))
      } else if (response.user_type === "old" && response.data?.role_name === "Truck Owner") {
        navigation.navigate("AppTabs");
      }
    } catch (error) {
      console.error('Error verifying OTP:', error);
      // Alert.alert('Error', error.message || 'Something went wrong. Please try again.');
    }
  };

  // Handle timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/img/registration/verify.png')}
        style={styles.image}
      />
      <Text style={styles.title}>Please Enter{'\n'}OTP Verification</Text>
      <Text style={styles.subtitle}>
        Code was sent to {oldNum ? oldNum : "+91 9999 999**9"}{' '}
        <Text onPress={() => navigation.navigate('EnterNumber')} style={styles.linkText}>
          edit
        </Text>
      </Text>
      <Text style={styles.inputLabel}>
        This code will expire in{' '}
        <Text style={{ fontWeight: '900' }}>{Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</Text>
      </Text>

      {/* OTP Input Field */}
      <OtpInput
        numberOfDigits={4}
        focusColor={Colors.appColor}
        autoFocus={false}
        hideStick={true}
        placeholder=""
        blurOnFilled={true}
        disabled={false}
        type="numeric"
        secureTextEntry={false}
        focusStickBlinkingDuration={500}
        onFocus={() => console.log("Focused")}
        onBlur={() => console.log("Blurred")}
        onTextChange={(text) => console.log(`Current OTP: ${text}`)}
        onFilled={(text) => {
          setEnteredOtp(text); // Update state with the complete OTP
          handleOtpSubmit(); // Auto-submit when OTP is filled
        }}
        textInputProps={{
          accessibilityLabel: "One-Time Password",
        }}
        style={styles.otpContainer} // Style for the container
        textInputStyle={styles.otpInput}
      />

      {/* Resend Section */}
      <SpaceBetween>
        <Text style={{ color: Colors.textDark }}>Didn't receive OTP?</Text>
        <TouchableOpacity onPress={() => setTimer(210)} style={styles.resendContainer}>
          <Text style={styles.resendText}>
            <Ionicons name="refresh" size={14} color={Colors.appColor} /> Refresh
          </Text>
        </TouchableOpacity>
      </SpaceBetween>

      {/* Verify Button */}
      <CommonButton
        textColor="#fff"
        buttonStyle={{ marginTop: '10%' }}
        backgroundColor={Colors.appColor}
        title="Verify OTP"
        onPress={handleOtpSubmit}
      />
    </View>
  );
};

export default VerifyOtp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 93,
    height: 93,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: responsiveFontSize(30),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Poppins-Black',
    lineHeight: 36,
    letterSpacing: 3,
    paddingBottom: '4%',
    color: Colors.textDark,
  },
  subtitle: {
    fontSize: responsiveFontSize(14),
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Poppins-Black',
    color: Colors.textLight,
  },
  inputLabel: {
    fontSize: responsiveFontSize(14),
    fontWeight: '500',
    color: Colors.textDark,
    marginBottom: 20,
    textAlign: 'center',
    fontFamily: 'Poppins-Black',
  },
  resendContainer: {
    marginBottom: 20,
  },
  resendText: {
    color: Colors.appColor,
    fontSize: responsiveFontSize(14),
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'Poppins-Black',
  },
  linkText: {
    color: Colors.appColor,
    textDecorationLine: 'underline',
    fontFamily: 'Poppins-Black',
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: '15%',
    width: '80%',
  },
  otpInput: {
    width: 70,
    height: 70,
    borderWidth: 2,
    borderColor: "red", // Default border color
    borderRadius: 10,
    textAlign: 'center',
    fontSize: responsiveFontSize(18),
    fontWeight: 'bold',
    color: '#333',
  },
});