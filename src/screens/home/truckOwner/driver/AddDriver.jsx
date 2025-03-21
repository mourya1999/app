// import React, {useState, useRef, useEffect} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Animated,
//   StyleSheet,
//   ScrollView,
//   ToastAndroid,
// } from 'react-native';
// import tailwind from 'twrnc';
// import Heading from '../../../../common/Heading';
// import CommonInput from '../../../../common/CommonInput';
// import {responsiveFontSize} from '../../../../utility/utility';
// import CommonDropdown from '../../../../common/CommonDropdown';
// import {statesAndDistricts} from '../../../StateAndDestrict';
// import Icon from 'react-native-vector-icons/Fontisto';
// import {Colors} from '../../../../assets/AppColors';
// import DatePicker from 'react-native-date-picker';
// import {useSelector} from 'react-redux';
// import apiService from '../../../../redux/apiService';
// import { useNavigation } from '@react-navigation/native';

// const AddDriver = () => {
//   const token = useSelector(state => state.auth.token);
//   const [step, setStep] = useState(1);
//   const progress = useRef(new Animated.Value(1)).current;
//   const navigation = useNavigation()
//   // Form Data State
//   const [formData, setFormData] = useState({
//     phone: '',
//     FirstName: '',
//     LastName: '',
//     Email: '',
//     EmergencyContactNumber: '',
//     Address: '',
//     State: '',
//     City: '',
//     CompanyName: '',
//     DrivingLicenseNumber: '',
//     LicenseExpiryDate: '',
//     IsPoliceVerification: 1,
//   });

//   // Dropdown States
//   const [selectedState, setSelectedState] = useState('');
//   const [selectedCity, setSelectedCity] = useState('');

//   // Date Picker States
//   const [open, setOpen] = useState(false);
//   const [date, setDate] = useState(new Date());
//   const [formattedDate, setFormattedDate] = useState('');

//   // Radio Button State
//   const [isPoliceVerified, setIsPoliceVerified] = useState("1");

//   useEffect(() => {
//     Animated.timing(progress, {
//       toValue: step,
//       duration: 500,
//       useNativeDriver: false,
//     }).start();
//   }, [step]);

//   const handleNext = () => {
//     if (step < 2) setStep(step + 1);
//   };

//   const handleBack = () => {
//     if (step > 1) setStep(step - 1);
//   };

//   // Handle Input Changes
//   const handleInputChange = (key, value) => {
//     setFormData(prevData => ({
//       ...prevData,
//       [key]: value,
//     }));
//   };
//   // Validation Function
//   const validateForm = () => {
//     const {
//       phone,
//       FirstName,
//       LastName,
//       Email,
//       EmergencyContactNumber,
//       Address,
//       State,
//       City,
//       CompanyName,
//       DrivingLicenseNumber,
//       LicenseExpiryDate,
//     } = formData;

//     if (!phone || !/^\d{10}$/.test(phone)) {
//       ToastAndroid.show(
//         'Please enter a valid 10-digit phone number.',
//         ToastAndroid.SHORT,
//       );
//       return false;
//     }

//     if (!FirstName || !LastName) {
//       ToastAndroid.show(
//         'First Name and Last Name are required.',
//         ToastAndroid.SHORT,
//       );
//       return false;
//     }

//     if (!Email || !/\S+@\S+\.\S+/.test(Email)) {
//       ToastAndroid.show(
//         'Please enter a valid email address.',
//         ToastAndroid.SHORT,
//       );
//       return false;
//     }

//     if (!EmergencyContactNumber || !/^\d{10}$/.test(EmergencyContactNumber)) {
//       ToastAndroid.show(
//         'Please enter a valid 10-digit emergency contact number.',
//         ToastAndroid.SHORT,
//       );
//       return false;
//     }

//     if (!Address || !State || !City) {
//       ToastAndroid.show(
//         'Address, State, and City are required.',
//         ToastAndroid.SHORT,
//       );
//       return false;
//     }

//     if (!CompanyName || !DrivingLicenseNumber || !LicenseExpiryDate) {
//       ToastAndroid.show(
//         'Company Name, Driving License Number, and Expiry Date are required.',
//         ToastAndroid.SHORT,
//       );
//       return false;
//     }

//     return true;
//   };

//   // Handle Form Submission
//   const handleSubmit = async () => {
//     console.log('driver formData : ', formData);
//     if (!validateForm()) {
//       return;
//     }

