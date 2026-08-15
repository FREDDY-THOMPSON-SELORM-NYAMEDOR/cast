import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../theme';

export default function StoryCard({ episode, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: episode.image }} style={styles.cardImage} />
      <View style={styles.cardContent}>
        <View style={styles.cardTopRow}>
          <Text style={styles.cardTitle}>{episode.title}</Text>
          <Text style={styles.badge}>{episode.isPremium ? 'Premium' : 'Free'}</Text>
        </View>
        <Text style={styles.cardDescription}>{episode.description}</Text>
        <View style={styles.cardMetaRow}>
          <Text style={styles.cardMeta}>{episode.category}</Text>
          <Text style={styles.cardMeta}>{episode.duration}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.panel,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 12,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: 140,
    resizeMode: 'cover',
  },
  cardContent: {
    padding: 14,
  },
  cardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardTitle: {
    color: COLORS.text,
    fontWeight: '700',
    fontSize: 17,
    flex: 1,
    paddingRight: 10,
  },
  badge: {
    color: COLORS.premium,
    fontWeight: '700',
    fontSize: 12,
    textTransform: 'uppercase',
  },
  cardDescription: {
    color: COLORS.muted,
    marginTop: 6,
    lineHeight: 20,
  },
  cardMetaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  cardMeta: {
    color: '#7dd3fc',
    fontWeight: '600',
  },
});
