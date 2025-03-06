import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Modal,
} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {Colors} from '../assets/AppColors';

const ImagePickerComponent = ({
  title,
  buttonTitle,
  imageBase64,
  setImageBase64,
  imgName,
  setImgName,
  disabled,
}) => {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  const pickImageFromCamera = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
      quality: 1,
      includeBase64: true,
    });

    if (result.assets && result.assets.length > 0) {
      const selectedImage = result.assets[0];
      setImgName(selectedImage.fileName || 'Camera_Image.jpg');
      setImageBase64(`data:image/jpeg;base64,${selectedImage.base64}`);
    } else if (result.didCancel) {
      console.log('Camera picking cancelled');
    } else if (result.errorMessage) {
      Alert.alert('Error', result.errorMessage);
    }
  };

  const pickImageFromGallery = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
    });

    if (result.assets && result.assets.length > 0) {
      const selectedImage = result.assets[0];
      // setImgName(selectedImage.fileName || 'Gallery_Image.jpg');
      setImageBase64(`data:image/jpeg;base64,${selectedImage.base64}`);
    } else if (result.didCancel) {
      console.log('Gallery picking cancelled');
    } else if (result.errorMessage) {
      Alert.alert('Error', result.errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {imageBase64 && (
        <Image source={{uri: imageBase64}} style={styles.image} />
      )}
      <TouchableOpacity
        disabled={disabled}
        onPress={() => setIsOptionsVisible(true)}
        style={styles.button}>
        <Text style={styles.buttonText}>{buttonTitle}</Text>
      </TouchableOpacity>

      <Modal visible={isOptionsVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => {
                pickImageFromCamera();
                setIsOptionsVisible(false);
              }}
              style={styles.modalOption}>
              <Text style={styles.modalOptionText}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                pickImageFromGallery();
                setIsOptionsVisible(false);
              }}
              style={styles.modalOption}>
              <Text style={styles.modalOptionText}>Choose from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setIsOptionsVisible(false)}
              style={[styles.modalOption, styles.cancelOption]}>
              <Text style={styles.modalOptionText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    color: '#000',
    marginBottom: 10,
  },
  button: {
    backgroundColor: Colors.appColor,
    padding: 10,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  image: {
    marginTop: 10,
    width: 150,
    height: 150,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#ccc',
  },
  imageName: {
    marginTop: 5,
    fontSize: 14,
    color: '#555',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalOption: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  modalOptionText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#333',
  },
  cancelOption: {
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    marginTop: 10,
  },
});

export default ImagePickerComponent;
