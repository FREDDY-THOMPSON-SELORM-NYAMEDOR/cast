import { View, Text, ScrollView, Pressable } from 'react-native';
import GlassCard from '../components/GlassCard';
import PrimaryButton from '../components/PrimaryButton';

export default function EpisodeDetailScreen({ navigation, route }) {
  const item = route?.params?.item || { title: 'The Future of AI is Not What You Think', tag: 'NEW DROP' };
  return (
    <View className="flex-1 bg-[#050c1a]">
      <View className="px-6 pt-14 pb-6 flex-row justify-between">
        <Pressable onPress={()=>navigation.goBack()} className="w-10 h-10 rounded-full bg-white/10 items-center justify-center"><Text className="text-white">‹</Text></Pressable>
        <Pressable className="w-10 h-10 rounded-full bg-white/10 items-center justify-center"><Text className="text-white">•••</Text></Pressable>
      </View>
      <ScrollView className="px-6" contentContainerStyle={{ paddingBottom: 40 }}>
        <View className="w-full h-[240px] rounded-[32px] bg-gradient-to-br from-[#00f2fe]/30 to-[#050c1a] border border-[#00f2fe]/20 items-center justify-center mb-6">
          <Text className="text-[#00f2fe] text-5xl">◐</Text>
        </View>
        <View className="px-2 py-2 rounded-full bg-[#00f2fe]/15 self-start mb-4"><Text className="text-[#00f2fe] text-[11px] font-bold tracking-widest px-2">{item.tag}</Text></View>
        <Text className="text-white text-[32px] font-bold leading-[34px] tracking-tight mb-3">{item.title}</Text>
        <Text className="text-white/40 text-[14px] leading-6 mb-6">Deep dive into how modern AI systems are built, why they hallucinate, and what it takes to ship production-grade voice products in Africa and beyond.</Text>
        <GlassCard className="p-5 mb-6">
          <View className="flex-row justify-between mb-4">
            <View><Text className="text-white/40 text-[11px] tracking-widest">DURATION</Text><Text className="text-white font-semibold">42:18</Text></View>
            <View><Text className="text-white/40 text-[11px] tracking-widest">LISTENS</Text><Text className="text-white font-semibold">12.4k</Text></View>
            <View><Text className="text-white/40 text-[11px] tracking-widest">QUALITY</Text><Text className="text-[#00f2fe] font-semibold">HD</Text></View>
          </View>
          <View className="h-[4px] bg-white/10 rounded-full"><View className="h-[4px] w-[35%] bg-[#00f2fe] rounded-full" /></View>
        </GlassCard>
        <View className="gap-3">
          <PrimaryButton label="Play Episode" onPress={()=>navigation.navigate('Player')} />
          <PrimaryButton label="Subscribe to Series" variant="secondary" onPress={()=>navigation.navigate('Subscribe')} />
        </View>
      </ScrollView>
    </View>
  );
}
