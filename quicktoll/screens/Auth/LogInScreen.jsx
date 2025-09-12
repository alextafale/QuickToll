import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LogInScreen({navigation}) {

  const [correo, setCorreo] = useState('');
  const [contraseña, setContraseña] = useState('');

  const handleLogin = async () => {
    // Aquí irá la lógica de autenticación con backend
    // Si es exitoso:
    navigation.replace('HomeScreen'); 
  };

  return (
    <SafeAreaView style={styles.safeStyle}>
      <View style={styles.container}>
        <Text style={styles.brandName}>QuickToll</Text>
        <Text style={styles.textBack}>Bienvenido</Text>
        <View style={styles.inputsContainer}>
          <TextInput
            placeholder="Email"
            value={correo}
            style={styles.inputs}
            onChangeText={setCorreo}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Contraseña"
            value={contraseña}
            style={styles.inputs}
            secureTextEntry={true}
            onChangeText={setContraseña}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={handleLogin} style={styles.button}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>
        </View>
        <Button
          style={styles.button}
          onPress={() => navigation.replace('SignUpScreen')}
          title="¿No tienes cuenta? Regístrate"
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeStyle: {
    flex: 1,
    backgroundColor: '#fff', 
  },
  brandName: {
    marginBottom: "3%",
    fontSize: 17,
    fontWeight: 'bold',
    color: '#3D99F5',
  },
  textBack: {
    fontSize: 20,
    marginVertical: "3%",
    fontWeight: '600',
  },
  inputs: {
    width: "90%",
    height: 50,
    paddingHorizontal: 16, //Para que el texto no toque el borde
    backgroundColor: '#E7EDF4',
    borderRadius: 7,
    marginVertical: "3%",
    color: '#4C759D',
    fontSize: 16,
  },
  inputsContainer: {
    width: "100%",
    alignItems: "center",
  },
  container: {
    flex: 1, // Para que ocupe todo el espacio disponible
    justifyContent: 'center', // Centrado vertical
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
  alignContent: "center",
  marginTop: "2%",
  color: 'white',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  }
});