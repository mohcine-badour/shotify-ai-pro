import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MenuBurger from './ui/MenuBurger';

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
              <Text style={styles.backButtonText}>←</Text>
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
              onPress={onMenuPress}
              size={24}
              color="#ffffff"
              style={styles.menuButton}
            />
          )}
        </View>
      </View>
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
});

export default Header;
