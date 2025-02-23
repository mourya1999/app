import React, { useEffect, useState } from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import tailwind from 'twrnc'
import Entypo from "react-native-vector-icons/Entypo"
import { useNavigation } from '@react-navigation/native'
import Heading from '../../../../common/Heading'
import { Colors } from '../../../../assets/AppColors'
import { responsiveFontSize } from '../../../../utility/utility'
import { useSelector } from 'react-redux'
import apiService from '../../../../redux/apiService'
import { FlatList } from 'react-native-gesture-handler'
import FontAwesome5 from "react-native-vector-icons/FontAwesome5"
import MaterialIcons from "react-native-vector-icons/MaterialIcons"
import AntDesign from "react-native-vector-icons/AntDesign"

const DriverList = () => {
    const navigation = useNavigation()
    const token = useSelector(state => state.auth.token)
    const [drivers, setDrivers] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch truck list from API
    const getDriver = async () => {
        try {
            const res = await apiService({
                endpoint: "truck_owner/driver/list",
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            console.log("API Response:", res.data);


            // Set the data in the state
            setDrivers(res.data || []); // Ensure data is an array even if API returns null
            setLoading(false); // Stop loading
        } catch (error) {
            console.log("Error fetching truck list:", error);
            setLoading(false); // Stop loading in case of error
        }
    };

    // Fetch data when the component mounts or when the token changes
    useEffect(() => {
        getDriver();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => navigation.navigate("DriverDetail", { item })}
        style={tailwind`w-[96%] rounded-lg mx-2 mt-2 p-2 bg-white shadow border border-[teal]`}>
            {/* First Row: Profile Image, Name, and Location */}
            <View style={tailwind`flex-row justify-between items-center`}>
                {/* Left Section: Profile Image and Details */}
                <View style={tailwind`flex-row gap-2 items-center`}>
                    {/* Profile Image or Placeholder */}
                    {item.SelfieImage ? (
                        <Image
                            source={{
                                uri: `https://api.hindustantruckers.com/storage/app/public/${item.SelfieImage}`,
                            }}
                            style={tailwind`w-10 h-10 rounded-full border border-teal`}
                        />
                    ) : (
                        <View style={tailwind`w-10 h-10 rounded-full border border-teal justify-center items-center`}>
                            <Text style={tailwind`text-gray-500`}>No</Text>
                        </View>
                    )}

                    {/* Name and City */}
                    <View>
                        <Text style={[styles.nameText, { fontSize: responsiveFontSize(16), color: "#000" }]}>
                            {item.FullName}
                        </Text>
                        <Text style={[styles.infoText, { fontSize: responsiveFontSize(14) }]}>
                            <FontAwesome5 name="map-marker-alt" size={14} color={Colors.appColor} />{" "}
                            {item.City}
                        </Text>
                    </View>
                </View>

                {/* Right Section: Document Status */}
                <View style={tailwind`flex-row items-center gap-2`}>
                    <Text style={[styles.infoText, { fontSize: responsiveFontSize(14) }]}>
                        Document Status
                    </Text>
                    {item.document_status === 0 ? (
                        <MaterialIcons name="dangerous" size={24} color={"red"} />
                    ) : (
                        <AntDesign name="checkcircle" size={24} color={"green"} />
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
    return (
        <>
            <Heading leftIcon={true} heading={""} rightAction={<TouchableOpacity onPress={() => navigation.navigate("AddDriver")} style={tailwind`bg-[#fff] px-3 py-1 rounded-sm`}><Text style={[{ fontSize: responsiveFontSize(12), color: Colors.appColor }]}><Entypo name="plus" size={12} color={Colors.appColor} /> Add Driver</Text></TouchableOpacity>} />

            <FlatList
                data={drivers} // Pass the array of trucks
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
                    tailwind`pb-20`,
                ]}
            />
        </>
    )
}

export default DriverList
const styles = StyleSheet.create({
    nameText: {
        fontFamily: 'Poppins-Bold',
        color: Colors.textDark,
    },

    // Info Text Style
    infoText: {
        fontFamily: 'Poppins-Regular',
        color: Colors.textLight,
    },
})
