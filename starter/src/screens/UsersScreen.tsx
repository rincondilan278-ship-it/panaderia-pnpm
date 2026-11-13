
import React from 'react';

import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Pressable,
  StyleSheet,
} from 'react-native';

import { useQuery } from '@tanstack/react-query';

import {
  fetchUsers,
  type User,
} from '../services/usersApi';

export default function UsersScreen() {

  // PASO 3: Consultar usuarios con TanStack Query
  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });

  // Estado de carga inicial
  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#A66A35" />

        <Text style={styles.message}>
          Cargando usuarios...
        </Text>
      </View>
    );
  }

  // Estado de error
  if (isError && !data) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorTitle}>
          Error al cargar usuarios
        </Text>

        <Text style={styles.message}>
          {error?.message ?? 'Error desconocido'}
        </Text>

        <Pressable
          style={styles.button}
          onPress={() => void refetch()}
        >
          <Text style={styles.buttonText}>
            Reintentar
          </Text>
        </Pressable>
      </View>
    );
  }

  // Renderizar cada usuario
  const renderUser = ({ item }: { item: User }) => (
    <View style={styles.card}>
      <Text style={styles.name}>
        {item.name}
      </Text>

      <Text style={styles.username}>
        @{item.username}
      </Text>

      <Text style={styles.info}>
        Correo: {item.email}
      </Text>

      <Text style={styles.info}>
        Teléfono: {item.phone}
      </Text>

      <Text style={styles.info}>
        Sitio web: {item.website}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>

      <FlatList
        data={data ?? []}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderUser}

        // PASO 4: Pull-to-refresh
        onRefresh={() => void refetch()}
        refreshing={isFetching && !isLoading}

        contentContainerStyle={styles.list}

        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.brand}>
              PANADERÍA DORADO
            </Text>

            <Text style={styles.title}>
              Usuarios de la API
            </Text>

            <Text style={styles.subtitle}>
              Semana 05 - TanStack Query v5
            </Text>

            <Text style={styles.total}>
              Total de usuarios: {data?.length ?? 0}
            </Text>
          </View>
        }

        ListEmptyComponent={
          <Text style={styles.message}>
            No hay usuarios disponibles.
          </Text>
        }
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
  },

  list: {
    padding: 20,
    paddingTop: 40,
    paddingBottom: 40,
    flexGrow: 1,
  },

  header: {
    alignItems: 'center',
    marginBottom: 25,
  },

  brand: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#B77937',
    letterSpacing: 2,
    marginBottom: 12,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#5D4037',
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 14,
    color: '#8D6E63',
    marginTop: 8,
  },

  total: {
    color: '#A66A35',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 18,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#EAD8C5',
  },

  name: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#5D4037',
  },

  username: {
    fontSize: 14,
    color: '#B77937',
    marginTop: 5,
    marginBottom: 12,
  },

  info: {
    fontSize: 14,
    color: '#795548',
    marginBottom: 6,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF8F0',
    padding: 20,
  },

  message: {
    fontSize: 15,
    color: '#8D6E63',
    marginTop: 15,
    textAlign: 'center',
  },

  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#B94A48',
  },

  button: {
    backgroundColor: '#A66A35',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 10,
    marginTop: 20,
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
