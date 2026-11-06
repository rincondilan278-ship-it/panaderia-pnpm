
import { create } from 'zustand';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

interface TodoStore {
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: string) => void;
}

export const useTodoStore = create<TodoStore>()((set) => ({
  todos: [],

  addTodo: (text) =>
    set((state) => ({
      todos: [
        ...state.todos,
        {
          id: `${Date.now()}-${Math.random()}`,
          text,
          completed: false,
        },
      ],
    })),

  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((todo) => todo.id !== id),
    })),
}));
