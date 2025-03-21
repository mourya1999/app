import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  Alert,
  Image,
} from 'react-native';
import tailwind from 'twrnc';
import DatePicker from 'react-native-date-picker';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import apiService from '../../../redux/apiService';
import Heading from '../../../common/Heading';
import CommonInput from '../../../common/CommonInput';
import CommonDropdown from '../../../common/CommonDropdown';
import {statesAndDistricts} from '../../StateAndDestrict';
import {Colors} from '../../../assets/AppColors';
import {responsiveFontSize} from '../../../utility/utility';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Feather from 'react-native-vector-icons/Feather';
import RNFS from 'react-native-fs';

const Driver = () => {
  const token = useSelector(state => state.auth.token);
  const oldNum = useSelector(state => state.auth.phoneNumber);
  const [step, setStep] = useState(1);
  const progress = useRef(new Animated.Value(1)).current;
  const navigation = useNavigation();
  // Form Data State
  const [uploadedImages, setUploadedImages] = useState({
    DrivingLicenseImage: null,
    WorkPermitDocument: null,
    SelfieImage: null,
    OtherDocument: null,
  });
  const [formData, setFormData] = useState({
    phone: oldNum,
    FirstName: '',
    LastName: '',
    Email: '',
    EmergencyContactNumber: '',
    Address: '',
    State: '',
    City: '',
    CompanyName: '',
    DrivingLicenseNumber: '',
    LicenseExpiryDate: '',
    IsPoliceVerification: 1,
    OtherDocument: uploadedImages.OtherDocument?.base64,
    WorkPermitDocument: uploadedImages.WorkPermitDocument?.base64,
    SelfieImage: uploadedImages.SelfieImage?.base64,
    DrivingLicenseImage: uploadedImages.DrivingLicenseImage?.base64,
  });

  // Dropdown States
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');

  // Date Picker States
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [formattedDate, setFormattedDate] = useState('');

  // Radio Button State
  const [isPoliceVerified, setIsPoliceVerified] = useState('1');

  // console.log('DrivingLicenseImage : ', uploadedImages.DrivingLicenseImage);
  useEffect(() => {
    Animated.timing(progress, {
      toValue: step,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [step]);

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  // Handle Input Changes
  const handleInputChange = (key, value) => {
    setFormData(prevData => ({
      ...prevData,
      [key]: value,
    }));
  };
  // Validation Function
  const validateForm = () => {
    const {
      phone,
      FirstName,
      LastName,
      Email,
      EmergencyContactNumber,
      Address,
      State,
      City,
      CompanyName,
      DrivingLicenseNumber,
      LicenseExpiryDate,
    } = formData;

    if (!phone || !/^\d{10}$/.test(phone)) {
      ToastAndroid.show(
        'Please enter a valid 10-digit phone number.',
        ToastAndroid.SHORT,
      );
      return false;
    }

    if (!FirstName || !LastName) {
      ToastAndroid.show(
        'First Name and Last Name are required.',
        ToastAndroid.SHORT,
      );
      return false;
    }

    if (!Email || !/\S+@\S+\.\S+/.test(Email)) {
      ToastAndroid.show(
        'Please enter a valid email address.',
        ToastAndroid.SHORT,
      );
      return false;
    }

    if (!EmergencyContactNumber || !/^\d{10}$/.test(EmergencyContactNumber)) {
      ToastAndroid.show(
        'Please enter a valid 10-digit emergency contact number.',
        ToastAndroid.SHORT,
      );
      return false;
    }

    if (!Address || !State || !City) {
      ToastAndroid.show(
        'Address, State, and City are required.',
        ToastAndroid.SHORT,
      );
      return false;
    }

    if (!CompanyName || !DrivingLicenseNumber || !LicenseExpiryDate) {
      ToastAndroid.show(
        'Company Name, Driving License Number, and Expiry Date are required.',
        ToastAndroid.SHORT,
      );
      return false;
    }

    return true;
  };

  const showImagePickerOptions = docKey => {
    Alert.alert('Select Image Source', 'Choose an option', [
      {text: 'Camera', onPress: () => pickImage(docKey, 'camera')},
      {text: 'Gallery', onPress: () => pickImage(docKey, 'gallery')},
      {text: 'Cancel', style: 'cancel'},
    ]);
  };
  const pickImage = async (docKey, sourceType) => {
    try {
      const options = {mediaType: 'photo', quality: 1};

      let result;
      if (sourceType === 'camera') {
        result = await launchCamera(options);
      } else {
        result = await launchImageLibrary(options);
      }

      if (result.didCancel) return;

      const uri = result.assets[0].uri;

      // Extract file extension
      const fileName = uri.split('/').pop(); // Get file name
      const fileExtension = fileName.split('.').pop().toLowerCase(); // Extract extension

      // Map file extension to MIME type
      const mimeTypeMap = {
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        png: 'image/png',
        gif: 'image/gif',
        webp: 'image/webp',
      };

      const mimeType = mimeTypeMap[fileExtension] || 'image/jpeg'; // Default to JPEG

      // Convert to Base64
      const base64 = await RNFS.readFile(uri, 'base64');

      // Create Base64 URL with MIME type prefix
      const base64WithPrefix = `data:${mimeType};base64,${base64}`;

      // Store image data
      setUploadedImages(prev => ({
        ...prev,
        [docKey]: {uri, base64: base64WithPrefix},
      }));
    } catch (error) {
      console.error('Image Selection Error:', error);
      Alert.alert('Error', 'Failed to select an image.');
    }
  };

  const renderUploadSection = (docKey, label) => {
    return (
      <View style={styles.uploadContainer}>
        <View style={styles.uploadedPreview}>
          {uploadedImages[docKey]?.uri ? (
            <Image
              source={{uri: uploadedImages[docKey]?.uri}}
              style={styles.uploadedImage}
            />
          ) : (
            <Feather name="upload" color={Colors.appColor} size={65} />
          )}
        </View>

        <>
          
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => showImagePickerOptions(docKey)}>
            <Text style={styles.uploadButtonText}>{`Upload ${label}`}</Text>
          </TouchableOpacity>
        </>
      </View>
    );
  };
  const handleSubmit = async () => {
    console.log('driver formData : ', formData);
    if (!validateForm()) {
      return;
    }
    const data = {
      ...formData,
      DrivingLicenseImage: uploadedImages.DrivingLicenseImage,
      WorkPermitDocument: uploadedImages?.WorkPermitDocument,
      SelfieImage: uploadedImages?.SelfieImage,
      OtherDocument: uploadedImages?.OtherDocument,
    };
    try {
      const res = await apiService({
        endpoint: 'truck_owner/driver/registration',
        method: 'POST',
        data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('formData', formData);
      console.log('API Response:', res.data);
      ToastAndroid.show('Driver registered successfully!', ToastAndroid.SHORT);
      navigation.navigate('EnterNumber');
    } catch (error) {
      console.log('Driver registration error:', error);
      ToastAndroid.show(
        'Failed to register Driver. Please try again.',
        ToastAndroid.SHORT,
      );
    }
  };
  return (
    <>
      <Heading
        leftIcon={true}
        heading={'Driver Registrations '}
        rightAction={<Text></Text>}
      />

      <View style={styles.container}>
        {/* Step Indicator */}
        <View style={styles.stepContainer}>
          {[1, 2, 3].map((item, index) => (
            <View key={index} style={styles.stepWrapper}>
              <View
                style={tailwind`border ${
                  step >= item ? 'border-teal-700' : 'border-[#000]'
                } p-[2px] rounded-full`}>
                <View
                  style={[styles.circle, step >= item && styles.activeCircle]}
                />
              </View>
              {index < 1 && (
                <Animated.View
                  style={[
                    styles.line,
                    {
                      position: 'absolute',
                      top: '50%',
                      left: '100%',
                      right: '100%',
                      transform: [{translateY: -1}],
                      width: 90,
                      height: 2,
                      backgroundColor: progress.interpolate({
                        inputRange: [1, 2],
                        outputRange: ['#000', '#33b2a5'],
                      }),
                    },
                  ]}
                />
              )}
            </View>
          ))}
        </View>

        {/* Form Content */}
        {step === 1 && (
          <ScrollView>
            <View style={styles.form}>
              <CommonInput
                label={'First Name *'}
                placeholder={'Enter First Name'}
                value={formData.FirstName}
                onChangeText={text => handleInputChange('FirstName', text)}
              />
              <CommonInput
                label={'Last Name *'}
                placeholder={'Enter Last Name'}
                value={formData.LastName}
                onChangeText={text => handleInputChange('LastName', text)}
              />
              <CommonInput
                label={'Phone *'}
                placeholder={'Enter Phone Number'}
                value={oldNum}
                onChangeText={text => handleInputChange('phone', text)}
                keyboardType="numeric"
              />
              <CommonInput
                label={'Email *'}
                placeholder={'Enter Email'}
                value={formData.Email}
                onChangeText={text => handleInputChange('Email', text)}
                // keyboardType="email-address"
              />
              <CommonInput
                label={'Emergency Contact Number *'}
                placeholder={'Enter Emergency Contact Number'}
                value={formData.EmergencyContactNumber}
                onChangeText={text =>
                  handleInputChange('EmergencyContactNumber', text)
                }
                keyboardType="numeric"
              />
              <CommonInput
                label={'Address *'}
                placeholder={'Enter Address'}
                value={formData.Address}
                onChangeText={text => handleInputChange('Address', text)}
              />
              <CommonDropdown
                label={'Select State *'}
                placeholder={'State'}
                options={Object.keys(statesAndDistricts)}
                onSelect={state => {
                  setSelectedState(state);
                  setSelectedCity(null);
                  handleInputChange('State', state);
                }}
                value={selectedState}
              />
              <CommonDropdown
                label={'Select City *'}
                placeholder={'City'}
                options={statesAndDistricts[selectedState] || []}
                onSelect={city => {
                  setSelectedCity(city);
                  handleInputChange('City', city);
                }}
                value={selectedCity}
              />
            </View>
          </ScrollView>
        )}

        {step === 2 && (
          <ScrollView>
            <View style={styles.form}>
              <CommonInput
                label={'Company Name *'}
                placeholder={'Enter Company Name'}
                value={formData.CompanyName}
                onChangeText={text => handleInputChange('CompanyName', text)}
              />
              <CommonInput
                label={'Driving License Number *'}
                placeholder={'Enter Driving License Number'}
                value={formData.DrivingLicenseNumber}
                onChangeText={text =>
                  handleInputChange('DrivingLicenseNumber', text)
                }
              />
              <CommonInput
                label={'License Expiry Date *'}
                placeholder={'Select License Expiry Date'}
                value={formattedDate}
                onPressRightIcon={() => setOpen(true)}
                rightIcon="calendar-outline"
              />
              <DatePicker
                modal
                open={open}
                date={date}
                mode="date"
                onConfirm={selectedDate => {
                  setOpen(false);
                  setDate(selectedDate);

                  const formatted = selectedDate
                    .toLocaleDateString('en-GB')
                    .split('/')
                    .join('-');
                  setFormattedDate(formatted);
                  handleInputChange('LicenseExpiryDate', formatted);
                }}
                onCancel={() => setOpen(false)}
              />

              <View style={styles.radioGroup}>
                <Text style={styles.radioLabel}>Police Verification:</Text>
                <TouchableOpacity
                  onPress={() => setIsPoliceVerified('1')}
                  style={tailwind`flex-row items-center`}>
                  <View
                    style={tailwind`w-6 h-6 border-2 ${
                      isPoliceVerified === '1'
                        ? 'border-teal-500'
                        : 'border-gray-600'
                    } rounded-full items-center justify-center`}>
                    {isPoliceVerified === '1' && (
                      <View
                        style={tailwind`w-3 h-3 bg-teal-500 rounded-full`}
                      />
                    )}
                  </View>
                  <Text style={styles.radioText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setIsPoliceVerified('0')}
                  style={tailwind`flex-row items-center mt-1`}>
                  <View
                    style={tailwind`w-6 h-6 border-2 ${
                      isPoliceVerified === '0'
                        ? 'border-teal-500'
                        : 'border-gray-600'
                    } rounded-full items-center justify-center`}>
                    {isPoliceVerified === '0' && (
                      <View
                        style={tailwind`w-3 h-3 bg-teal-500 rounded-full`}
                      />
                    )}
                  </View>
                  <Text style={styles.radioText}>No</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        )}

        {step === 3 && (
          <ScrollView>
            {renderUploadSection(
              'DrivingLicenseImage',
              'Driving License Image',
            )}
            {renderUploadSection('SelfieImage', 'Selfie Image')}
            {renderUploadSection('WorkPermitDocument', 'Work PermitDocument')}
            {renderUploadSection('OtherDocument', 'Other Document')}
          </ScrollView>
        )}
        {/* Navigation Buttons */}
        <View style={styles.buttonContainer}>
          {step > 1 && (
            <TouchableOpacity
              onPress={handleBack}
              style={styles.buttonSecondary}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={step === 3 ? handleSubmit : handleNext}
            style={styles.button}>
            <Text style={styles.buttonText}>
              {step === 3 ? 'Submit' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <DatePicker
        modal
        open={open}
        date={date}
        mode="date"
        onConfirm={selectedDate => {
          setOpen(false);
          setDate(selectedDate);

          // Format Date to "DD-MM-YYYY"
          const formatted = selectedDate
            .toLocaleDateString('en-GB')
            .split('/')
            .reverse()
            .join('-');
          setFormattedDate(formatted);
        }}
        onCancel={() => setOpen(false)}
      />
    </>
  );
};

export default Driver;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: responsiveFontSize(22),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 100,
  },
  stepWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  circle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
  },
  activeCircle: {
    borderColor: '#33b2a5',
    backgroundColor: '#33b2a5',
  },
  line: {
    height: 2,
    marginHorizontal: 5,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
  },
  heading: {
    fontSize: responsiveFontSize(18),
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: responsiveFontSize(16),
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    width: '100%',
    gap: 12,
  },
  button: {
    backgroundColor: '#33b2a5',
    padding: 15,
    borderRadius: 8,
    flex: 0.45,
  },
  buttonSecondary: {
    backgroundColor: '#ccc',
    padding: 15,
    borderRadius: 8,
    flex: 0.45,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
    fontSize: responsiveFontSize(16),
  },
  datePickerButton: {
    borderWidth: 1,
    borderColor: Colors.borderColor,
  },
  containerView: {
    paddingHorizontal: 10,
    marginBottom: '20%',
  },
  uploadContainer: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadedText: {
    color: 'green',
    fontSize: responsiveFontSize(16),
    marginTop: 5,
  },
  errorText: {
    color: 'red',
    fontSize: responsiveFontSize(14),
    marginTop: 5,
  },
  uploadedPreview: {
    alignItems: 'center',
  },
  uploadedImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  uploadButton: {
    backgroundColor: Colors.appColor,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  uploadButtonText: {
    color: 'white',
    fontSize: responsiveFontSize(16),
  },
});
