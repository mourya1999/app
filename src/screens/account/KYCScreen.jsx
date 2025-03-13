import Feather from 'react-native-vector-icons/Feather';
import { Alert, ScrollView, StyleSheet, Text, View } from 'react-native';
import tailwind from 'twrnc';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CommonInput from '../../common/CommonInput';
import ImagePickerComponent from '../../common/ImagePickerComponent';
import apiService from '../../redux/apiService';
import { Colors } from '../../assets/AppColors';
import Heading from '../../common/Heading';

const DocumentSection = ({
  label,
  value,
  onChangeText,
  imageUri,
  onImageSelect,
  verificationStatus,
  isVerified,
  editable,
  base64Image,
  setBase64Image,
}) => {
  return (
    <View style={tailwind`mb-6`}>
      <Text style={tailwind`text-[${Colors.appColor}] font-bold my-2`}>{label}</Text>

      {editable ? (
        <CommonInput
          value={value}
          onChangeText={onChangeText}
          editable={editable}
          placeholder={`Enter ${label}`}
        />
      ) : (
        <Text style={tailwind`border border-gray-300 p-2 rounded`}>
          {value || 'N/A'}
        </Text>
      )}

      <View
        style={tailwind`w-full h-60 mt-2 border border-gray-300 rounded-lg items-center justify-center`}>
        {isVerified ? (
          <Feather name="check-circle" color="green" size={40} />
        ) : (
          <ImagePickerComponent
            buttonTitle={`Upload ${label}`}
            imgName={imageUri}
            setImgName={onImageSelect}
            imageBase64={base64Image}
            setImageBase64={setBase64Image}
            disabled={isVerified}
          />
        )}
        {editable && !value && (
          <Text style={tailwind`text-red-500 text-xs`}>Required</Text>
        )}
        <Text style={tailwind`text-orange-400 mt-1`}>
          {verificationStatus || 'Not Uploaded'}
        </Text>
      </View>
    </View>
  );
};

