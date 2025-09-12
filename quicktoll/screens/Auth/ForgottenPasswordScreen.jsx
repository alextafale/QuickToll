import {React} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, StyleSheet,ImageBackground} from 'react-native';
export function ForgottenPasswordScreen() {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.title}>Forgot Password</Text>
                <Text style={styles.description}>Enter your email to reset your password.</Text>
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

export default ForgottenPasswordScreen;
