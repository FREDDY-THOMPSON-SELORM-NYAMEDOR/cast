
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function ProfileScreen({ navigation }){
  return (
    <SafeAreaView className="flex-1 bg-background"><ScrollView className="px-6"><Text className="text-white text-[22px] font-bold mt-2">Profile</Text><View className="items-center mt-8"><View className="w-[88px] h-[88px] rounded-full bg-surface border-2 border-white/10 items-center justify-center"><Text className="text-white text-[32px] font-bold">KA</Text></View><Text className="text-white text-[20px] font-bold mt-4">Kwame Asante</Text></View><Pressable onPress={()=>navigation.navigate('Subscribe')} className="mt-8 bg-primary rounded-[20px] p-5"><Text className="text-white/80 text-[11px] font-bold">CURRENT PLAN</Text><Text className="text-white text-[18px] font-bold mt-1">Free • 3 episodes left</Text></Pressable></ScrollView></SafeAreaView>
  );
}
