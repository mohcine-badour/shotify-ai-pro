import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Image, Modal, Dimensions, Share, Alert } from 'react-native';
import DownloadIcon from '../components/ui/DownloadIcon';
import ShareIcon from '../components/ui/ShareIcon';
import ViewIcon from '../components/ui/ViewIcon';
import CloseIcon from '../components/ui/CloseIcon';

interface ResultatProps {
  onBackToHome?: () => void;
  selectedStyle?: string;
}

const Resultat: React.FC<ResultatProps> = ({ onBackToHome, selectedStyle = 'Business' }) => {
  const [showViewModal, setShowViewModal] = React.useState(false);
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  // Mock generated headshot based on selected style
  const getHeadshotUri = (style: string) => {
    const styleColors = {
      'Business': '0099FF',
      'Casual': 'FF6B6B', 
      'Formal': '4ECDC4',
      'Sport': '45B7D1'
    };
    const color = styleColors[style as keyof typeof styleColors] || '0099FF';
    return `https://via.placeholder.com/400x500/${color}/FFFFFF?text=${style}`;
  };

  const generatedHeadshot = {
    id: '1',
    uri: getHeadshotUri(selectedStyle),
    style: selectedStyle
  };

  const handleDownload = (headshotId: string) => {
    console.log('Downloading headshot:', headshotId);
  };

  const handleShare = async (headshotId: string) => {
    try {
      const shareOptions = {
        title: 'Check out my AI-generated headshot!',
        message: `I just created a professional ${selectedStyle} headshot using Shotify AI. Take a look!`,
        url: generatedHeadshot.uri, // This will work for local images too
      };

      const result = await Share.share(shareOptions);
      
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
          console.log('Shared with activity type:', result.activityType);
        } else {
          // shared
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
        console.log('Share dismissed');
      }
    } catch (error) {
      console.error('Error sharing:', error);
      Alert.alert('Error', 'Failed to share the image. Please try again.');
    }
  };

  const handleView = (headshotId: string) => {
    console.log('Viewing headshot:', headshotId);
    setShowViewModal(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Your Headshots</Text>
          <Text style={styles.subtitle}>Generated successfully! Here are your professional headshots.</Text>
        </View>

        <View style={styles.headshotContainer}>
          <View style={styles.headshotCard}>
            <Image source={{ uri: generatedHeadshot.uri }} style={styles.headshotImage} resizeMode="cover" />
            <View style={styles.headshotOverlay}>
              <Text style={styles.headshotStyle}>{generatedHeadshot.style}</Text>
                             <View style={styles.actionButtons}>
                 <TouchableOpacity
                   onPress={() => handleView(generatedHeadshot.id)}
                   style={styles.actionButton}
                   activeOpacity={0.8}
                 >
                   <ViewIcon width={20} height={20} color="#ffffff" strokeWidth={1.5} />
                 </TouchableOpacity>
                 <TouchableOpacity
                   onPress={() => handleDownload(generatedHeadshot.id)}
                   style={styles.actionButton}
                   activeOpacity={0.8}
                 >
                   <DownloadIcon width={20} height={20} color="#ffffff" />
                 </TouchableOpacity>
                 <TouchableOpacity
                   onPress={() => handleShare(generatedHeadshot.id)}
                   style={styles.actionButton}
                   activeOpacity={0.8}
                 >
                   <ShareIcon width={20} height={20} color="#ffffff" strokeWidth={1.5} />
                 </TouchableOpacity>
               </View>
            </View>
          </View>
        </View>

        <View style={styles.bottomActions}>
          <TouchableOpacity style={styles.primaryButton} onPress={onBackToHome} activeOpacity={0.8}>
            <Text style={styles.primaryButtonText}>Generate More</Text>
          </TouchableOpacity>
                 </View>
       </View>

       {/* Full-screen View Modal */}
       <Modal visible={showViewModal} animationType="fade" transparent>
         <View style={styles.viewModalOverlay}>
           <View style={styles.viewModalContainer}>
             <View style={styles.viewModalHeader}>
               <Text style={styles.viewModalTitle}>{generatedHeadshot.style}</Text>
                               <TouchableOpacity
                  onPress={() => setShowViewModal(false)}
                  style={styles.closeViewButton}
                  activeOpacity={0.8}
                >
                  <CloseIcon width={24} height={24} color="#ffffff" />
                </TouchableOpacity>
             </View>
             <View style={styles.viewModalImageContainer}>
               <Image 
                 source={{ uri: generatedHeadshot.uri }} 
                 style={[styles.viewModalImage, { width: screenWidth - 40, height: screenHeight * 0.7 }]} 
                 resizeMode="contain" 
               />
             </View>
           </View>
         </View>
       </Modal>
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
    padding: 18,
    marginTop: -50,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    color: '#ffffff',
    fontFamily: 'SpButchLiteLight',
    marginBottom: 8,
  },
  subtitle: {
    color: '#bfbfbf',
    fontSize: 14,
    lineHeight: 22,
  },
  headshotContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  headshotCard: {
    width: '100%',
    maxHeight: "100%",
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#141414',
    borderWidth: 1,
    borderColor: '#262626',
  },
  headshotImage: {
    width: '100%',
    height: 450,
  },
  headshotOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 12,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  headshotStyle: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'SpButchLiteLight',
    marginBottom: 8,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  actionButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomActions: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#262626',
  },
  primaryButton: {
    backgroundColor: '#0099FF',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'SpButchLiteLight',
    fontWeight: '600',
  },
  viewModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.9)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewModalContainer: {
    flex: 1,
    width: '100%',
    padding: 20,
  },
  viewModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  viewModalTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontFamily: 'SpButchLiteLight',
  },
  closeViewButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  viewModalImageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewModalImage: {
    borderRadius: 12,
  },
});

export default Resultat;
