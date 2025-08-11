import { ScrollView, StatusBar } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Header from './components/Header';
import Home from './screens/Home';
import Upload from './screens/Upload';
import Resultat from './screens/Resultat';
import Icon from 'react-native-vector-icons/MaterialIcons';

// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

const BUTTONS_LIST = [
  { title: 'Home', icon: 'home', color: '#0099FF' },
  { title: 'History', icon: 'history', color: '#CEE5FF' },
  { title: 'Settings', icon: 'settings', color: '#FFE5CE' },
];

export default function App() {
  const [fontsLoaded] = useFonts({
    'Fear-robot-regular': require('./assets/fonts/Fear-robot-regular.ttf'),
    'SpButchLiteLight': require('./assets/fonts/SpButchLiteLight.otf'),
  });

  // Screen state should be created before any conditional returns to keep Hooks order stable
  const [currentScreen, setCurrentScreen] = React.useState<'home' | 'upload' | 'resultat'>('home');

  const navigateToUpload = () => setCurrentScreen('upload');
  const navigateToResultat = () => setCurrentScreen('resultat');
  const navigateBackHome = () => setCurrentScreen('home');

  React.useEffect(() => {
    (globalThis as any).__NAVIGATE_TO_UPLOAD__ = navigateToUpload;
    (globalThis as any).__NAVIGATE_TO_RESULTAT__ = navigateToResultat;
    return () => {
      if ((globalThis as any).__NAVIGATE_TO_UPLOAD__) {
        delete (globalThis as any).__NAVIGATE_TO_UPLOAD__;
      }
      if ((globalThis as any).__NAVIGATE_TO_RESULTAT__) {
        delete (globalThis as any).__NAVIGATE_TO_RESULTAT__;
      }
    };
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <View style={styles.container} onLayout={onLayoutRootView}>
          {/* Use native StatusBar for proper Android support */}
          <StatusBar
            backgroundColor="#1a1a1a"
            barStyle="light-content"
          />
          <Header
            title={currentScreen === 'home' ? 'Shotify AI' : currentScreen === 'upload' ? 'Upload' : 'Results'}
            showBackButton={currentScreen !== 'home'}
            onBackPress={navigateBackHome}
          />

          {/* <Header rightComponent={<History />}/> */}
          <SafeAreaView style={styles.content}>
            {currentScreen === 'home' ? (
              <Home />
            ) : currentScreen === 'upload' ? (
              <Upload />
            ) : (
              <Resultat 
                onBackToHome={navigateBackHome} 
                selectedStyle={(globalThis as any).__SELECTED_STYLE__ || 'Business'}
              />
            )}
          </SafeAreaView>
        </View>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
  },
  content: {
    flex: 1,
  },
  toolbarView: {
    width: 50 + 16,
    height: 250,
    backgroundColor: 'white',
    shadowColor: 'gray',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    borderRadius: 12,
    marginHorizontal: 24,
    marginVertical: 40,
  },
  buttonListView: {
    position: 'absolute',
    height: 250,
    width: '100%',
    marginHorizontal: 24,
    marginVertical: 40,
  },
  buttonContainer: {
    width: 50,
    height: 50,
    flexDirection: 'row',
    borderRadius: 12,
  },
});
