
// import React, {useState} from 'react';
// import {
//   View,
//   Text,
//   TouchableOpacity,
//   Image,
//   StyleSheet,
//   Alert,
//   Modal,
//   Platform,
// } from 'react-native';
// import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
// import {Colors} from '../assets/AppColors';

// const ImagePickerComponent = ({
//   title,
//   buttonTitle,
//   imageUri,
//   setImageUri,
//   imgName,
//   setImgName,
//   disabled
// }) => {
//   const [isOptionsVisible, setIsOptionsVisible] = useState(false); // State for showing options modal

//   // Function to open the camera
//   const pickImageFromCamera = async () => {
//     const result = await launchCamera({
//       mediaType: 'photo',
//       quality: 1,
//     });

//     if (result.assets && result.assets.length > 0) {
//       const selectedImage = result.assets[0];
//       setImgName(selectedImage.fileName || 'Camera_Image.jpg'); // Fallback name for camera images
//       setImageUri(selectedImage.uri);
//     } else if (result.didCancel) {
//       console.log('Camera picking cancelled');
//     } else if (result.errorMessage) {
//       Alert.alert('Error', result.errorMessage);
//     }
//   };

//   // Function to open the gallery
//   const pickImageFromGallery = async () => {
//     const result = await launchImageLibrary({
//       mediaType: 'photo',
//       includeBase64: true,
//     });

//     if (result.assets && result.assets.length > 0) {
//       const selectedImage = result.assets[0].base64;
//       setImgName(selectedImage.fileName);
//       setImageUri(selectedImage.uri);
//     } else if (result.didCancel) {
//       console.log('Gallery picking cancelled');
//     } else if (result.errorMessage) {
//       Alert.alert('Error', result.errorMessage);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Title */}
//       <Text style={styles.title}>{title}</Text>

//       {/* Display Selected Image */}
//       {imageUri && <Image source={{uri: imageUri}} style={styles.image} />}
//       {/* <Text style={{color: '#000'}}>{imgName}</Text> */}
//       {/* Button to Open Options */}
//       <TouchableOpacity
//         disabled={disabled}
//         onPress={() => setIsOptionsVisible(true)}
//         style={styles.button}>
//         <Text style={styles.buttonText}>{buttonTitle}</Text>
//       </TouchableOpacity>
//       {/* Options Modal */}
//       <Modal visible={isOptionsVisible} transparent animationType="slide">
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             {/* Option to Pick from Camera */}
//             <TouchableOpacity
//               onPress={() => {
//                 pickImageFromCamera();
//                 setIsOptionsVisible(false);
//               }}
//               style={styles.modalOption}>
//               <Text style={styles.modalOptionText}>Take Photo</Text>
//             </TouchableOpacity>

//             {/* Option to Pick from Gallery */}
//             <TouchableOpacity
//               onPress={() => {
//                 pickImageFromGallery();
//                 setIsOptionsVisible(false);
//               }}
//               style={styles.modalOption}>
//               <Text style={styles.modalOptionText}>Choose from Gallery</Text>
//             </TouchableOpacity>

//             {/* Cancel Option */}
//             <TouchableOpacity
//               onPress={() => setIsOptionsVisible(false)}
//               style={[styles.modalOption, styles.cancelOption]}>
//               <Text style={styles.modalOptionText}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// };

// // Styles
// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 20,
//     color: '#000',
//     marginBottom: 10,
//   },
//   button: {
//     backgroundColor: Colors.appColor,
//     padding: 10,
//     borderRadius: 5,
//     borderWidth: 0.5,
//     borderColor: '#ccc',
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 16,
//     textAlign: 'center',
//   },
//   image: {
//     marginTop: 10,
//     width: '50%',
//     height: 90,
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: '#ccc',
//   },
//   modalContainer: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//   },
//   modalContent: {
//     backgroundColor: '#fff',
//     padding: 20,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//   },
//   modalOption: {
//     padding: 15,
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//   },
//   modalOptionText: {
//     fontSize: 18,
//     textAlign: 'center',
//     color: '#333',
//   },
//   cancelOption: {
//     borderTopWidth: 1,
//     borderTopColor: '#ccc',
//     marginTop: 10,
//   },
// });

// export default ImagePickerComponent;


import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Modal,
} from 'react-native';
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import { Colors } from '../assets/AppColors';

const ImagePickerComponent = ({
  title,
  buttonTitle,
  imageBase64,
  setImageBase64,
  imgName,
  setImgName,
  disabled
}) => {
  const [isOptionsVisible, setIsOptionsVisible] = useState(false);

  // Function to open the camera and capture an image
  const pickImageFromCamera = async () => {
    const result = await launchCamera({
      mediaType: 'photo',
      quality: 1,
      includeBase64: true, // Ensure Base64 encoding
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

  // Function to open the gallery and pick an image
  const pickImageFromGallery = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true, // Ensure Base64 encoding
    });

    if (result.assets && result.assets.length > 0) {
      const selectedImage = result.assets[0];
      setImgName(selectedImage.fileName || 'Gallery_Image.jpg');
      setImageBase64(`data:image/jpeg;base64,${selectedImage.base64}`);
    } else if (result.didCancel) {
      console.log('Gallery picking cancelled');
    } else if (result.errorMessage) {
      Alert.alert('Error', result.errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Display Selected Image */}
      {imageBase64 && <Image source={{ uri: imageBase64 }} style={styles.image} />}
      
      {/* Image Name Display */}
      {/* {imgName && <Text style={styles.imageName}>{imgName}</Text>} */}

      {/* Button to Open Options */}
      <TouchableOpacity
        disabled={disabled}
        onPress={() => setIsOptionsVisible(true)}
        style={styles.button}>
        <Text style={styles.buttonText}>{buttonTitle}</Text>
      </TouchableOpacity>

      {/* Options Modal */}
      <Modal visible={isOptionsVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {/* Option to Pick from Camera */}
            <TouchableOpacity
              onPress={() => {
                pickImageFromCamera();
                setIsOptionsVisible(false);
              }}
              style={styles.modalOption}>
              <Text style={styles.modalOptionText}>Take Photo</Text>
            </TouchableOpacity>

            {/* Option to Pick from Gallery */}
            <TouchableOpacity
              onPress={() => {
                pickImageFromGallery();
                setIsOptionsVisible(false);
              }}
              style={styles.modalOption}>
              <Text style={styles.modalOptionText}>Choose from Gallery</Text>
            </TouchableOpacity>

            {/* Cancel Option */}
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

// Styles
const styles = StyleSheet.create({
  container: {
    // alignItems: 'center',
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