//     try {
//       const res = await apiService({
//         endpoint: 'truck_owner/driver/registration', // Replace with your actual endpoint
//         method: 'POST',
//         data: formData,
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log('formData', formData);
//       console.log('API Response:', res.data);
//       ToastAndroid.show('Driver registered successfully!', ToastAndroid.SHORT);
//       navigation.navigate("DriverList")
//     } catch (error) {
//       console.log('Driver registration error:', error);
//       ToastAndroid.show(
//         'Failed to register Driver. Please try again.',
//         ToastAndroid.SHORT,
//       );
//     }
//   };
//   return (
//     <>
//       <Heading
//         leftIcon={true}
//         heading={'Driver Registrations '}
//         rightAction={<Text></Text>}
//       />

//       <View style={styles.container}>
//         {/* Step Indicator */}
//         <View style={styles.stepContainer}>
//           {[1, 2].map((item, index) => (
//             <View key={index} style={styles.stepWrapper}>
//               <View
//                 style={tailwind`border ${
//                   step >= item ? 'border-teal-700' : 'border-[#000]'
//                 } p-[2px] rounded-full`}>
//                 <View
//                   style={[styles.circle, step >= item && styles.activeCircle]}
//                 />
//               </View>
//               {index < 1 && (
//                 <Animated.View
//                   style={[
//                     styles.line,
//                     {
//                       position: 'absolute',
//                       top: '50%',
//                       left: '100%',
//                       right: '100%',
//                       transform: [{translateY: -1}],
//                       width: 90,
//                       height: 2,
//                       backgroundColor: progress.interpolate({
//                         inputRange: [1, 2],
//                         outputRange: ['#000', '#33b2a5'],
//                       }),
//                     },
//                   ]}
//                 />
//               )}
//             </View>
//           ))}
//         </View>

//         {/* Form Content */}
//         {step === 1 && (
//           <ScrollView>
//             <View style={styles.form}>
//               <CommonInput
//                 label={'First Name *'}
//                 placeholder={'Enter First Name'}
//                 value={formData.FirstName}
//                 onChangeText={text => handleInputChange('FirstName', text)}
//               />
//               <CommonInput
//                 label={'Last Name *'}
//                 placeholder={'Enter Last Name'}
//                 value={formData.LastName}
//                 onChangeText={text => handleInputChange('LastName', text)}
//               />
//               <CommonInput
//                 label={'Phone *'}
//                 placeholder={'Enter Phone Number'}
//                 value={formData.phone}
//                 onChangeText={text => handleInputChange('phone', text)}
//                 keyboardType="numeric"
//               />
//               <CommonInput
//                 label={'Email *'}
//                 placeholder={'Enter Email'}
//                 value={formData.Email}
//                 onChangeText={text => handleInputChange('Email', text)}
//                 // keyboardType="email-address"
//               />
//               <CommonInput
//                 label={'Emergency Contact Number *'}
//                 placeholder={'Enter Emergency Contact Number'}
//                 value={formData.EmergencyContactNumber}
//                 onChangeText={text =>
//                   handleInputChange('EmergencyContactNumber', text)
//                 }
//                 keyboardType="numeric"
//               />
//               <CommonInput
//                 label={'Address *'}
//                 placeholder={'Enter Address'}
//                 value={formData.Address}
//                 onChangeText={text => handleInputChange('Address', text)}
//               />
//               <CommonDropdown
//                 label={'Select State *'}
//                 placeholder={'State'}
//                 options={Object.keys(statesAndDistricts)}
//                 onSelect={state => {
//                   setSelectedState(state);
//                   setSelectedCity(null);
//                   handleInputChange('State', state);
//                 }}
//                 value={selectedState}
//               />
//               <CommonDropdown
//                 label={'Select City *'}
//                 placeholder={'City'}
//                 options={statesAndDistricts[selectedState] || []}
//                 onSelect={city => {
//                   setSelectedCity(city);
//                   handleInputChange('City', city);
//                 }}
//                 value={selectedCity}
//               />
//             </View>
//           </ScrollView>
//         )}

//         {step === 2 && (
//           <ScrollView>
//             <View style={styles.form}>
//               <CommonInput
//                 label={'Company Name *'}
//                 placeholder={'Enter Company Name'}
//                 value={formData.CompanyName}
//                 onChangeText={text => handleInputChange('CompanyName', text)}
//               />
//               <CommonInput
//                 label={'Driving License Number *'}
//                 placeholder={'Enter Driving License Number'}
//                 value={formData.DrivingLicenseNumber}
//                 onChangeText={text =>
//                   handleInputChange('DrivingLicenseNumber', text)
//                 }
//               />
//               <CommonInput
//                 label={'License Expiry Date *'}
//                 placeholder={'Select License Expiry Date'}
//                 value={formattedDate}
//                 onPressRightIcon={() => setOpen(true)}
//                 rightIcon="calendar-outline"
//               />
//               <DatePicker
//                 modal
//                 open={open}
//                 date={date}
//                 mode="date"
//                 onConfirm={selectedDate => {
//                   setOpen(false);
//                   setDate(selectedDate);

