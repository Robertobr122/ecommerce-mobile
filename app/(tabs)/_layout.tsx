import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PaperProvider } from 'react-native-paper';
import MenuHeader from '@/components/MenuHeader';
import { CartProvider } from './cartContext'; 
import Toast from 'react-native-toast-message';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [visible, setVisible] = useState(false);

  return (
    <CartProvider>
      <PaperProvider>
       <Toast /> 
        <Tabs>
          <Tabs.Screen
            name="home"
            options={{
              headerTitleStyle: {
                fontSize: 24,
                fontWeight: 'bold',
                color: 'white',
              },
              headerStyle: {
                backgroundColor: '#5bb7b6',
              },
              title: 'Home',
              headerRight: () => <MenuHeader />,
              tabBarIcon: () => (
                <MaterialCommunityIcons name="home" size={30} color="white" />
              ),
              tabBarStyle: {
                backgroundColor: '#5bb7b6',
              },
              tabBarActiveTintColor: 'white',
              tabBarInactiveTintColor: 'gray',
            }}
          />
          <Tabs.Screen
            name="cart"
            options={{
              title: 'Cart',
              headerTitleStyle: {
                fontSize: 24,
                fontWeight: 'bold',
                color: 'white',
              },
              headerStyle: {
                backgroundColor: '#5bb7b6',
              },
              headerRight: () => <MenuHeader />,
              tabBarIcon: () => (
                <MaterialCommunityIcons name="account-circle" size={30} color="white" />
              ),
              tabBarStyle: {
                backgroundColor: '#5bb7b6',
              },
              tabBarActiveTintColor: 'white',
              tabBarInactiveTintColor: 'gray',
            }}
          />
        </Tabs>
      </PaperProvider>
    </CartProvider>
  );
}
