import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Upload: React.FC = () => {
  const handleUploadPress = () => {
    // Placeholder: open file picker integration can be added later
    console.log('Tap to upload photo');
  };

  const handleOpenCamera = () => {
    // Placeholder: open camera integration can be added later
    console.log('Open camera');
  };

  return (
    <SafeAreaView style={styles.safeArea}> 
      <View style={styles.container}>
        <Text style={styles.title}>Upload your photo</Text>
        <Text style={styles.subtitle}>
          Upload 3 photos of yourself to get started.
        </Text>

        <View style={styles.card}>
          <View style={styles.dropZone}>
            <View style={styles.cloudCircle}>
              <Icon name="cloud-upload" size={26} color="#8aa4ff" />
            </View>
            <TouchableOpacity onPress={handleUploadPress} activeOpacity={0.7}>
              <Text style={styles.actionLink}>Tap to upload photo</Text>
            </TouchableOpacity>
            <Text style={styles.hint}>PNG, JPG or PDF (max. 800x400px)</Text>
          </View>

          <View style={styles.orRow}>
            <View style={styles.line} />
            <Text style={styles.orText}>OR</Text>
            <View style={styles.line} />
          </View>

          <TouchableOpacity style={styles.primaryButton} onPress={handleOpenCamera} activeOpacity={0.8}>
            <Text style={styles.primaryButtonText}>Open camera</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#1a1a1a', // keep app background
  },
  container: {
    flex: 1,
    padding: 18,
  },
  title: {
    fontSize: 22,
    color: '#ffffff',
    fontFamily: 'SpButchLiteLight',
  },
  subtitle: {
    marginTop: 6,
    marginBottom: 16,
    color: '#bfbfbf',
    fontSize: 13,
  },
  card: {
    width: '100%',
    backgroundColor: '#141414',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#262626',
  },
  dropZone: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: '#3a3a3a',
    borderRadius: 12,
    paddingVertical: 28,
    backgroundColor: 'rgba(255,255,255,0.02)'
  },
  cloudCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: '#3a3a3a',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  actionLink: {
    color: '#0099FF', // app accent for interactive text/button
    fontSize: 14,
    fontFamily: 'SpButchLiteLight',
    marginBottom: 6,
  },
  hint: {
    color: '#9a9a9a',
    fontSize: 12,
  },
  orRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#2b2b2b',
  },
  orText: {
    marginHorizontal: 8,
    color: '#9a9a9a',
    fontSize: 12,
  },
  primaryButton: {
    backgroundColor: '#0099FF', // keep app button color
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'SpButchLiteLight',
  },
});

export default Upload;


