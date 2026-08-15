import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Pressable, Alert } from 'react-native';
import { AuthContext } from '../context/AuthContext';
import PrimaryButton from '../components/PrimaryButton';

export default function AuthScreen({ navigation }) {
  const { login, register } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  async function doLogin() {
    try {
      const resp = await login({ email, password });
      if (resp && resp.token) {
        navigation.goBack();
      } else {
        Alert.alert('Login failed', resp.message || 'Check credentials');
      }
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  }

  async function doRegister() {
    try {
      const resp = await register({ email, password, name });
      if (resp && resp.token) navigation.goBack();
      else Alert.alert('Register failed', resp.message || 'Unable to create account');
    } catch (e) {
      Alert.alert('Error', e.message);
    }
  }

  return (
    <View className="flex-1 bg-[#050c1a] px-6 pt-16">
      <Text className="text-white text-2xl font-bold mb-4">Sign in or create account</Text>
      <TextInput value={name} onChangeText={setName} placeholder="Name (for signup)" placeholderTextColor="#9CA3AF" className="bg-white/5 p-3 rounded mb-3 text-white" />
      <TextInput value={email} onChangeText={setEmail} placeholder="Email" placeholderTextColor="#9CA3AF" keyboardType="email-address" className="bg-white/5 p-3 rounded mb-3 text-white" />
      <TextInput value={password} onChangeText={setPassword} placeholder="Password" placeholderTextColor="#9CA3AF" secureTextEntry className="bg-white/5 p-3 rounded mb-6 text-white" />
      <PrimaryButton label="Login" onPress={doLogin} />
      <View className="mt-3"><PrimaryButton label="Register" variant="outline" onPress={doRegister} /></View>
    </View>
  );
}
