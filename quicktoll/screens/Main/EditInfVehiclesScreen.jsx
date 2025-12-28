import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert,View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { supabase } from '../../lib/supabase';

const EditInfVehiclesScreen = ({ navigation, route }) => {
    // Datos del vehículo que se reciben por parámetros o estado inicial
    const [vehicle, setVehicle] = useState(() => {
        const v = route.params?.vehicle;

        return v
            ? {
                ...v,
                year: v.year !== null && v.year !== undefined
                ? String(v.year)
                : ''
            }
            : {
                id: '',
                license_plate: '',
                name: '',
                color: '',
                year: ''
            };
    });


    const handleSave = async () => {
        if (!vehicle.license_plate || !vehicle.name || !vehicle.color || !vehicle.year.trim() === '') {
            Alert.alert('Error','Por favor completa los campos obligatorios');
            return;
        }

        try {
            const { data: { user } } = await supabase.auth.getUser(); 
            if (!user) {
                Alert.alert('Error', 'Debe iniciar sesión.');
                return;
            }
            const { data, error } = await supabase
                .from('vehicles')
                .update({
                    name:vehicle.name, 
                    license_plate: vehicle.license_plate,
                    color: vehicle.color,
                    year: Number(vehicle.year)
                })
                .eq('id',vehicle.id)
                .select().single();
            console.log('Respuesta backend:', data);
            navigation.goBack();
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async () => {    
        alert('¿Estás seguro de que quieres eliminar este vehículo?');
        try {
            const { data: { user } } = await supabase.auth.getUser(); 
            if (!user) {
                Alert.alert('Error', 'Debe iniciar sesión.');
                return;
            }
            const userId = user.id;

            const { data, error } = await supabase
                .from('vehicles')
                .delete()
                .eq('id',vehicle.id)
                .select()
                .single();
            console.log('Respuesta backend:', data);

            navigation.goBack();
        } catch (error) {
            
        }
        
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
                style={styles.keyboardAvoid}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Ionicons name="arrow-back" size={24} color="#333" />
                        </TouchableOpacity>
                        <Text style={styles.title}>Editar Vehículo</Text>
                        <View style={styles.placeholder} />
                    </View>

                    <View style={styles.formContainer}>
                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Placa del vehículo *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Ej: ABC-123"
                                value={vehicle.license_plate}
                                onChangeText={(text) => setVehicle({...vehicle, license_plate: text})}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Modelo *</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Ej: Toyota Corolla"
                                value={vehicle.name}
                                onChangeText={(text) => setVehicle({...vehicle, name: text})}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Color</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Ej: Rojo"
                                value={vehicle.color}
                                onChangeText={(text) => setVehicle({...vehicle, color: text})}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Año</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Ej: 2022"
                                keyboardType="numeric"
                                value={vehicle.year}
                                onChangeText={(text) => setVehicle({...vehicle, year: text})}
                                maxLength={4}
                            />
                        </View>


                    </View>

                    <View style={styles.actionsContainer}>
                        <TouchableOpacity 
                            style={styles.saveButton}
                            onPress={handleSave}
                        >
                            <Ionicons name="save-outline" size={20} color="#fff" />
                            <Text style={styles.saveButtonText}>Guardar Cambios</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.deleteButton}
                            onPress={handleDelete}
                        >
                            <Ionicons name="trash-outline" size={20} color="#fff" />
                            <Text style={styles.deleteButtonText}>Eliminar Vehículo</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.note}>* Campos obligatorios</Text>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

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
        marginBottom: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 15,
        fontSize: 16,
        backgroundColor: '#f9f9f9',
    },
    actionsContainer: {
        marginBottom: 20,
    },
    saveButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#007AFF',
        padding: 16,
        borderRadius: 8,
        marginBottom: 15,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
    deleteButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF3B30',
        padding: 16,
        borderRadius: 8,
    },
    deleteButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
    note: {
        textAlign: 'center',
        color: '#666',
        fontSize: 14,
        fontStyle: 'italic',
    },
});

export default EditInfVehiclesScreen;