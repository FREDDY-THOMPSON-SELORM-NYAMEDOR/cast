import { View, Text, ScrollView, Pressable } from 'react-native';
import Header from '../components/Header';
import GlassCard from '../components/GlassCard';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);

  if (!user) {
    return (
      <View className="flex-1 bg-[#050c1a] px-6 pt-16">
        <Header subtitle="Account" title="Profile" />
        <View className="mt-8"><Text className="text-white">You are not signed in.</Text>
          <Pressable onPress={() => navigation.navigate('Auth')} className="mt-4"><Text className="text-[#00f2fe]">Sign in / Register</Text></Pressable>
        </View>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-[#050c1a]">
      <Header subtitle="Account" title="Profile" />
      <ScrollView className="px-4" contentContainerStyle={{ paddingBottom: 100 }}>
        <GlassCard className="p-6 flex-row gap-4 items-center mb-6">
          <View className="w-16 h-16 rounded-full bg-[#00f2fe] items-center justify-center"><Text className="text-[#050c1a] font-bold text-xl">{(user.name||'U')[0]}</Text></View>
          <View><Text className="text-white text-[18px] font-bold">{user.name || user.email}</Text><Text className="text-[#00f2fe] text-[13px]">{user.isPremium ? 'Premium Member' : 'Free Member'}</Text></View>
        </GlassCard>
        {[
          ['Downloads','12 episodes'],
          ['Listening Time','42h this month'],
          ['Storage','1.2 GB used']
        ].map(([k,v])=>(
          <GlassCard key={k} className="p-4 flex-row justify-between mb-3"><Text className="text-white/60">{k}</Text><Text className="text-white font-semibold">{v}</Text></GlassCard>
        ))}
        <Pressable onPress={logout} className="mt-6 p-3 rounded bg-white/5 items-center"><Text className="text-white">Sign Out</Text></Pressable>
        <Pressable onPress={() => navigation.navigate('Admin')} className="mt-3 p-3 rounded bg-white/5 items-center"><Text className="text-white">Admin Panel</Text></Pressable>
      </ScrollView>
    </View>
  );
}
