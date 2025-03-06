// import React, {Component, useEffect, useState} from 'react';
// import {
//   Text,
//   StyleSheet,
//   View,
//   StatusBar,
//   Dimensions,
//   Image,
//   TouchableOpacity,
//   FlatList,
//   ToastAndroid,
//   Linking,
//   ActivityIndicator,
// } from 'react-native';
// import SpaceBetween from '../../../common/SpaceBetween';
// import {Colors} from '../../../assets/AppColors';
// import apiService from '../../../redux/apiService';
// import {useNavigation} from '@react-navigation/native';
// import tailwind from 'twrnc';
// import {useSelector} from 'react-redux';
// import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import moment from 'moment';
// import Heading from '../../../common/Heading';

// const {width, height} = Dimensions.get('screen');
// const TruckDriverHome = () => {
//   const profile = useSelector(state => state.auth);
//   console.log('driver profile : ', profile);
//   const [activeIndex, setActiveIndex] = useState(0);
//   const now = new Date();
//   const hours = now.getHours();
//   const minutes = now.getMinutes();
//   const currentTime = `${String(hours).padStart(2, '0')}:${String(
//     minutes,
//   ).padStart(2, '0')}`;

//   const navigation = useNavigation();
//   const token = useSelector(state => state.auth.token);
//   const [drivers, setDriver] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const getDriver = async () => {
//     try {
//       const res = await apiService({
//         endpoint: `truck_owner/driver/booking/list?order_status=${activeIndex}`,
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       console.log('role driver list API Response:', res.data);

//       setDriver(res.data || []);
//       setLoading(false);
//     } catch (error) {
//       console.log('role driver Error fetching truck list:', error);
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getDriver();
//   }, []);

//   const handleCall = phoneNumber => {
//     if (!phoneNumber) {
//       ToastAndroid.show('Phone number is missing!', ToastAndroid.SHORT);
//       console.log('Error: No phone number available');
//       return;
//     }

//     const phoneUrl = `tel:${phoneNumber}`;
//     Linking.openURL(phoneUrl).catch(err =>
//       console.log('Error opening dialer:', err),
//     );
//   };
//   const renderItem = ({item}) => (
//     <TouchableOpacity
//       style={tailwind`w-[96%] rounded-lg mx-1 p-3 bg-white shadow border border-gray-300`}>
//       {/* Order ID & Track Button */}
//       <View style={tailwind`flex-row justify-between items-center`}>
//         <TouchableOpacity
//           onPress={() => navigation.navigate('OrderDetail', {item})}>
//           <Text style={tailwind`text-black font-bold`}>
//             Order Id <Text style={tailwind`text-gray-600`}>{item.OrderId}</Text>
//           </Text>
//         </TouchableOpacity>

//         {/* <TouchableOpacity
//           onPress={() => handleOrderTracking(item.OrderId, item.imei_number)}
//           style={tailwind`bg-[${Colors.borderColor}] px-3 py-1 rounded-lg`}>
//           <Text style={tailwind`text-[#fff] font-semibold`}>Track</Text>
//         </TouchableOpacity> */}
//         <TouchableOpacity
//           onPress={() => handleOrderTracking(item.OrderId, item.imei_number)}
//           style={tailwind`bg-[${Colors.borderColor}] px-3 py-1 rounded-lg`}>
//           {item.StatusId === 4 && (
//             <Text style={tailwind`text-white font-semibold`}>Track</Text>
//           )}
//         </TouchableOpacity>
//       </View>

//       <Text style={tailwind`text-red-500 font-bold mt-1`}>
//         {item.StatusName}
//       </Text>
//       <View style={tailwind`border-b border-gray-300 my-2`} />

//       {/* Addresses */}
//       <View>
//         <Text style={tailwind`text-gray-700`}>
//           🔴 {item.OriginRoute.slice(0, 40) + '...'}
//         </Text>
//         <View style={tailwind`border-l-2 border-gray-400 ml-2 h-4`} />
//         <Text style={tailwind`text-gray-700`}>🟢 {item.DestinationRoute}</Text>
//       </View>

//       {/* Booking Details Section */}
//       <View style={tailwind`flex-row justify-between mt-3`}>
//         {/* Left Column */}
//         <View>
//           <Text style={[styles.labelText, {color: Colors.textLight}]}>
//             Booking Date
//           </Text>
//           <View style={tailwind`flex-row items-center`}>
//             <MaterialIcons
//               name="date-range"
//               size={16}
//               color={Colors.appColor}
//             />
//             <Text style={[styles.valueText, {color: Colors.appColor}]}>
//               {moment(item.BookingDate).format('MM-DD-YYYY')}
//             </Text>
//           </View>

