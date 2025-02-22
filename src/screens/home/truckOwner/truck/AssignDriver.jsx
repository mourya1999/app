import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import CustomModal from '../../../../common/CustomModal';

const AssignDriver = () => {
    const [isModalVisible, setModalVisible] = useState(false);

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <TouchableOpacity 
                onPress={() => setModalVisible(true)} 
                style={tailwind`bg-blue-500 p-3 rounded-lg`}
            >
                <Text style={tailwind`text-white font-bold`}>Open Modal</Text>
            </TouchableOpacity>

            <CustomModal 
                isVisible={isModalVisible} 
                onClose={() => setModalVisible(false)} 
            />
        </View>
    );
}

export default AssignDriver