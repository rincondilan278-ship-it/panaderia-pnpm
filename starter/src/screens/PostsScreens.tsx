
import React, { useMemo, useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import {
  useQuery,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

import {
  fetchPosts,
  createPost,
  deletePost,
  type Post,
} from '../services/postsApi';

export default function PostsScreen() {
  const queryClient = useQueryClient();

  const [title, setTitle] = useState('');
  const [localPosts, setLocalPosts] = useState<Post[]>([]);
  const [deletedIds, setDeletedIds] = useState<number[]>([]);

  // PASO 1: Consultar publicaciones
  const {
    data,
    isLoading,
    isError,
    error,
    isFetching,
    refetch,
  } = useQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: fetchPosts,
  });

  // PASO 2: Mutación para CREAR
  const createMutation = useMutation({
    mutationFn: createPost,

    onSuccess: async (newPost) => {
      console.log('✅ Mutación CREATE exitosa');

      // Mostrar localmente el nuevo post
      const localPost: Post = {
        ...newPost,
        id: -(Date.now() + Math.floor(Math.random() * 1000)),
      };

      setLocalPosts((previous) => [
        localPost,
        ...previous,
      ]);

      setTitle('');

      console.log('♻️ Invalidando caché de posts...');

      // Volver a consultar el servidor
      await queryClient.invalidateQueries({
        queryKey: ['posts'],
      });

      console.log('✅ Invalidación completada');
    },

    onError: (error) => {
      console.error('❌ Error al crear:', error);
    },
  });

  // PASO 3: Mutación para ELIMINAR
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      // Los posts locales no existen en el servidor.
      if (id > 0) {
        await deletePost(id);
      }

      return id;
    },

    onSuccess: async (id) => {
      console.log('✅ Mutación DELETE exitosa');

      // Eliminar de los posts locales
      setLocalPosts((previous) =>
        previous.filter((post) => post.id !== id)
      );

      // Ocultar también los posts originales eliminados
      setDeletedIds((previous) =>
        previous.includes(id)
          ? previous
          : [...previous, id]
      );

      console.log('♻️ Invalidando caché de posts...');

      await queryClient.invalidateQueries({
        queryKey: ['posts'],
      });

      console.log('✅ Invalidación completada');
    },

    onError: (error) => {
      console.error('❌ Error al eliminar:', error);
    },
  });

  // JSONPlaceholder no conserva las mutaciones.
  // Combinamos la API con cambios locales.
  const posts = useMemo(() => {
    return [...localPosts, ...(data ?? [])].filter(
      (post) => !deletedIds.includes(post.id)
    );
  }, [localPosts, data, deletedIds]);

  // PASO 4: Evitar peticiones duplicadas
  const isBusy =
    createMutation.isPending ||
    deleteMutation.isPending;

  const handleCreate = () => {
    const cleanTitle = title.trim();

    if (!cleanTitle || isBusy) return;

    createMutation.mutate(cleanTitle);
  };

  const handleDelete = (id: number) => {
    if (isBusy) return;

    deleteMutation.mutate(id);
  };

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator
          size="large"
          color="#A66A35"
        />

        <Text style={styles.message}>
          Cargando publicaciones...
        </Text>
      </View>
    );
  }

  if (isError && !data) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>
          No se pudieron cargar los posts.
        </Text>

        <Text style={styles.message}>
          {error?.message}
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

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.list}
        onRefresh={() => void refetch()}
        refreshing={isFetching && !isLoading}

        ListHeaderComponent={
          <>
            <Text style={styles.brand}>
              PANADERÍA DORADO
            </Text>

            <Text style={styles.title}>
              Publicaciones
            </Text>

            <Text style={styles.subtitle}>
              Semana 05 - useMutation
            </Text>

            <View style={styles.card}>
              <Text style={styles.sectionTitle}>
                Crear publicación
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Título del nuevo post..."
                placeholderTextColor="#9E8B7C"
                value={title}
                onChangeText={setTitle}
                editable={!isBusy}
              />

              <Pressable
                style={[
                  styles.button,
                  isBusy && styles.disabled,
                ]}
                disabled={isBusy || !title.trim()}
                onPress={handleCreate}
              >
                <Text style={styles.buttonText}>
                  {createMutation.isPending
                    ? 'Guardando...'
                    : 'Crear post'}
                </Text>
              </Pressable>

              {createMutation.isError && (
                <Text style={styles.error}>
                  Error al crear la publicación.
                </Text>
              )}

              {deleteMutation.isError && (
                <Text style={styles.error}>
                  Error al eliminar la publicación.
                </Text>
              )}
            </View>

            <Text style={styles.sectionTitle}>
              Lista de publicaciones ({posts.length})
            </Text>

            <Text style={styles.note}>
              JSONPlaceholder simula las mutaciones.
              Los cambios se muestran durante esta sesión.
            </Text>
          </>
        }

        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.postTitle}>
              {item.title}
            </Text>

            <Text style={styles.postBody}>
              {item.body}
            </Text>

            <Text style={styles.note}>
              ID: {item.id < 0 ? 'Local' : item.id}
            </Text>

            <Pressable
              style={[
                styles.deleteButton,
                isBusy && styles.disabled,
              ]}
              disabled={isBusy}
              onPress={() => handleDelete(item.id)}
            >
              <Text style={styles.buttonText}>
                {deleteMutation.isPending
                  ? 'Procesando...'
                  : 'Eliminar'}
              </Text>
            </Pressable>
          </View>
        )}

        ListEmptyComponent={
          <Text style={styles.message}>
            No hay publicaciones disponibles.
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
    paddingTop: 35,
    paddingBottom: 50,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF8F0',
    padding: 20,
  },

  brand: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#B77937',
    textAlign: 'center',
  },

  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#5D4037',
    textAlign: 'center',
    marginTop: 10,
  },

  subtitle: {
    fontSize: 14,
    color: '#8D6E63',
    textAlign: 'center',
    marginBottom: 24,
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EAD8C5',
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 19,
    fontWeight: 'bold',
    color: '#5D4037',
    marginBottom: 15,
  },

  input: {
    borderWidth: 1,
    borderColor: '#D9BFA6',
    borderRadius: 10,
    padding: 13,
    color: '#4E342E',
    marginBottom: 14,
  },

  button: {
    backgroundColor: '#A66A35',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
    marginTop: 10,
  },

  deleteButton: {
    backgroundColor: '#B94A48',
    borderRadius: 10,
    padding: 13,
    alignItems: 'center',
    marginTop: 12,
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  disabled: {
    opacity: 0.5,
  },

  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5D4037',
    marginBottom: 10,
  },

  postBody: {
    color: '#795548',
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 12,
  },

  note: {
    color: '#8D6E63',
    fontSize: 12,
    marginBottom: 12,
  },

  message: {
    color: '#8D6E63',
    fontSize: 15,
    textAlign: 'center',
    marginTop: 15,
  },

  error: {
    color: '#B94A48',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
  },
});
