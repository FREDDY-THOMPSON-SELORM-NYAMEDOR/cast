import { View, Text, Pressable } from 'react-native';
import GlassCard from './GlassCard';
export default function PlayerBar({ onPress }) {
  return (
    <Pressable onPress={onPress} className="absolute bottom-[86px] left-4 right-4">
      <GlassCard className="h-[72px] px-4 flex-row items-center justify-between border-[#00f2fe]/20 bg-[#0f172a]/90">
        <View className="flex-row items-center gap-3">
          <View className="w-11 h-11 rounded-full bg-[#00f2fe] items-center justify-center"><Text className="text-[#050c1a] font-bold">▶</Text></View>
          <View><Text className="text-white text-[14px] font-semibold">Now Playing</Text><Text className="text-white/50 text-[12px]">The Future of AI</Text></View>
        </View>
        <View className="w-8 h-8 rounded-full bg-white/10 items-center justify-center"><Text className="text-white">↗</Text></View>
      </GlassCard>
    </Pressable>
  );
}
