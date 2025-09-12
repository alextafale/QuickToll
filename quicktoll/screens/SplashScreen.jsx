import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { useEffect } from 'react';

export const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('MainApp', { screen: 'SettingsScreen' });
    }, 3500);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
    
      <ImageBackground
        source={require('../assets/logoQUICKTOLL.png')} 
        style={{ flex: 1 }}
      >
      </ImageBackground >
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1},
});

export default SplashScreen;