const KYCScreen = () => {
  const [aadharNumber, setAadharNumber] = useState('');
  const [panNumber, setPanNumber] = useState('');
  const [gstNumber, setGstNumber] = useState('');
  const [imageUriAadhar, setImageUriAadhar] = useState(null);
  const [imageUriPan, setImageUriPan] = useState(null);
  const [imageUriGST, setImageUriGST] = useState(null);
  const [imageBase64Aadhar, setImageBase64Aadhar] = useState(null);
  const [imageBase64Pan, setImageBase64Pan] = useState(null);
  const [imageBase64GST, setImageBase64GST] = useState(null);
  const [kycInfo, setKycInfo] = useState({});
  const [loading, setLoading] = useState(false);
  const token = useSelector(state => state.auth.token);

  const getKYCDetails = async () => {
    try {
      const res = await apiService({
        endpoint: 'truck_owner/get/kyc/status',
        method: 'GET',
        headers: { Authorization: `Bearer ${token}` },
      });
      setKycInfo(res?.data);
    } catch (error) {
      console.error('KYC Fetch Error:', error);
    }
  };

  useEffect(() => {
    getKYCDetails();
  }, [token]);

  useEffect(() => {
    if (Object.keys(kycInfo).length > 0) {
      setAadharNumber(kycInfo.AadharNumber || '');
      setPanNumber(kycInfo.PanNumber || '');
      setGstNumber(kycInfo.GstinNumber || '');
    }
  }, [kycInfo]);

  const validateDocument = (docType) => {
    switch (docType) {
      case 'Aadhar':
        if (!aadharNumber || aadharNumber.length !== 12) {
          Alert.alert('Invalid Aadhar', 'Please enter 12-digit Aadhar number');
          return false;
        }
        if (!imageBase64Aadhar) {
          Alert.alert('Missing Document', 'Please upload Aadhar document');
          return false;
        }
        return true;
      case 'Pan':
        if (!panNumber || panNumber.length !== 10) {
          Alert.alert('Invalid PAN', 'Please enter 10-digit PAN number');
          return false;
        }
        if (!imageBase64Pan) {
          Alert.alert('Missing Document', 'Please upload PAN document');
          return false;
        }
        return true;
      case 'GST':
        if (!gstNumber || gstNumber.length < 15) {
          Alert.alert('Invalid GST', 'Please enter valid GST number');
          return false;
        }
        if (!imageBase64GST) {
          Alert.alert('Missing Document', 'Please upload GST document');
          return false;
        }
        return true;
      default:
        return false;
    }
  };

  const handleSubmit = async (docType) => {
    if (loading) return;
    if (!validateDocument(docType)) return;

    setLoading(true);
    try {
      const data = {};

      if (docType === 'Aadhar' && kycInfo.IsAadharVerify === 0) {
        data.aadhar_no = aadharNumber;
        data.aadhar_file = imageBase64Aadhar;
      }

      if (docType === 'Pan' && kycInfo.IsPanVerify === 0) {
        data.pan_no = panNumber;
        data.pan_file = imageBase64Pan;
      }

      if (docType === 'GST' && kycInfo.IsGSTVerify === 0) {
        data.gst_no = gstNumber;
        data.gst_file = imageBase64GST;
      }

      if (Object.keys(data).length === 0) return;

      const res =await apiService({
        endpoint: 'truck_owner/upload/kyc/documents',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        data,
      });
      console.log("kyc upload response ; ", res)
      Alert.alert('Success', 'Document submitted successfully!');
      getKYCDetails(); // Refresh KYC status
    } catch (error) {
      Alert.alert('Error', 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (kycInfo.IsAadharVerify === 0 && imageBase64Aadhar) {
      handleSubmit('Aadhar');
    }
  }, [imageBase64Aadhar]);

  useEffect(() => {
    if (kycInfo.IsPanVerify === 0 && imageBase64Pan) {
      handleSubmit('Pan');
    }
  }, [imageBase64Pan]);

  useEffect(() => {
    if (kycInfo.IsGSTVerify === 0 && imageBase64GST) {
      handleSubmit('GST');
    }
  }, [imageBase64GST]);

  console.log("kycInfo : ", kycInfo)
  return (
    <>
    <Heading leftIcon={true} heading={"KYC"} rightAction={<Text></Text>}/>
    <ScrollView style={styles.containerView}>
      <DocumentSection
        label="Aadhar"
        value={kycInfo.AadharNumber}
        onChangeText={setAadharNumber}
        imageUri={imageUriAadhar}
        onImageSelect={setImageUriAadhar}
        verificationStatus={kycInfo.aadhar_verification_status}
        isVerified={kycInfo.IsAadharVerify === 1}
        editable={kycInfo.IsAadharVerify === 0}
        base64Image={imageBase64Aadhar}
        setBase64Image={setImageBase64Aadhar}
      />

      <DocumentSection
        label="Pan"
        value={panNumber}
        onChangeText={setPanNumber}
        imageUri={imageUriPan}
        onImageSelect={setImageUriPan}
        verificationStatus={kycInfo.pan_verification_status}
        isVerified={kycInfo.IsPanVerify === 1}
        editable={kycInfo.IsPanVerify === 0}
        base64Image={imageBase64Pan}
        setBase64Image={setImageBase64Pan}
      />

      <DocumentSection
        label="GST"
        value={gstNumber}
        onChangeText={setGstNumber}
        imageUri={imageUriGST}
        onImageSelect={setImageUriGST}
        verificationStatus={kycInfo.gstin_verification_status}
        isVerified={kycInfo.IsGSTVerify === 1}
        editable={kycInfo.IsGSTVerify === 0}
        base64Image={imageBase64GST}
        setBase64Image={setImageBase64GST}
      />
    </ScrollView>
    </>
    
  );
};

export default KYCScreen;

const styles = StyleSheet.create({
  containerView: {
    paddingHorizontal: 10,
    marginBottom: '20%',
  },
});