import { View } from 'react-native';
export default function GlassCard({ children, className = '', style }) {
  return (
    <View 
      className={`rounded-[24px] border bg-white/[0.04] border-white/[0.07] backdrop-blur-xl ${className}`}
      style={[{ backgroundColor: 'rgba(15,23,42,0.6)' }, style]}
    >
      {children}
    </View>
  );
}
