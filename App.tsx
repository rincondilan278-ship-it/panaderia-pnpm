
import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  StatusBar,
} from 'react-native';

type Contact = {
  id: string;
  name: string;
  phone: string;
};

const CONTACTS: Contact[] = [
  { id: '1', name: 'Ana Martínez', phone: '3001234567' },
  { id: '2', name: 'Carlos Rodríguez', phone: '3102345678' },
  { id: '3', name: 'Laura Gómez', phone: '3203456789' },
  { id: '4', name: 'Daniel Pérez', phone: '3014567890' },
  { id: '5', name: 'María Fernández', phone: '3155678901' },
  { id: '6', name: 'Andrés López', phone: '3006789012' },
  { id: '7', name: 'Sofía Ramírez', phone: '3117890123' },
  { id: '8', name: 'Juan Torres', phone: '3218901234' },
  { id: '9', name: 'Valentina Castro', phone: '3029012345' },
  { id: '10', name: 'Mateo Herrera', phone: '3160123456' },
  { id: '11', name: 'Isabella Moreno', phone: '3121234567' },
  { id: '12', name: 'Sebastián Díaz', phone: '3222345678' },
];

export default function App() {
  // PASO 1: Estado controlado del buscador
  const [query, setQuery] = useState<string>('');

  // PASO 2: Filtrar contactos con useMemo
  const filteredContacts = useMemo(() => {
    const search = query.trim().toLowerCase();

    if (!search) {
      return CONTACTS;
    }

    return CONTACTS.filter(
      (contact) =>
        contact.name.toLowerCase().includes(search) ||
        contact.phone.includes(search)
    );
  }, [query]);

  // PASO 3: Renderizar cada contacto
  const renderItem = ({ item }: { item: Contact }) => (
    <Pressable
      style={({ pressed }) => [
        styles.contactCard,
        pressed && styles.contactPressed,
      ]}
      onPress={() => {
        Keyboard.dismiss();
        console.log('Contacto seleccionado:', item.name);
      }}
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {item.name.charAt(0).toUpperCase()}
        </Text>
      </View>

      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactPhone}>{item.phone}</Text>
      </View>

      <Text style={styles.arrow}>›</Text>
    </Pressable>
  );

  // PASO 3: Estado vacío personalizado
  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyIcon}>⌕</Text>
      <Text style={styles.emptyText}>
        Sin resultados para "{query}"
      </Text>
      <Text style={styles.emptySubText}>
        Intenta con otro nombre o número.
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFF8E7" />

      {/* PASO 4: Control del teclado */}
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback
          onPress={Keyboard.dismiss}
          accessible={false}
        >
          <View style={styles.inner}>
            <View style={styles.header}>
              <Text style={styles.brand}>PANADERÍA DORADO</Text>
              <Text style={styles.title}>Contactos</Text>
              <Text style={styles.subtitle}>
                Encuentra rápidamente a quien buscas.
              </Text>

              {/* PASO 1: TextInput controlado */}
              <TextInput
                style={styles.searchInput}
                placeholder="Buscar por nombre o teléfono..."
                placeholderTextColor="#99704A"
                value={query}
                onChangeText={setQuery}
                keyboardType="default"
                returnKeyType="search"
                clearButtonMode="while-editing"
                autoCorrect={false}
                autoCapitalize="none"
                accessibilityLabel="Buscar contactos"
              />

              <Text style={styles.resultCount}>
                {filteredContacts.length}{' '}
                {filteredContacts.length === 1
                  ? 'contacto encontrado'
                  : 'contactos encontrados'}
              </Text>
            </View>

            {/* Lista filtrada */}
            <FlatList
              style={styles.list}
              contentContainerStyle={[
                styles.listContent,
                filteredContacts.length === 0 && styles.emptyListContent,
              ]}
              data={filteredContacts}
              keyExtractor={(item) => item.id}
              renderItem={renderItem}
              ItemSeparatorComponent={() => (
                <View style={styles.separator} />
              )}
              ListEmptyComponent={renderEmpty}
              keyboardShouldPersistTaps="handled"
              keyboardDismissMode={
                Platform.OS === 'ios' ? 'interactive' : 'on-drag'
              }
              showsVerticalScrollIndicator={false}
            />

            <Text style={styles.footer}>
              Panadería Dorado · Semana 02
            </Text>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFF8E7',
  },
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    paddingHorizontal: 18,
  },
  header: {
    backgroundColor: '#FFF8E7',
    paddingTop: 18,
    paddingBottom: 14,
  },
  brand: {
    color: '#B77932',
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 2,
    marginBottom: 8,
  },
  title: {
    color: '#5C3218',
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#99704A',
    fontSize: 14,
    marginTop: 6,
    marginBottom: 18,
  },
  searchInput: {
    backgroundColor: '#FFFFFF',
    color: '#5C3218',
    borderWidth: 1,
    borderColor: '#D8B98A',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 13,
    fontSize: 15,
  },
  resultCount: {
    color: '#99704A',
    fontSize: 12,
    marginTop: 12,
    fontWeight: '600',
  },
  list: {
    flex: 1,
  },
  listContent: {
    paddingTop: 4,
    paddingBottom: 12,
    flexGrow: 1,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E8D5B5',
    borderRadius: 12,
    padding: 13,
  },
  contactPressed: {
    opacity: 0.55,
    backgroundColor: '#F3E5CB',
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#B77932',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    color: '#5C3218',
    fontSize: 15,
    fontWeight: 'bold',
  },
  contactPhone: {
    color: '#99704A',
    fontSize: 13,
    marginTop: 4,
  },
  arrow: {
    color: '#B77932',
    fontSize: 28,
    marginLeft: 8,
  },
  separator: {
    height: 9,
  },
  emptyListContent: {
    justifyContent: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8D5B5',
    padding: 25,
  },
  emptyIcon: {
    color: '#B77932',
    fontSize: 42,
    marginBottom: 8,
  },
  emptyText: {
    color: '#5C3218',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  emptySubText: {
    color: '#99704A',
    fontSize: 13,
    textAlign: 'center',
    marginTop: 8,
  },
  footer: {
    color: '#99704A',
    fontSize: 11,
    textAlign: 'center',
    paddingTop: 10,
    paddingBottom: 8,
  },
});
