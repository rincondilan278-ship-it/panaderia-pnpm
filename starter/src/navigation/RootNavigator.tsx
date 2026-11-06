
import React, { useState } from 'react';
import { View, Text } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import type { RootStackParamList, BottomTabParamList } from './types';
import type { Item } from '../types';

import { MOCK_ITEMS } from '../data/mockData';

import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<BottomTabParamList>();

type MainTabsProps = {
  items: Item[];
  onToggleFavorite: (id: string) => void;
};

function MainTabs({ items, onToggleFavorite }: MainTabsProps) {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#8B4513',
        tabBarInactiveTintColor: '#806B5D',
      }}
    >
      <Tab.Screen name="Home" options={{ title: 'Inicio' }}>
        {(props) => (
          <HomeScreen
            {...props}
            items={items}
            onToggleFavorite={onToggleFavorite}
          />
        )}
      </Tab.Screen>

      <Tab.Screen name="Favorites" options={{ title: 'Favoritos' }}>
        {(props) => (
          <FavoritesScreen
            {...props}
            items={items}
            onToggleFavorite={onToggleFavorite}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  const [items, setItems] = useState<Item[]>(MOCK_ITEMS);

  const toggleFavorite = (id: string) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? { ...item, isFavorite: !item.isFavorite }
          : item
      )
    );
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="MainTabs"
          options={{ headerShown: false }}
        >
          {() => (
            <MainTabs
              items={items}
              onToggleFavorite={toggleFavorite}
            />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="Detail"
          options={{ title: 'Detalle del producto' }}
        >
          {(props) => (
            <DetailScreen
              {...props}
              onToggleFavorite={toggleFavorite}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
