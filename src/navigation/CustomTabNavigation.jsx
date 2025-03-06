// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import { useSelector } from 'react-redux';
// import { Colors } from '../assets/AppColors';

// const CustomTabNavigation = ({ navigation }) => {
//   const roleTab = useSelector(state => state.auth.role)
//   const [activeTab, setActiveTab] = useState('Home');

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity
//         style={[
//           styles.tab,
//           activeTab === 'Home' ? styles.activeTabBorder : null,
//         ]}
//         onPress={() => {
//           setActiveTab('Home');
//           navigation.navigate(roleTab === "Driver" ? 'TruckDriverHome' : "TruckOwnerHome");
//         }}>
//         <MaterialIcons
//           name="home"
//           size={24}
//           color={activeTab === 'Home' ? Colors.appColor : '#A0AEC0'}
//           style={{ marginTop: 10 }}
//         />
//         <Text
//           style={[
//             styles.tabText,
//             activeTab === 'Home' && styles.activeTabText,
//           ]}>
//           Home
//         </Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={[
//           styles.tab,
//           activeTab === 'Map' ? styles.activeTabBorder : null,
//         ]}
//         onPress={() => {
//           setActiveTab('Map');
//           navigation.navigate('Map');
//         }}>
//         <FontAwesome6
//           name="location-dot"
//           size={24}
//           color={activeTab === 'Map' ? Colors.appColor : '#A0AEC0'}
//           style={{ marginTop: 10 }}
//         />
//         <Text
//           style={[
//             styles.tabText,
//             activeTab === 'Map' && styles.activeTabText,
//           ]}>
//           Map
//         </Text>
//       </TouchableOpacity>

//       <TouchableOpacity
//         style={[
//           styles.tab,
//           activeTab === 'Account' ? styles.activeTabBorder : null,
//         ]}
//         onPress={() => {
//           setActiveTab('Account');
//           navigation.navigate('Account');
//         }}>
//         <MaterialCommunityIcons
//           name="account"
//           size={25}
//           color={activeTab === 'Account' ? Colors.appColor : '#A0AEC0'}
//           style={{ marginTop: 10 }}
//         />
//         <Text
//           style={[
//             styles.tabText,
//             activeTab === 'Account' && styles.activeTabText,
//           ]}>
//           Account
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// export default CustomTabNavigation;

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     backgroundColor: '#fff',
//     borderTopRightRadius: 20,
//     borderTopLeftRadius: 20,
//   },
//   tab: {
//     alignItems: 'center',
//   },
//   tabText: {
//     fontSize: 12,
//     color: '#A0AEC0',
//   },
//   activeTabText: {
//     color: Colors.appColor,
//   },
//   activeTabBorder: {
//   },
// });

import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {useSelector} from 'react-redux';
import {Colors} from '../assets/AppColors';

const CustomTabNavigation = ({navigation}) => {
  const roleTab = useSelector(state => state.auth.role || 'TruckOwner'); // Default to "TruckOwner"
  const [activeTab, setActiveTab] = useState('Home');

  const handleTabPress = (tabName, screenName) => {
    setActiveTab(tabName);
    navigation.navigate(screenName);
  };

  return (
    <View style={styles.container}>
      {/* Home Tab */}
      <TouchableOpacity
        accessible={true}
        accessibilityLabel="Home Tab"
        style={[
          styles.tab,
          activeTab === 'Home' ? styles.activeTabBorder : null,
        ]}
        onPress={() => {
          const homeScreen =
            roleTab === 'Driver' ? 'TruckDriverHome' : 'TruckOwnerHome';
          handleTabPress('Home', homeScreen);
        }}>
        <MaterialIcons
          name="home"
          size={24}
          color={activeTab === 'Home' ? Colors.appColor : '#A0AEC0'}
          style={{marginTop: 10}}
        />
        <Text
          style={[
            styles.tabText,
            activeTab === 'Home' && styles.activeTabText,
          ]}>
          Home
        </Text>
      </TouchableOpacity>

      {/* Map Tab */}
      {roleTab === 'Driver' ? (
        <TouchableOpacity
          accessible={true}
          accessibilityLabel="Map Tab"
          style={[
            styles.tab,
            activeTab === 'Map' ? styles.activeTabBorder : null,
          ]}
          onPress={() => {
            const homeScreen = roleTab === 'Driver' ? 'Map' : 'Order';
            handleTabPress('Map', homeScreen);
          }}>
          <FontAwesome6
            name="location-dot"
            size={24}
            color={activeTab === 'Map' ? Colors.appColor : '#A0AEC0'}
            style={{marginTop: 10}}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'Map' && styles.activeTabText,
            ]}>
            Map
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          accessible={true}
          accessibilityLabel="Order Tab"
          style={[
            styles.tab,
            activeTab === 'Order' ? styles.activeTabBorder : null,
          ]}
          onPress={() => {
            handleTabPress('Order', 'Order');
          }}>
          <Fontisto
            name="prescription"
            size={24}
            color={activeTab === 'Order' ? Colors.appColor : '#A0AEC0'}
            style={{marginTop: 10}}
          />
          <Text
            style={[
              styles.tabText,
              activeTab === 'Order' && styles.activeTabText,
            ]}>
            Order
          </Text>
        </TouchableOpacity>
      )}

      {/* Account Tab */}
      <TouchableOpacity
        accessible={true}
        accessibilityLabel="Account Tab"
        style={[
          styles.tab,
          activeTab === 'Account' ? styles.activeTabBorder : null,
        ]}
        onPress={() => {
          const homeScreen = roleTab === 'Driver' ? 'AccountDriver' : 'Account';
          handleTabPress('Account', homeScreen);
        }}>
        <MaterialCommunityIcons
          name="account"
          size={25}
          color={activeTab === 'Account' ? Colors.appColor : '#A0AEC0'}
          style={{marginTop: 10}}
        />
        <Text
          style={[
            styles.tabText,
            activeTab === 'Account' && styles.activeTabText,
          ]}>
          Account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default CustomTabNavigation;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingVertical: 10,
  },
  tab: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    color: '#A0AEC0',
  },
  activeTabText: {
    color: Colors.appColor,
  },
  activeTabBorder: {
    borderBottomWidth: 3,
    borderBottomColor: Colors.appColor,
    paddingBottom: 5,
  },
});
