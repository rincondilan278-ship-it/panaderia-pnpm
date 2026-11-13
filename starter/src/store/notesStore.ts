
import { create } from 'zustand';
import {
  persist,
  createJSONStorage,
} from 'zustand/middleware';

import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Note {
  id: string;
  text: string;
}

interface NotesStore {
  notes: Note[];
  isLoading: boolean;

  addNote: (text: string) => void;
  removeNote: (id: string) => void;
  setHydrated: (value: boolean) => void;
}

type PersistedNotes = Pick<NotesStore, 'notes'>;

export const useNotesStore = create<NotesStore>()(
  persist<NotesStore, [], [], PersistedNotes>(
    (set) => ({
      notes: [],
      isLoading: true,

      // Agregar una nota
      addNote: (text) =>
        set((state) => ({
          notes: [
            ...state.notes,
            {
              id: `${Date.now()}-${Math.random()}`,
              text,
            },
          ],
        })),

      // Eliminar una nota
      removeNote: (id) =>
        set((state) => ({
          notes: state.notes.filter(
            (note) => note.id !== id
          ),
        })),

      // Detectar cuando termina la carga
      setHydrated: (value) =>
        set({ isLoading: !value }),
    }),

    {
      // PASO 1: Persist middleware
      name: 'panaderia-week4-notes-storage',

      storage: createJSONStorage(() => AsyncStorage),

      // PASO 2: Guardar únicamente las notas
      partialize: (state) => ({
        notes: state.notes,
      }),

      // PASO 3: Detectar rehidratación
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.error(
            'Error al cargar las notas:',
            error
          );
        }

        state?.setHydrated(true);
      },
    }
  )
);
