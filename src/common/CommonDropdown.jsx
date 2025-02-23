import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../assets/AppColors';
import tailwind from 'twrnc';

const CommonDropdown = ({
  value,
  onSelect,
  placeholder,
  options = [],
  label,
  labelStyle,
  inputStyle,
  iconColor = '#A0A0A0',
  iconSize = 20,
  rightIcon = 'chevron-down-outline',
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter options based on the search query
  const filteredOptions = options.filter((option) =>
    option.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.inputContainer}>
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
      <TouchableOpacity
        onPress={() => setIsDropdownOpen(!isDropdownOpen)}
        style={styles.inputWrapper}
      >
        <Text style={[styles.input, inputStyle, !value && styles.placeholder]}>
          {value || placeholder}
        </Text>
        <Icon
          name={rightIcon}
          size={iconSize}
          color={iconColor}
          style={styles.rightIcon}
        />
      </TouchableOpacity>

      {/* Dropdown Options */}
      {isDropdownOpen && options.length > 0 && (
        <View style={styles.dropdown}>
          {/* Search Input */}
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
          />

          <ScrollView>
            {filteredOptions.map((option, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownItem}
                onPress={() => {
                  onSelect(option);
                  setIsDropdownOpen(false);
                  setSearchQuery(''); // Clear search query after selection
                }}
              >
                <Text style={styles.dropdownText}>{option}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default CommonDropdown;

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: 'bold',
    color: Colors.textDark,
    marginBottom: 5,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: Colors.textDark,
  },
  placeholder: {
    color: '#A0A0A0',
  },
  rightIcon: {
    marginLeft: 10,
  },
  dropdown: {
    marginTop: 5,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 5,
    // maxHeight: 200,
    overflow: 'hidden',
  },
  searchInput: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    fontSize: 14,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  dropdownText: {
    fontSize: 14,
    color: Colors.textDark,
  },
});