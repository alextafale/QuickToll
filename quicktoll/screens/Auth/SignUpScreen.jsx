import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  TextInput 
} from 'react-native';
import NavigationBar from '../../components/NavigationBar';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../lib/supabase';


const SignUpScreen = ({ navigation }) => {
    const [nombre, setNombre] = useState('');
    const [correo, setCorreo] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [confirmarContraseña, setConfirmarContraseña] = useState('');
    const [secureEntry, setSecureEntry] = useState(true);
    const [secureEntryConfirm, setSecureEntryConfirm] = useState(true);
    const [loading, setLoading] = useState(false);


    const handleEmailSignUp = async () => {
        if (!nombre || !correo || !contraseña || !confirmarContraseña) {
            Alert.alert('Error', 'Completa todos los campos');
            return;
        }

        if (contraseña !== confirmarContraseña) {
            Alert.alert('Error', 'Las contraseñas no coinciden');
            return;
        }

        try {
            setLoading(true);

            const { data, error } = await supabase.auth.signUp({
                email: correo,
                password: contraseña,
                options: {
                    data: { full_name: nombre }
                }
            });

            if (error) throw error;

            navigation.reset({
                index: 0,
                routes: [{ name: 'MainApp' }],
            });

            } catch (err) {
                Alert.alert('Error', err.message);
            } finally {
                setLoading(false);
            }
        };



    return (
        <SafeAreaView style={styles.safeStyle}>
            <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <ScrollView
                    contentContainerStyle={{ flexGrow: 1 }}
                    keyboardShouldPersistTaps="handled"
                    >
                        <View style={styles.container}>
                            <Text style={styles.title}>Registro</Text>
                            
                            <View style={styles.containers}>
                                {/* Campos de nombre, correo, contraseña (igual que antes) */}
                                <View style={styles.inputWrapper}>
                                    <TextInput 
                                        style={styles.inputs} 
                                        placeholder="Nombre" 
                                        placeholderTextColor="#9BB0CB"
                                        value={nombre} 
                                        onChangeText={setNombre}
                                    />
                                </View>

                                <View style={styles.inputWrapper}>
                                    <TextInput 
                                        style={styles.inputs} 
                                        placeholder="Correo" 
                                        placeholderTextColor="#9BB0CB"
                                        value={correo} 
                                        onChangeText={setCorreo}
                                        keyboardType="email-address"
                                        autoCapitalize="none"
                                    />
                                </View>

                                <View style={styles.inputWrapper}>
                                    <TextInput 
                                        style={styles.inputs} 
                                        placeholder="Contraseña" 
                                        placeholderTextColor="#9BB0CB"
                                        value={contraseña} 
                                        secureTextEntry={secureEntry} 
                                        onChangeText={setContraseña}
                                    />
                                    <TouchableOpacity 
                                        style={styles.eyeIcon} 
                                        onPress={() => setSecureEntry(!secureEntry)}
                                    >
                                        <Ionicons 
                                            name={secureEntry ? "eye-off-outline" : "eye-outline"} 
                                            size={20} 
                                            color="#4C759D" 
                                        />
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.inputWrapper}>
                                    <TextInput 
                                        style={styles.inputs} 
                                        placeholder="Confirmar Contraseña" 
                                        placeholderTextColor="#9BB0CB"
                                        value={confirmarContraseña} 
                                        secureTextEntry={secureEntryConfirm} 
                                        onChangeText={setConfirmarContraseña}
                                    />
                                    <TouchableOpacity 
                                        style={styles.eyeIcon} 
                                        onPress={() => setSecureEntryConfirm(!secureEntryConfirm)}
                                    >
                                        <Ionicons 
                                            name={secureEntryConfirm ? "eye-off-outline" : "eye-outline"} 
                                            size={20} 
                                            color="#4C759D" 
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={styles.containers}>
                                <TouchableOpacity 
                                    style={[styles.button, loading && styles.buttonDisabled]} 
                                    onPress={handleEmailSignUp}
                                    disabled={loading}
                                >
                                    <Text style={styles.buttonText}>
                                        {loading ? 'Registrando...' : 'Registrarse'}
                                    </Text>
                                </TouchableOpacity>
                            </View>

                            <Text style={styles.textLink} onPress={() => navigation.replace('LogInScreen')}>
                                ¿Ya tienes cuenta?, Inicia sesión
                            </Text>
                            
                            <NavigationBar/>
                        </View>
                    </ScrollView>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

// Tus estilos existentes se mantienen igual...
const styles = StyleSheet.create({
    safeStyle: {
        flex: 1,
        backgroundColor: '#fff'
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 40,
    },
    containers: {
        width: "100%",
        alignItems: "center",
        marginBottom: 20,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        width: "90%",
        position: 'relative',
        marginVertical: 10,
    },
    inputs: {
        flex: 1,
        height: 50,
        paddingHorizontal: 16,
        paddingRight: 45,
        backgroundColor: '#E7EDF4',
        borderRadius: 7,
        color: '#4C759D',
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#D8E2EE',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#1F2937',
        marginBottom: 30,
    },
    eyeIcon: {
        position: 'absolute',
        right: 15,
        padding: 5,
    },
    button: {
        width: "90%",
        height: 50,
        backgroundColor: '#3D99F5',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        marginTop: 20,
        shadowColor: '#3D99F5',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    googleButton: {
        width: "90%",
        height: 50,
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 7,
        marginTop: 10,
        borderWidth: 1,
        borderColor: '#D8E2EE',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    googleButtonText: {
        color: '#757575',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 10,
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    textLink: {
        textDecorationLine: 'underline',
        color: "#4E769E",
        marginTop: 20,
        marginBottom: 20,
        fontSize: 14,
    },
});

export default SignUpScreen;