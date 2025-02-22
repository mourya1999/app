import React from 'react';
import { StyleSheet, View } from 'react-native';

const SpaceBetween = ({
  children,
  style, // Custom styles for the container
  direction = 'row', // Flex direction (row or column)
  justify = 'space-between', // Justify content (space-between, center, flex-start, etc.)
  align = 'center', // Align items (center, flex-start, flex-end, etc.)
  padding = 10, // Padding around the container
  width = '100%', // Width of the container
  height = 'auto', // Height of the container
  wrap = false, // Whether to wrap children
}) => {
  return (
    <View
      style={[
        styles.container,
        {
          flexDirection: direction,
          justifyContent: justify,
          alignItems: align,
          paddingHorizontal: padding,
          width: width,
          height: height,
          flexWrap: wrap ? 'wrap' : 'nowrap',
        },
        style,
      ]}
    >
      {children}
    </View>
  );
};

export default SpaceBetween;

// Default styles
const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch', // Ensures the container stretches to fill available space
  },
});