import React, {useEffect, useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import Feather from 'react-native-vector-icons/Feather';
import apiService from '../../../../redux/apiService';
import {Colors} from '../../../../assets/AppColors';
import Heading from '../../../../common/Heading';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import {responsiveFontSize} from '../../../../utility/utility';

const DriverUpdateDoc = ({route}) => {
  const token = useSelector(state => state.auth.token);
  const {item: driverId} = route.params;

  const [docStatus, setDocStatus] = useState({});
  const [uploadedImages, setUploadedImages] = useState({
    DrivingLicenceImage: null,
    WorkPermitDocument: null,
    SelfieImage: null,
    OtherDocument: null,
  });

  console.log("uploaded Images : ", uploadedImages)
  useEffect(() => {
    getDocStatus();
  }, [token]);

  const getDocStatus = async () => {
    try {
      const res = await apiService({
        endpoint: 'truck_owner/get/driver/registration/upload_documents/status',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: {driver_id: driverId.UserId},
      });
      console.log('driver doc res : ', res);
      setDocStatus(res.data);
    } catch (error) {
      console.error('Fetch Error:', error);
      Alert.alert('Error', 'Failed to fetch document status.');
    }
  };

  const pickImage = async (docKey, sourceType) => {
    try {
      const options = {mediaType: 'photo', quality: 1};

      let result;
      if (sourceType === 'camera') {
        result = await launchCamera(options);
      } else {
        result = await launchImageLibrary(options);
      }

      if (result.didCancel) return;

      const uri = result.assets[0].uri;

      // Extract file extension
      const fileName = uri.split('/').pop(); // Get file name
      const fileExtension = fileName.split('.').pop().toLowerCase(); // Extract extension

      // Map file extension to MIME type
      const mimeTypeMap = {
        jpg: 'image/jpeg',
        jpeg: 'image/jpeg',
        png: 'image/png',
        gif: 'image/gif',
        webp: 'image/webp',
      };

      const mimeType = mimeTypeMap[fileExtension] || 'image/jpeg'; // Default to JPEG

      // Convert to Base64
      const base64 = await RNFS.readFile(uri, 'base64');

      // Create Base64 URL with MIME type prefix
      const base64WithPrefix = `data:${mimeType};base64,${base64}`;

      // Store image data
      setUploadedImages(prev => ({
        ...prev,
        [docKey]: {uri, base64: base64WithPrefix},
      }));

      handleSubmit(docKey, base64WithPrefix);
    } catch (error) {
      console.error('Image Selection Error:', error);
      Alert.alert('Error', 'Failed to select an image.');
    }
  };

  // Modify handleSubmit to accept Base64 URL
  const handleSubmit = async (docKey, base64Image) => {
    if (!base64Image) {
      Alert.alert(
        'Error',
        `Please select an image for ${docKey} before uploading.`,
      );
      return;
    }

    console.log("base64Image : ", base64Image)
    try {
      const res = await apiService({
        endpoint: 'truck_owner/driver/registration/upload_documents',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data: {
          driver_id: driverId.UserId,
          [docKey]: base64Image, // Base64 URL with prefix
        },
      });

      // console.log(`Uploaded ${docKey}: `, res);
      getDocStatus();
      Alert.alert('Success', `${docKey} uploaded successfully!`);
    } catch (error) {
      console.error(`Upload Error (${docKey}):`, error);
      Alert.alert('Error', `Failed to upload ${docKey}.`);
    }
  };

  const showImagePickerOptions = docKey => {
    Alert.alert('Select Image Source', 'Choose an option', [
      {text: 'Camera', onPress: () => pickImage(docKey, 'camera')},
      {text: 'Gallery', onPress: () => pickImage(docKey, 'gallery')},
      {text: 'Cancel', style: 'cancel'},
    ]);
  };

  const renderUploadSection = (docKey, label, message) => {
    const isUploaded = docStatus[docKey] === 1 || uploadedImages[docKey];

    return (
      <View style={styles.uploadContainer}>
        {isUploaded ? (
          <View style={styles.uploadedPreview}>
            {uploadedImages[docKey]?.uri ? (
              <Image
                source={{uri: uploadedImages[docKey]?.uri}}
                style={styles.uploadedImage}
              />
            ) : (
              <Feather name="check-circle" color="green" size={65} />
            )}
            <Text style={styles.uploadedText}>Uploaded</Text>
          </View>
        ) : (
          <>
            <Feather name="upload" color={Colors.appColor} size={65} />
            <TouchableOpacity
              style={styles.uploadButton}
              onPress={() => showImagePickerOptions(docKey)}>
              <Text style={styles.uploadButtonText}>{`Upload ${label}`}</Text>
            </TouchableOpacity>
            {message && <Text style={styles.errorText}>{message}</Text>}
          </>
        )}
      </View>
    );
  };

  return (
    <View>
      <Heading
        leftIcon={true}
        heading={'Driver Upload Documents'}
        rightAction={<Text></Text>}
      />
      <ScrollView style={styles.containerView}>
        {renderUploadSection(
          'DrivingLicenseImage',
          'Driving Licence Image',
          docStatus.DrivingLicenceImageMessage,
        )}
        {renderUploadSection(
          'SelfieImage',
          'Selfie Image',
          docStatus.SelfieImageMessgae,
        )}
        {renderUploadSection(
          'WorkPermitDocument',
          'Work Permit Document',
          docStatus.WorkPermitDocumentMessgae,
        )}
        {renderUploadSection(
          'OtherDocument',
          'Other Document',
          docStatus.OtherDocumentMessage,
        )}
      </ScrollView>
    </View>
  );
};

export default DriverUpdateDoc;

const styles = StyleSheet.create({
  containerView: {
    paddingHorizontal: 10,
    marginBottom: '20%',
  },
  uploadContainer: {
    width: '100%',
    height: 200,
    marginTop: 10,
    borderWidth: 1,
    borderColor: Colors.borderColor,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadedText: {
    color: 'green',
    fontSize: responsiveFontSize(16),
    marginTop: 5,
  },
  errorText: {
    color: 'red',
    fontSize: responsiveFontSize(14),
    marginTop: 5,
  },
  uploadedPreview: {
    alignItems: 'center',
  },
  uploadedImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  uploadButton: {
    backgroundColor: Colors.appColor,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginTop: 10,
  },
  uploadButtonText: {
    color: 'white',
    fontSize: responsiveFontSize(16),
  },
});
