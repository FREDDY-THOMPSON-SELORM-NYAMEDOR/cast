import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Switch, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import { listVideosAdmin, createVideoAdmin, uploadImageAdmin, listSubscriptionsAdmin } from '../services/adminApi';
import GlassCard from '../components/GlassCard';
import PrimaryButton from '../components/PrimaryButton';

export default function AdminScreen() {
  const { adminSecret, setAdminKey, user } = useContext(AuthContext);
  const [secretInput, setSecretInput] = useState(adminSecret || '');
  const [videos, setVideos] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [episodeNumber, setEpisodeNumber] = useState('');
  const [isPremium, setIsPremium] = useState(false);
  const [thumbnail, setThumbnail] = useState('');

  useEffect(() => {
    if (adminSecret) loadVideos();
  }, [adminSecret]);

  async function loadVideos() {
    try {
      const list = await listVideosAdmin(adminSecret);
      setVideos(list);
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  }

  async function saveSecret() {
    await setAdminKey(secretInput.trim());
    Alert.alert('Saved', 'Admin key saved locally');
    if (secretInput.trim()) loadVideos();
  }

  async function doCreate() {
    try {
      const payload = { title, description, episodeNumber: Number(episodeNumber), isPremium, thumbnail };
      const created = await createVideoAdmin(payload, adminSecret);
      Alert.alert('Created', created.title || 'Video created');
      setTitle(''); setDescription(''); setEpisodeNumber(''); setThumbnail(''); setIsPremium(false);
      loadVideos();
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  }

  async function doUploadImage() {
    try {
      const resp = await uploadImageAdmin(thumbnail, adminSecret);
      Alert.alert('Uploaded', resp.secureUrl || 'Uploaded');
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  }

  return (
    <View className="flex-1 bg-[#050c1a] px-4 pt-6">
      <Text className="text-white text-xl font-bold mb-3">Admin Panel</Text>
      <Text className="text-white/60 mb-4">Signed in as: {user ? user.email : 'Guest'}</Text>

      <GlassCard className="p-4 mb-4">
        <Text className="text-white font-semibold mb-2">Admin Secret</Text>
        <TextInput value={secretInput} onChangeText={setSecretInput} placeholder="Paste admin secret" placeholderTextColor="#9CA3AF" className="bg-white/5 p-3 rounded text-white" />
        <View className="mt-3 flex-row gap-2"><PrimaryButton label="Save" onPress={saveSecret} /><PrimaryButton label="Load Videos" variant="outline" onPress={loadVideos} /></View>
      </GlassCard>

      <GlassCard className="p-4 mb-4">
        <Text className="text-white font-semibold mb-2">Create Video</Text>
        <TextInput value={title} onChangeText={setTitle} placeholder="Title" placeholderTextColor="#9CA3AF" className="bg-white/5 p-3 rounded mb-2 text-white" />
        <TextInput value={description} onChangeText={setDescription} placeholder="Description" placeholderTextColor="#9CA3AF" className="bg-white/5 p-3 rounded mb-2 text-white" />
        <TextInput value={episodeNumber} onChangeText={setEpisodeNumber} placeholder="Episode number" placeholderTextColor="#9CA3AF" keyboardType="numeric" className="bg-white/5 p-3 rounded mb-2 text-white" />
        <TextInput value={thumbnail} onChangeText={setThumbnail} placeholder="Thumbnail URL" placeholderTextColor="#9CA3AF" className="bg-white/5 p-3 rounded mb-2 text-white" />
        <View className="flex-row items-center gap-2 mb-2"><Text className="text-white">Premium</Text><Switch value={isPremium} onValueChange={setIsPremium} /></View>
        <View className="flex-row gap-2"><PrimaryButton label="Upload Image" onPress={doUploadImage} /><PrimaryButton label="Create Video" onPress={doCreate} /></View>
      </GlassCard>

      <Text className="text-white font-semibold mb-2">Videos</Text>
      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {videos && videos.length ? videos.map((v) => (
          <GlassCard key={v.id} className="p-3 mb-3"><Text className="text-white font-bold">{v.title}</Text><Text className="text-white/60">Episode {v.episodeNumber} • {v.isPremium ? 'Premium' : 'Free'}</Text></GlassCard>
        )) : <Text className="text-white/60">No videos loaded.</Text>}
      </ScrollView>
    </View>
  );
}
