// import React, { useEffect, useState } from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';
// import Splash from './src/screens/Splash';
// import Onboarding from './src/screens/onboading/Onboarding';
// import EnterNumber from './src/screens/registration/EnterNumber';
// import VerifyOtp from './src/screens/registration/VerifyOtp';
// import SignUp from './src/screens/registration/SignUp';
// import SignIn from './src/screens/SignIn';
// import Account from './src/screens/account/Account';
// import MapScreen from './src/screens/map/MapScreen';
// import CustomTabNavigation from './src/navigation/CustomTabNavigation';
// import SelectUser from './src/screens/registration/SelectUser';
// import TruckOwner from './src/screens/registration/truckOwner/TruckOwner';
// import Driver from './src/screens/registration/driver/Driver';
// import TruckDriverHome from './src/screens/home/truckDriver/TruckDriverHome';
// import TruckOwnerHome from './src/screens/home/truckOwner/TruckOwnerHome';
// import { useSelector } from 'react-redux';
// import DriverList from './src/screens/home/truckOwner/driver/DriverList';
// import TruckList from './src/screens/home/truckOwner/truck/TruckList';
// import TruckRegistration from './src/screens/home/truckOwner/truck/TruckRegistration';
// import AddDriver from './src/screens/home/truckOwner/driver/AddDriver';
// import DriverDetail from './src/screens/home/truckOwner/driver/DriverDetail';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// const Tab = createBottomTabNavigator();
// const AppTabs = () => {
//   const roleHome = useSelector(state => state.auth.role || "Truck Owner"); // Default to "TruckOwner"
//   return (
//     <Tab.Navigator
//       key={roleHome} // Force re-render when role changes
//       screenOptions={{
//         headerShown: false,
//       }}
//       tabBar={(props) => <CustomTabNavigation {...props} />}
//     >
//       {roleHome === "Driver" ? (
//         <Tab.Screen
//           name="TruckDriverHome"
//           component={TruckDriverHome}
//           options={{ headerShown: false }}
//         />
//       ) : (
//         <Tab.Screen
//           name="TruckOwnerHome"
//           component={TruckOwnerHome}
//           options={{ headerShown: false }}
//         />
//       )}
//       <Tab.Screen
//         name="Map"
//         component={MapScreen}
//         options={{ headerShown: false }}
//       />
//       <Tab.Screen
//         name="Account"
//         component={Account}
//         options={{ headerShown: false }}
//       />
//     </Tab.Navigator>
//   );
// };

// const HomeStackNavigator = () => {
//   const HomeStack = createStackNavigator();
//   const token = useSelector(state => state.auth.token)
//   const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);
//   useEffect(() => {
//     const bootstrapAsync = async () => {
//       try {
//         const onboardingStatus = await AsyncStorage.getItem('hasSeenOnboarding');
//         setHasSeenOnboarding(onboardingStatus === 'true');
//       } catch (error) {
//         console.error('Error retrieving data:', error);
//       }
//     };
//     bootstrapAsync();
//   }, []);
//   return (
//     <HomeStack.Navigator>
//       <HomeStack.Screen
//         name="Splash"
//         component={Splash}
//         options={{ headerShown: false }}
//       />
//       {!hasSeenOnboarding ? (
//         <>
//         <HomeStack.Screen
//           name="Onboarding"
//           component={() => (
//             <Onboarding
//               onComplete={() => {
//                 hasSeenOnboarding = true;
//               }}
//             />
//           )}
//           options={{ headerShown: false }}
//         />
//         <HomeStack.Screen
//             name="EnterNumber"
//             component={EnterNumber}
//             options={{ headerShown: false }}
//           />
//           </>
//       ) : (
//         <HomeStack.Screen
//           name="EnterNumber"
//           component={EnterNumber}
//           options={{ headerShown: false }}
//         />
//       )}
//       {!token ?
//         <>
//           <HomeStack.Screen
//             name="EnterNumber"
//             component={EnterNumber}
//             options={{ headerShown: false }}
//           />
//           <HomeStack.Screen
//             name="SelectUser"
//             component={SelectUser}
//             options={{ headerShown: false }}
//           />
//         </> :
//         <>

