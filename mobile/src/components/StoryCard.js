
import { View, Text, Image, Pressable } from 'react-native';
export default function StoryCard({ item={}, onPress }){
  return (
    <Pressable onPress={onPress} className="w-[48%] mb-4 active:opacity-80">
      <View className="relative h-[250px] rounded-[22px] overflow-hidden bg-surface">
        <Image source={{uri: item.cover || 'https://picsum.photos/300/500?random=1'}} className="w-full h-full" />
        <View className="absolute top-3 left-3 bg-black/60 px-2.5 py-1 rounded-full border border-white/10"><Text className="text-white text-[9px] font-bold">{item.episodes||8} EPS</Text></View>
        <View className="absolute bottom-0 p-3.5 w-full bg-black/40"><Text className="text-white text-[14px] font-bold" numberOfLines={2}>{item.title||'Love in Neo-Lagos'}</Text><Text className="text-white/50 text-[11px] mt-1">{item.genre||'Romance'} • 5 min/ep</Text></View>
      </View>
    </Pressable>
  );
}
