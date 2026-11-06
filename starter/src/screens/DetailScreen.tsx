
import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ScrollView,
} from 'react-native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamList } from '../navigation/types';
import { COLORS, SPACING, TYPOGRAPHY } from '../theme';

type Props = NativeStackScreenProps<RootStackParamList, 'Detail'> & {
  onToggleFavorite: (id: string) => void;
};

export default function DetailScreen({
  route,
  onToggleFavorite,
}: Props) {
  const { item } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.content}>
        <Text style={styles.name}>{item.name}</Text>

        <Text style={styles.category}>{item.category}</Text>

        <Text style={styles.description}>
          {item.description}
        </Text>

        <Text style={styles.price}>
          ${item.price.toLocaleString('es-CO')}
        </Text>

        <Pressable
          style={styles.button}
          onPress={() => onToggleFavorite(item.id)}
        >
          <Text style={styles.buttonText}>
            {item.isFavorite
              ? '♥ Quitar de favoritos'
              : '♡ Agregar a favoritos'}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  image: {
    width: '100%',
    height: 280,
  },
  content: {
    padding: SPACING.lg,
  },
  name: {
    fontSize: TYPOGRAPHY.title,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  category: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.secondary,
    marginTop: SPACING.sm,
  },
  description: {
    fontSize: TYPOGRAPHY.body,
    color: COLORS.text,
    marginTop: SPACING.lg,
    lineHeight: 24,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginTop: SPACING.lg,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: SPACING.md,
    borderRadius: 12,
    marginTop: SPACING.xl,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: TYPOGRAPHY.body,
    fontWeight: 'bold',
  },
});
