import { View, Text, Pressable } from 'react-native';
export default function Header({ title, subtitle, right }) {
  return (
    <View className="px-6 pt-14 pb-6 flex-row justify-between items-end">
      <View>
        <Text className="text-white/40 text-[11px] tracking-[0.2em] uppercase font-bold mb-2">{subtitle}</Text>
        <Text className="text-white text-[28px] font-bold tracking-tight leading-8">{title}</Text>
      </View>
      {right}
    </View>
  );
}
