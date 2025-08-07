import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface HeroSectionProps {
  onGenderChange?: (gender: 'female' | 'male') => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onGenderChange }) => {
  const [selectedGender, setSelectedGender] = useState<'female' | 'male'>('female');

  const handleGenderToggle = (gender: 'female' | 'male') => {
    setSelectedGender(gender);
    onGenderChange?.(gender);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Generate your perfect headshots</Text>
      
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[
            styles.toggleButton,
            selectedGender === 'female' && styles.toggleButtonActive
          ]}
          onPress={() => handleGenderToggle('female')}
          activeOpacity={0.7}
        >
          <Text style={[
            styles.toggleText,
            selectedGender === 'female' && styles.toggleTextActive
          ]}>
            Female
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toggleButton,
            selectedGender === 'male' && styles.toggleButtonActive
          ]}
          onPress={() => handleGenderToggle('male')}
          activeOpacity={0.7}
        >
          <Text style={[
            styles.toggleText,
            selectedGender === 'male' && styles.toggleTextActive
          ]}>
            Male
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: -60,
    alignItems: 'center',
    width: '100%',
  },
  title: {
    fontSize: 36,
    fontFamily: 'SpButchLiteLight',
    color: '#ffffff',
    textAlign: 'left',
    marginBottom: 28,
    lineHeight: 32,
    width: '100%',
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: '#161E34',
    borderRadius: 25,
    padding: 6,
    gap: 6,
    width: '100%',
  },
  toggleButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    width: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },
  toggleButtonActive: {
    backgroundColor: '#000000',
  },
  toggleText: {
    fontSize: 14,
    fontFamily: 'SpButchLiteLight',
    color: '#cccccc',
    fontWeight: '500',
  },
  toggleTextActive: {
    color: '#ffffff',
  },
});

export default HeroSection;
