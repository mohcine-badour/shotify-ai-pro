import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import HeroSection from '../components/HeroSection';
import ChooseStyle from '../components/ChooseStyle';

const Home: React.FC = () => {
  const [selectedGender, setSelectedGender] = useState<'female' | 'male'>('female');

  // Données fictives pour les femmes
  const femaleImagesData = [
    {
      id: 'f1',
      source: require('../assets/images/womens-business.jpg'),
      title: 'Business'
    },
    {
      id: 'f2', 
      source: require('../assets/images/womens-business.jpg'),
      title: 'Casual'
    },
    {
      id: 'f3',
      source: require('../assets/images/womens-business.jpg'),
      title: 'Formal'
    },
    {
      id: 'f4',
      source: require('../assets/images/womens-business.jpg'),
      title: 'Sport'
    }
  ];

  // Données fictives pour les hommes
  const maleImagesData = [
    {
      id: 'm1',
      source: require('../assets/images/man-business.jpg'),
      title: 'Business'
    },
    {
      id: 'm2', 
      source: require('../assets/images/man-casual.jpg'),
      title: 'Casual'
    },
    {
      id: 'm3',
      source: require('../assets/images/man-formal.jpg'),
      title: 'Formal'
    },
    {
      id: 'm4',
      source: require('../assets/images/man-sport.jpg'),
      title: 'Sport'
    }
  ];

  const handleGenderChange = (gender: 'female' | 'male') => {
    setSelectedGender(gender);
  };

  const handleCardPress = (imageId: string) => {
    // Find the selected style based on imageId
    const selectedImage = currentImagesData.find(img => img.id === imageId);
    const selectedStyle = selectedImage?.title || 'Business';
    
    console.log('Card pressed:', imageId, 'Style:', selectedStyle);
    
    // Store the selected style globally for the Resultat component
    (globalThis as any).__SELECTED_STYLE__ = selectedStyle;
    (globalThis as any).__NAVIGATE_TO_UPLOAD__?.();
  };

  const currentImagesData = selectedGender === 'female' ? femaleImagesData : maleImagesData;

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <HeroSection onGenderChange={handleGenderChange} />
        <Text style={styles.title}>Choose style</Text> 
        <View style={styles.cardWrapper}>
          <ChooseStyle 
            imagesData={currentImagesData}
            onPress={handleCardPress}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 18,
    paddingBottom: 0, // Extra padding to avoid navigation bar
  },
  title: {
    fontSize: 18,
    fontFamily: 'SpButchLiteLight',
    color: '#ffffff',
    textAlign: 'left',
    marginTop: 24,
    marginBottom: 16,
  },
  cardWrapper: {
    width: '100%',
    marginTop: 8,
    flex: 1,
  },
  subtitle: {
    fontSize: 20,
    color: '#cccccc',
    textAlign: 'center',
    fontFamily: 'Fear-robot-regular',
    marginBottom: 20,
  },
});

export default Home;
