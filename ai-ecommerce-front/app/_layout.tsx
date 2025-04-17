import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { CartProvider } from './(tabs)/cartContext';
import { TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';


import { useColorScheme } from '@/hooks/useColorScheme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const router = useRouter()

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
      <Stack>
        <Stack.Screen name="welcome" options={{ headerShown: false }}/>
        <Stack.Screen name="login" options={{ headerShown: false }}/>
        <Stack.Screen name="register" options={{ headerShown: false }}/>
        <Stack.Screen name="changeName" options={{ headerShown: false, 
          headerLeft: () => (
            <TouchableOpacity
              onPress={() => router.replace('/(tabs)/home')}
            ><Ionicons style={{fontSize: 28, marginEnd: 15}} name="arrow-back" /></TouchableOpacity>
          ), }}/>
        <Stack.Screen name="chat" options={{
          headerTitleAlign: 'center',
          title: 'ClosetX - IA',
          headerLeft: () => (
              <TouchableOpacity
                onPress={() => router.replace('/changeName')}
              ><Ionicons style={{fontSize: 28, marginEnd: 15}} name="arrow-back" /></TouchableOpacity>
            ), }}/>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
  );
}