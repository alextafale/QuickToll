import {React} from 'react';
import {View, SafeAreaView, Text, StyleSheet} from 'react-native';

const HelpCenterScreen = () => {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.title}>Help Center</Text>
                <Text style={styles.description}>How can we assist you today?</Text>
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
