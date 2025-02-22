// import React, { useState } from 'react';
// import {
//     View,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     StyleSheet,
//     ScrollView,
//     Alert,
// } from 'react-native';
// import { launchImageLibrary } from 'react-native-image-picker';
// import { statesAndDistricts } from "../../StateAndDestrict"

// const TruckOwner = () => {
//     const [formData, setFormData] = useState({});
//     const [selectedState, setSelectedState] = useState(null);
//     const [selectedCity, setSelectedCity] = useState(null);

//     // Handle text input changes
//     const handleInputChange = (field, value) => {
//         setFormData({ ...formData, [field]: value });
//     };

//     // Handle image selection
//     const pickImage = async (field) => {
//         try {
//             const result = await launchImageLibrary({
//                 mediaType: 'photo',
//                 includeBase64: true,
//             });

//             if (!result.didCancel && result.assets && result.assets.length > 0) {
//                 const base64Image = `data:image/png;base64,${result.assets[0].base64}`;
//                 setFormData({ ...formData, [field]: base64Image });
//             }
//         } catch (error) {
//             console.error('Error picking image:', error);
//             Alert.alert('Error', 'Failed to pick image.');
//         }
//     };

//     // Handle form submission
//     const handleSubmit = () => {
//         console.log('Form Data:', formData);
//         Alert.alert('Success', 'Form submitted successfully!');
//     };

//     const fields = [
//         { label: 'Phone Number', placeholder: 'Enter your phone number', key: 'phone' },
//         { label: 'First Name', placeholder: 'Enter your first name', key: 'FirstName' },
//         { label: 'Last Name', placeholder: 'Enter your last name', key: 'LastName' },
//         { label: 'Email', placeholder: 'Enter your email address', key: 'Email' },
//         { label: 'Emergency Contact Number', placeholder: 'Enter emergency contact number', key: 'EmergencyContactNumber' },
//         { label: 'Address', placeholder: 'Enter your address', key: 'Address' },
//         { label: 'Select State', placeholder: 'Click to select your State', key: 'State', rightIcon: 'chevron-down-outline' },
//         { label: 'Select City', placeholder: 'Click to select your City', key: 'City', rightIcon: 'chevron-down-outline' },
//         { label: 'Company Name', placeholder: 'Enter company name', key: 'CompanyName' },
//         { label: 'Driving License Number', placeholder: 'Enter driving license number', key: 'DrivingLicenseNumber' },
//         { label: 'License Expiry Date', placeholder: 'Enter license expiry date', key: 'LicenseExpiryDate' },
//         { label: 'Is Police Verification Done?', placeholder: 'Yes/No', key: 'IsPoliceVerification' },
//         { label: 'Upload Driving License', key: 'DrivingLicenseImage', type: 'file' },
//         { label: 'Upload Selfie', key: 'SelfieImage', type: 'file' },
//         { label: 'Upload Work Permit Document', key: 'WorkPermitDocument', type: 'file' },
//     ];

//     return (
//         <ScrollView contentContainerStyle={styles.container}>
//             <Text style={styles.title}>Registration Form</Text>

//             {fields.map(({ label, placeholder, key, type }) => {
//                 if (key === 'State') {
//                     return (
//                         <CommonDropdown
//                             key={key}
//                             label={label}
//                             placeholder={placeholder}
//                             options={Object.keys(statesAndDistricts)} // All states as options
//                             value={selectedState}
//                             onSelect={(state) => {
//                                 setSelectedState(state); // Update selected state
//                                 handleInputChange('State', state);
//                                 setSelectedCity(null); // Reset city when state changes
//                                 handleInputChange('City', null); // Reset city in form
//                             }}
//                         />
//                     );
//                 }

//                 if (key === 'City') {
//                     return (
//                         selectedState && (
//                             <CommonDropdown
//                                 key={key}
//                                 label={label}
//                                 placeholder={placeholder}
//                                 options={statesAndDistricts[selectedState]} // Districts of the selected state
//                                 value={selectedCity}
//                                 onSelect={(city) => {
//                                     setSelectedCity(city); // Update selected city
//                                     handleInputChange('City', city);
//                                 }}
//                             />
//                         )
//                     );
//                 }

//                 if (type === 'file') {
//                     return (
//                         <TouchableOpacity
//                             key={key}
//                             style={styles.fileInput}
//                             onPress={() => pickImage(key)}
//                         >
//                             <Text style={styles.fileInputLabel}>
//                                 {formData[key] ? 'File Uploaded' : `Upload ${label}`}
//                             </Text>
//                         </TouchableOpacity>
//                     );
//                 }

//                 return (
//                     <CommonInput
//                         key={key}
//                         label={label}
//                         placeholder={placeholder}
//                         value={formData[key]}
//                         onChangeText={(text) => handleInputChange(key, text)}
//                     />
//                 );
//             })}

//             {/* Submit Button */}
//             <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
//                 <Text style={styles.submitButtonText}>Submit</Text>
//             </TouchableOpacity>
//         </ScrollView>
//     );
// };

// // Common Input Component
// const CommonInput = ({ label, placeholder, value, onChangeText }) => (
//     <View style={styles.inputContainer}>
//         <Text style={styles.label}>{label}</Text>
//         <TextInput
//             style={styles.input}
//             placeholder={placeholder}
//             value={value}
//             onChangeText={onChangeText}
//         />
//     </View>
// );

