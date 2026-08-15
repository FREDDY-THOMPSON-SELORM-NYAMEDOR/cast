
import { View, Text, Image, Pressable } from 'react-native';
export default function HeroStoryCard({ item={}, onPress }){
  return (
    <Pressable onPress={onPress} className="h-[420px] rounded-[28px] overflow-hidden bg-surface">
      <Image source={{uri: item.cover || 'https://picsum.photos/400/700?random=hero'}} className="w-full h-full" />
      <View className="absolute top-4 left-4 bg-primary px-3 py-1.5 rounded-full"><Text className="text-white text-[10px] font-black">FEATURED • AI</Text></View>
      <View className="absolute bottom-0 p-6 w-full"><Text className="text-white text-[26px] font-black">{item.title||'The Last Signal From Kepler'}</Text><View className="bg-white h-[52px] rounded-full items-center justify-center mt-5"><Text className="text-black font-bold">Watch Now</Text></View></View>
    </Pressable>
  );
}