//           <Text style={[styles.labelText, {color: Colors.textLight}]}>
//             Load Weight
//           </Text>
//           <View style={tailwind`flex-row items-center`}>
//             <MaterialIcons name="speed" size={16} color={Colors.appColor} />
//             <Text style={[styles.valueText, {color: Colors.appColor}]}>
//               {item.Weight} {item.WeightType}
//             </Text>
//           </View>
//         </View>

//         {/* Right Column */}
//         <View>
//           <Text style={[styles.labelText, {color: Colors.textLight}]}>
//             Material
//           </Text>
//           <View style={tailwind`flex-row items-center`}>
//             <FontAwesome5 name="box-open" size={14} color={Colors.appColor} />
//             <Text style={[styles.valueText, {color: Colors.appColor}]}>
//               {item.GoodsTypeName}
//             </Text>
//           </View>

//           <Text style={[styles.labelText, {color: Colors.textLight}]}>
//             Order Amount
//           </Text>
//           <View style={tailwind`flex-row items-center`}>
//             <MaterialIcons
//               name="currency-rupee"
//               size={16}
//               color={Colors.appColor}
//             />
//             <Text style={[styles.valueText, {color: Colors.appColor}]}>
//               {item.Amount}
//             </Text>
//           </View>
//         </View>
//       </View>

//       {/* Divider */}
//       <View style={tailwind`border-b border-gray-300 my-3`} />

//       {/* Driver Details & Call Button */}
//       <View style={tailwind`flex-row justify-between items-center`}>
//         <View style={tailwind`flex-row items-center`}>
//           <View
//             style={tailwind`w-10 h-10 rounded-full border border-teal justify-center items-center`}>
//             <Text style={tailwind`text-gray-500`}>No</Text>
//           </View>
//           <View style={tailwind`ml-2`}>
//             <Text style={tailwind`text-black font-bold`}>
//               {item.CompanyName}
//             </Text>
//             <Text style={tailwind`text-gray-500 text-xs`}>
//               {item.TruckNumber}
//             </Text>
//           </View>
//         </View>

//         <TouchableOpacity
//           onPress={() => handleCall(item.CompanyPhoneNumber)}
//           style={tailwind`bg-teal-500 px-4 py-1 rounded-lg`}>
//           <Text style={tailwind`text-white font-semibold`}>Call</Text>
//         </TouchableOpacity>
//       </View>
//     </TouchableOpacity>
//   );

//   return (
//     <>
//       <Heading leftIcon={true} heading={'Orders'} rightAction={<Text></Text>} />
//       <View style={tailwind`my-1`}>
//         <SpaceBetween justify="space-between">
//           {[
//             {id: 1, name: 'Recent'},
//             {id: 4, name: 'Ongoing'},
//             {id: 3, name: 'Completed'},
//             {id: 2, name: 'Cancelled'},
//           ].map(item => (
//             <TouchableOpacity
//               key={item.id}
//               style={[
//                 tailwind`py-3 px-2 border rounded-sm`,
//                 activeIndex == item.id
//                   ? tailwind`border-[#1E9891] bg-teal-50`
//                   : tailwind`border-gray-300`,
//               ]}
//               onPress={() => setActiveIndex(item.id)}>
//               <Text>{item.name}</Text>
//             </TouchableOpacity>
//           ))}
//         </SpaceBetween>
//       </View>
//       <View style={tailwind`flex-1 p-2`}>
//         {loading ? (
//           <ActivityIndicator
//             size="large"
//             color={Colors.appColor}
//             style={tailwind`mt-10`}
//           />
//         ) : drivers.length > 0 ? (
//           <FlatList
//             data={drivers}
//             keyExtractor={(item, index) => index.toString()}
//             renderItem={renderItem}
//           />
//         ) : (
//           <Text style={tailwind`text-center text-gray-500 mt-5`}>
//             No Orders Found
//           </Text>
//         )}
//       </View>
//     </>
//   );
// };

// export default TruckDriverHome;
// const styles = StyleSheet.create({});




import React, { useEffect, useState } from 'react';
import {
  Text,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
  Linking,
  ActivityIndicator,
} from 'react-native';
import tailwind from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import apiService from '../../../redux/apiService';
import { Colors } from '../../../assets/AppColors';
import Heading from '../../../common/Heading';
import SpaceBetween from '../../../common/SpaceBetween';

const { width, height } = Dimensions.get('screen');

