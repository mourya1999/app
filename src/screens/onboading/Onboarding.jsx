import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors} from '../../assets/AppColors';
import { useNavigation } from '@react-navigation/native';

const {width} = Dimensions.get('window');

const Onboarding = () => {
  const navigation = useNavigation()
  const data = [
    {
      id: 1,
      img: require('../../assets/img/onboard/onboard1.png'), // Use require for local images
      title: 'Providing pan India shipment service',
      subTitle:
        'Our strong network is connecting each and every state providing best in class service to our customers',
    },
    {
      id: 2,
      img: require('../../assets/img/onboard/onboard2.png'),
      title: 'Variety of trucks fulfilling your needs',
      subTitle:
        'Select the best-suited truck for your shipment with our wide variety of trucks available as per your needs.',
    },
    {
      id: 3,
      img: require('../../assets/img/onboard/onboard3.png'),
      title: 'Providing scheduled on-time delivery',
      subTitle:
        'With live tracking and scheduling features, you will get exact data of the current location and arrival time.',
    },
  ];

  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleScroll = event => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  const handleNext = () => {
    if (currentIndex < data.length - 1) {
      scrollViewRef.current?.scrollTo({
        x: (currentIndex + 1) * width,
        animated: true,
      });
    } else {
      navigation.navigate('EnterNumber');
    }
  };

  const handleSkip = () => {
    scrollViewRef.current?.scrollTo({
      x: (data.length - 1) * width,
      animated: true,
    });
  };

  // useEffect(() => {
  //   const initializeApp = () => {
  //     const hasSeenOnboarding = true;
  //     if (hasSeenOnboarding) {
  //       navigation.replace('SignUp');
  //     } else {
  //       navigation.replace('Onboarding');
  //     }
  //   };

  //   initializeApp();
  // }, []);
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff" // Background color for StatusBar
      />
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        {data.map(item => (
          <View key={item.id} style={styles.slide}>
            <Image source={item.img} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subTitle}>{item.subTitle}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Dots Indicator */}
      <View style={styles.dotsContainer}>
        {data.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
          />
        ))}
      </View>

      {/* Footer Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
          <Text style={styles.nextButtonText}>
            {currentIndex === data.length - 1 ? 'Get Started' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  slide: {
    width: width,
    alignItems: 'center',
    padding: '2%',
  },
  image: {
    width: '70%',
    height: '60%',
    // marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  dot: {
    width: 9,
    height: 9,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
    marginVertical: 10,
  },
  activeDot: {
    backgroundColor: Colors.appColor,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10%',
  },
  skipText: {
    fontSize: 16,
    color: Colors.appColor,
    borderWidth: 2,
    borderColor: Colors.appColor,
    borderRadius: 5,
    paddingVertical: 9,
    paddingHorizontal: 25,
  },
  nextButton: {
    backgroundColor: Colors.appColor,
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 5,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});
