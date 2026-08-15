import { View, Text, Pressable } from 'react-native';
export default function PlayerScreen({ navigation }) {
  return (
    <View className="flex-1 bg-[#050c1a] px-6 pt-14">
      <View className="flex-row justify-between items-center mb-12">
        <Pressable onPress={()=>navigation.goBack()} className="w-10 h-10 rounded-full bg-white/10 items-center justify-center"><Text className="text-white">⌄</Text></Pressable>
        <Text className="text-white/40 text-[11px] tracking-[0.2em] uppercase font-bold">Now Playing</Text>
        <Pressable className="w-10 h-10 rounded-full bg-white/10 items-center justify-center"><Text className="text-white">♡</Text></Pressable>
      </View>
      <View className="items-center">
        <View className="w-[280px] h-[280px] rounded-[40px] bg-[#0f172a] border border-white/10 items-center justify-center shadow-2xl mb-10">
          <View className="w-[120px] h-[120px] rounded-full bg-[#00f2fe]/20 border border-[#00f2fe]/30 items-center justify-center">
            <Text className="text-[#00f2fe] text-4xl">▶</Text>
          </View>
        </View>
        <Text className="text-white text-[24px] font-bold text-center leading-7">The Future of AI is Not What You Think</Text>
        <Text className="text-white/40 text-[14px] mt-2">Lex Fridman • Episode 42</Text>
        <View className="w-full mt-10">
          <View className="h-1 bg-white/10 rounded-full"><View className="h-1 w-[62%] bg-[#00f2fe] rounded-full" /></View>
          <View className="flex-row justify-between mt-3"><Text className="text-white/40 text-[12px]">12:42</Text><Text className="text-white/40 text-[12px]">29:36</Text></View>
        </View>
        <View className="flex-row items-center gap-8 mt-12">
          <Pressable className="w-12 h-12 items-center justify-center"><Text className="text-white/60 text-2xl">↺</Text></Pressable>
          <Pressable className="w-16 h-16 rounded-full bg-white items-center justify-center"><Text className="text-[#050c1a] text-xl font-bold">❚❚</Text></Pressable>
          <Pressable className="w-12 h-12 items-center justify-center"><Text className="text-white/60 text-2xl">↻</Text></Pressable>
        </View>
      </View>
    </View>
  );
}
