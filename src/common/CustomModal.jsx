import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import SpaceBetween from './SpaceBetween';
import AntDesign from "react-native-vector-icons/AntDesign"
import tailwind from 'twrnc';


const CustomModal = ({ isVisible, onClose, width=320, height=600 , content, modalTitle }) => {
    return (
        <Modal
            visible={isVisible}
            transparent
            animationType="slide"
            onRequestClose={onClose}
        >
            {/* Background Overlay */}
            <View style={styles.modalContainer}>
                {/* Modal Content */}
                <View style={[styles.modalContent,{width:width, height:height}]}>
                   <SpaceBetween justify='space-between' style={tailwind`bg-[teal] py-1`}>
                     <Text style={styles.modalTitle}>{modalTitle}</Text>
                      {/* Close Button (Top Right) */}
                    <TouchableOpacity onPress={onClose} >
                       <AntDesign name="closecircleo" color={"#fff"} sixe={25}/>
                    </TouchableOpacity>
                   </SpaceBetween>
                 <View>
                    {content}
                 </View>
                </View>
            </View>
        </Modal>
    );
};
const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background overlay with opacity
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContent: {
        backgroundColor: '#ffffff', // White background
        // width: '90%', // Responsive width
        // padding: 20,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        maxHeight: '80%', // Prevents the modal from taking the full screen
        minHeight: '40%', // Ensures content is visible
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: '400',
        color:'#fff'
    },
    modalText: {
        fontSize: 14,
        color: '#4a4a4a',
        marginTop: 8,
        textAlign: 'center',
    },
    closeButton: {
        position: 'absolute',
        top: 10,
        right: 10,
        backgroundColor: '#f2f2f2',
        padding: 8,
        borderRadius: 20,
    },
    closeButtonText: {
        fontSize: 16,
        color: '#333',
    },
    actionButton: {
        marginTop: 20,
        backgroundColor: '#14b8a6', // Teal color
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    actionButtonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default CustomModal

