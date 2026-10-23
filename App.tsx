
import React, { useCallback, useState } from 'react';
import {
  SafeAreaView,
  FlatList,
  View,
  Text,
  Pressable,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
} from 'react-native';

type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
};

const PRODUCTS: Product[] = [
  { id: '1', name: 'Pan campesino', category: 'Panes', price: 3000 },
  { id: '2', name: 'Croissant', category: 'Pastelería', price: 4500 },
  { id: '3', name: 'Pan de chocolate', category: 'Panes', price: 5000 },
  { id: '4', name: 'Torta de vainilla', category: 'Tortas', price: 35000 },
  { id: '5', name: 'Galletas de mantequilla', category: 'Galletas', price: 2500 },
  { id: '6', name: 'Pan integral', category: 'Panes', price: 4000 },
  { id: '7', name: 'Dona glaseada', category: 'Pastelería', price: 3500 },
  { id: '8', name: 'Muffin de chocolate', category: 'Pastelería', price: 4000 },
  { id: '9', name: 'Torta de zanahoria', category: 'Tortas', price: 6000 },
  { id: '10', name: 'Pan de queso', category: 'Panes', price: 3000 },
  { id: '11', name: 'Brownie', category: 'Postres', price: 4500 },
  { id: '12', name: 'Milhoja', category: 'Postres', price: 5500 },
];

export default function App() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = useCallback(async () => {
    if (isRefreshing) return;

    setIsRefreshing(true);

    await new Promise<void>((resolve) => {
      setTimeout(resolve, 1200);
    });

    setIsRefreshing(false);
  }, [isRefreshing]);

  const renderItem = ({ item }: { item: Product }) => (
    <Pressable
      style={({ pressed }) => [
        styles.item,
        pressed && styles.itemPressed,
      ]}
      onPress={() => console.log('Seleccionado:', item.name)}
    >
      <View style={styles.itemContent}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemCategory}>{item.category}</Text>
      </View>

      <Text style={styles.itemPrice}>
        ${item.price.toLocaleString('es-CO')}
      </Text>
    </Pressable>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF8E7" />

      <FlatList
        style={styles.list}
        contentContainerStyle={styles.listContent}
        data={PRODUCTS}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        ListHeaderComponent={
          <View style={styles.listHeader}>
            <Text style={styles.brand}>PANADERÍA DORADO</Text>
            <Text style={styles.title}>Catálogo de Productos</Text>
            <Text style={styles.subtitle}>
              Descubre nuestros productos recién horneados
            </Text>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No hay productos disponibles
            </Text>
          </View>
        }
        refreshing={isRefreshing}
        onRefresh={handleRefresh}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        ListFooterComponent={
          <Text style={styles.footer}>
            Panadería Dorado · Hecho con cariño
          </Text>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E7',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 18,
    paddingBottom: 30,
  },
  listHeader: {
    backgroundColor: '#FFF8E7',
    paddingTop: 22,
    paddingBottom: 18,
    borderBottomWidth: 2,
    borderBottomColor: '#E8D5B5',
    marginBottom: 8,
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
    fontSize: 25,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#99704A',
    fontSize: 14,
    marginTop: 8,
    lineHeight: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8D5B5',
  },
  itemPressed: {
    opacity: 0.55,
    backgroundColor: '#F3E5CB',
  },
  itemContent: {
    flex: 1,
    marginRight: 12,
  },
  itemName: {
    color: '#5C3218',
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemCategory: {
    color: '#99704A',
    fontSize: 13,
    marginTop: 5,
  },
  itemPrice: {
    color: '#8B5A24',
    fontSize: 15,
    fontWeight: 'bold',
  },
  separator: {
    height: 10,
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  emptyText: {
    color: '#99704A',
    fontSize: 15,
    textAlign: 'center',
  },
  footer: {
    color: '#99704A',
    textAlign: 'center',
    marginTop: 24,
    marginBottom: 10,
    fontSize: 12,
  },
});