//                   const formatted = selectedDate
//                     .toLocaleDateString('en-GB')
//                     .split('/')
//                     .join('-');
//                   setFormattedDate(formatted);
//                   handleInputChange('LicenseExpiryDate', formatted);
//                 }}
//                 onCancel={() => setOpen(false)}
//               />

//               <View style={styles.radioGroup}>
//                 <Text style={styles.radioLabel}>Police Verification:</Text>
//                 <TouchableOpacity
//                   onPress={() => setIsPoliceVerified("1")}
//                   style={tailwind`flex-row items-center`}>
//                   <View
//                     style={tailwind`w-6 h-6 border-2 ${
//                       isPoliceVerified === "1"
//                         ? 'border-teal-500'
//                         : 'border-gray-600'
//                     } rounded-full items-center justify-center`}>
//                     {isPoliceVerified === "1" && (
//                       <View
//                         style={tailwind`w-3 h-3 bg-teal-500 rounded-full`}
//                       />
//                     )}
//                   </View>
//                   <Text style={styles.radioText}>Yes</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity
//                   onPress={() => setIsPoliceVerified("0")}
//                   style={tailwind`flex-row items-center mt-1`}>
//                   <View
//                     style={tailwind`w-6 h-6 border-2 ${
//                       isPoliceVerified === "0"
//                         ? 'border-teal-500'
//                         : 'border-gray-600'
//                     } rounded-full items-center justify-center`}>
//                     {isPoliceVerified === "0" && (
//                       <View
//                         style={tailwind`w-3 h-3 bg-teal-500 rounded-full`}
//                       />
//                     )}
//                   </View>
//                   <Text style={styles.radioText}>No</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </ScrollView>
//         )}

//         {/* Navigation Buttons */}
//         <View style={styles.buttonContainer}>
//           {step > 1 && (
//             <TouchableOpacity
//               onPress={handleBack}
//               style={styles.buttonSecondary}>
//               <Text style={styles.buttonText}>Back</Text>
//             </TouchableOpacity>
//           )}
//           <TouchableOpacity
//             onPress={step === 2 ? handleSubmit : handleNext}
//             style={styles.button}>
//             <Text style={styles.buttonText}>
//               {step === 2 ? 'Submit' : 'Next'}
//             </Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//       <DatePicker
//         modal
//         open={open}
//         date={date}
//         mode="date"
//         onConfirm={selectedDate => {
//           setOpen(false);
//           setDate(selectedDate);

//           // Format Date to "DD-MM-YYYY"
//           const formatted = selectedDate
//             .toLocaleDateString('en-GB')
//             .split('/')
//             .reverse()
//             .join('-');
//           setFormattedDate(formatted);
//         }}
//         onCancel={() => setOpen(false)}
//       />
//     </>
//   );
// };

