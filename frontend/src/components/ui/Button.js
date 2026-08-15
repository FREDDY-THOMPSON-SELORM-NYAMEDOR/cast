
import { Pressable, Text, ActivityIndicator } from 'react-native';
export function Button({ children, loading, variant='primary', className='', ...props }) {
  const base = variant==='primary' ? 'bg-primary' : variant==='white' ? 'bg-white' : 'bg-surface border border-white/10';
  const textColor = variant==='white' ? 'text-black' : variant==='primary' ? 'text-white' : 'text-white';
  return (
    <Pressable className={`${base} h-[56px] rounded-full items-center justify-center flex-row gap-2 active:opacity-80 ${className}`} {...props}>
      {loading ? <ActivityIndicator color={variant==='white' ? 'black' : 'white'} /> : <Text className={`${textColor} font-bold text-[16px]`}>{children}</Text>}
    </Pressable>
  );
}
