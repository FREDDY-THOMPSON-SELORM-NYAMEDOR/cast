import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, Text } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import EpisodeDetailScreen from '../screens/EpisodeDetailScreen';
import SubscribeScreen from '../screens/SubscribeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PlayerScreen from '../screens/PlayerScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ 
      headerShown: false,
      tabBarStyle: { backgroundColor: '#0A0A0B', borderTopWidth: 0, height: 70 },
      tabBarActiveTintColor: '#FF2D55',
      tabBarShowLabel: false,
    }}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, cardStyle: { backgroundColor: '#0A0A0B' } }}>
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="EpisodeDetail" component={EpisodeDetailScreen} />
        <Stack.Screen name="Player" component={PlayerScreen} />
        <Stack.Screen name="Subscribe" component={SubscribeScreen} options={{ presentation: 'modal' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}