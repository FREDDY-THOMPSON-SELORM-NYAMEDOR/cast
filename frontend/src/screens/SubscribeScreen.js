import { View, Text, Pressable } from 'react-native';
import GlassCard from '../components/GlassCard';
import PrimaryButton from '../components/PrimaryButton';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { subscribe } from '../services/api';

export default function SubscribeScreen({ navigation }) {
  const { user, token } = useContext(AuthContext);

  async function handleSubscribe() {
    if (!user) return navigation.navigate('Auth');
    try {
      const resp = await subscribe({ email: user.email, amount: 35 }, token);
      if (resp && resp.authorizationUrl) {
        // Open authorization URL in browser (web) or use Linking for mobile
        const { Linking } = require('react-native');
        Linking.openURL(resp.authorizationUrl);
      } else {
        alert(resp.message || 'Unable to start payment');
      }
    } catch (e) {
      alert(e.message);
    }
  }
  return (
    <View className="flex-1 bg-[#050c1a] px-6 pt-16">
      <Pressable onPress={()=>navigation.goBack()} className="w-10 h-10 rounded-full bg-white/10 items-center justify-center mb-8"><Text className="text-white">✕</Text></Pressable>
      <Text className="text-white text-[36px] font-bold leading-[38px]">Unlock all{"\n"}episodes</Text>
      <Text className="text-white/40 mt-4 leading-6">Get ad-free listening, early access, and offline downloads for your Cast journey.</Text>
      <View className="mt-8 gap-4">
        <GlassCard className="p-5 border-[#00f2fe]/30 bg-[#00f2fe]/10">
          <View className="flex-row justify-between items-center">
            <View><Text className="text-white font-bold">Yearly • Best Deal</Text><Text className="text-white/50 text-[12px]">GH₵ 299 / year</Text></View>
            <View className="px-3 py-1 rounded-full bg-[#00f2fe]"><Text className="text-[#050c1a] text-[11px] font-bold">-40%</Text></View>
          </View>
        </GlassCard>
        <GlassCard className="p-5"><Text className="text-white font-bold">Monthly</Text><Text className="text-white/50 text-[12px]">GH₵ 35 / month</Text></GlassCard>
      </View>
      <View className="mt-auto mb-10 gap-3">
        <PrimaryButton label="Subscribe with Paystack" onPress={handleSubscribe} />
        <Text className="text-white/30 text-[11px] text-center">Secure payment via Paystack • Cancel anytime</Text>
      </View>
    </View>
  );
}
