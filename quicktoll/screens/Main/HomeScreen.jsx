import {View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Image} from 'react-native';
export const HomeScreen = ({navigation}) => {
    return (
        <SafeAreaView >
          <View style={styles.overlay}>
            <Text style={styles.title}>QUICK TOLL</Text>
          </View>
        </SafeAreaView>
    );
}
const styles  = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
});
export default HomeScreen;