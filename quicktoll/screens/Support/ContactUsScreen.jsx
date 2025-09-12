import {React} from 'react';
import {View, SafeAreaView, Text, StyleSheet} from 'react-native';

 const ContactUsScreen = () => {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <Text style={styles.title}>Contact Us</Text>
                <Text style={styles.description}>If you have any questions, feel free to reach out!</Text>
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

export default ContactUsScreen;