//           <HomeStack.Screen
//             name="VerifyOtp"
//             component={VerifyOtp}
//             options={{ headerShown: false }}
//           />
//           <HomeStack.Screen
//             name="TruckOwner"
//             component={TruckOwner}
//             options={{ headerShown: false }}
//           />
//           <HomeStack.Screen
//             name="Driver"
//             component={Driver}
//             options={{ headerShown: false }}
//           />
//           <HomeStack.Screen
//             name="SignUp"
//             component={SignUp}
//             options={{ headerShown: false }}
//           />
//           <HomeStack.Screen
//             name="SignIn"
//             component={SignIn}
//             options={{ headerShown: false }}
//           />
//           <HomeStack.Screen
//             name="DriverList"
//             component={DriverList}
//             options={{ headerShown: false }}
//           />
//           <HomeStack.Screen
//             name="TruckList"
//             component={TruckList}
//             options={{ headerShown: false }}
//           />
//           <HomeStack.Screen
//             name="TruckRegistration"
//             component={TruckRegistration}
//             options={{ headerShown: false }}
//           />
//           <HomeStack.Screen
//             name="AddDriver"
//             component={AddDriver}
//             options={{ headerShown: false }}
//           />
//           <HomeStack.Screen
//             name="DriverDetail"
//             component={DriverDetail}
//             options={{ headerShown: false }}
//           />
//           <HomeStack.Screen
//             name="AppTabs"
//             component={AppTabs}
//             options={{ headerShown: false }}
//           />
//         </>}
//     </HomeStack.Navigator>
//   );
// }
// const App = () => {
//   return (
//     <NavigationContainer>
//       <HomeStackNavigator />
//     </NavigationContainer>
//   );
// };
// export default App;



import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
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
import { useSelector } from 'react-redux';
import DriverList from './src/screens/home/truckOwner/driver/DriverList';
import TruckList from './src/screens/home/truckOwner/truck/TruckList';
import TruckRegistration from './src/screens/home/truckOwner/truck/TruckRegistration';
import AddDriver from './src/screens/home/truckOwner/driver/AddDriver';
import DriverDetail from './src/screens/home/truckOwner/driver/DriverDetail';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

// AppTabs Component
const AppTabs = () => {
  const roleHome = useSelector((state) => state.auth.role || "Truck Owner"); // Default to "TruckOwner"
  return (
    <Tab.Navigator
      key={roleHome} // Force re-render when role changes
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomTabNavigation {...props} />}
    >
      {roleHome === "Driver" ? (
        <Tab.Screen
          name="TruckDriverHome"
          component={TruckDriverHome}
          options={{ headerShown: false }}
        />
      ) : (
        <Tab.Screen
          name="TruckOwnerHome"
          component={TruckOwnerHome}
          options={{ headerShown: false }}
        />
      )}
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

// HomeStackNavigator Component
const HomeStackNavigator = () => {
  const HomeStack = createStackNavigator();
  const token = useSelector((state) => state.auth.token);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(false);

  useEffect(() => {
    const bootstrapAsync = async () => {
      try {
        const onboardingStatus = await AsyncStorage.getItem('hasSeenOnboarding');
        setHasSeenOnboarding(onboardingStatus === 'true');
      } catch (error) {
        console.error('Error retrieving data:', error);
      }
    };
    bootstrapAsync();
  }, []);

  return (
    <HomeStack.Navigator>
      {/* Splash Screen */}
      <HomeStack.Screen
        name="Splash"
        component={Splash}
        options={{ headerShown: false }}
      />
 <HomeStack.Screen
        name="VerifyOtp"
        component={VerifyOtp}
        options={{ headerShown: false }}
      />
      {/* Onboarding Flow */}
      {!hasSeenOnboarding ? (
        <>
          <HomeStack.Screen
            name="Onboarding"
            component={() => (
              <Onboarding
                onComplete={() => {
                  AsyncStorage.setItem('hasSeenOnboarding', 'true');
                  setHasSeenOnboarding(true);
                }}
              />
            )}
            options={{ headerShown: false }}
          />
          <HomeStack.Screen
            name="EnterNumber"
            component={EnterNumber}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>  <HomeStack.Screen
          name="EnterNumber"
          component={EnterNumber}
          options={{ headerShown: false }}
        />
       
        </>
      
      )}

      {/* Authentication Flow */}
      {!token ? (
        <>
          <HomeStack.Screen
            name="EnterNumber"
            component={EnterNumber}
            options={{ headerShown: false }}
          />
          <HomeStack.Screen
            name="SelectUser"
            component={SelectUser}
            options={{ headerShown: false }}
          />
         
          <HomeStack.Screen
            name="SignUp"
            component={SignUp}
            options={{ headerShown: false }}
          />
          <HomeStack.Screen
            name="SignIn"
            component={SignIn}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          {/* Post-Authentication Screens */}
          <HomeStack.Screen
            name="DriverList"
            component={DriverList}
            options={{ headerShown: false }}
          />
          <HomeStack.Screen
            name="TruckList"
            component={TruckList}
            options={{ headerShown: false }}
          />
          <HomeStack.Screen
            name="TruckRegistration"
            component={TruckRegistration}
            options={{ headerShown: false }}
          />
          <HomeStack.Screen
            name="AddDriver"
            component={AddDriver}
            options={{ headerShown: false }}
          />
          <HomeStack.Screen
            name="DriverDetail"
            component={DriverDetail}
            options={{ headerShown: false }}
          />
          <HomeStack.Screen
            name="AppTabs"
            component={AppTabs}
            options={{ headerShown: false }}
          />
        </>
      )}
    </HomeStack.Navigator>
  );
};

// Main App Component
const App = () => {
  return (
    <NavigationContainer>
      <HomeStackNavigator />
    </NavigationContainer>
  );
};

export default App;