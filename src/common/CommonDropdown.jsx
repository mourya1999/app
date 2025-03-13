// import React, { useState } from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   TouchableOpacity,
//   TextInput,
//   ScrollView,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { Colors } from '../assets/AppColors';
// import tailwind from 'twrnc';
// import { responsiveFontSize } from '../utility/utility';

// const CommonDropdown = ({
//   value,
//   onSelect,
//   placeholder,
//   options = [],
//   label,
//   labelStyle,
//   inputStyle,
//   iconColor = '#A0A0A0',
//   iconSize = 20,
//   rightIcon = 'chevron-down-outline',
// }) => {
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');

//   // Filter options based on the search query
//   const filteredOptions = options.filter((option) =>
//     option.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <View style={styles.inputContainer}>
//       {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
//       <TouchableOpacity
//         onPress={() => setIsDropdownOpen(!isDropdownOpen)}
//         style={styles.inputWrapper}
//       >
//         <Text style={[styles.input, inputStyle, !value && styles.placeholder]}>
//           {value || placeholder}
//         </Text>
//         <Icon
//           name={rightIcon}
//           size={iconSize}
//           color={iconColor}
//           style={styles.rightIcon}
//         />
//       </TouchableOpacity>

//       {/* Dropdown Options */}
//       {isDropdownOpen && options.length > 0 && (
//         <View style={styles.dropdown}>
//           {/* Search Input */}
//           <TextInput
//             style={styles.searchInput}
//             placeholder="Search..."
//             value={searchQuery}
//             onChangeText={(text) => setSearchQuery(text)}
//           />

//           <ScrollView>
//             {filteredOptions.map((option, index) => (
//               <TouchableOpacity
//                 key={index}
//                 style={styles.dropdownItem}
//                 onPress={() => {
//                   onSelect(option);
//                   setIsDropdownOpen(false);
//                   setSearchQuery(''); // Clear search query after selection
//                 }}
//               >
//                 <Text style={styles.dropdownText}>{option}</Text>
//               </TouchableOpacity>
//             ))}
//           </ScrollView>
//         </View>
//       )}
//     </View>
//   );
// };

// export default CommonDropdown;

// const styles = StyleSheet.create({
//   inputContainer: {
//     marginBottom: 15,
//   },
//   label: {
//     fontSize: responsiveFontSize(14),
//     fontWeight: 'bold',
//     color: Colors.textDark,
//     marginBottom: 5,
//   },
//   inputWrapper: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: Colors.inputBorder,
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     paddingVertical: 12,
//   },
//   input: {
//     flex: 1,
//     fontSize: responsiveFontSize(16),
//     color: Colors.textDark,
//   },
//   placeholder: {
//     color: '#A0A0A0',
//   },
//   rightIcon: {
//     marginLeft: 10,
//   },
//   dropdown: {
//     marginTop: 5,
//     borderWidth: 1,
//     borderColor: Colors.inputBorder,
//     borderRadius: 5,
//     // maxHeight: 200,
//     overflowX: 'auto',
//     position:'absolute'
//   },
//   searchInput: {
//     paddingHorizontal: 10,
//     paddingVertical: 13,
//     borderBottomWidth: 1,
//     borderBottomColor: Colors.inputBorder,
//     fontSize: responsiveFontSize(14),
//   },
//   dropdownItem: {
//     padding: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: Colors.inputBorder,
//   },
//   dropdownText: {
//     fontSize: responsiveFontSize(14),
//     color: Colors.textDark,
//   },
// });


import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  FlatList,
  Modal,
  Keyboard,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../assets/AppColors';

const { width } = Dimensions.get('window');

const CommonDropdown = ({
  value,
  onSelect,
  placeholder = 'Select an option',
  options = [],
  label,
  labelStyle,
  inputStyle,
  iconColor = '#A0A0A0',
  iconSize = 20,
  rightIcon = 'chevron-down-outline',
  dropdownStyle,
  optionStyle,
  optionTextStyle,
  searchPlaceholder = 'Search...',
  searchEnabled = true,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef(null);

  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (option) => {
    onSelect(option);
    setIsDropdownOpen(false);
    setSearchQuery('');
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
    setSearchQuery('');
  };

  return (
    <View style={styles.container}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

      <TouchableOpacity
        onPress={() => {
          setIsDropdownOpen(!isDropdownOpen);
          Keyboard.dismiss();
        }}
        style={[styles.inputWrapper, inputStyle]}
      >
        <Text style={[styles.input, !value && styles.placeholder]}>
          {value || placeholder}
        </Text>
        <Icon
          name={rightIcon}
          size={iconSize}
          color={iconColor}
          style={styles.icon}
        />
      </TouchableOpacity>

      {/* Dropdown Modal */}
      <Modal
        visible={isDropdownOpen}
        transparent
        animationType="fade"
        onRequestClose={closeDropdown}
      >
        <TouchableOpacity
          style={styles.overlay}
          activeOpacity={1}
          onPress={closeDropdown}
        >
          <View style={[styles.dropdown, dropdownStyle]}>
            {/* Search Input */}
            {searchEnabled && (
              <TextInput
                ref={inputRef}
                style={styles.searchInput}
                placeholder={searchPlaceholder}
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
            )}

            <FlatList
              data={filteredOptions}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.option, optionStyle]}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={[styles.optionText, optionTextStyle]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default CommonDropdown;

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 14,
    backgroundColor: '#F9F9F9',
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.textDark,
  },
  placeholder: {
    color: '#A0A0A0',
  },
  icon: {
    marginLeft: 10,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dropdown: {
    backgroundColor: '#FFF',
    width: width * 0.9,
    borderRadius: 10,
    maxHeight: 500,
    paddingVertical: 10,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  searchInput: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 14,
    color: Colors.textDark,
  },
  option: {
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
});
