
import { View, Text, ScrollView, Pressable } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import StoryCard from '../components/StoryCard';
import HeroStoryCard from '../components/HeroStoryCard';
const DATA = [{id:'1',title:'The Last Signal From Kepler'},{id:'2',title:'Love in Neo-Lagos'},{id:'3',title:'Asylum 404'},{id:'4',title:'The Alchemist Code'}];
const CATS = ['For You','Thriller','Romance','Sci-Fi'];
export default function HomeScreen({ navigation }){
  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="px-6"><Text className="text-white text-[28px] font-black tracking-tighter mt-2">HOOK</Text>
        <ScrollView horizontal className="mt-6 -mx-6 px-6" contentContainerStyle={{gap:10}} showsHorizontalScrollIndicator={false}>{CATS.map((c,i)=><Pressable key={c} className={`${i===0?'bg-white':'bg-surface'} px-5 py-2.5 rounded-full`}><Text className={`${i===0?'text-black':'text-white/70'} font-bold text-[13px]`}>{c}</Text></Pressable>)}</ScrollView>
        <View className="mt-6"><HeroStoryCard item={DATA[0]} onPress={()=>navigation.navigate('EpisodeDetail')} /></View>
        <View className="flex-row flex-wrap justify-between mt-6">{DATA.slice(1).map(d=><StoryCard key={d.id} item={d} onPress={()=>navigation.navigate('EpisodeDetail')} />)}</View>
      </ScrollView>
    </SafeAreaView>
  );
}
