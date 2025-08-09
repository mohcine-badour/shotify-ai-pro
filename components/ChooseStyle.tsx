import React, { Component } from 'react'
import { Text, View, Image, StyleSheet, Dimensions, FlatList, TouchableOpacity } from 'react-native'

interface ImageData {
  id: string
  source: any
  title: string
}

interface CardProps {
  imagesData: ImageData[]
  onPress?: (imageId: string) => void
}

export default class ChooseStyle extends Component<CardProps> {
  renderCard = ({ item }: { item: ImageData }) => {
    const { onPress } = this.props
    
    return (
      <View style={styles.cardContainer}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => onPress && onPress(item.id)}
          style={styles.card}
        >
          <Image 
            source={item.source}
            style={styles.fullScaleImage}
            resizeMode="cover"
            onError={(error) => console.log('Image error:', error)}
            onLoad={() => console.log('Image loaded successfully')}
          />
          <View style={styles.titleContainer}>
            <View style={styles.gradientLayer1} />
            <View style={styles.gradientLayer2} />
            <View style={styles.gradientLayer3} />
            <Text style={styles.titleText}>{item.title}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }

  render() {
    const { imagesData, onPress } = this.props
    
    return (
      <FlatList
        data={imagesData}
        renderItem={this.renderCard}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    )
  }
}

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 8,
  },
  row: {
    justifyContent: 'space-between',
  },
  cardContainer: {
    width: (width - 60) / 2, // 52 = padding (18*2) + gap (16) between cards
    marginBottom: 16,
  },
  card: {
    backgroundColor: 'transparent',
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minHeight: 200,
  },
  fullScaleImage: {
    width: '100%',
    height: 200,
    borderRadius: 20,
  },
  titleContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 12,
    paddingVertical: 12,
    zIndex: 2,
    overflow: 'hidden',
  },
  gradientLayer1: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#ffffff',
    opacity: 0.3,
  },
  gradientLayer2: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#cccccc',
    opacity: 0.2,
  },
  gradientLayer3: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#000000',
    opacity: 0.1,
  },
  titleText: {
    color: '#000000',
    fontSize: 20,
    fontFamily: 'SpButchLiteLight',
    textAlign: 'center',
    zIndex: 3,
  },
})
