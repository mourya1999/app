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
                role: "Driver",
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