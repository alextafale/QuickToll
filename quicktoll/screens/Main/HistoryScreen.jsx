import {React} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, StyleSheet,ImageBackground} from 'react-native';

const HistoryScreen = () => {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.title}>Payment History</Text>
                <Text style={styles.description}>Your past transactions will be listed here.</Text>
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

export default HistoryScreen;
