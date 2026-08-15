
import { View, Text, ScrollView, Image, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const EPS=[{id:1,title:'The Signal',locked:false},{id:2,title:'Echoes',locked:false},{id:3,title:'Contact',locked:true}];
export default function EpisodeDetailScreen({ navigation }){
  return (
    <View className="flex-1 bg-background"><ScrollView>
      <View className="h-[460px] bg-surface"><Image source={{uri:'https://picsum.photos/400/700?random=detail'}} className="w-full h-full" /><SafeAreaView className="absolute top-0 px-6"><Pressable onPress={()=>navigation.goBack()} className="w-10 h-10 bg-black/50 rounded-full items-center justify-center"><Text className="text-white">←</Text></Pressable></SafeAreaView><View className="absolute bottom-0 p-6"><Text className="text-primary text-[11px] font-black tracking-[3px]">SCI-FI</Text><Text className="text-white text-[30px] font-black">The Last Signal From Kepler</Text></View></View>
      <View className="px-6 mt-4">{EPS.map((ep,i)=><Pressable key={ep.id} onPress={()=>ep.locked&&navigation.navigate('Subscribe')} className="flex-row gap-4 mb-4"><View className="w-[110px] h-[68px] bg-surface rounded-[12px] items-center justify-center"><Text className="text-white">{ep.locked?'🔒':'▶'}</Text></View><View><Text className="text-white/40 text-[11px] font-bold">EPISODE {i+1}</Text><Text className="text-white font-bold">{ep.title}</Text></View></Pressable>)}</View>
    </ScrollView><View className="px-6 py-5 border-t border-white/5"><Pressable onPress={()=>navigation.navigate('Subscribe')} className="bg-primary h-[56px] rounded-full items-center justify-center"><Text className="text-white font-bold">Unlock All - GHS 25</Text></Pressable></View></View>
  );
}
