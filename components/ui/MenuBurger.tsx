import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

interface MenuBurgerProps {
  onPress?: () => void;
  size?: number;
  color?: string;
  style?: any;
}

const MenuBurger: React.FC<MenuBurgerProps> = ({
  onPress,
  size = 24,
  color = '#000000',
  style
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, style]}>
      <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <Path
          d="M4 12H20M4 8H20M4 16H12"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MenuBurger;
