import React, { useState } from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, Alert, TextInput, SafeAreaView} from 'react-native';
import NavigationBar from '../../components/NavigationBar';

const SignUpScreen = ({ navigation }) => {
    const [nombre, setNombre]=useState('');
    const [correo, setCorreo]=useState('');
    const [contraseña, setContraseña]=useState('');
    
    return (
        <SafeAreaView style={styles.safeStyle}>
            <View style={styles.container}>
                <Text style={styles.title}>Registro</Text>
                <View style={styles.container}>
                    <TextInput style={styles.inputs} placeholder="Nombre" value={nombre} onChangeText={setNombre}/>
                    <TextInput style={styles.inputs} placeholder="Correo" value={correo} onChangeText={setCorreo}/>
                    <TextInput style={styles.inputs} placeholder="Contraseña" value={contraseña} secureTextEntry={true} onChangeText={setContraseña}/>
                    <TextInput style={styles.inputs} placeholder="Confirmar Contraseña" secureTextEntry={true} onChangeText={setContraseña}/>
                </View>
                <View style={styles.container}>
                    <TouchableOpacity style={styles.button} onPress={() => Alert.alert('Usuario registrado exitosamente')}>
                        <Text style={styles.buttonText}>Registrarse</Text>
                    </TouchableOpacity>
                </View>
                <Text style={styles.textLink} onPress={() => navigation.replace('LogInScreen')}>¿Ya tienes cuenta?, inicia sesión</Text>
                <NavigationBar/>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeStyle:{
        flex: 1,
        color:'#fff'
    },
    container:{
        //flex:1,
        alignContent: 'center',
        alignItems:'center',
        textAlign: 'center',
        backgroundColor:'#fff'
    },
    container: {
        width: "100%",
        alignItems: "center",
    },
    inputs:{
        width:"90%",
        height:50,
        textAlign:'left',
        backgroundColor:'#E7EDF4',
        borderRadius:7,
        marginVertical:"3%",
        color:'#4C759D',
    },
    title:{
        fontSize:20,
    },
    button:{
        width:"90%",
        height:50,
        backgroundColor:'#3D99F5',
        alignItems:'center',
        justifyContent: 'center',
        borderRadius:7,
        marginTop: "3%",
        marginBottom: "105%"
    },
    buttonText:{
        color:'white',
    },
    textLink:{
        textDecorationLine: 'underline',
        color:"#4E769E",
        marginTop: "3%",
    },
});

export default SignUpScreen;