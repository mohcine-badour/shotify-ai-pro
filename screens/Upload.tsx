import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';

const Upload: React.FC = () => {
  const handleUploadPress = async () => {
    if (photos.length >= MAX_PHOTOS) return;
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return;
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      selectionLimit: MAX_PHOTOS - photos.length,
      quality: 1,
    });
    if (result.canceled) return;
    const uris = result.assets?.map(a => a.uri).filter(Boolean) as string[];
    if (uris?.length) {
      setPhotos(prev => {
        const remaining = MAX_PHOTOS - prev.length;
        return [...prev, ...uris.slice(0, remaining)];
      });
    }
  };

  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = React.useState(false);
  const cameraRef = React.useRef<any>(null);
  const [capturedUri, setCapturedUri] = React.useState<string | null>(null);
  const [photos, setPhotos] = React.useState<string[]>([]);
  const MAX_PHOTOS = 3;

  const handleOpenCamera = async () => {
    if (photos.length >= MAX_PHOTOS) {
      console.log('Maximum photos reached');
      return;
    }
    if (!permission?.granted) {
      const result = await requestPermission();
      if (!result.granted) return;
    }
    setShowCamera(true);
  };

  const handleShoot = async () => {
    try {
      const result = await cameraRef.current?.takePictureAsync();
      if (result?.uri) {
        setCapturedUri(result.uri);
      }
    } catch (e) {
      console.log('Failed to take picture', e);
    }
  };

  const handleRetake = () => {
    setCapturedUri(null);
  };

  const handleAccept = () => {
    if (capturedUri) {
      console.log('Accepted photo:', capturedUri);
      setPhotos(prev => (prev.length < MAX_PHOTOS ? [...prev, capturedUri] : prev));
    }
    setShowCamera(false);
    setCapturedUri(null);
  };

  const handleStartGeneration = () => {
    // Placeholder for generation action
    console.log('Start generation with photos:', photos);
  };

  const handleDeletePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
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
             {photos.length === 0 ? (
               <>
                 <View style={styles.cloudCircle}>
                   <Icon name="cloud-upload" size={26} color="#8aa4ff" />
                 </View>
                 <TouchableOpacity onPress={handleUploadPress} activeOpacity={0.7}>
                   <Text style={styles.actionLink}>Tap to upload photo</Text>
                 </TouchableOpacity>
                 <Text style={styles.hint}>PNG, JPG or PDF (max. 800x400px)</Text>
               </>
             ) : (
               <>
                 <View style={styles.photoGrid}>
                   {Array.from({ length: MAX_PHOTOS }).map((_, idx) => {
                     const uri = photos[idx];
                     return (
                       <View key={idx} style={[styles.photoItem, !uri && styles.photoEmpty]}> 
                         {uri && (
                           <>
                             <Image source={{ uri }} style={styles.photoImage} resizeMode="cover" />
                             <TouchableOpacity
                               onPress={() => handleDeletePhoto(idx)}
                               style={styles.deleteBadge}
                               activeOpacity={0.8}
                             >
                               <Icon name="close" size={14} color="#fff" />
                             </TouchableOpacity>
                           </>
                         )}
                       </View>
                     );
                   })}
                 </View>
                 <Text style={styles.hint}>{photos.length}/{MAX_PHOTOS} selected</Text>
                 {photos.length < MAX_PHOTOS && (
                   <TouchableOpacity onPress={handleUploadPress} activeOpacity={0.7}>
                     <Text style={[styles.actionLink, { marginTop: 8 }]}>Tap to upload photo</Text>
                   </TouchableOpacity>
                 )}
               </>
             )}
           </View>

          <View style={styles.orRow}>
            <View style={styles.line} />
            {photos.length < MAX_PHOTOS && (
              <Text style={styles.orText}>OR</Text>
            )}
            <View style={styles.line} />
          </View>

          {photos.length >= 3 ? (
            <TouchableOpacity style={styles.primaryButton} onPress={handleStartGeneration} activeOpacity={0.8}>
              <Text style={styles.primaryButtonText}>Start generation</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.primaryButton} onPress={handleOpenCamera} activeOpacity={0.8}>
              <Text style={styles.primaryButtonText}>Open camera</Text>
            </TouchableOpacity>
          )}
        </View>

        <Modal visible={showCamera} animationType="slide">
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.cameraContainer}>
              <CameraView ref={cameraRef} facing="front" style={StyleSheet.absoluteFillObject} />
              {capturedUri && (
                <Image source={{ uri: capturedUri }} style={StyleSheet.absoluteFillObject} resizeMode="cover" />
              )}
              <View style={styles.cameraTopBar}>
                <TouchableOpacity onPress={() => setShowCamera(false)} style={styles.closeBtn}>
                  <Text style={styles.closeBtnText}>Close</Text>
                </TouchableOpacity>
              </View>
              {!capturedUri ? (
                <View style={styles.shutterWrapper}>
                  <TouchableOpacity onPress={handleShoot} activeOpacity={0.8} style={styles.shutterButton} />
                </View>
              ) : (
                <View style={styles.confirmBar}>
                  <TouchableOpacity onPress={handleRetake} style={[styles.confirmBtn, styles.retakeBtn]} activeOpacity={0.8}>
                    <Icon name="refresh" size={22} color="#ffffff" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleAccept} style={[styles.confirmBtn, styles.acceptBtn]} activeOpacity={0.8}>
                    <Icon name="check" size={22} color="#ffffff" />
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </SafeAreaView>
        </Modal>
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
  cameraContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  cameraTopBar: {
    position: 'absolute',
    top: 16,
    right: 16,
    left: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  closeBtn: {
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  closeBtnText: {
    color: '#fff',
    fontFamily: 'SpButchLiteLight',
  },
  shutterWrapper: {
    position: 'absolute',
    bottom: 36,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shutterButton: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#ffffff',
    borderWidth: 4,
    borderColor: '#d9d9d9',
  },
  photoGrid: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  photoItem: {
    width: 70,
    height: 70,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#1f1f1f',
    marginHorizontal: 6,
    marginVertical: 6,
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },
  photoEmpty: {
    borderWidth: 1,
    borderColor: '#2b2b2b',
  },
  deleteBadge: {
    position: 'absolute',
    top: 4,
    right: 4,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmBar: {
    position: 'absolute',
    bottom: 28,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  confirmBtn: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  retakeBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.4)'
  },
  acceptBtn: {
    backgroundColor: '#0099FF',
  },
});

export default Upload;


