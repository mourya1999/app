import React, {useEffect, useState} from 'react';
import {
  CommonActions,
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Splash from './src/screens/Splash';
import Onboarding from './src/screens/onboading/Onboarding';
import EnterNumber from './src/screens/registration/EnterNumber';
import VerifyOtp from './src/screens/registration/VerifyOtp';
import SignUp from './src/screens/registration/SignUp';
import SignIn from './src/screens/SignIn';
import Account from './src/screens/account/Account';
import MapScreen from './src/screens/map/MapScreen';
import CustomTabNavigation from './src/navigation/CustomTabNavigation';
import SelectUser from './src/screens/registration/SelectUser';
import TruckOwner from './src/screens/registration/truckOwner/TruckOwner';
import Driver from './src/screens/registration/driver/Driver';
import TruckDriverHome from './src/screens/home/truckDriver/TruckDriverHome';
import TruckOwnerHome from './src/screens/home/truckOwner/TruckOwnerHome';
import {useSelector} from 'react-redux';
import DriverList from './src/screens/home/truckOwner/driver/DriverList';
import TruckList from './src/screens/home/truckOwner/truck/TruckList';
import TruckRegistration from './src/screens/home/truckOwner/truck/TruckRegistration';
import AddDriver from './src/screens/home/truckOwner/driver/AddDriver';
import DriverDetail from './src/screens/home/truckOwner/driver/DriverDetail';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Orders from './src/screens/orders/Orders';
import BankDetails from './src/screens/account/BankDetails';
import Company from './src/screens/account/Company';
import KYCScreen from './src/screens/account/KYCScreen';
import Personal from './src/screens/account/Personal';
import Support from './src/screens/account/Support';
import EditProfile from './src/screens/account/EditProfile';
import OrderDetail from './src/screens/orders/OrderDetail';
import UpdateDoc from './src/screens/home/truckOwner/truck/UpdateDoc';
const Tab = createBottomTabNavigator();
const AppTabs = () => {
  const roleHome = useSelector(state => state.auth.role || 'Truck Owner');
  return (
    <Tab.Navigator
      key={roleHome}
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <CustomTabNavigation {...props} />}>
      {roleHome === 'Driver' ? (
        <Tab.Screen
          name="TruckDriverHome"
          component={TruckDriverHome}
          options={{headerShown: false}}
        />
      ) : (
        <Tab.Screen
          name="TruckOwnerHome"
          component={TruckOwnerHome}
          options={{headerShown: false}}
        />
      )}
      {roleHome === 'Driver' ? (
        <Tab.Screen
          name="Map"
          component={MapScreen}
          options={{headerShown: false}}
        />
      ) : (
        <Tab.Screen
          name="Order"
          component={Orders}
          options={{headerShown: false}}
        />
      )}
      {roleHome === 'Driver' ? (
        <Tab.Screen
          name="AccountDriver"
          component={Account}
          options={{headerShown: false}}
        />
      ) : (
        <Tab.Screen
          name="Account"
          component={Account}
          options={{headerShown: false}}
        />
      )}
    </Tab.Navigator>
  );
};

const HomeStackNavigator = () => {
  const HomeStack = createStackNavigator();
  const token = useSelector(state => state.auth.token);
  const navigation = useNavigation();
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const onboardingStatus = await AsyncStorage.getItem(
          'hasSeenOnboarding',
        );
        setHasSeenOnboarding(onboardingStatus === 'true');
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    };

    bootstrapAsync();
  }, []);

  useEffect(() => {
    const getScreenName = () => {
      if (token) {
        return 'AppTabs';
      } else {
        return 'Splash';
      }
    };

    const screenName = getScreenName();

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: screenName}],
      }),
    );
  }, [token, navigation]);

  useEffect(() => {
    if (token) {
      return 'AppTabs';
    } else {
      return 'Splash';
    }
  }, []);
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      {!hasSeenOnboarding && !token ? (
        <HomeStack.Screen
          name="Onboarding"
          component={() => (
            <Onboarding
              onComplete={async () => {
                await AsyncStorage.setItem('hasSeenOnboarding', 'true');
                setHasSeenOnboarding(true);
              }}
            />
          )}
          options={{headerShown: false}}
        />
      ) : (
        <HomeStack.Screen
          name="EnterNumber"
          component={EnterNumber}
          options={{headerShown: false}}
        />
      )}
      {!token ? (
        <>
          <HomeStack.Screen
            name="SelectUser"
            component={SelectUser}
            options={{headerShown: false}}
          />
          <HomeStack.Screen
            name="VerifyOtp"
            component={VerifyOtp}
            options={{headerShown: false}}
          />
          <HomeStack.Screen
            name="EnterNumber"
            component={EnterNumber}
            options={{headerShown: false}}
          />
        </>
      ) : (
        <>
          <HomeStack.Screen
            name="TruckOwner"
            component={TruckOwner}
            options={{headerShown: false}}
          />
          <HomeStack.Screen
            name="OrderDetail"
            component={OrderDetail}
            options={{headerShown: false}}
          />
          <HomeStack.Screen
            name="Driver"
            component={Driver}
            options={{headerShown: false}}
          />
          <HomeStack.Screen
            name="SignUp"
            component={SignUp}
            options={{headerShown: false}}
          />
          <HomeStack.Screen
            name="SignIn"
            component={SignIn}
            options={{headerShown: false}}
          />
          <HomeStack.Screen
            name="DriverList"
            component={DriverList}
            options={{headerShown: false}}
          />
          <HomeStack.Screen
            name="TruckList"
            component={TruckList}
            options={{headerShown: false}}
          />
          <HomeStack.Screen
            name="TruckRegistration"
            component={TruckRegistration}
            options={{headerShown: false}}
          />
          <HomeStack.Screen
            name="AddDriver"
            component={AddDriver}
            options={{headerShown: false}}
          />
          <HomeStack.Screen
            name="DriverDetail"
            component={DriverDetail}
            options={{headerShown: false}}
          />
          <HomeStack.Screen
            name="BankDetails"
            component={BankDetails}
            options={{headerShown: false}}
          />
          <HomeStack.Screen
            name="Company"
            component={Company}
            options={{headerShown: false}}
          />
          <HomeStack.Screen
            name="KYCScreen"
            component={KYCScreen}
            options={{headerShown: false}}
          />
          <HomeStack.Screen
            name="Personal"
            component={Personal}
            options={{headerShown: false}}
          />
          <HomeStack.Screen
            name="Support"
            component={Support}
            options={{headerShown: false}}
          />
          <HomeStack.Screen
            name="EditProfile"
            component={EditProfile}
            options={{headerShown: false}}
          />
          <HomeStack.Screen
            name="UpdateDoc"
            component={UpdateDoc}
            options={{headerShown: false}}
          />
          <HomeStack.Screen
            name="AppTabs"
            component={AppTabs}
            options={{headerShown: false}}
          />
        </>
      )}
    </HomeStack.Navigator>
  );
};
const App = () => {
  return (
    <NavigationContainer>
      <HomeStackNavigator />
    </NavigationContainer>
  );
};
export default App;
