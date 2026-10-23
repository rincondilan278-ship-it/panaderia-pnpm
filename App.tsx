
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
  useRoute,
} from '@react-navigation/native';

import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
  NativeStackScreenProps,
  NativeStackRouteProp,
} from '@react-navigation/native-stack';

// Tipos de parámetros de las pantallas
type RootStackParamList = {
  Home: undefined;
  Detail: {
    id: string;
    name: string;
  };
};

// Tipado del Stack Navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

// Datos de ejemplo
type Item = {
  id: string;
  name: string;
  description: string;
};

const ITEMS: Item[] = [
  { id: '1', name: 'Pan artesanal', description: 'Pan recién horneado.' },
  { id: '2', name: 'Croissant', description: 'Hojaldre de mantequilla.' },
  { id: '3', name: 'Pan de chocolate', description: 'Pan dulce con chocolate.' },
  { id: '4', name: 'Almojábana', description: 'Producto tradicional de queso.' },
  { id: '5', name: 'Torta de vainilla', description: 'Torta suave y esponjosa.' },
];

// Pantalla principal
function HomeScreen() {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

  const renderItem = ({ item }: { item: Item }) => (
    <Pressable
      style={({ pressed }) => [
        styles.itemCard,
        pressed && styles.itemPressed,
      ]}
      onPress={() => navigation.navigate('Detail', {
        id: item.id,
        name: item.name,
      })}
    >
      <View style={styles.itemNumber}>
        <Text style={styles.itemNumberText}>{item.id}</Text>
      </View>

      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDescription}>{item.description}</Text>
      </View>

      <Text style={styles.arrow}>›</Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF8E7" />

      <View style={styles.container}>
        <Text style={styles.brand}>PANADERÍA DORADO</Text>
        <Text style={styles.title}>Nuestros productos</Text>
        <Text style={styles.subtitle}>
          Selecciona un producto para ver sus detalles.
        </Text>

        <FlatList
          data={ITEMS}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

// Tipado de los parámetros recibidos en Detail
type DetailRouteProp = NativeStackRouteProp<RootStackParamList, 'Detail'>;

// Pantalla de detalle
function DetailScreen({
  navigation,
  route,
}: NativeStackScreenProps<RootStackParamList, 'Detail'>) {
  const { id, name } = route.params;

  return (
    <SafeAreaView style={styles.detailSafeArea}>
      <View style={styles.detailContainer}>
        <Text style={styles.brand}>PANADERÍA DORADO</Text>
        <Text style={styles.detailLabel}>DETALLE DEL PRODUCTO</Text>

        <View style={styles.detailCard}>
          <Text style={styles.detailId}>PRODUCTO N.º {id}</Text>
          <Text style={styles.detailName}>{name}</Text>
          <Text style={styles.detailDescription}>
            Has seleccionado este producto de nuestra panadería.
          </Text>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.backButton,
            pressed && styles.backButtonPressed,
          ]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButtonText}>← Volver</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

// Navegador principal
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#5C3218' },
          headerTintColor: '#FFF8E7',
          headerTitleStyle: { fontWeight: '600' },
          contentStyle: { backgroundColor: '#FFF8E7' },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Inicio' }}
        />

        <Stack.Screen
          name="Detail"
          component={DetailScreen}
          options={({ route }) => ({
            title: route.params.name,
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF8E7',
  },
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 18,
  },
  brand: {
    color: '#B77932',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 8,
  },
  title: {
    color: '#5C3218',
    fontSize: 27,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#99704A',
    fontSize: 14,
    marginTop: 7,
    marginBottom: 20,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8D5B5',
    borderRadius: 12,
    padding: 14,
  },
  itemPressed: {
    opacity: 0.65,
    backgroundColor: '#F3E5CB',
  },
  itemNumber: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#B77932',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  itemNumberText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    color: '#5C3218',
    fontSize: 15,
    fontWeight: 'bold',
  },
  itemDescription: {
    color: '#99704A',
    fontSize: 12,
    marginTop: 4,
  },
  arrow: {
    color: '#B77932',
    fontSize: 28,
    marginLeft: 8,
  },
  separator: {
    height: 10,
  },
  detailSafeArea: {
    flex: 1,
    backgroundColor: '#FFF8E7',
  },
  detailContainer: {
    flex: 1,
    padding: 20,
    paddingTop: 24,
  },
  detailLabel: {
    color: '#99704A',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1.5,
    marginTop: 22,
    marginBottom: 12,
  },
  detailCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8D5B5',
    borderRadius: 16,
    padding: 22,
  },
  detailId: {
    color: '#B77932',
    fontSize: 13,
    fontWeight: 'bold',
  },
  detailName: {
    color: '#5C3218',
    fontSize: 25,
    fontWeight: 'bold',
    marginTop: 12,
  },
  detailDescription: {
    color: '#99704A',
    fontSize: 15,
    lineHeight: 23,
    marginTop: 10,
  },
  backButton: {
    backgroundColor: '#5C3218',
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 22,
  },
  backButtonPressed: {
    opacity: 0.75,
  },
  backButtonText: {
    color: '#FFF8E7',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
