// import React, {useEffect, useState} from 'react';
// import {
//   Text,
//   View,
//   StyleSheet,
//   Alert,
//   Image,
//   TouchableOpacity,
//   ScrollView,
// } from 'react-native';
// import {useSelector} from 'react-redux';
// import Heading from '../../common/Heading';
// import {responsiveFontSize} from '../../utility/utility';
// import {Colors} from '../../assets/AppColors';
// import CommonInput from '../../common/CommonInput';
// import CommonButton from '../../common/CommonButton';
// import tailwind from 'twrnc';
// import apiService from '../../redux/apiService';
// import ImagePickerComponent from '../../common/ImagePickerComponent';

// const EditProfile = () => {
//   const token = useSelector(state => state.auth.token);
//   const profileData = useSelector(state => state.auth);
//   const [input, setInput] = useState({
//     fullName: '',
//     residential_Address: '',
//     email: '',
//     company_address: '',
//     company_name: '',
//     GST: '',
//     pincode: '',
//   });
//   const [imageBase64, setImageBase64] = useState(null);
//   const [imgName, setImgName] = useState('');

//   useEffect(() => {
//     if (profileData) {
//       setInput(prevInput => ({
//         ...prevInput,
//         fullName: '',
//         residential_Address: '',
//         email: '',
//         company_address: '',
//         company_name: '',
//         GST: '',
//         pincode: '',
//       }));
//     }
//   }, [bankDetailData]);

//   // Handle input change
//   const handleChange = (name, value) => {
//     setInput(prevInput => ({
//       ...prevInput,
//       [name]: value,
//     }));
//   };

//   // Handle form submission
//   const handleSubmit = async () => {
//     const data = {
//       ...input,
//       document_type_id: '1', // doc id 1 for Profile Image
//       profile_image: imageBase64,
//     };
//     try {
//       const res = await apiService({
//         endpoint: 'truck_owner/add/bank_details',
//         method: 'POST',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//         data,
//       });
//       Alert.alert('Success', 'Bank details updated successfully!');
//       console.log('Update Response:', res.data);
//     } catch (error) {
//       console.error('Update Error:', error);
//       Alert.alert('Error', 'Failed to update bank details.');
//     }
//   };

//   return (
//     <>
//       <Heading
//         leftIcon={true}
//         heading={'Bank Details'}
//         rightAction={<Text></Text>}
//       />
//       <Image
//         source={{
//           uri: profileData?.profile_image
//             ? `${profileData.image_base_url}${profileData.profile_image}`
//             : 'https://via.placeholder.com/100',
//         }}
//         style={styles.profileImage}
//       />
//       <ScrollView style={tailwind`px-2 py-3`}>
//         <Text style={styles.title}>Full Name</Text>
//         <CommonInput
//           value={input.fullName}
//           onChangeText={text => handleChange('', text)}
//         />
//         <Text style={styles.title}>Residential Address</Text>
//         <CommonInput
//           value={input.residential_Address}
//           onChangeText={text => handleChange('', text)}
//         />
//         <Text style={styles.title}>Email Address</Text>
//         <CommonInput
//           value={input.email}
//           onChangeText={text => handleChange('', text)}
//         />
//         <Text style={styles.title}>Company Address</Text>
//         <CommonInput
//           value={input.company_address}
//           onChangeText={text => handleChange('', text)}
//         />
//         <Text style={styles.title}>Company Name</Text>
//         <CommonInput
//           value={input.company_name}
//           onChangeText={text => handleChange('', text)}
//         />
//         <Text style={styles.title}>GST (optional)</Text>
//         <CommonInput
//           value={input.GST}
//           onChangeText={text => handleChange('', text)}
//         />
//         <Text style={styles.title}>Pincode</Text>
//         <CommonInput
//           value={input.pincode}
//           onChangeText={text => handleChange('', text)}
//         />

//         <ImagePickerComponent
//           buttonTitle="Upload Passbook"
//           imageBase64={imageBase64}
//           setImageBase64={setImageBase64}
//           imgName={imgName}
//           setImgName={setImgName}
//         />
//         <CommonButton
//           title={'Submit'}
//           textColor={'#fff'}
//           backgroundColor={Colors.appColor}
//           onPress={handleSubmit}
//         />
//       </ScrollView>
//     </>
//   );
// };

// export default EditProfile;

// const styles = StyleSheet.create({
//   nameText: {
//     borderWidth: 1,
//     borderColor: Colors.borderColor,
//     padding: 10,
//     borderRadius: 5,
//   },
//   profileImage: {
//     width: 80,
//     height: 80,
//     borderRadius: 50,
//     alignSelf: 'center',
//     borderWidth: 1,
//     borderColor: Colors.borderColor,
//     marginVertical: 10,
//   },
//   title: {
//     color: Colors.appColor,
//     fontSize: responsiveFontSize(18),
//     paddingVertical: 10,
//   },
//   containerView: {
//     paddingHorizontal: 10,
//   },
//   uploadButton: {
//     backgroundColor: Colors.appColor,
//     padding: 10,
//     borderRadius: 5,
//     alignItems: 'center',
//     marginVertical: 10,
//   },
//   uploadText: {
//     color: '#fff',
//     fontSize: responsiveFontSize(16),
//   },
//   previewImage: {
//     width: 100,
//     height: 100,
//     borderRadius: 10,
//     alignSelf: 'center',
//     marginVertical: 10,
//   },
// });

