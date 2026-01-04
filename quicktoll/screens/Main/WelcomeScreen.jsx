import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Dimensions, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen({ navigation }) {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideUpAnim = React.useRef(new Animated.Value(50)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;
  const logoRotate = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.spring(slideUpAnim, {
        toValue: 0,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(logoRotate, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      })
    ]).start();
  }, []);

  const rotation = logoRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg']
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#0d4780" />
      <SafeAreaView style={styles.safeArea}>
        {/* Gradiente de fondo */}
        <LinearGradient
          colors={['#4A90E2', '#357ABD', '#1a5490', '#0d4780']}
          style={styles.gradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
        />
        
        <View style={styles.content}>
          {/* Logo y título con animación mejorada */}
          <Animated.View 
            style={[
              styles.logoContainer,
              { 
                opacity: fadeAnim,
                transform: [
                  { translateY: slideUpAnim },
                  { scale: scaleAnim }
                ] 
              }
            ]}
          >
            <Animated.View style={[styles.iconWrapper, { transform: [{ rotate: rotation }] }]}>
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={styles.iconGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <Ionicons name="car-sport" size={50} color="#FFFFFF" />
              </LinearGradient>
            </Animated.View>
            
            <View style={styles.titleContainer}>
              <Text style={styles.title}>QuickToll</Text>
              <View style={styles.underline} />
            </View>
            
            <Text style={styles.subtitle}>Viaja sin preocupaciones</Text>
            
            {/* Características destacadas */}
            <View style={styles.featuresContainer}>
              <View style={styles.featureItem}>
                <Ionicons name="flash" size={20} color="#FFD700" />
                <Text style={styles.featureText}>Rápido</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="shield-checkmark" size={20} color="#4CAF50" />
                <Text style={styles.featureText}>Seguro</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="happy" size={20} color="#FF6B6B" />
                <Text style={styles.featureText}>Fácil</Text>
              </View>
            </View>
          </Animated.View>

          {/* Botones mejorados */}
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
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={['#667eea', '#764ba2']}
                style={styles.buttonGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
              >
                <Ionicons name="log-in" size={24} color="#FFFFFF" style={styles.buttonIcon} />
                <Text style={styles.primaryButtonText}>Iniciar Sesión</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.secondaryButton}
              onPress={() => navigation.navigate('SignUpScreen')}
              activeOpacity={0.8}
            >
              <View style={styles.glassButton}>
                <Ionicons name="person-add" size={24} color="#FFFFFF" style={styles.buttonIcon} />
                <Text style={styles.secondaryButtonText}>Crear Cuenta</Text>
              </View>
            </TouchableOpacity>

            {/* Divider con texto */}
            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>O explora como invitado</Text>
              <View style={styles.divider} />
            </View>

            <TouchableOpacity 
              style={styles.guestButton}
              onPress={() => {
                console.log('Continuar como invitado');
              }}
              activeOpacity={0.7}
            >
              <Ionicons name="eye-outline" size={22} color="rgba(255, 255, 255, 0.9)" />
              <Text style={styles.guestButtonText}>Continuar sin cuenta</Text>
            </TouchableOpacity>
          </Animated.View>

          {/* Footer mejorado */}
          <Animated.View 
            style={[
              styles.footer,
              { opacity: fadeAnim }
            ]}
          >
            <View style={styles.footerCard}>
              <Text style={styles.footerText}>
                Al continuar, aceptas nuestros{' '}
                <Text 
                  style={styles.link}
                  onPress={() => navigation.navigate('TermsOfServiceScreen')}
                >
                  Términos de Servicio
                </Text>
                {' '}y{' '}
                <Text 
                  style={styles.link}
                  onPress={() => navigation.navigate('PrivacyPolicyScreen')}
                >
                  Política de Privacidad
                </Text>
              </Text>
            </View>
            
            <View style={styles.versionContainer}>
              <Ionicons name="information-circle-outline" size={14} color="rgba(255, 255, 255, 0.5)" />
              <Text style={styles.versionText}>Versión 1.0.0</Text>
            </View>
          </Animated.View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d4780',
  },
  safeArea: {
    flex: 1,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
  },
  iconWrapper: {
    marginBottom: 20,
  },
  iconGradient: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#667eea',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.6,
    shadowRadius: 15,
    elevation: 10,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 56,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 0, height: 4 },
    textShadowRadius: 15,
  },
  underline: {
    width: 60,
    height: 4,
    backgroundColor: '#667eea',
    borderRadius: 2,
    marginTop: 8,
  },
  subtitle: {
    fontSize: 20,
    color: 'rgba(255, 255, 255, 0.95)',
    marginTop: 8,
    fontWeight: '500',
    letterSpacing: 0.5,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30,
    gap: 20,
  },
  featureItem: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  featureText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 4,
  },
  buttonsContainer: {
    width: '100%',
    marginBottom: 20,
  },
  primaryButton: {
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
    shadowColor: '#667eea',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.5,
    shadowRadius: 12,
    elevation: 10,
  },
  buttonGradient: {
    flexDirection: 'row',
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 10,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  secondaryButton: {
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    marginBottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  glassButton: {
    flexDirection: 'row',
    padding: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  dividerText: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    fontWeight: '500',
    marginHorizontal: 12,
  },
  guestButton: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  guestButtonText: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  footer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  footerCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: 12,
  },
  footerText: {
    color: 'rgba(255, 255, 255, 0.85)',
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 20,
  },
  link: {
    color: '#667eea',
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  versionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  versionText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 12,
    fontWeight: '500',
  },
});