// export default AddDriver;

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   title: {
//     fontSize: responsiveFontSize(22),
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   stepContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     gap: 100,
//   },
//   stepWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   circle: {
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: '#ccc',
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderColor: '#000',
//   },
//   activeCircle: {
//     borderColor: '#33b2a5',
//     backgroundColor: '#33b2a5',
//   },
//   line: {
//     height: 2,
//     marginHorizontal: 5,
//   },
//   form: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   heading: {
//     fontSize: responsiveFontSize(18),
//     fontWeight: '600',
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: responsiveFontSize(16),
//     marginVertical: 10,
//   },
//   input: {
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 8,
//     padding: 12,
//     marginBottom: 20,
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     marginTop: 20,
//     width: '100%',
//     gap: 12,
//   },
//   button: {
//     backgroundColor: '#33b2a5',
//     padding: 15,
//     borderRadius: 8,
//     flex: 0.45,
//   },
//   buttonSecondary: {
//     backgroundColor: '#ccc',
//     padding: 15,
//     borderRadius: 8,
//     flex: 0.45,
//   },
//   buttonText: {
//     color: '#fff',
//     textAlign: 'center',
//     fontWeight: '600',
//     fontSize: responsiveFontSize(16),
//   },
//   datePickerButton: {
//     borderWidth: 1,
//     borderColor: Colors.borderColor,
//   },
// });

import React, {useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, ToastAndroid} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Container from '../../../../common/Container';
import CommonDropdown from '../../../../common/CommonDropdown';
import CommonInput from '../../../../common/CommonInput';
import { responsiveFontSize } from '../../../../utility/utility';
import { Colors } from '../../../../assets/AppColors';
import { statesAndDistricts } from '../../../StateAndDestrict';

const AddDriver = ({navigation}) => {
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);

  const fields = [
    {label: 'Phone Number', placeholder: "Ender Phone Number", key: 'phone'},
    {label: 'Full Name', placeholder: 'Enter your full name', key: 'fullName'},
    {
      label: 'Email Address',
      placeholder: 'Enter your email address',
      key: 'email',
    },
    {
      label: 'Company Name',
      placeholder: 'Company name as per GST',
      key: 'companyName',
    },
    {
      label: 'Company Address',
      placeholder: 'Company address as per GST',
      key: 'companyAddress',
    },
    {
      label: 'Select State',
      placeholder: 'Click to select your State',
      key: 'state',
      rightIcon: 'chevron-down-outline',
    },
    {
      label: 'Select City',
      placeholder: 'Click to select your City',
      key: 'city',
      rightIcon: 'chevron-down-outline',
    },
    {label: 'GST Number', placeholder: 'Enter your GST Number', key: 'gst'},
  ];
  const [form, setForm] = useState({});
  const [selectedState, setSelectedState] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);

  const handleInputChange = (key, value) => {
    setForm({...form, [key]: value});
  };

  const handleSubmit = async () => {
    try {
      const data = {
        phone: form.phone,
        name: form.fullName,
        email: form.email,
        company_name: form.companyName,
        company_address: form.companyAddress,
        state: form.state,
        city: form.city,
        role: 'Driver',
        gst_no: form.gst,
        device_id: '',
      };
      // Call the API service
      // return
      const res = await apiService({
        endpoint: 'truck_owner/register',
        method: 'POST',
        data,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('res : ', res);

      // Check if the API call was successful
      if (res && res.status) {
        // Show success toast
        dispatch(saveToken(res.access_token));
        ToastAndroid.show('Account created successfully!', ToastAndroid.SHORT);
        navigation.navigate('AppTabs');
      } else {
        // Show error toast if the response indicates failure
        ToastAndroid.show(
          'Failed to create account. Please try again.',
          ToastAndroid.SHORT,
        );
      }
    } catch (error) {
      console.log('SignUp error:', error);
      // Show error toast for any exceptions
      ToastAndroid.show(
        'An error occurred. Please try again later.',
        ToastAndroid.SHORT,
      );
    }
  };

  return (
    <Container>
      <Text style={styles.title}>Create an account</Text>
      <Text style={styles.subtitle}>
        Complete the sign up process to get started
      </Text>
      {fields.map(({label, placeholder, key}) => {
        if (key === 'state') {
          return (
            <CommonDropdown
              key={key}
              label={label}
              placeholder={placeholder}
              options={Object.keys(statesAndDistricts)} // All states as options
              value={selectedState}
              onSelect={state => {
                setSelectedState(state); // Update selected state
                handleInputChange('state', state);
                setSelectedCity(null); // Reset city when state changes
                handleInputChange('city', null); // Reset city in form
              }}
            />
          );
        }
        if (key === 'city') {
          return (
            selectedState && (
              <CommonDropdown
                key={key}
                label={label}
                placeholder={placeholder}
                options={statesAndDistricts[selectedState]} // Districts of the selected state
                value={selectedCity}
                onSelect={city => {
                  setSelectedCity(city); // Update selected city
                  handleInputChange('city', city);
                }}
              />
            )
          );
        }
        return (
          <CommonInput
            key={key}
            label={label}
            placeholder={placeholder}
            value={form[key]}
            onChangeText={text => handleInputChange(key, text)}
          />
        );
      })}
      <TouchableOpacity style={styles.proceedButton} onPress={handleSubmit}>
        <Text style={styles.proceedButtonText}>Proceed</Text>
      </TouchableOpacity>
    </Container>
  );
};

export default AddDriver;

const styles = StyleSheet.create({
  title: {
    fontSize: responsiveFontSize(24),
    fontWeight: 'bold',
    color: Colors.textDark,
    marginBottom: 10,
    marginTop: 15,
  },
  subtitle: {
    fontSize: responsiveFontSize(14),
    color: Colors.textLight,
    marginBottom: 20,
  },
  proceedButton: {
    backgroundColor: Colors.appColor,
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  proceedButtonText: {
    color: '#fff',
    fontSize: responsiveFontSize(16),
    fontWeight: 'bold',
  },
});
