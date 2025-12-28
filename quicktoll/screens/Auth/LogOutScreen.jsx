import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen({ navigation }) {
  const handleLogout = () => {
    Alert.alert(
      "Cerrar sesión",
      "¿Estás seguro de que quieres cerrar sesión?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        { 
          text: "Cerrar sesión", 
          onPress: () => navigation.reset({index: 0, routes: [{ name: 'WelcomeScreen' }],}),
          style: "destructive"
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Configuración</Text>
      
      {/* Otras opciones de configuración... */}
      
      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Ionicons name="log-out-outline" size={24} color="#DC2626" />
        <Text style={styles.logoutText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FEF2F2',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FECACA',
    marginTop: 20,
  },
  logoutText: {
    marginLeft: 12,
    color: '#DC2626',
    fontWeight: '600',
    fontSize: 16,
  },
});