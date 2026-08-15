import { View, Text, ScrollView } from 'react-native';
import Header from '../components/Header';
import GlassCard from '../components/GlassCard';
export default function ProfileScreen() {
  return (
    <View className="flex-1 bg-[#050c1a]">
      <Header subtitle="Account" title="Profile" />
      <ScrollView className="px-4" contentContainerStyle={{ paddingBottom: 100 }}>
        <GlassCard className="p-6 flex-row gap-4 items-center mb-6">
          <View className="w-16 h-16 rounded-full bg-[#00f2fe] items-center justify-center"><Text className="text-[#050c1a] font-bold text-xl">A</Text></View>
          <View><Text className="text-white text-[18px] font-bold">Akwasi</Text><Text className="text-[#00f2fe] text-[13px]">Premium Member</Text></View>
        </GlassCard>
        {[
          ['Downloads','12 episodes'],
          ['Listening Time','42h this month'],
          ['Storage','1.2 GB used']
        ].map(([k,v])=>(
          <GlassCard key={k} className="p-4 flex-row justify-between mb-3"><Text className="text-white/60">{k}</Text><Text className="text-white font-semibold">{v}</Text></GlassCard>
        ))}
      </ScrollView>
    </View>
  );
}
