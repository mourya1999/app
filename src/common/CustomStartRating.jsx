import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const CustomStarRating = ({ 
  maxStars = 5, 
  size = 10, 
  color = '#FFD700', 
  inactiveColor = '#D3D3D3', 
  onRatingChange 
}) => {
  const [rating, setRating] = useState(0);

  const handlePress = (star) => {
    setRating(star);
    if (onRatingChange) onRatingChange(star);
  };

  return (
    <View style={styles.container}>
      {[...Array(maxStars)].map((_, index) => (
        <TouchableOpacity 
          key={index} 
          onPress={() => handlePress(index + 1)} 
          activeOpacity={0.7}
        >
          <Icon
            name={index < rating ? 'star' : 'star-o'}
            size={size}
            color={index < rating ? color : inactiveColor}
            style={styles.star}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  star: {
    marginHorizontal: 4,
  },
});

export default CustomStarRating;
