
import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';

import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { BottomTabParamList, RootStackParamList } from '../navigation/types';
import type { Item } from '../types';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme';

type Props = CompositeScreenProps<
  BottomTabScreenProps<BottomTabParamList, 'Home'>,
  NativeStackScreenProps<RootStackParamList>
>;

type HomeScreenProps = Props & {
  items: Item[];
  onToggleFavorite: (id: string) => void;
};

export default function HomeScreen({
  navigation,
  items,
  onToggleFavorite,
}: HomeScreenProps) {
  const renderItem = ({ item }: { item: Item }) => (
    <View style={styles.card}>
      <Pressable
        onPress={() => navigation.getParent()?.navigate('Detail', { item })}
      >
        <Image source={{ uri: item.image }} style={styles.image} />

        <View style={styles.info}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.price}>
            ${item.price.toLocaleString('es-CO')}
          </Text>
        </View>
      </Pressable>

      <Pressable
        style={styles.favoriteButton}
        onPress={() => onToggleFavorite(item.id)}
      >
        <Text style={styles.favoriteText}>
          {item.isFavorite ? '♥' : '♡'}
        </Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>PANADERÍA DORADO</Text>
      <Text style={styles.subtitle}>Nuestros productos</Text>

      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
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
    marginTop: SPACING.md,
  },
  subtitle: {
    fontSize: TYPOGRAPHY.subtitle,
    color: COLORS.text,
    marginVertical: SPACING.md,
  },
  list: {
    paddingBottom: SPACING.xl,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 14,
    marginBottom: SPACING.md,
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 170,
  },
  info: {
    padding: SPACING.md,
  },
  name: {
    fontSize: 19,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  description: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.textSecondary,
    marginTop: SPACING.xs,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: SPACING.sm,
  },
  favoriteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: COLORS.surface,
    borderRadius: 30,
    paddingHorizontal: 12,
    paddingVertical: 5,
  },
  favoriteText: {
    color: COLORS.favorite,
    fontSize: 25,
  },
});
