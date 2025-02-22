import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Heading from '../../../../common/Heading';
import tailwind from 'twrnc';
import SpaceBetween from '../../../../common/SpaceBetween';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { Colors } from '../../../../assets/AppColors';
import { responsiveFontSize } from '../../../../utility/utility';
import Entypo from "react-native-vector-icons/Entypo";
import { useNavigation } from '@react-navigation/native';
import CustomModal from '../../../../common/CustomModal';
import apiService from '../../../../redux/apiService';
import { useSelector } from 'react-redux';

const TruckList = () => {
    const token = useSelector(state => state.auth.token);
    const navigation = useNavigation();
    const [assignDriver, setAssignDriver] = useState(false);
    const [trucks, setTrucks] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch truck list from API
    const getTruckList = async () => {
        try {
            const res = await apiService({
                endpoint: "truck_owner/trucks_list",
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("API Response:", res.data);


            // Set the data in the state
            setTrucks(res.data || []); // Ensure data is an array even if API returns null
            setLoading(false); // Stop loading
        } catch (error) {
            console.log("Error fetching truck list:", error);
            setLoading(false); // Stop loading in case of error
        }
    };

    // Fetch data when the component mounts or when the token changes
    useEffect(() => {
        getTruckList();
    }, []);

    // Render each truck item
    const renderItem = ({ item }) => (
        <View style={tailwind`bg-[#fff] w-[94%] shadow h-auto mt-3 mx-3  rounded-lg`}>
            {/* First Row */}
            <SpaceBetween style={tailwind`p-3`}>
                {/* Left Section */}
                <View style={tailwind`w-[50%]`}>
                    <SpaceBetween>
                        <View>
                            <MaterialIcons name="dangerous" size={24} color={"red"} />
                            <Text style={[styles.labelText, { color: Colors.textDark }]}>Date:</Text>
                            <Text style={[styles.labelText, { color: Colors.textDark }]}>Route:</Text>
                            <Text style={[styles.labelText, { color: Colors.textDark }]}>Documentation Status:</Text>
                        </View>
                    </SpaceBetween>
                </View>
                {/* Right Section */}
                <View style={tailwind`w-[50%] border border-gray-300 rounded-lg overflow-hidden`}>
                    <Image
                        style={tailwind`w-full h-32`}
                        source={{
                            uri: `https://api.hindustantruckers.com/storage/truck_images/${item.TruckImage}`,
                        }}
                        resizeMode="cover" // Ensure the image fits properly
                    />
                </View>
            </SpaceBetween>

            {/* Second Row */}
            <SpaceBetween style={tailwind`p-3`}>
                {/* Left Column */}
                <View>
                    <Text style={[styles.labelText, { color: Colors.textLight }]}>Width</Text>
                    <Text style={[styles.valueText, { color: Colors.textDark }]}><MaterialIcons name="width-wide" size={14} color={Colors.appColor} /> {item.Width}</Text>
                    <Text style={[styles.labelText, { color: Colors.textLight }]}>Capacity</Text>
                    <Text style={[styles.valueText, { color: Colors.textDark }]}><MaterialIcons name="reduce-capacity" size={14} color={Colors.appColor} /> {item.Capacity}</Text>
                </View>
                {/* Right Column */}
                <View>
                    <Text style={[styles.labelText, { color: Colors.textLight }]}>Height</Text>
                    <Text style={[styles.valueText, { color: Colors.textDark }]}><MaterialIcons name="height" size={14} color={Colors.appColor} /> {item.Height}</Text>
                    <Text style={[styles.labelText, { color: Colors.textLight }]}>Expected Price</Text>
                    <Text style={[styles.valueText, { color: Colors.textDark }]}><MaterialIcons name="currency-rupee" size={14} color={Colors.appColor} /> {item.Rate}</Text>
                </View>
            </SpaceBetween>

            {/* Divider */}
            <View style={tailwind`border-b border-gray-300 mx-3`} />

            {/* Assign Driver Button */}
            <SpaceBetween justify='space-between' style={tailwind`p-3`}>
                <Text></Text>
                <TouchableOpacity
                    onPress={() => setAssignDriver(true)}
                    style={[{ backgroundColor: Colors.appColor }, tailwind`px-4 py-2 rounded-sm`]}>
                    <Text style={[styles.buttonText, { color: '#fff' }]}>Assign Driver</Text>
                </TouchableOpacity>
            </SpaceBetween>
        </View>
    );

    return (
        <View>
            {/* Header */}
            <Heading
                leftIcon={true}
                heading={""}
                rightAction={
                    <TouchableOpacity
                        onPress={() => navigation.navigate("DriverRegistration")}
                        style={tailwind`bg-[#fff] px-3 py-1 rounded-sm`}>
                        <Text style={[{ fontSize: responsiveFontSize(12), color: Colors.appColor }]}>
                            <Entypo name="plus" size={12} color={Colors.appColor} /> Add Truck
                        </Text>
                    </TouchableOpacity>
                }
            />

            {/* FlatList to display trucks */}
            <FlatList
                data={trucks} // Pass the array of trucks
                keyExtractor={(item) => item.id.toString()} // Use unique ID as the key
                renderItem={renderItem} // Render each item
                ListEmptyComponent={
                    !loading && (
                        <Text style={tailwind`text-center text-gray-500 mt-5`}>
                            No trucks available.
                        </Text>
                    )
                }
                style={[tailwind`bg-white`, { borderRadius: 10 }]} // Rounded corners
                contentContainerStyle={[
                    tailwind`pb-20`, // Center content if empty
                ]}
            />

            {/* Loading Indicator */}
            {loading && (
                <View style={tailwind`flex-1 justify-center items-center`}>
                    <Text style={tailwind`text-gray-500`}>Loading...</Text>
                </View>
            )}

            {/* Assign Driver Modal */}
            {assignDriver && (
                <CustomModal
                    modalTitle={"Driver List"}
                    isVisible={assignDriver}
                    onClose={() => setAssignDriver(false)}
                    content={
                        <View style={tailwind`w-[97%] border border-[teal] rounded-lg mx-1 mt-1 p-1 bg-white shadow`}>
                            <View style={tailwind`flex-row items-center justify-between`}>
                                <View style={tailwind`flex-row items-center gap-2`}>
                                    <Image
                                        style={tailwind`w-10 h-10 rounded-full border border-teal`}
                                        source={require("../../../../assets/img/registration/agent.png")}
                                    />
                                    <Text style={[styles.nameText, { fontSize: responsiveFontSize(16) }]}>Name</Text>
                                </View>
                                <View style={tailwind`flex-row items-center gap-2`}>
                                    <Text style={[styles.infoText, { fontSize: responsiveFontSize(14) }]}>One</Text>
                                    <Text style={[styles.infoText, { fontSize: responsiveFontSize(14) }]}>Two</Text>
                                </View>
                            </View>
                        </View>
                    }
                />
            )}
        </View>
    );
};

export default TruckList;

const styles = StyleSheet.create({
    // Label Text Style
    labelText: {
        fontFamily: 'Poppins-Regular',
        fontSize: 14,
        fontWeight: '500',
        marginBottom: 4,
    },
    // Value Text Style
    valueText: {
        fontFamily: 'Poppins-Bold',
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 8,
    },
    // Button Text Style
    buttonText: {
        fontFamily: 'Poppins-Medium',
        fontSize: responsiveFontSize(14),
        fontWeight: '600',
        textAlign: 'center',
    },
    nameText: {
        fontFamily: 'Poppins-Bold',
        color: Colors.textDark,
    },
    // Info Text Style
    infoText: {
        fontFamily: 'Poppins-Regular',
        color: Colors.textLight,
    },
});