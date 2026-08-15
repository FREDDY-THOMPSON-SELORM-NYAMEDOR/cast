
import { View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PLANS } from '../lib/paystack';
import { useState } from 'react';
export default function SubscribeScreen({ navigation }){
  const [sel,setSel]=useState(PLANS[0]);
  return (
    <SafeAreaView className="flex-1 bg-background"><ScrollView className="px-6">
      <Pressable onPress={()=>navigation.goBack()} className="w-10 h-10 bg-surface rounded-full items-center justify-center mt-2"><Text className="text-white">✕</Text></Pressable>
      <Text className="text-white text-[36px] font-black mt-8">Unlock the full story.</Text>
      <View className="mt-8 gap-4">{PLANS.map(p=>{const s=sel.id===p.id;return <Pressable key={p.id} onPress={()=>setSel(p)} className={`rounded-[20px] p-5 border-2 ${s?'bg-white border-white':'bg-surface border-white/5'}`}><View className="flex-row justify-between"><Text className={`${s?'text-black':'text-white'} text-[18px] font-bold`}>{p.title}</Text><Text className={`${s?'text-black':'text-white'} text-[28px] font-black`}>GHS {p.price}</Text></View></Pressable>})}</View>
      <View className="mt-6 bg-surface rounded-[16px] p-4 border border-white/5"><Text className="text-white/40 text-[11px] font-bold">SECURED BY PAYSTACK • Mobile Money, Card, Bank</Text></View>
    </ScrollView><View className="px-6 py-5"><Pressable className="bg-primary h-[56px] rounded-full items-center justify-center"><Text className="text-white font-bold">Continue with Paystack - GHS {sel.price}</Text></Pressable></View></SafeAreaView>
  );
}