// // Common Dropdown Component
// const CommonDropdown = ({ label, placeholder, options, value, onSelect }) => (
//     <View style={styles.inputContainer}>
//         <Text style={styles.label}>{label}</Text>
//         <TouchableOpacity
//             style={[styles.input, styles.dropdown]}
//             onPress={() => {
//                 // Simulate dropdown selection (replace with actual picker logic)
//                 Alert.alert(
//                     'Select Option',
//                     '',
//                     options.map((option) => ({
//                         text: option,
//                         onPress: () => onSelect(option),
//                     }))
//                 );
//             }}
//         >
//             <Text style={value ? styles.dropdownText : styles.placeholderText}>
//                 {value || placeholder}
//             </Text>
//         </TouchableOpacity>
//     </View>
// );

// // Styles
// const styles = StyleSheet.create({
//     container: {
//         padding: 20,
//         backgroundColor: '#fff',
//     },
//     title: {
//         fontSize: 24,
//         fontWeight: 'bold',
//         textAlign: 'center',
//         marginBottom: 20,
//     },
//     inputContainer: {
//         marginBottom: 15,
//     },
//     label: {
//         fontSize: 16,
//         fontWeight: 'bold',
//         marginBottom: 5,
//     },
//     input: {
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 5,
//         padding: 10,
//         fontSize: 16,
//     },
//     dropdown: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//     },
//     dropdownText: {
//         fontSize: 16,
//     },
//     placeholderText: {
//         fontSize: 16,
//         color: '#aaa',
//     },
//     fileInput: {
//         borderWidth: 1,
//         borderColor: '#ccc',
//         borderRadius: 5,
//         padding: 10,
//         marginBottom: 15,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     fileInputLabel: {
//         fontSize: 16,
//         color: '#007bff',
//     },
//     submitButton: {
//         backgroundColor: '#28a745',
//         padding: 15,
//         borderRadius: 5,
//         alignItems: 'center',
//     },
//     submitButtonText: {
//         color: '#fff',
//         fontSize: 18,
//         fontWeight: 'bold',
//     },
// });

// export default TruckOwner;



import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, ToastAndroid } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CommonDropdown from '../../../common/CommonDropdown';
import Container from '../../../common/Container';
import CommonInput from '../../../common/CommonInput';
import { statesAndDistricts } from '../../StateAndDestrict';
import { Colors } from '../../../assets/AppColors';
import apiService from '../../../redux/apiService';
import { saveToken } from '../../../redux/AuthSlice';

const TruckOwner = ({ navigation }) => {
    const dispatch = useDispatch()
    const oldNum = useSelector((state) => state.auth.phoneNumber);

    const fields = [
        { label: 'Phone Number', placeholder: oldNum, key: 'phone' },
        { label: 'Full Name', placeholder: 'Enter your full name', key: 'fullName' },
        { label: 'Email Address', placeholder: 'Enter your email address', key: 'email' },
        { label: 'Company Name', placeholder: 'Company name as per GST', key: 'companyName' },
        { label: 'Company Address', placeholder: 'Company address as per GST', key: 'companyAddress' },
        { label: 'Select State', placeholder: 'Click to select your State', key: 'state', rightIcon: 'chevron-down-outline' },
        { label: 'Select City', placeholder: 'Click to select your City', key: 'city', rightIcon: 'chevron-down-outline' },
        { label: 'GST Number', placeholder: 'Enter your GST Number', key: 'gst' },
    ];
    const [form, setForm] = useState({});
    const [selectedState, setSelectedState] = useState(null);
    const [selectedCity, setSelectedCity] = useState(null);

    const handleInputChange = (key, value) => {
        setForm({ ...form, [key]: value });
    };

    const handleSubmit = async () => {
        try {
            const data = {
                phone: oldNum ,
                name: form.fullName,
                email: form.email,
                company_name: form.companyName,
                company_address: form.companyAddress,
                state: form.state,
                city: form.city,
                role: "Truck Owner",
                gst_no: form.gst,
                device_id: "",
            };
            // Call the API service
            // return
            const res = await apiService({
                endpoint: "truck_owner/register",
                method: "POST",
                data,
            });
            console.log("res : ", res)

            // Check if the API call was successful
            if (res && res.status) {
                // Show success toast
                dispatch(saveToken(res.access_token))
                ToastAndroid.show("Account created successfully!", ToastAndroid.SHORT);
                navigation.navigate("AppTabs")
            } else {
                // Show error toast if the response indicates failure
                ToastAndroid.show("Failed to create account. Please try again.", ToastAndroid.SHORT);
            }
        } catch (error) {
            console.log("SignUp error:", error);
            // Show error toast for any exceptions
            ToastAndroid.show("An error occurred. Please try again later.", ToastAndroid.SHORT);
        }
    };

    return (
        <Container>
            <Text style={styles.title}>Create an account</Text>
            <Text style={styles.subtitle}>Complete the sign up process to get started</Text>
            {fields.map(({ label, placeholder, key }) => {
                if (key === 'state') {
                    return (
                        <CommonDropdown
                            key={key}
                            label={label}
                            placeholder={placeholder}
                            options={Object.keys(statesAndDistricts)} // All states as options
                            value={selectedState}
                            onSelect={(state) => {
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
                                onSelect={(city) => {
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
                        onChangeText={(text) => handleInputChange(key, text)}
                    />
                );
            })}
            <TouchableOpacity style={styles.proceedButton} onPress={handleSubmit}>
                <Text style={styles.proceedButtonText}>Proceed</Text>
            </TouchableOpacity>
        </Container>
    );
};

export default TruckOwner;

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: Colors.textDark,
        marginBottom: 10,
        marginTop: 15,
    },
    subtitle: {
        fontSize: 14,
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
        fontSize: 16,
        fontWeight: 'bold',
    },
});