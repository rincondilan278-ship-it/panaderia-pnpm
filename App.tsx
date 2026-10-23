
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Panadería Dorado</Text>
        <Text style={styles.subtitle}>Ejercicio 02 · Flexbox Layouts</Text>

        {/* LAYOUT 1: Header */}
        <Text style={styles.sectionTitle}>
          1. Header con título y botón
        </Text>

        <View style={styles.header}>
          <Text style={styles.headerTitle}>Inicio</Text>
          <View style={styles.button}>
            <Text style={styles.buttonText}>+ Nuevo</Text>
          </View>
        </View>

        {/* LAYOUT 2: Barra de navegación */}
        <Text style={styles.sectionTitle}>
          2. Barra de navegación
        </Text>

        <View style={styles.tabBar}>
          <Text style={styles.tab}>Inicio</Text>
          <Text style={styles.tab}>Productos</Text>
          <Text style={styles.tab}>Pedidos</Text>
          <Text style={styles.tab}>Perfil</Text>
        </View>

        {/* LAYOUT 3: Tarjeta de usuario */}
        <Text style={styles.sectionTitle}>
          3. Tarjeta de perfil
        </Text>

        <View style={styles.userCard}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/100?img=12' }}
            style={styles.avatar}
          />

          <View style={styles.userInfo}>
            <Text style={styles.userName}>dante raiser</Text>
            <Text style={styles.userDescription}>
              Cliente de Panadería Dorado
            </Text>
          </View>
        </View>

        {/* LAYOUT 4: Pantalla dividida */}
        <Text style={styles.sectionTitle}>
          4. Panel dividido (1:2)
        </Text>

        <View style={styles.splitScreen}>
          <View style={styles.sidePanel}>
            <Text style={styles.panelTitle}>Categorías</Text>
            <Text style={styles.panelText}>flex: 1</Text>
          </View>

          <View style={styles.mainPanel}>
            <Text style={styles.panelTitle}>Nuestros productos</Text>
            <Text style={styles.panelText}>flex: 2</Text>
          </View>
        </View>

        <Text style={styles.footer}>
          Panadería Dorado · Hecho con cariño
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Colores generales
  container: {
    flex: 1,
    backgroundColor: '#FFF8E7',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#5C3218',
  },
  subtitle: {
    fontSize: 16,
    color: '#99704A',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#5C3218',
    marginTop: 22,
    marginBottom: 10,
  },

  // Layout 1
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8D5B5',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5C3218',
  },
  button: {
    backgroundColor: '#B77932',
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },

  // Layout 2
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#5C3218',
    paddingVertical: 20,
    borderRadius: 12,
  },
  tab: {
    fontSize: 12,
    color: '#FFF8E7',
    fontWeight: '600',
  },

  // Layout 3
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8D5B5',
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#E8D5B5',
    marginRight: 14,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#5C3218',
  },
  userDescription: {
    fontSize: 14,
    color: '#99704A',
    marginTop: 5,
  },

  // Layout 4
  splitScreen: {
    flexDirection: 'row',
    height: 190,
    borderRadius: 12,
    overflow: 'hidden',
  },
  sidePanel: {
    flex: 1,
    backgroundColor: '#B77932',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  mainPanel: {
    flex: 2,
    backgroundColor: '#5C3218',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
  },
  panelTitle: {
    color: '#3a2e2e',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  panelText: {
    color: '#FFF8E7',
    marginTop: 8,
  },
  footer: {
    textAlign: 'center',
    color: '#99704A',
    marginTop: 24,
  },
});
