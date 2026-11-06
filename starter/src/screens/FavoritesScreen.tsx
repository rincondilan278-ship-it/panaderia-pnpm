
import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';

import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

import type { BottomTabParamList } from '../navigation/types';
import type { Item } from '../types';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme';

type Props = BottomTabScreenProps<BottomTabParamList, 'Favorites'> & {
  items: Item[];
  onToggleFavorite: (id: string) => void;
};

export default function FavoritesScreen({
  navigation,
  items,
  onToggleFavorite,
}: Props) {
  const favorites = items.filter((item) => item.isFavorite);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mis favoritos ♥</Text>

      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ListEmptyComponent={
          <Text style={styles.empty}>
            Todavía no tienes productos favoritos.
          </Text>
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Pressable
              style={styles.product}
              onPress={() =>
                navigation.getParent()?.navigate('Detail', { item })
              }
            >
              <Image
                source={{ uri: item.image }}
                style={styles.image}
              />

              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.price}>
                  ${item.price.toLocaleString('es-CO')}
                </Text>
              </View>
            </Pressable>

            <Pressable
              onPress={() => onToggleFavorite(item.id)}
              style={styles.remove}
            >
              <Text style={styles.removeText}>♥</Text>
            </Pressable>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: SPACING.md,
  },
  header: {
    fontSize: TYPOGRAPHY.title,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginVertical: SPACING.md,
  },
  list: {
    paddingBottom: SPACING.xl,
    flexGrow: 1,
  },
  empty: {
    textAlign: 'center',
    color: COLORS.textSecondary,
    marginTop: SPACING.xl,
    fontSize: TYPOGRAPHY.body,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 12,
    marginBottom: SPACING.md,
    padding: SPACING.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  product: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 85,
    height: 85,
    borderRadius: 10,
  },
  info: {
    flex: 1,
    marginLeft: SPACING.md,
  },
  name: {
    fontSize: TYPOGRAPHY.body,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  price: {
    color: COLORS.primary,
    fontWeight: 'bold',
    marginTop: SPACING.sm,
  },
  remove: {
    padding: SPACING.sm,
  },
  removeText: {
    color: COLORS.favorite,
    fontSize: 25,
  },
});
