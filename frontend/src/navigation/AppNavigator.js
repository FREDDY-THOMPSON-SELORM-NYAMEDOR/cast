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
import AuthScreen from '../screens/AuthScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabBarIcon({ focused, label }) {
  return (
    <View className={`w-10 h-10 rounded-full items-center justify-center ${focused ? 'bg-[#00f2fe]' : 'bg-white/10'}`}>
      <Text className={`${focused ? 'text-[#050c1a]' : 'text-white/60'} text-[12px] font-bold`}>{label[0]}</Text>
    </View>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ 
      headerShown: false,
      tabBarStyle: { backgroundColor: '#050c1a', borderTopColor: 'rgba(255,255,255,0.06)', borderTopWidth: 1, height: 82, paddingTop: 10 },
      tabBarShowLabel: false,
    }}>
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ tabBarIcon: (p) => <TabBarIcon {...p} label="Home" /> }} />
      <Tab.Screen name="ProfileTab" component={ProfileScreen} options={{ tabBarIcon: (p) => <TabBarIcon {...p} label="Profile" /> }} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#050c1a' }, animation: 'slide_from_right' }}>
        <Stack.Screen name="Main" component={MainTabs} />
        <Stack.Screen name="Auth" component={AuthScreen} options={{ presentation: 'modal' }} />
        <Stack.Screen name="EpisodeDetail" component={EpisodeDetailScreen} />
        <Stack.Screen name="Player" component={PlayerScreen} options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
        <Stack.Screen name="Subscribe" component={SubscribeScreen} options={{ presentation: 'modal', animation: 'slide_from_bottom' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
