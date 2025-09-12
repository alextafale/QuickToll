import {React} from 'react';
import {View, Text, SafeAreaView, TouchableOpacity, StyleSheet,ImageBackground} from 'react-native';
const AddBalancesScreen = () => {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.title}>Add Balances</Text>
                <Text style={styles.description}>Add funds to your account.</Text>
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

export default AddBalancesScreen;
