
import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
} from 'react-native';

import { useCounterStore } from '../store/counterStore';
import { useTodoStore } from '../store/todoStore';
import type { Todo } from '../store/todoStore';

import StatsPanel from '../components/StatsPanel';

export default function ZustandScreen() {
  const [text, setText] = useState('');

  // Estado global del contador
  const count = useCounterStore((state) => state.count);
  const increment = useCounterStore((state) => state.increment);
  const decrement = useCounterStore((state) => state.decrement);

  // Estado global de tareas
  const todos = useTodoStore((state) => state.todos);
  const addTodo = useTodoStore((state) => state.addTodo);
  const removeTodo = useTodoStore((state) => state.removeTodo);

  const handleAddTodo = () => {
    const cleanText = text.trim();

    if (!cleanText) return;

    addTodo(cleanText);
    setText('');
  };

  const renderTodo = ({ item }: { item: Todo }) => (
    <View style={styles.todoItem}>
      <Text style={styles.todoText}>{item.text}</Text>

      <Pressable
        style={styles.deleteButton}
        onPress={() => removeTodo(item.id)}
      >
        <Text style={styles.deleteText}>Eliminar</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        renderItem={renderTodo}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <>
            <Text style={styles.brand}>PANADERÍA DORADO</Text>

            <Text style={styles.title}>
              Estado Global con Zustand
            </Text>

            <Text style={styles.subtitle}>
              Ejercicio 01 - Store Básico
            </Text>

            {/* CONTADOR */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>
                Contador Global
              </Text>

              <Text style={styles.counter}>{count}</Text>

              <View style={styles.counterRow}>
                <Pressable
                  style={styles.counterButton}
                  onPress={decrement}
                >
                  <Text style={styles.buttonText}>−</Text>
                </Pressable>

                <Pressable
                  style={styles.counterButton}
                  onPress={increment}
                >
                  <Text style={styles.buttonText}>+</Text>
                </Pressable>
              </View>
            </View>

            {/* AGREGAR TAREAS */}
            <View style={styles.card}>
              <Text style={styles.sectionTitle}>
                Lista de Tareas
              </Text>

              <TextInput
                style={styles.input}
                placeholder="Escribe una tarea..."
                placeholderTextColor="#9E8B7C"
                value={text}
                onChangeText={setText}
                onSubmitEditing={handleAddTodo}
              />

              <Pressable
                style={styles.addButton}
                onPress={handleAddTodo}
              >
                <Text style={styles.buttonText}>
                  Agregar tarea
                </Text>
              </Pressable>
            </View>

            {/* ESTADÍSTICAS GLOBALES */}
            <StatsPanel />

            <Text style={styles.listTitle}>
              Mis tareas ({todos.length})
            </Text>
          </>
        }
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No hay tareas registradas todavía.
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

  content: {
    padding: 20,
    paddingTop: 40,
    paddingBottom: 40,
    flexGrow: 1,
  },

  brand: {
    fontSize: 13,
    fontWeight: 'bold',
    letterSpacing: 2,
    color: '#B77937',
    textAlign: 'center',
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
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 25,
  },

  card: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
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

  counter: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#C77B30',
    textAlign: 'center',
    marginBottom: 18,
  },

  counterRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 16,
  },

  counterButton: {
    backgroundColor: '#A66A35',
    width: 70,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },

  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 17,
  },

  input: {
    borderWidth: 1,
    borderColor: '#D9BFA6',
    borderRadius: 10,
    padding: 13,
    fontSize: 16,
    color: '#4E342E',
    backgroundColor: '#FFFDF9',
    marginBottom: 15,
  },

  addButton: {
    backgroundColor: '#A66A35',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },

  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5D4037',
    marginTop: 15,
    marginBottom: 15,
  },

  todoItem: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#EAD8C5',
    gap: 12,
  },

  todoText: {
    fontSize: 16,
    color: '#4E342E',
    flex: 1,
  },

  deleteButton: {
    backgroundColor: '#B94A48',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 8,
  },

  deleteText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  emptyText: {
    textAlign: 'center',
    color: '#8D6E63',
    fontSize: 15,
    marginTop: 20,
  },
});
