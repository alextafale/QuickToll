import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';

const ChangePasswordScreen = ({ navigation }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleChangePassword = () => {
        // Validaciones
        if (!currentPassword || !newPassword || !confirmPassword) {
            Alert.alert('Error', 'Por favor completa todos los campos');
            return;
        }

        if (newPassword.length < 6) {
            Alert.alert('Error', 'La nueva contraseña debe tener al menos 6 caracteres');
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'Las contraseñas no coinciden');
            return;
        }

        // Aquí iría la lógica para cambiar la contraseña
        Alert.alert(
            'Éxito',
            'Contraseña cambiada correctamente',
            [
                {
                    text: 'OK',
                    onPress: () => navigation.goBack()
                }
            ]
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoid}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.header}>
                        <TouchableOpacity 
                            onPress={() => navigation.goBack()} 
                            style={styles.backButton}
                        >
                            <Ionicons name="arrow-back" size={24} color="#333" />
                        </TouchableOpacity>
                        <Text style={styles.title}>Cambiar Contraseña</Text>
                        <View style={styles.placeholder} />
                    </View>

                    <View style={styles.formContainer}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Contraseña actual</Text>
                            <View style={styles.passwordInputContainer}>
                                <TextInput
                                    style={styles.passwordInput}
                                    placeholder="Ingresa tu contraseña actual"
                                    secureTextEntry={!showCurrentPassword}
                                    value={currentPassword}
                                    onChangeText={setCurrentPassword}
                                    autoCapitalize="none"
                                />
                                <TouchableOpacity 
                                    onPress={() => setShowCurrentPassword(!showCurrentPassword)}
                                    style={styles.eyeIcon}
                                >
                                    <Ionicons 
                                        name={showCurrentPassword ? "eye-off" : "eye"} 
                                        size={20} 
                                        color="#666" 
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Nueva contraseña</Text>
                            <View style={styles.passwordInputContainer}>
                                <TextInput
                                    style={styles.passwordInput}
                                    placeholder="Ingresa tu nueva contraseña"
                                    secureTextEntry={!showNewPassword}
                                    value={newPassword}
                                    onChangeText={setNewPassword}
                                    autoCapitalize="none"
                                />
                                <TouchableOpacity 
                                    onPress={() => setShowNewPassword(!showNewPassword)}
                                    style={styles.eyeIcon}
                                >
                                    <Ionicons 
                                        name={showNewPassword ? "eye-off" : "eye"} 
                                        size={20} 
                                        color="#666" 
                                    />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.passwordHint}>
                                Mínimo 6 caracteres
                            </Text>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Confirmar nueva contraseña</Text>
                            <View style={styles.passwordInputContainer}>
                                <TextInput
                                    style={styles.passwordInput}
                                    placeholder="Confirma tu nueva contraseña"
                                    secureTextEntry={!showConfirmPassword}
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                    autoCapitalize="none"
                                />
                                <TouchableOpacity 
                                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                    style={styles.eyeIcon}
                                >
                                    <Ionicons 
                                        name={showConfirmPassword ? "eye-off" : "eye"} 
                                        size={20} 
                                        color="#666" 
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>contraseña

                    <TouchableOpacity 
                        style={styles.changeButton}
                        onPress={handleChangePassword}
                    >
                        <Text style={styles.changeButtonText}>Cambiar Contraseña</Text>
                    </TouchableOpacity>

                    <View style={styles.securityInfo}>
                        <Ionicons name="shield-checkmark" size={16} color="#4CAF50" />
                        <Text style={styles.securityText}>
                            Tu información está protegida con encriptación
                        </Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    keyboardAvoid: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        padding: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 30,
    },
    backButton: {
        padding: 5,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    placeholder: {
        width: 34,
    },
    formContainer: {
        marginBottom: 30,
    },
    inputGroup: {
        marginBottom: 25,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    passwordInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        backgroundColor: '#f9f9f9',
    },
    passwordInput: {
        flex: 1,
        padding: 15,
        fontSize: 16,
    },
    eyeIcon: {
        padding: 15,
    },
    passwordHint: {
        fontSize: 12,
        color: '#666',
        marginTop: 5,
        fontStyle: 'italic',
    },
    changeButton: {
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    changeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    securityInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    securityText: {
        marginLeft: 8,
        color: '#666',
        fontSize: 12,
    },
});

export default ChangePasswordScreen;