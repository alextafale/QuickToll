import {React} from 'react'
import {View, Text, StyleSheet} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";

const PaymentsMethodsScreen = () => {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.title}>Payment Methods</Text>
                <Text style={styles.description}>Choose your preferred payment method.</Text>
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

export default PaymentsMethodsScreen;
