import { ScrollView, View, Text, Pressable } from 'react-native';
import Header from '../components/Header';
import EpisodeCard from '../components/EpisodeCard';
import PlayerBar from '../components/PlayerBar';

const DATA = [
  { id: '1', tag: 'NEW DROP', time: '24m', title: 'The Future of AI is Not What You Think', host: 'with Lex Fridman' },
  { id: '2', tag: 'TRENDING', time: '48m', title: 'Building a $10M SaaS with 2 People', host: 'with Pieter Levels' },
  { id: '3', tag: 'LIVE', time: '1h 12m', title: 'Midnight Code: Shipping at 3AM', host: 'with You' },
  { id: '4', tag: 'DEEP DIVE', time: '32m', title: 'Why Your App Feels Slow (and how to fix)', host: 'System Design' },
];

export default function HomeScreen({ navigation }) {
  return (
    <View className="flex-1 bg-[#050c1a]">
      <Header subtitle="Good Evening, Akwasi" title={'Discover\nEpisodes'} />
      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 160 }}>
        <View className="flex-row gap-3 mb-6">
          {['For You','Trending','New'].map((t,i)=>(
            <Pressable key={t} className={`px-5 h-9 rounded-full items-center justify-center ${i===0?'bg-white':'bg-white/[0.06] border border-white/10'}`}>
              <Text className={`${i===0?'text-[#050c1a]':'text-white/60'} text-[13px] font-semibold`}>{t}</Text>
            </Pressable>
          ))}
        </View>
        {DATA.map(item=>(
          <EpisodeCard key={item.id} item={item} onPress={()=>navigation.navigate('EpisodeDetail', { item })} />
        ))}
      </ScrollView>
      <PlayerBar onPress={()=>navigation.navigate('Player')} />
    </View>
  );
}
