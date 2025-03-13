// import React, {useState} from 'react';
// import {
//   StyleSheet,
//   TextInput,
//   View,
//   Text,
//   TouchableOpacity,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import {Colors} from '../assets/AppColors';
// import { responsiveFontSize } from '../utility/utility';

// const CommonInput = ({
//   value,
//   onChangeText,
//   placeholder,
//   secureTextEntry = false,
//   inputStyle,
//   label,
//   labelStyle,
//   leftIcon,
//   iconColor = '#A0A0A0',
//   iconSize = 20,
//   rightIcon,
//   rightAction,
//   ...props
// }) => {
//   const [showPassword, setShowPassword] = useState(secureTextEntry);

//   return (
//     <View style={styles.inputContainer}>
//       {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
//       <View style={styles.inputWrapper}>
//         {leftIcon && (
//           <Icon
//             name={leftIcon}
//             size={iconSize}
//             color={iconColor}
//             style={styles.leftIcon}
//           />
//         )}
//         <TextInput
//           value={value}
//           onChangeText={onChangeText}
//           placeholder={placeholder}
//           secureTextEntry={showPassword}
//           style={[styles.input, inputStyle]}
//           placeholderTextColor="#A0A0A0"
//           {...props}
//         />
//         {secureTextEntry && (
//           <TouchableOpacity
//             style={styles.icon}
//             onPress={() => setShowPassword(!showPassword)}>
//             <Icon
//               name={showPassword ? 'eye-off' : 'eye'}
//               size={20}
//               color="#A0A0A0"
//             />
//           </TouchableOpacity>
//         )}
//         {rightIcon ? (
//           <Icon
//             name={rightIcon}
//             size={iconSize}
//             color={iconColor}
//             style={styles.leftIcon}
//           />
//         ):<View>{rightAction}</View>}
//       </View>
//     </View>
//   );
// };

// export default CommonInput;

// const styles = StyleSheet.create({
//   inputContainer: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: responsiveFontSize(16),
//     color: Colors.textDark,
//     marginBottom: 5,
//   },
//   inputWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     // backgroundColor: '#eee',
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     borderWidth: 1,
//     borderColor: Colors.inputBorder,
//     width: '100%',
//   },
//   leftIcon: {
//     marginRight: 10,
//   },
//   input: {
//     flex: 1,
//     color: Colors.textDark,
//     paddingVertical: 15,
//   },
//   icon: {
//     marginLeft: 10,
//   },
// });


import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../assets/AppColors';
import { responsiveFontSize } from '../utility/utility';

const CommonInput = ({
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  inputStyle,
  label,
  labelStyle,
  leftIcon,
  iconColor = '#A0A0A0',
  iconSize = 20,
  rightIcon,
  rightAction,
  onPressRightIcon, // New prop
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(secureTextEntry);

  return (
    <View style={styles.inputContainer}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <View style={styles.inputWrapper}>
        {leftIcon && (
          <Icon
            name={leftIcon}
            size={iconSize}
            color={iconColor}
            style={styles.leftIcon}
          />
        )}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          secureTextEntry={showPassword}
          style={[styles.input, inputStyle]}
          placeholderTextColor="#A0A0A0"
          {...props}
        />
        {secureTextEntry && (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => setShowPassword(!showPassword)}>
            <Icon
              name={showPassword ? 'eye-off' : 'eye'}
              size={20}
              color="#A0A0A0"
            />
          </TouchableOpacity>
        )}
        {rightIcon ? (
          <TouchableOpacity onPress={onPressRightIcon}> {/* Added TouchableOpacity */}
            <Icon
              name={rightIcon}
              size={iconSize}
              color={iconColor}
              style={styles.leftIcon}
            />
          </TouchableOpacity>
        ) : (
          <View>{rightAction}</View>
        )}
      </View>
    </View>
  );
};

export default CommonInput;

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: responsiveFontSize(16),
    color: Colors.textDark,
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: Colors.inputBorder,
    width: '100%',
  },
  leftIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: Colors.textDark,
    paddingVertical: 15,
  },
  icon: {
    marginLeft: 10,
  },
});
