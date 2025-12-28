import { View, StyleSheet, Platform, ImageBackground, StatusBar } from 'react-native';
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../lib/supabase';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    let mounted = true;

    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!mounted) return;

      if (session) {
        navigation.reset({
          index: 0,
          routes: [{ name: 'MainApp' }],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: 'WelcomeScreen' }],
        });
      }
    };

    checkSession();

    return () => {
      mounted = false;
    };
  }, []);


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
      />
      <View style={styles.container}>
        <ImageBackground
          source={require('../assets/LOGO.jpg')}
          style={styles.imageBackground}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
  },
});

export default SplashScreen;
