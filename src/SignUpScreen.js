import {View, Text, SafeAreaView, TouchableOpacity, StyleSheet, Image, Alert, TextInput} from 'react-native';

const SignUpScreen = ({ navigation }) => {
    return (
        <SafeAreaView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.tittle}>
                        Unete a Quick Toll
                    </Text>
                </View>
                <View style={styles.inputs}>
                    <TextInput 
                        placeholder='Correo'
                        value='correo'
                    />
                    <TextInput 
                        placeholder='Contraseña'
                        value='contraseña'
                        secureTextEntry={true}
                    />

                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({

});

export default SignUpScreen;