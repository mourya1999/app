import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import tailwind from 'twrnc';
import Heading from '../../../../common/Heading';
import {responsiveFontSize} from '../../../../utility/utility';
import CommonInput from '../../../../common/CommonInput';
import CommonDropdown from '../../../../common/CommonDropdown';
import apiService from '../../../../redux/apiService';
import {useSelector} from 'react-redux';

const TruckRegistration = () => {
  const token = useSelector(state => state.auth.token);
  const [step, setStep] = useState(1);
  const progress = useRef(new Animated.Value(1)).current;
  const [selectedUnit, setSelectedUnit] = useState('Ton');
  const [truckName, setTruckName] = useState();
  // Form Data State
  const [formData, setFormData] = useState({
    TruckNumber: '',
    TypeId: '', // Dropdown value
    Capacity: '',
    Rate: '',
    Height: '',
    Width: '',
    OriginRoute: '',
    AllRoutes: '',
    DestinationRoute: '',
    ModelYear: '',
    ChassisNumber: '',
    PSTNumber: '',
    GSTNumber: '',
    CapacityUnit:selectedUnit
  });
  const [selectedTruckName, setSelectedTruckName] = useState("")

  // Handle Input Changes
  const handleInputChange = (key, value) => {
    setFormData(prevData => ({
      ...prevData,
      [key]: value,
    }));
  };

  const getTruckNameList = async () => {
    try {
      const res = await apiService({
        endpoint: 'get/trucks_type',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('API Response truck list:', res.data);

      // Set the data in the state
      setTruckName(res.data || []);
    } catch (error) {
      console.log('Error fetching truck list:', error);
    }
  };

  //   const truckOptions = truckName.map(truck => ({
  //     label: truck.TruckType, // Use truck type as the label
  //     value: truck.id,        // Use the truck id as the value
  //   }));

  useEffect(() => {
    getTruckNameList();
  }, [token]);
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
  // Validation Function
  const validateForm = () => {
    const requiredFields = [
      'TruckNumber',
      'TypeId',
      'Capacity',
      'Rate',
      'Height',
      'Width',
      'OriginRoute',
      'DestinationRoute',
      'ModelYear',
      'ChassisNumber',
      'PSTNumber',
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        ToastAndroid.show(
          `Please fill in the ${field.replace(/([A-Z])/g, ' $1').trim()} field`,
          ToastAndroid.SHORT,
        );
        return false;
      }
    }

    if (isNaN(formData.Capacity) || parseFloat(formData.Capacity) <= 0) {
      ToastAndroid.show(
        'Capacity must be a valid number greater than 0',
        ToastAndroid.SHORT,
      );
      return false;
    }

    if (isNaN(formData.Rate) || parseFloat(formData.Rate) <= 0) {
      ToastAndroid.show(
        'Rate must be a valid number greater than 0',
        ToastAndroid.SHORT,
      );
      return false;
    }

    if (isNaN(formData.Height) || parseFloat(formData.Height) <= 0) {
      ToastAndroid.show(
        'Height must be a valid number greater than 0',
        ToastAndroid.SHORT,
      );
      return false;
    }

    if (isNaN(formData.Width) || parseFloat(formData.Width) <= 0) {
      ToastAndroid.show(
        'Width must be a valid number greater than 0',
        ToastAndroid.SHORT,
      );
      return false;
    }

    return true;
  };

  // Handle Form Submission
  const handleSubmit = async () => {
    // if (!validateForm()) {
    //     return;
    // }
    console.log("formdata ", formData)
    try {
      const res = await apiService({
        endpoint: 'truck_owner/truck/registration', // Replace with your actual endpoint
        method: 'POST',
        data: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('API Response post:', res.data);
      ToastAndroid.show('Truck registered successfully!', ToastAndroid.SHORT);
    } catch (error) {
      console.log('Add truck error:', error);
      ToastAndroid.show(
        'Failed to register truck. Please try again.',
        ToastAndroid.SHORT,
      );
    }
  };

  console.log("truck name : ",  truckName)

  const truckTypes = truckName ? truckName.map(item => item.TruckType) : [];

console.log(truckTypes);
  return (
    <>
      <Heading
        leftIcon={true}
        heading={'Truck Registration '}
        rightAction={<Text></Text>}
      />

      <View style={styles.container}>
        {/* Step Indicator */}
        <View style={styles.stepContainer}>
          {[1, 2].map((item, index) => (
            <View key={index} style={styles.stepWrapper}>
              <View
                style={tailwind`border ${
                  step >= item ? 'border-teal-700' : 'border-[#000]'
                } p-[2px] rounded-full`}>
                <View
                  style={[styles.circle, step >= item && styles.activeCircle]}
                />
              </View>
              {index < 1 && (
                <Animated.View
                  style={[
                    styles.line,
                    {
                      position: 'absolute',
                      top: '50%',
                      left: '100%',
                      right: '100%',
                      transform: [{translateY: -1}],
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
            <View style={styles.form}>
              <CommonDropdown
                label={'Select Truck'}
                placeholder={'Truck'}
                options={truckTypes}
                onSelect={value => {
                  handleInputChange('TypeId', value);
                  setSelectedTruckName(value)
                }}
                value={selectedTruckName}
              />
              <CommonInput
                label={'Truck Capacity *'}
                placeholder={'Enter Truck Capacity'}
                value={formData.Capacity}
                onChangeText={text => handleInputChange('Capacity', text)}
                keyboardType="numeric"
                rightAction={
                  <View
                    style={tailwind`flex flex-row justify-between bg-gray-200 p-1 rounded-lg w-32`}>
                    {['Ton', 'Kg'].map(unit => (
                      <TouchableOpacity
                        key={unit}
                        onPress={() => setSelectedUnit(unit)}
                        style={[
                          tailwind`flex-1 p-2 rounded-lg items-center`,
                          selectedUnit === unit
                            ? tailwind`bg-teal-500`
                            : tailwind`bg-transparent`,
                        ]}>
                        <Text
                          style={
                            selectedUnit === unit
                              ? tailwind`text-white font-bold`
                              : tailwind`text-gray-600`
                          }>
                          {unit}
                        </Text>
                      </TouchableOpacity>
                    ))}
                  </View>
                }
              />
              <CommonInput
                label={'Truck Width(ft) *'}
                placeholder={'Enter Truck Width'}
                value={formData.Width}
                onChangeText={text => handleInputChange('Width', text)}
                keyboardType="numeric"
              />
              <CommonInput
                label={'Truck Height(ft) *'}
                placeholder={'Enter Truck Height'}
                value={formData.Height}
                onChangeText={text => handleInputChange('Height', text)}
                keyboardType="numeric"
              />
            </View>
          </ScrollView>
        )}
        {step === 2 && (
          <ScrollView>
            <View style={styles.form}>
              <CommonInput
                label={'Rate(Per/Km) *'}
                placeholder={'Enter Rate'}
                value={formData.Rate}
                onChangeText={text => handleInputChange('Rate', text)}
                keyboardType="numeric"
              />
              <CommonInput
                label={'Origin Route *'}
                placeholder={'Enter Origin Route'}
                value={formData.OriginRoute}
                onChangeText={text => handleInputChange('OriginRoute', text)}
              />
              <CommonInput
                label={'Truck Number *'}
                placeholder={'Enter Truck Number'}
                value={formData.TruckNumber}
                onChangeText={text => handleInputChange('TruckNumber', text)}
              />
              <CommonInput
                label={'DestinationRoute *'}
                placeholder={'Enter DestinationRoute'}
                value={formData.DestinationRoute}
                onChangeText={text => handleInputChange('DestinationRoute', text)}
              />
              <CommonInput
                label={'Model Year *'}
                placeholder={'Enter Model Year'}
                value={formData.ModelYear}
                onChangeText={text => handleInputChange('ModelYear', text)}
                keyboardType="numeric"
              />
              <CommonInput
                label={'Engine/Chassis Number *'}
                placeholder={'Enter Engine/Chassis Number'}
                value={formData.ChassisNumber}
                onChangeText={text => handleInputChange('ChassisNumber', text)}
              />
              <CommonInput
                label={'PST Number *'}
                placeholder={'Enter PST Number'}
                value={formData.PSTNumber}
                onChangeText={text => handleInputChange('PSTNumber', text)}
              />
              <CommonInput
                label={'OriginRoute *'}
                placeholder={'Enter OriginRoute'}
                value={formData.OriginRoute}
                onChangeText={text => handleInputChange('OriginRoute', text)}
              />
              <CommonInput
                label={'GST Number *'}
                placeholder={'Enter GST Number'}
                value={formData.GSTNumber}
                onChangeText={text => handleInputChange('GSTNumber', text)}
              />
              <CommonInput
                label={'All Routes *'}
                placeholder={'Enter All Route'}
                value={formData.AllRoutes}
                onChangeText={text => handleInputChange('AllRoutes', text)}
              />
            </View>
          </ScrollView>
        )}

        {/* Navigation Buttons */}
        <View style={styles.buttonContainer}>
          {step > 1 && (
            <TouchableOpacity
              onPress={handleBack}
              style={styles.buttonSecondary}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={step === 2 ? handleSubmit : handleNext}
            style={styles.button}>
            <Text style={styles.buttonText}>
              {step === 2 ? 'Submit' : 'Next'}
            </Text>
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
    fontSize: responsiveFontSize(22),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 100,
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
    borderColor: '#000',
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
    fontSize: responsiveFontSize(18),
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: responsiveFontSize(16),
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
    width: '100%',
    gap: 12,
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
    fontSize: responsiveFontSize(16),
  },
});