const TruckDriverHome = () => {
  const navigation = useNavigation();
  const token = useSelector(state => state.auth.token);
  const [activeIndex, setActiveIndex] = useState(0);
  const [drivers, setDriver] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDriver();
  }, [activeIndex]);

  const getDriver = async () => {
    try {
      const res = await apiService({
        endpoint: `truck_owner/driver/booking/list?order_status=${activeIndex}`,
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      setDriver(res.data || []);
    } catch (error) {
      console.log('Error fetching truck list:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCall = phoneNumber => {
    if (!phoneNumber) {
      ToastAndroid.show('Phone number is missing!', ToastAndroid.SHORT);
      return;
    }
    Linking.openURL(`tel:${phoneNumber}`).catch(err =>
      console.log('Error opening dialer:', err)
    );
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity style={tailwind`w-[96%] rounded-lg mx-1 p-3 bg-white shadow border border-gray-300`}>
      <View style={tailwind`flex-row justify-between items-center`}>
        <TouchableOpacity onPress={() => navigation.navigate('OrderDetail', { item })}>
          <Text style={tailwind`text-black font-bold`}>
            Order Id: <Text style={tailwind`text-gray-600`}>{item.OrderId}</Text>
          </Text>
        </TouchableOpacity>
        {item.StatusId === 4 && (
          <TouchableOpacity style={tailwind`bg-[${Colors.borderColor}] px-3 py-1 rounded-lg`}>
            <Text style={tailwind`text-white font-semibold`}>Track</Text>
          </TouchableOpacity>
        )}
      </View>

      <Text style={tailwind`text-red-500 font-bold mt-1`}>{item.StatusName}</Text>
      <View style={tailwind`border-b border-gray-300 my-2`} />
      
      <View>
        <Text style={tailwind`text-gray-700`}>🔴 {item.OriginRoute.slice(0, 40)}...</Text>
        <View style={tailwind`border-l-2 border-gray-400 ml-2 h-4`} />
        <Text style={tailwind`text-gray-700`}>🟢 {item.DestinationRoute}</Text>
      </View>
      
      <View style={tailwind`flex-row justify-between mt-3`}>
        <View>
          <Text style={styles.labelText}>Booking Date</Text>
          <View style={tailwind`flex-row items-center`}>
            <MaterialIcons name="date-range" size={16} color={Colors.appColor} />
            <Text style={styles.valueText}>{moment(item.BookingDate).format('MM-DD-YYYY')}</Text>
          </View>
          <Text style={styles.labelText}>Load Weight</Text>
          <View style={tailwind`flex-row items-center`}>
            <MaterialIcons name="speed" size={16} color={Colors.appColor} />
            <Text style={styles.valueText}>{item.Weight} {item.WeightType}</Text>
          </View>
        </View>
        
        <View>
          <Text style={styles.labelText}>Material</Text>
          <View style={tailwind`flex-row items-center`}>
            <FontAwesome5 name="box-open" size={14} color={Colors.appColor} />
            <Text style={styles.valueText}>{item.GoodsTypeName}</Text>
          </View>
          <Text style={styles.labelText}>Order Amount</Text>
          <View style={tailwind`flex-row items-center`}>
            <MaterialIcons name="currency-rupee" size={16} color={Colors.appColor} />
            <Text style={styles.valueText}>{item.Amount}</Text>
          </View>
        </View>
      </View>
      
      <View style={tailwind`border-b border-gray-300 my-3`} />
      
      <View style={tailwind`flex-row justify-between items-center`}>
        <View style={tailwind`flex-row items-center`}>
          <View style={tailwind`w-10 h-10 rounded-full border border-teal justify-center items-center`}>
            <Text style={tailwind`text-gray-500`}>No</Text>
          </View>
          <View style={tailwind`ml-2`}>
            <Text style={tailwind`text-black font-bold`}>{item.CompanyName}</Text>
            <Text style={tailwind`text-gray-500 text-xs`}>{item.TruckNumber}</Text>
          </View>
        </View>
        <TouchableOpacity onPress={() => handleCall(item.CompanyPhoneNumber)} style={tailwind`bg-teal-500 px-4 py-1 rounded-lg`}>
          <Text style={tailwind`text-white font-semibold`}>Call</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <Heading leftIcon={false} heading='Orders' rightAction={<Text></Text>} />
      <View style={tailwind`my-2`}>
        <SpaceBetween justify='space-between'>
          {[
            { id: 1, name: 'Recent' },
            { id: 4, name: 'Ongoing' },
            { id: 3, name: 'Completed' },
            { id: 2, name: 'Cancelled' },
          ].map(item => (
            <TouchableOpacity
              key={item.id}
              style={[
                tailwind`py-3 px-2 border rounded-sm`,
                activeIndex === item.id ? tailwind`border-[#1E9891] bg-teal-50` : tailwind`border-gray-300`,
              ]}
              onPress={() => setActiveIndex(item.id)}>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </SpaceBetween>
      </View>
      <View style={tailwind`flex-1 p-2`}>
        {loading ? <ActivityIndicator size='large' color={Colors.appColor} /> :
          drivers.length > 0 ? <FlatList data={drivers} renderItem={renderItem} keyExtractor={(item, index) => index.toString()} /> :
          <Text style={tailwind`text-center text-gray-500 mt-5`}>No Orders Found</Text>}
      </View>
    </>
  );
};

export default TruckDriverHome;
const styles = StyleSheet.create({});