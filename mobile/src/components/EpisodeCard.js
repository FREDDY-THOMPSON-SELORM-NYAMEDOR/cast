import { View, Text, Pressable, Image } from 'react-native';
import GlassCard from './GlassCard';
export default function EpisodeCard({ item, onPress }) {
  return (
    <Pressable onPress={onPress} className="active:scale-[0.98] mb-4">
      <GlassCard className="p-4 flex-row gap-4">
        <View className="w-[72px] h-[72px] rounded-2xl bg-[#00f2fe]/20 items-center justify-center">
          <Text className="text-[#00f2fe] text-2xl">▶</Text>
        </View>
        <View className="flex-1">
          <View className="flex-row items-center gap-2 mb-1">
            <View className="px-2 py-1 rounded-full bg-[#00f2fe]/15"><Text className="text-[#00f2fe] text-[10px] font-bold tracking-widest">{item.tag}</Text></View>
            <Text className="text-white/30 text-[11px]">{item.time}</Text>
          </View>
          <Text className="text-white text-[16px] font-semibold leading-5" numberOfLines={2}>{item.title}</Text>
          <Text className="text-white/40 text-[13px] mt-1" numberOfLines={1}>{item.host}</Text>
        </View>
      </GlassCard>
    </Pressable>
  );
}
