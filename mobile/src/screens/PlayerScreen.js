
import { View, Text, FlatList, Dimensions } from 'react-native';
const { height } = Dimensions.get('window');
export default function PlayerScreen(){
  return (
    <FlatList data={[{id:'1'},{id:'2'},{id:'3'}]} pagingEnabled snapToInterval={height} decelerationRate="fast" renderItem={({item})=><View style={{height}} className="bg-black items-center justify-center"><Text className="text-white text-[24px] font-bold">Episode {item.id}</Text><Text className="text-white/50">Swipe up for next</Text></View>} />
  );
}
