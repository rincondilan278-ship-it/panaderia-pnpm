
import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNotesStore } from '../store/notesStore';

const STORAGE_KEY = 'panaderia-week4-notes-storage';

export default function NotesScreen() {
  const [text, setText] = useState('');
  const [savedCount, setSavedCount] = useState<number | null>(null);
  const [savedFields, setSavedFields] = useState('Sin consultar');

  const notes = useNotesStore((state) => state.notes);
  const isLoading = useNotesStore((state) => state.isLoading);
  const addNote = useNotesStore((state) => state.addNote);
  const removeNote = useNotesStore((state) => state.removeNote);

  const handleAddNote = () => {
    const cleanText = text.trim();

    if (!cleanText) return;

    addNote(cleanText);
    setText('');
  };

  const checkStorage = async () => {
    try {
      const rawData = await AsyncStorage.getItem(STORAGE_KEY);

      if (!rawData) {
        setSavedCount(0);
        setSavedFields('Ninguno');
        return;
      }

      const parsed = JSON.parse(rawData);
      const storedState = parsed.state ?? {};

      const count = Array.isArray(storedState.notes)
        ? storedState.notes.length
        : 0;

      setSavedCount(count);
      setSavedFields(
        Object.keys(storedState).join(', ') || 'Ninguno'
      );
    } catch (error) {
      console.error('Error al consultar AsyncStorage:', error);
      setSavedCount(null);
      setSavedFields('Error al consultar');
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>
          Cargando notas guardadas...
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.brand}>
        PANADERÍA DORADO
      </Text>

      <Text style={styles.title}>
        Notas Persistentes
      </Text>

      <Text style={styles.subtitle}>
        Ejercicio 02 - Zustand + AsyncStorage
      </Text>

      {/* AGREGAR NOTAS */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          Nueva Nota
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Escribe una nota..."
          placeholderTextColor="#9E8B7C"
          value={text}
          onChangeText={setText}
          onSubmitEditing={handleAddNote}
        />

        <Pressable
          style={styles.button}
          onPress={handleAddNote}
        >
          <Text style={styles.buttonText}>
            Guardar nota
          </Text>
        </Pressable>
      </View>

      {/* LISTA DE NOTAS */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          Mis Notas ({notes.length})
        </Text>

        {notes.length === 0 ? (
          <Text style={styles.emptyText}>
            No tienes notas guardadas.
          </Text>
        ) : (
          notes.map((note) => (
            <View key={note.id} style={styles.noteItem}>
              <Text style={styles.noteText}>
                {note.text}
              </Text>

              <Pressable
                style={styles.deleteButton}
                onPress={() => removeNote(note.id)}
              >
                <Text style={styles.buttonText}>
                  Eliminar
                </Text>
              </Pressable>
            </View>
          ))
        )}
      </View>

      {/* VERIFICAR PERSISTENCIA */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          Verificar AsyncStorage
        </Text>

        <Text style={styles.info}>
          Datos guardados: {savedCount ?? 'Sin consultar'}
        </Text>

        <Text style={styles.info}>
          Campos persistidos: {savedFields}
        </Text>

        <Text style={styles.info}>
          Rehidratación: Completada
        </Text>

        <Pressable
          style={styles.button}
          onPress={checkStorage}
        >
          <Text style={styles.buttonText}>
            Verificar datos guardados
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8F0',
  },

  content: {
    padding: 20,
    paddingTop: 45,
    paddingBottom: 50,
  },

  brand: {
    fontSize: 13,
    fontWeight: 'bold',
    color: '#B77937',
    letterSpacing: 2,
    textAlign: 'center',
  },

  title: {
    fontSize: 27,
    fontWeight: 'bold',
    color: '#5D4037',
    textAlign: 'center',
    marginTop: 12,
  },

  subtitle: {
    fontSize: 14,
    color: '#8D6E63',
    textAlign: 'center',
    marginBottom: 25,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: '#EAD8C5',
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
    fontSize: 16,
    color: '#4E342E',
    marginBottom: 15,
  },

  button: {
    backgroundColor: '#A66A35',
    borderRadius: 10,
    padding: 14,
    alignItems: 'center',
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  noteItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EFE0D0',
  },

  noteText: {
    flex: 1,
    fontSize: 16,
    color: '#4E342E',
  },

  deleteButton: {
    backgroundColor: '#B94A48',
    borderRadius: 8,
    padding: 10,
  },

  emptyText: {
    fontSize: 15,
    color: '#8D6E63',
    textAlign: 'center',
    marginVertical: 15,
  },

  info: {
    fontSize: 14,
    color: '#795548',
    marginBottom: 12,
  },

  loadingContainer: {
    flex: 1,
    backgroundColor: '#FFF8F0',
    justifyContent: 'center',
    alignItems: 'center',
  },

  loadingText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#A66A35',
  },
});