import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useSelector } from 'react-redux';
import { launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Heading from '../../common/Heading';
import { responsiveFontSize } from '../../utility/utility';
import { Colors } from '../../assets/AppColors';
import CommonInput from '../../common/CommonInput';
import CommonButton from '../../common/CommonButton';
import tailwind from 'twrnc';
import apiService from '../../redux/apiService';

const EditProfile = () => {
  const token = useSelector(state => state.auth.token);
  const [profileData, setProfileData] = useState({})
 const [input, setInput] = useState({
    fullName: '',
    residential_Address: '',
    email: '',
    company_address: '',
    company_name: '',
    GST: '',
    pincode: '',
  });

  const [imageUri, setImageUri] = useState(null);
  const [imgName, setImgName] = useState('');

  const getProfileData = async () => {
    try {
      const res = await apiService({
        endpoint: 'truck_owner/get/profile',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('profile data Response:', res.data[0]);
      setProfileData(res.data[0]);
    } catch (error) {
      console.error('Company Error:', error);
    }
  };

  useEffect(() => {
    getProfileData();
  }, []);
  // Set initial profile data
  useEffect(() => {
    if (profileData) {
      setInput({
        fullName: profileData.UserName || input.fullName,
        residential_Address: profileData.Address || input.residential_Address,
        email: profileData.UserEmail || input.email,
        company_address: profileData.CompanyAddress || input.company_address,
        company_name: profileData.CompanyName || input.company_name,
        GST: profileData.gst_no || input.GST,
        pincode: profileData.Pincode || input.pincode,
      });

      if (profileData.profile_image) {
        setImageUri(`${profileData.image_base_url}${profileData.profile_image}`);
      }
    }
  }, [profileData]);

  // Handle input change
  const handleChange = (name, value) => {
    setInput(prevInput => ({
      ...prevInput,
      [name]: value,
    }));
  };

  // Handle Image Selection
  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 , includeBase64:true}, response => {
      if (!response.didCancel && response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].base64);
        setImgName(response.assets[0].fileName);
      }
    });
  };

  // Handle form submission
  const handleSubmit = async () => {
    const data = {
      ...input,
      document_type_id: '1', // doc id 1 for Profile Image
      profile_image: imageUri,
    };
    try {
      const res = await apiService({
        endpoint: 'user/upload/document',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data,
      });
      Alert.alert('Success', 'Bank details updated successfully!');
    //   console.log('Update Response:', res.data);
    } catch (error) {
      console.error('Update Error:', error);
      Alert.alert('Error', 'Failed to update bank details.');
    }
  };

  return (
    <>
      <Heading leftIcon={true} heading={'Bank Details'} rightAction={<Text></Text>} />

      {/* Profile Image with Upload Button */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: imageUri || 'https://via.placeholder.com/100' }}
          style={styles.profileImage}
        />
        <TouchableOpacity onPress={pickImage} style={styles.uploadIcon}>
          <Icon name="camera-plus" size={25} color={Colors.appColor} />
        </TouchableOpacity>
      </View>

      <ScrollView style={tailwind`px-2 py-3`}>
        <Text style={styles.title}>Full Name</Text>
        <CommonInput value={input.fullName} onChangeText={text => handleChange('fullName', text)} />
        <Text style={styles.title}>Residential Address</Text>
        <CommonInput
          value={input.residential_Address}
          onChangeText={text => handleChange('residential_Address', text)}
        />

        <Text style={styles.title}>Email Address</Text>
        <CommonInput value={input.email} onChangeText={text => handleChange('email', text)} />

        <Text style={styles.title}>Company Address</Text>
        <CommonInput
          value={input.company_address}
          onChangeText={text => handleChange('company_address', text)}
        />

        <Text style={styles.title}>Company Name</Text>
        <CommonInput
          value={input.company_name}
          onChangeText={text => handleChange('company_name', text)}
        />

        <Text style={styles.title}>GST (optional)</Text>
        <CommonInput value={input.GST} onChangeText={text => handleChange('GST', text)} />

        <Text style={styles.title}>Pincode</Text>
        <CommonInput value={input.pincode} onChangeText={text => handleChange('pincode', text)} />

        <CommonButton
          title={'Submit'}
          textColor={'#fff'}
          backgroundColor={Colors.appColor}
          onPress={handleSubmit}
          buttonStyle={{marginBottom:30}}
        />
      </ScrollView>
    </>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: Colors.borderColor,
  },
  imageContainer: {
    alignSelf: 'center',
    marginVertical: 10,
    position: 'relative',
  },
  uploadIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    elevation: 3, // Shadow effect
  },
  title: {
    color: Colors.appColor,
    fontSize: responsiveFontSize(18),
    paddingVertical: 10,
    width:"80%"
  },
});

// 7611116423  