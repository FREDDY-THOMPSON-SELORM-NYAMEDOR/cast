import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { COLORS } from '../theme';

export default function NavTabs({ navigation }) {
  return (
    <View style={styles.navRow}>
      <TouchableOpacity style={styles.navBtn} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.navText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navBtn} onPress={() => navigation.navigate('Subscribe')}>
        <Text style={styles.navText}>Subscribe</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navBtn} onPress={() => navigation.navigate('Profile')}>
        <Text style={styles.navText}>Profile</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  navRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  navBtn: {
    backgroundColor: '#11233d',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    marginRight: 8,
    marginBottom: 8,
  },
  navText: {
    color: COLORS.text,
    fontWeight: '600',
  },
});
