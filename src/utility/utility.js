// utils/responsive.js
import { Dimensions } from 'react-native';

export const responsiveFontSize = (size) => {
  const { width } = Dimensions.get('window');
  const scale = width / 375; // Base width for scaling
  return Math.round(size * scale);
};

export const isValidNumber = (number) => {
  return /^\d+$/.test(number) && number.length === 10;
};