import { Pressable, Text } from 'react-native';
export default function PrimaryButton({ label, onPress, variant='primary' }) {
  const isPrimary = variant==='primary';
  return (
    <Pressable 
      onPress={onPress}
      className={`h-[52px] rounded-full items-center justify-center active:scale-[0.98] ${isPrimary ? 'bg-[#00f2fe]' : 'bg-white/[0.08] border border-white/10'}`}
    >
      <Text className={`text-[15px] font-semibold tracking-wide ${isPrimary ? 'text-[#050c1a]' : 'text-white'}`}>{label}</Text>
    </Pressable>
  );
}
