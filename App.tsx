import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  StatusBar,
} from 'react-native';
import { StatusBar as ExpoStatusBar } from 'expo-status-bar';

type Section = 'Resumen' | 'Productos' | 'Ingredientes' | 'Pedidos' | 'Proveedores';

const sections: { name: Section; icon: string; description: string }[] = [
  { name: 'Productos', icon: '🥖', description: 'Pan, pasteles y productos listos para vender' },
  { name: 'Ingredientes', icon: '🌾', description: 'Harina, levadura, azúcar y existencias' },
  { name: 'Pedidos', icon: '🧾', description: 'Pedidos pendientes y entregas' },
  { name: 'Proveedores', icon: '🚚', description: 'Contactos y abastecimiento' },
];

const stats = [
  { label: 'Productos', value: '24', icon: '🥐' },
  { label: 'Pedidos hoy', value: '08', icon: '📦' },
  { label: 'Stock bajo', value: '03', icon: '⚠️' },
];

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('Resumen');
  const [following, setFollowing] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#171717" />
      <ExpoStatusBar style="light" />
      <ScrollView contentContainerStyle={styles.screen} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
            <Text style={styles.eyebrow}>PANEL DE CONTROL</Text>
            <Text style={styles.title}>Panadería <Text style={styles.titleAccent}>Dorado</Text></Text>
            <Text style={styles.subtitle}>Resumen de tu negocio</Text>
          </View>
          <View style={styles.logo}><Text style={styles.logoText}>🥐</Text></View>
        </View>

        <View style={styles.profileCard}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/120?img=12' }}
            style={styles.avatar}
            resizeMode="cover"
          />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Administrador</Text>
            <Text style={styles.profileRole}>Gestión de panadería</Text>
            <Text style={styles.profileBio}>Controla tus productos, ingredientes, pedidos y proveedores desde un solo lugar.</Text>
          </View>
          <Pressable
            accessibilityRole="button"
            style={({ pressed }) => [styles.followButton, pressed && styles.buttonPressed, following && styles.followingButton]}
            onPress={() => setFollowing((current) => !current)}
          >
            <Text style={styles.followButtonText}>{following ? 'Siguiendo ✓' : 'Seguir'}</Text>
          </Pressable>
        </View>

        <Text style={styles.sectionHeading}>Indicadores de hoy</Text>
        <View style={styles.statsRow}>
          {stats.map((stat) => (
            <View key={stat.label} style={styles.statCard}>
              <Text style={styles.statIcon}>{stat.icon}</Text>
              <Text style={styles.statNumber}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeading}>Áreas de gestión</Text>
          <Text style={styles.smallLabel}>4 módulos</Text>
        </View>

        <View style={styles.modules}>
          {sections.map((section) => {
            const selected = activeSection === section.name;
            return (
              <Pressable
                key={section.name}
                accessibilityRole="button"
                onPress={() => setActiveSection(section.name)}
                style={({ pressed }) => [
                  styles.moduleCard,
                  selected && styles.moduleCardSelected,
                  pressed && styles.modulePressed,
                ]}
              >
                <View style={styles.moduleTop}>
                  <View style={styles.moduleIcon}><Text style={styles.moduleEmoji}>{section.icon}</Text></View>
                  <Text style={[styles.moduleArrow, selected && styles.moduleArrowSelected]}>↗</Text>
                </View>
                <Text style={styles.moduleTitle}>{section.name}</Text>
                <Text style={styles.moduleDescription}>{section.description}</Text>
                {selected && <Text style={styles.selectedLabel}>SELECCIONADO</Text>}
              </Pressable>
            );
          })}
        </View>

        <View style={styles.notice}>
          <Text style={styles.noticeIcon}>💡</Text>
          <View style={styles.noticeTextWrap}>
            <Text style={styles.noticeTitle}>{activeSection === 'Resumen' ? 'Todo en orden' : `Módulo: ${activeSection}`}</Text>
            <Text style={styles.noticeText}>
              {activeSection === 'Resumen'
                ? 'Selecciona un módulo para explorar las áreas de tu panadería.'
                : `Has seleccionado ${activeSection.toLowerCase()}. Esta versión muestra la interfaz inicial; puedes conectar datos reales en el siguiente paso.`}
            </Text>
          </View>
        </View>

        <Text style={styles.footer}>PANADERÍA DORADO · SISTEMA DE GESTIÓN v1.0</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#171717' },
  screen: { paddingHorizontal: 20, paddingTop: 20, paddingBottom: 36 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 },
  eyebrow: { color: '#D8A85D', fontSize: 10, fontWeight: '800', letterSpacing: 2, marginBottom: 7 },
  title: { color: '#F7F2E9', fontSize: 28, fontWeight: '800', letterSpacing: -0.7 },
  titleAccent: { color: '#D8A85D' },
  subtitle: { color: '#A7A29A', fontSize: 13, marginTop: 5 },
  logo: { width: 54, height: 54, borderRadius: 17, backgroundColor: '#33291D', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#59452A' },
  logoText: { fontSize: 27 },
  profileCard: { backgroundColor: '#242424', borderRadius: 22, padding: 18, borderWidth: 1, borderColor: '#383838', alignItems: 'center', marginBottom: 28 },
  avatar: { width: 84, height: 84, borderRadius: 42, backgroundColor: '#4A4033', marginBottom: 12, borderWidth: 3, borderColor: '#D8A85D' },
  profileInfo: { alignItems: 'center' },
  profileName: { color: '#F7F2E9', fontSize: 20, fontWeight: '800' },
  profileRole: { color: '#D8A85D', fontSize: 12, fontWeight: '700', marginTop: 4 },
  profileBio: { color: '#B8B2A8', fontSize: 12, lineHeight: 18, textAlign: 'center', marginTop: 10, maxWidth: 280 },
  followButton: { marginTop: 15, backgroundColor: '#D8A85D', borderRadius: 12, paddingVertical: 10, paddingHorizontal: 24, minWidth: 120, alignItems: 'center' },
  followingButton: { backgroundColor: '#49684A' },
  buttonPressed: { opacity: 0.7, transform: [{ scale: 0.98 }] },
  followButtonText: { color: '#171717', fontSize: 13, fontWeight: '800' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 },
  sectionHeading: { color: '#F7F2E9', fontSize: 17, fontWeight: '800', marginBottom: 12 },
  smallLabel: { color: '#8D887F', fontSize: 11, marginBottom: 12 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', gap: 10, marginBottom: 28 },
  statCard: { flex: 1, backgroundColor: '#242424', borderRadius: 16, paddingVertical: 14, paddingHorizontal: 8, alignItems: 'center', borderWidth: 1, borderColor: '#343434' },
  statIcon: { fontSize: 19, marginBottom: 7 },
  statNumber: { color: '#F7F2E9', fontSize: 22, fontWeight: '800' },
  statLabel: { color: '#A7A29A', fontSize: 10, marginTop: 4, textAlign: 'center' },
  modules: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 12, marginBottom: 22 },
  moduleCard: { width: '48.2%', minHeight: 156, backgroundColor: '#242424', borderRadius: 18, padding: 14, borderWidth: 1, borderColor: '#343434' },
  moduleCardSelected: { borderColor: '#D8A85D', backgroundColor: '#2B261F' },
  modulePressed: { opacity: 0.8 },
  moduleTop: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 13 },
  moduleIcon: { width: 42, height: 42, borderRadius: 13, backgroundColor: '#33291D', alignItems: 'center', justifyContent: 'center' },
  moduleEmoji: { fontSize: 22 },
  moduleArrow: { color: '#8D887F', fontSize: 19, fontWeight: '700' },
  moduleArrowSelected: { color: '#D8A85D' },
  moduleTitle: { color: '#F7F2E9', fontSize: 15, fontWeight: '800', marginBottom: 6 },
  moduleDescription: { color: '#A7A29A', fontSize: 11, lineHeight: 16 },
  selectedLabel: { color: '#D8A85D', fontSize: 8, fontWeight: '800', letterSpacing: 1, marginTop: 9 },
  notice: { flexDirection: 'row', backgroundColor: '#242424', borderRadius: 16, padding: 15, borderWidth: 1, borderColor: '#383838', marginBottom: 25 },
  noticeIcon: { fontSize: 21, marginRight: 12 },
  noticeTextWrap: { flex: 1 },
  noticeTitle: { color: '#F7F2E9', fontSize: 13, fontWeight: '800', marginBottom: 5 },
  noticeText: { color: '#A7A29A', fontSize: 11, lineHeight: 17 },
  footer: { color: '#68645D', fontSize: 9, textAlign: 'center', letterSpacing: 1.2 },
});
