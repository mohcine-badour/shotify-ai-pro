import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MenuBurger from './ui/MenuBurger';
import { BUTTONS_LIST } from '../utils/buttons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SFSymbol } from 'react-native-sfsymbols';
import Config from '../config/Config';
import BackIcon from './ui/BackIcon';

interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackPress?: () => void;
  rightComponent?: React.ReactNode;
  onMenuPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title = 'Shotify AI',
  showBackButton = false,
  onBackPress,
  rightComponent,
  onMenuPress
}) => {
  const insets = useSafeAreaInsets();
  const [showTooltip, setShowTooltip] = useState(false);
  const fadeAnim = new Animated.Value(0);
  const scaleAnim = new Animated.Value(0.8);

  useEffect(() => {
    if (showTooltip) {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.8,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [showTooltip]);

  const handleMenuPress = () => {
    setShowTooltip(!showTooltip);
    if (onMenuPress) {
      onMenuPress();
    }
  };

  const renderButton = (item: any, index: number) => (
    <TouchableOpacity
      key={index}
      style={[styles.button, { backgroundColor: item.color }]}
      activeOpacity={0.7}
    >
      {Config.isIos ? (
        <SFSymbol
          name={item.icon}
          weight="semibold"
          scale="large"
          color="white"
          size={16}
          resizeMode="center"
          multicolor={false}
        />
      ) : (
        <Icon name={item.icon} color="white" size={16} />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.content}>
        {/* Left section */}
        <View style={styles.leftSection}>
          {showBackButton && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={onBackPress}
              activeOpacity={0.7}
            >
              <BackIcon size={24} color="#ffffff" />
            </TouchableOpacity>
          )}
          {!showBackButton && (
            <Text style={styles.titleLeft}>{title}</Text>
          )}
        </View>

        {/* Center section - Title (only when back button is shown) */}
        {showBackButton && (
          <View style={styles.centerSection}>
            <Text style={styles.title}>{title}</Text>
          </View>
        )}

        {/* Right section */}
        <View style={styles.rightSection}>
          {rightComponent || (
            <MenuBurger 
              onPress={handleMenuPress}
              size={24}
              color="#ffffff"
              style={styles.menuButton}
            />
          )}
        </View>
      </View>

      {/* Tooltip */}
      {showTooltip && (
        <Animated.View 
          style={[
            styles.tooltipContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            }
          ]}
        >
          <View style={styles.tooltip}>
            <ScrollView 
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContent}
            >
              <View style={styles.buttonsGrid}>
                {BUTTONS_LIST.map((item, index) => renderButton(item, index))}
              </View>
            </ScrollView>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a1a',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    minHeight: 80,
  },
  leftSection: {
    flex: 1,
    alignItems: 'flex-start',
  },
  centerSection: {
    flex: 2,
    alignItems: 'center',
  },
  rightSection: {
    flex: 1,
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 20,
    width: '100%',
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: 'SpButchLiteLight',
    marginTop: 10,
  },
  titleLeft: {
    fontSize: 20,
    color: '#ffffff',
    textAlign: 'left',
    fontFamily: 'SpButchLiteLight',
  },
  backButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#333333',
    minWidth: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: '500',
  },
  menuButton: {
    padding: 4,
  },
  tooltipContainer: {
    position: 'absolute',
    top: 100,
    right: 16,
    zIndex: 1000,
  },
  tooltip: {
    backgroundColor: '#333333',
    paddingHorizontal: 4,
    borderRadius: 8,
    height: 105,
    width: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 8,
  },
  buttonsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
    width: '100%',
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 2,
  },
  tooltipText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default Header;
