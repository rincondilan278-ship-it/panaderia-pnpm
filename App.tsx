
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  Pressable,
  StyleSheet,
  StatusBar,
} from 'react-native';

import {
  NavigationContainer,
  useNavigation,
} from '@react-navigation/native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Tipos de navegación
type Product = {
  id: string;
  name: string;
  price: string;
};

type HomeStackParamList = {
  HomeList: undefined;
  HomeDetail: { id: string; name: string; price: string };
};

type TabParamList = {
  Home: undefined;
  Favorites: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();

const PRODUCTS: Product[] = [
  { id: '1', name: 'Pan artesanal', price: '$3.000' },
  { id: '2', name: 'Croissant', price: '$4.000' },
  { id: '3', name: 'Pan de chocolate', price: '$5.000' },
  { id: '4', name: 'Almojábana', price: '$2.000' },
  { id: '5', name: 'Torta de vainilla', price: '$6.000' },
];

// Pantalla de inicio: lista de productos
function HomeScreen() {
  const navigation =
    useNavigation<NativeStackScreenProps<HomeStackParamList, 'HomeList'>['navigation']>();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Panadería Dorado</Text>
      <Text style={styles.subtitle}>Nuestros productos</Text>

      <FlatList
        data={PRODUCTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable
            style={({ pressed }) => [
              styles.productCard,
              pressed && styles.pressed,
            ]}
            onPress={() =>
              navigation.navigate('HomeDetail', {
                id: item.id,
                name: item.name,
                price: item.price,
              })
            }
          >
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.price}>{item.price}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#5C3218" />
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

// Pantalla de detalle
type DetailProps = NativeStackScreenProps<
  HomeStackParamList,
  'HomeDetail'
>;

function DetailScreen({ route, navigation }: DetailProps) {
  const { id, name, price } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.detailCard}>
        <Ionicons name="fast-food-outline" size={64} color="#B77932" />
        <Text style={styles.detailTitle}>{name}</Text>
        <Text style={styles.detailText}>Código del producto: {id}</Text>
        <Text style={styles.detailPrice}>{price}</Text>

        <Pressable
          style={styles.button}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.buttonText}>Volver a Inicio</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

// Stack propio del tab Inicio
function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeList" component={HomeScreen} />
      <Stack.Screen name="HomeDetail" component={DetailScreen} />
    </Stack.Navigator>
  );
}

// Pantalla de Favoritos
function FavoritesScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.heading}>Mis favoritos</Text>
      <View style={styles.emptyCard}>
        <Ionicons name="heart-outline" size={56} color="#B77932" />
        <Text style={styles.emptyTitle}>Tus favoritos aparecerán aquí</Text>
        <Text style={styles.subtitle}>
          Esta sección es independiente de Inicio.
        </Text>
      </View>
    </SafeAreaView>
  );
}

// Navegación principal con tabs
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#5C3218" />

      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            const iconName =
              route.name === 'Home'
                ? focused
                  ? 'home'
                  : 'home-outline'
                : focused
                  ? 'heart'
                  : 'heart-outline';

            return (
              <Ionicons
                name={iconName as keyof typeof Ionicons.glyphMap}
                size={size}
                color={color}
              />
            );
          },
          tabBarActiveTintColor: '#B77932',
          tabBarInactiveTintColor: '#8C8176',
          tabBarStyle: {
            backgroundColor: '#FFF8E7',
            borderTopColor: '#E8D5B5',
            height: 64,
            paddingTop: 6,
            paddingBottom: 6,
          },
          tabBarLabelStyle: {
            fontWeight: 'bold',
          },
        })}
      >
        <Tab.Screen
          name="Home"
          component={HomeStack}
          options={{ title: 'Inicio' }}
        />
        <Tab.Screen
          name="Favorites"
          component={FavoritesScreen}
          options={{ title: 'Favoritos' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E7',
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5C3218',
    marginTop: 20,
    marginHorizontal: 20,
  },
  subtitle: {
    fontSize: 15,
    color: '#8C6B50',
    marginTop: 6,
    marginHorizontal: 20,
  },
  list: {
    padding: 16,
    gap: 12,
  },
  productCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#E8D5B5',
  },
  productInfo: {
    flex: 1,
    gap: 5,
  },
  productName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#5C3218',
  },
  price: {
    fontSize: 15,
    color: '#B77932',
    fontWeight: '600',
  },
  pressed: {
    opacity: 0.65,
  },
  detailCard: {
    margin: 20,
    padding: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    alignItems: 'center',
    gap: 16,
    borderWidth: 1,
    borderColor: '#E8D5B5',
  },
  detailTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#5C3218',
    textAlign: 'center',
  },
  detailText: {
    fontSize: 16,
    color: '#8C6B50',
  },
  detailPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#B77932',
  },
  button: {
    backgroundColor: '#5C3218',
    paddingVertical: 13,
    paddingHorizontal: 22,
    borderRadius: 10,
    marginTop: 8,
  },
  buttonText: {
    color: '#FFF8E7',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyCard: {
    margin: 20,
    padding: 28,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    gap: 14,
    borderWidth: 1,
    borderColor: '#E8D5B5',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5C3218',
    textAlign: 'center',
  },
});
