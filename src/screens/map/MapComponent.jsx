import React, { useEffect, useState } from 'react';
import { View, StyleSheet, PermissionsAndroid, Platform, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const MapComponent = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'App needs access to your location.',
            buttonPositive: 'OK',
          }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          getCurrentLocation();
        } else {
          Alert.alert('Permission Denied', 'Location permission denied.');
        }
      } else {
        getCurrentLocation();
      }
    };

    const getCurrentLocation = () => {
      Geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setLocation({
            latitude,
            longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        },
        error => {
          console.error('Error getting location: ', error);
          Alert.alert('Error', 'Failed to get location.');
          // Fallback to a default location (Example: New York)
          setLocation({
            latitude: 40.7128,
            longitude: -74.006,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          });
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
      );
    };

    requestLocationPermission();

    // Cleanup on unmount
    return () => {
      Geolocation.stopObserving();
    };
  }, []);

  if (!location) {
    return null;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={location} // ✅ Use 'region' instead of 'initialRegion'
        showsUserLocation={true}
        followsUserLocation={true}
      >
        <Marker
          coordinate={{
            latitude: location.latitude,
            longitude: location.longitude,
          }}
          title="Your Location"
          description="This is where you are"
        />
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default MapComponent;
