import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";


export default function WelcomeScreen({ navigation }) {
  // Animaciones para los botones
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideUpAnim = React.useRef(new Animated.Value(50)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideUpAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={require('../../assets/LOGO.jpg')} // Cambia por tu imagen de fondo
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Overlay semi-transparente */}
        <View style={styles.overlay} />
        
        <View style={styles.content}>
          {/* Logo y título */}
          <Animated.View 
            style={[
              styles.logoContainer,
              { 
                opacity: fadeAnim,
                transform: [{ translateY: slideUpAnim }] 
              }
            ]}
          >
            <Ionicons name="car-sport" size={80} color="#FFFFFF" />
            <Text style={styles.title}>QuickToll</Text>
            <Text style={styles.subtitle}>Viaja sin preocupaciones</Text>
          </Animated.View>

          {/* Botones */}
          <Animated.View 
            style={[
              styles.buttonsContainer,
              { 
                opacity: fadeAnim,
                transform: [{ translateY: slideUpAnim }] 
              }
            ]}
          >
            <TouchableOpacity 
              style={styles.primaryButton}
              onPress={() => navigation.navigate('LogInScreen')}
            >
              <Text style={styles.primaryButtonText}>Iniciar Sesión</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.secondaryButton}
              onPress={() => navigation.navigate('SignUpScreen')}
            >
              <Text style={styles.secondaryButtonText}>Crear Cuenta</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Footer */}
          <Animated.View 
            style={[
              styles.footer,
              { opacity: fadeAnim }
            ]}
          >
            <Text style={styles.footerText}>
              Al continuar, aceptas nuestros{' '}
              <Text style={styles.link}>Términos de Servicio</Text> y{' '}
              <Text style={styles.link}>Política de Privacidad</Text>
            </Text>
          </Animated.View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 60,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 16,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    marginTop: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  buttonsContainer: {
    width: '100%',
    marginBottom: 80,
  },
  primaryButton: {
    backgroundColor: '#3D99F5',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    backdropFilter: 'blur(10px)',
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    fontSize: 12,
    lineHeight: 18,
  },
  link: {
    color: '#3D99F5',
    fontWeight: '500',
    textDecorationLine: 'underline',
  },
});