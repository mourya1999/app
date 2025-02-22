import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, ScrollView } from 'react-native';
import tailwind from 'twrnc';
import Heading from '../../../../common/Heading';
import CommonInput from '../../../../common/CommonInput';
import { responsiveFontSize } from '../../../../utility/utility';
import CommonDropdown from '../../../../common/CommonDropdown';
import { statesAndDistricts } from '../../../StateAndDestrict';
import Icon from 'react-native-vector-icons/Fontisto';
import { Colors } from '../../../../assets/AppColors';
import DatePicker from "react-native-date-picker";

const AddDriver = () => {
    const [step, setStep] = useState(1);
    const progress = useRef(new Animated.Value(1)).current;
    const [selectedState, setSelectedState] = useState()
    const [selectedCity, setSelectedCity] = useState()
    const [selected, setSelected] = useState(1);
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(new Date());
    const [formattedDate, setFormattedDate] = useState("");

    useEffect(() => {
        Animated.timing(progress, {
            toValue: step,
            duration: 500,
            useNativeDriver: false,
        }).start();
    }, [step]);

    const handleNext = () => {
        if (step < 2) setStep(step + 1);
    };

    const handleBack = () => {
        if (step > 1) setStep(step - 1);
    };

    return (
        <>
            <Heading leftIcon={true} heading={"Driver Registrations "} rightAction={<Text></Text>} />

            <View style={styles.container}>

                {/* Step Indicator */}
                <View style={styles.stepContainer}>
                    {[1, 2].map((item, index) => (
                        <View key={index} style={styles.stepWrapper}>
                            <View style={tailwind`border ${step >= item ? "border-teal-700" : "border-[#000]"} p-[2px] rounded-full`}>
                                <View style={[styles.circle, step >= item && styles.activeCircle]} /></View>
                            {index < 1 && (
                                <Animated.View
                                    style={[
                                        styles.line,
                                        {
                                            position: 'absolute',
                                            top: '50%',
                                            left: '100%',
                                            right: '100%',
                                            transform: [{ translateY: -1 }],
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
                        <View style={[styles.form, { marginTop: 10 }]}>
                            <CommonInput
                                label={"Contact No *"}
                                placeholder={"Enter Contact No"}
                                value={"po"}
                            // onChangeText={}
                            />
                            <CommonInput
                                label={"Email Address*"}
                                placeholder={"Enter Email Address"}
                                value={"po"}
                            // onChangeText={}
                            />
                            <CommonInput
                                label={"Emergency Contact No*"}
                                placeholder={"Enter Emergency Contact No"}
                                value={"po"}
                            // onChangeText={}
                            />
                            <CommonDropdown
                                label={"State"}
                                placeholder={"Select State"}
                                options={Object.keys(statesAndDistricts)} // All states as options
                                value={selectedState}
                                onSelect={(state) => {
                                    setSelectedState(state);
                                    setSelectedCity(null);
                                }}
                            />
                            <CommonDropdown
                                label={"City"}
                                placeholder={"Select City"}
                                options={statesAndDistricts[selectedState]} // Districts of the selected state
                                value={selectedCity}
                                onSelect={(city) => {
                                    setSelectedCity(city);
                                }}
                            />
                        </View>
                    </ScrollView>

                )}

                {step === 2 && (
                    <ScrollView>
                        <View style={[styles.form, { marginTop: 10 }]}>
                            <CommonInput
                                label={"Company Name *"}
                                placeholder={"Enter Company Name"}
                                value={"po"}
                            // onChangeText={}
                            />
                            <CommonInput
                                label={"Driving Licence Number *"}
                                placeholder={"Enter Driving Licence Number"}
                                value={"po"}
                            // onChangeText={}
                            />
                            <CommonInput
                                label={"Licence Expiry Date *"}
                                placeholder={"Select Licence Expiry Date"}
                                value={formattedDate} // Show formatted date in input
                                rightAction={
                                    <TouchableOpacity onPress={() => setOpen(true)}>
                                        <Icon name="date" size={20} color={Colors.appColor} />
                                    </TouchableOpacity>
                                }
                            />
                            <View style={tailwind`flex-row items-center justify-between border border-gray-300 rounded-sm p-3 w-full`}>
                                {/* First Radio Button */}
                                <TouchableOpacity
                                    onPress={() => setSelected(1)}
                                    style={tailwind`w-6 h-6 border-2 ${selected === 1 ? 'border-teal-500' : 'border-gray-600'} rounded-full items-center justify-center`}
                                >
                                    {selected === 1 && <View style={tailwind`w-4 h-4 bg-teal-500 rounded-full`} />}

                                </TouchableOpacity>
                                <Text>Yes</Text>
                                {/* Second Radio Button */}
                                <TouchableOpacity
                                    onPress={() => setSelected(2)}
                                    style={tailwind`w-6 h-6 border-2 ${selected === 2 ? 'border-gray-600' : 'border-gray-600'} rounded-full items-center justify-center`}
                                >
                                    {selected === 2 && <View style={tailwind`w-4 h-4 bg-gray-600 rounded-full`} />}

                                </TouchableOpacity>
                                <Text>No</Text>
                            </View>
                        </View>
                    </ScrollView>
                )}

                {/* Navigation Buttons */}
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handleNext} style={styles.button}>
                        <Text style={styles.buttonText}>{step === 2 ? 'Done' : 'Next'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <DatePicker
                modal
                open={open}
                date={date}
                mode="date"
                onConfirm={(selectedDate) => {
                    setOpen(false);
                    setDate(selectedDate);

                    // Format Date to "DD-MM-YYYY"
                    const formatted = selectedDate.toLocaleDateString('en-GB').split('/').reverse().join('-');
                    setFormattedDate(formatted);
                }}
                onCancel={() => setOpen(false)}
            />
        </>

    );
};

export default AddDriver;

// Styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    stepContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 100
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
        borderColor: "#000"
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
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
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
        width: '100%'
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
        fontSize: responsiveFontSize(16)
    },
});
