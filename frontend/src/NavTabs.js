
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import { View, Text } from 'react-native';
const Tab = createBottomTabNavigator();
function Ph(){ return <View className="flex-1 bg-background items-center justify-center"><Text className="text-white/50">Coming Soon</Text></View> }
export default function NavTabs(){ return (<Tab.Navigator screenOptions={{headerShown:false, tabBarStyle:{backgroundColor:'#0A0A0B', borderTopWidth:0, height:90}, tabBarActiveTintColor:'#FF2D55', tabBarShowLabel:false}}><Tab.Screen name="Home" component={HomeScreen} /><Tab.Screen name="Discover" component={Ph} /><Tab.Screen name="Library" component={Ph} /><Tab.Screen name="Profile" component={ProfileScreen} /></Tab.Navigator>); }
