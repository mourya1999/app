import React, { Component } from 'react'
import { Text, StyleSheet, View, Image } from 'react-native'
import SpaceBetween from '../../common/SpaceBetween'
import { Colors } from '../../assets/AppColors'
import Feather from "react-native-vector-icons/Feather"
import tw from 'twrnc'

const Account = () => {
    return (
        <View style={tw`p-2`}>
            <View style={tw`p-2 bg-[#1E9891] w-full h-[23%] rounded-lg`}>
                <SpaceBetween>
                    <Image source={{ uri: "" }} style={tw`w-14 h-14 rounded-full border`} />
                    <View>
                        <Text style={tw`text-[#fff]`}>Name</Text>
                        <Text style={tw`text-[#fff]`}>Loading...</Text>
                    </View>
                    <Feather name={"edit"} size={30} color={"#fff"} />
                </SpaceBetween>
            </View>
            <View style={tw`py-3`}>
              {[1,2,3,4].map((item)=>(
                <View style={tw`shadow p-2 bg-[#fff]  mx-1 mt-2 rounded-lg`}>
                    <Text>hbs</Text>
                </View>
            ))}   
            </View>
           
        </View>
    )

}

export default Account
const styles = StyleSheet.create({})
