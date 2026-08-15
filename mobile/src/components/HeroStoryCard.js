import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../theme';

export default function HeroStoryCard({ episode, onPress }) {
  return (
    <TouchableOpacity style={styles.heroCard} onPress={onPress}>
      <Image source={{ uri: episode.image }} style={styles.heroImage} />
      <View style={styles.heroOverlay}>
        <Text style={styles.heroLabel}>Featured story</Text>
        <Text style={styles.heroTitle}>{episode.title}</Text>
        <Text style={styles.heroText}>{episode.description}</Text>
        <View style={styles.heroMetaRow}>
          <Text style={styles.heroMeta}>{episode.category}</Text>
          <Text style={styles.heroMeta}>{episode.duration}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    borderRadius: 24,
    overflow: 'hidden',
    marginBottom: 14,
    backgroundColor: COLORS.panel,
    shadowColor: COLORS.shadow,
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  heroImage: {
    width: '100%',
    height: 210,
    resizeMode: 'cover',
  },
  heroOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: 16,
    backgroundColor: 'rgba(3, 7, 18, 0.68)',
  },
  heroLabel: {
    color: '#7dd3fc',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  heroTitle: {
    color: COLORS.text,
    fontSize: 22,
    fontWeight: '700',
  },
  heroText: {
    color: '#e2e8f0',
    marginTop: 4,
    lineHeight: 20,
  },
  heroMetaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  heroMeta: {
    color: COLORS.premium,
    fontWeight: '600',
    marginRight: 12,
    marginBottom: 4,
  },
});
