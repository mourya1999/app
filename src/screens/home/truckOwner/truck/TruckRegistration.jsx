import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, ScrollView } from 'react-native';
import tailwind from 'twrnc';
import Heading from '../../../../common/Heading';
import { responsiveFontSize } from '../../../../utility/utility';
import CommonInput from '../../../../common/CommonInput';
import CommonDropdown from '../../../../common/CommonDropdown';

const TruckRegistration = () => {
    const [step, setStep] = useState(1);
    const progress = useRef(new Animated.Value(1)).current;
    const [selectedUnit, setSelectedUnit] = useState('Ton'); // Default selected

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
            <Heading leftIcon={true} heading={"Druck Registration "} rightAction={<Text></Text>} />

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
                    <View style={styles.form}>
                        <CommonDropdown
                            label={"Select Truck"}
                            placeholder={"Truck"}
                        // options={statesAndDistricts[selectedState]} // Districts of the selected state
                        // value={selectedCity}
                        // onSelect={(city) => {
                        //     setSelectedCity(city); // Update selected city
                        //     handleInputChange('city', city);
                        // }}
                        />
                        <CommonInput
                            label={"Truck Capacity *"}
                            placeholder={"Enter Truck Capacity"}
                            value={"po"}
                            rightAction={<View style={tailwind`flex flex-row justify-between bg-gray-200 p-1 rounded-lg w-32`}>
                                {['Ton', 'Kg'].map((unit) => (
                                    <TouchableOpacity
                                        key={unit}
                                        onPress={() => setSelectedUnit(unit)}
                                        style={[
                                            tailwind`flex-1 p-2 rounded-lg items-center`,
                                            selectedUnit === unit ? tailwind`bg-teal-500` : tailwind`bg-transparent`,
                                        ]}
                                    >
                                        <Text style={selectedUnit === unit ? tailwind`text-white font-bold` : tailwind`text-gray-600`}>
                                            {unit}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>}
                        // onChangeText={}
                        />
                        <CommonInput
                            label={"Truck Width(ft) *"}
                            placeholder={"Enter Truck width"}
                            value={"po"}
                        // onChangeText={}
                        />
                        <CommonInput
                            label={"Truck Height(ft) *"}
                            placeholder={"Enter Truck height"}
                            value={"po"}
                        // onChangeText={}
                        />
                    </View>
                )}

                {step === 2 && (
                    <ScrollView>
                        <View style={styles.form}>
                            <CommonInput
                                label={"Rate(Per/Km) *"}
                                value={"po"}
                            // onChangeText={}
                            />
                            <CommonInput
                                label={"Origin Route *"}
                                value={"po"}
                            // onChangeText={}
                            />
                            <CommonInput
                                label={"Truck Number *"}
                                value={"po"}
                            // onChangeText={}
                            />
                            <CommonInput
                                label={"Model Year *"}
                                value={"po"}
                            // onChangeText={}
                            />
                            <CommonInput
                                label={"Engine/Chassis Number *"}
                                value={"po"}
                            // onChangeText={}
                            />
                            <CommonInput
                                label={"PST Number *"}
                                value={"po"}
                            // onChangeText={}
                            />
                        </View></ScrollView>
                )}

                {/* Navigation Buttons */}
                <View style={styles.buttonContainer}>
                    {/* {step > 1 && (
                        <TouchableOpacity onPress={handleBack} style={styles.buttonSecondary}>
                            <Text style={styles.buttonText}>Back</Text>
                        </TouchableOpacity>
                    )} */}
                    <TouchableOpacity onPress={handleNext} style={styles.button}>
                        <Text style={styles.buttonText}>{step === 2 ? 'Done' : 'Next'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>

    );
};

export default TruckRegistration;

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
