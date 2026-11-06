
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { useTodoStore } from '../store/todoStore';

export default function StatsPanel() {
  const totalTodos = useTodoStore(
    (state) => state.todos.length
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Estadísticas</Text>

      <Text style={styles.number}>
        {totalTodos}
      </Text>

      <Text style={styles.description}>
        Total de tareas registradas
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF3E0',
    borderRadius: 16,
    padding: 20,
    marginVertical: 16,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5C7A9',
  },

  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5D4037',
    marginBottom: 10,
  },

  number: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#C77B30',
  },

  description: {
    fontSize: 14,
    color: '#795548',
    marginTop: 5,
  },
});
