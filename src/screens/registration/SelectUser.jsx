import React, { useState } from 'react';
import { Image, Text, View, TouchableOpacity, StyleSheet, Alert, Dimensions } from 'react-native';
import tailwind from 'twrnc'; // Ensure twrnc is installed and configured
import { useNavigation } from '@react-navigation/native';
import CommonButton from '../../common/CommonButton';
import { Colors } from '../../assets/AppColors';

const {width} = Dimensions.get("screen")
// Predefine image imports since require does not support dynamic paths
const truckImage = require("../../assets/img/registration/truck.png");
const ownerImage = require("../../assets/img/registration/owner.png");
const agentImage = require("../../assets/img/registration/agent.png");
const driverImage = require("../../assets/img/registration/driver.png");

const OptionArray = [
  { role: "Truck Owner", img: ownerImage },
  { role: "Agent", img: agentImage },
  { role: "Driver", img: driverImage }
];

const SelectUser = () => {
  const navigation = useNavigation();
  const [active, setActive] = useState(null);

  // Handle user selection
  const handleSelectUser = (index) => {
    setActive(index);
  };

  // Handle "Next" button press
  const handleNext = () => {
    if (active === null) {
      Alert.alert("Error", "Please select a user role before proceeding.");
      return;
    }

    if (active === 0) {
      navigation.navigate("TruckOwner");
    } else if (active === 1) {
      Alert.alert("Coming Soon", "This feature will be available soon.");
    } else if (active === 2) {
      navigation.navigate("Driver");
    }
  };

  return (
    <View style={styles.container}>
      {/* Truck Image */}
      <Image source={truckImage} style={styles.image} />

      {/* Options */}
      {OptionArray.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.optionButton,
            active === index && styles.activeButton, // Apply active style if selected
          ]}
          onPress={() => handleSelectUser(index)}
        >
          <View style={styles.optionContent}>
            <Image source={item.img} style={styles.optionImage} />
            <Text style={styles.optionText}>{item.role}</Text>
          </View>
        </TouchableOpacity>
      ))}

      {/* Next Button */}
      <CommonButton
        textColor="#fff"
        buttonStyle={{ marginTop: '10%' }}
        backgroundColor={Colors.appColor}
        title="Next"
        onPress={handleNext}
        width={"100%"}
      />
    </View>
  );
};

export default SelectUser;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginVertical: 20,
  },
  optionButton: {
    width: '100%',
    paddingVertical: 12,
    marginBottom: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#A7A7A7',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  activeButton: {
    backgroundColor: '#D4FFFD', // Active background color
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionImage: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  optionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    textAlign: 'center',
  },
});