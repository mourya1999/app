import React from 'react';
import { Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import tw from 'twrnc';
import { Colors } from '../../assets/AppColors';

const Account = ({ navigation }) => {
  return (
    <View style={tw`p-4 bg-gray-100 h-full`}>
      {/* Profile Header */}
      <View style={tw`p-4 bg-[#1E9891] rounded-lg`}>
        <View style={tw`flex-row items-center`}>
          <Image
            source={{ uri: 'https://via.placeholder.com/150' }}
            style={tw`w-16 h-16 rounded-full border-2 border-white`}
          />
          <View style={tw`ml-4 flex-1`}>
            <Text style={tw`text-white text-lg font-bold`}>Sunil Kumar</Text>
            <Text style={tw`text-white text-sm`}>9616027387</Text>
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('EditProfile')}>
            <Feather name="edit" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Content Section */}
      <ScrollView style={tw`mt-4`}>
        {[
          { title: 'Personal Information', subtitle: 'Your name, mobile number, email, address', screen: 'Personal' },
          { title: 'Company Information', subtitle: 'Your company name, address', screen: 'Company' },
          { title: 'KYC Information', subtitle: 'Your KYC information', screen: 'KYCScreen' },
          { title: 'Bank Details', subtitle: 'Your bank information', screen: 'BankDetails' },
          { title: 'Contact Support', screen: 'Support' },
          { title: 'Logout', screen: 'Logout' },
        ].map((item, index) => (
          <TouchableOpacity key={index} style={tw`bg-white p-4 rounded-lg mb-2 shadow`}
            onPress={() => navigation.navigate(item.screen)}>
            <Text style={tw`text-black font-semibold`}>{item.title}</Text>
            {item.subtitle && <Text style={tw`text-gray-500 text-sm`}>{item.subtitle}</Text>}
          </TouchableOpacity>
        ))}

        {/* Delete Account */}
        <TouchableOpacity style={tw`border border-red-500 p-4 rounded-lg mt-2`}
          onPress={() => navigation.navigate('DeleteAccount')}>
          <Text style={tw`text-red-500 font-semibold text-center`}>Delete Account</Text>
        </TouchableOpacity>

        {/* Version Info */}
        <Text style={tw`text-center text-[${Colors.appColor}] mt-4`}>Current Version v1.0</Text>
      </ScrollView>
    </View>
  );
};

export default Account;
