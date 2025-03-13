import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import apiService from './apiService';
const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const token = useSelector(state => state.auth.token || "");

  const getProfile = async () => {
    try {
      const res = await apiService({
        endpoint: 'truck_owner/get/profile',
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log('App Profile Response:', res.data[0]);
      setProfile(res.data[0]); // Update state with fetched data
    } catch (error) {
      console.error('Profile Error:', error);
    }
  };

  useEffect(() => {
    if (token) {
      getProfile();
    }
  }, [token]);

  return (
    <ProfileContext.Provider value={{ profile, getProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

// Custom hook for using the context
export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};
