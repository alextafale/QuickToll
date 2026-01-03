import {React} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
const HelpCenterScreen = () => {
    return (
        <SafeAreaView>
            <View style={styles.containerMain}>
                <View style ={styles.containerHeader}>
                    <Text style={styles.title}>Help Center</Text>
                    <Text style={styles.description}>How can we assist you today?</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        margin: 16,
    },
});

export default HelpCenterScreen;
