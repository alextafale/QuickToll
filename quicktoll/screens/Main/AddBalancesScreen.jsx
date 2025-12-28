import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";


const AddBalancesScreen = ({ navigation }) => {
    const [amount, setAmount] = useState('');
    const [selectedMethod, setSelectedMethod] = useState('card');

    const quickAmounts = [50, 100, 200, 500];

    const paymentMethods = [
        { id: 'card', name: 'Tarjeta de crédito/débito', icon: 'card' },
        { id: 'paypal', name: 'PayPal', icon: 'logo-paypal' },
        { id: 'bank', name: 'Transferencia bancaria', icon: 'business' },
    ];

    const handleAddBalance = () => {
        if (amount && parseFloat(amount) > 0) {
            // Lógica para procesar el pago
            alert(`Agregando $${amount} MXN a tu cuenta`);
            navigation.goBack();
        } else {
            alert('Por favor ingresa un monto válido');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.keyboardAvoid}
            >
                <ScrollView contentContainerStyle={styles.scrollContent}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
                            <Ionicons name="arrow-back" size={24} color="#333" />
                        </TouchableOpacity>
                        <Text style={styles.title}>Agregar Saldo</Text>
                    </View>

                    <View style={styles.amountSection}>
                        <Text style={styles.sectionTitle}>Monto a agregar</Text>
                        <View style={styles.amountInputContainer}>
                            <Text style={styles.currencySymbol}>$</Text>
                            <TextInput
                                style={styles.amountInput}
                                placeholder="0.00"
                                placeholderTextColor="#999"
                                keyboardType="decimal-pad"
                                value={amount}
                                onChangeText={setAmount}
                            />
                            <Text style={styles.currencyText}>MXN</Text>
                        </View>

                        <View style={styles.quickAmountsContainer}>
                            {quickAmounts.map((quickAmount) => (
                                <TouchableOpacity
                                    key={quickAmount}
                                    style={styles.quickAmountButton}
                                    onPress={() => setAmount(quickAmount.toString())}
                                >
                                    <Text style={styles.quickAmountText}>${quickAmount}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>

                    {/* Métodos de pago */}
                    <View style={styles.paymentSection}>
                        <Text style={styles.sectionTitle}>Método de pago</Text>
                        {paymentMethods.map((method) => (
                            <TouchableOpacity
                                key={method.id}
                                style={[
                                    styles.paymentMethod,
                                    selectedMethod === method.id && styles.selectedPaymentMethod
                                ]}
                                onPress={() => setSelectedMethod(method.id)}
                            >
                                <Ionicons 
                                    name={method.icon} 
                                    size={24} 
                                    color={selectedMethod === method.id ? '#007AFF' : '#666'} 
                                />
                                <Text style={styles.paymentMethodText}>{method.name}</Text>
                                <View style={styles.radioContainer}>
                                    <View style={[
                                        styles.radio,
                                        selectedMethod === method.id && styles.radioSelected
                                    ]} />
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Botón de agregar saldo */}
                    <TouchableOpacity 
                        style={[styles.addButton, !amount && styles.addButtonDisabled]}
                        onPress={handleAddBalance}
                        disabled={!amount}
                    >
                        <Text style={styles.addButtonText}>Agregar ${amount || '0.00'} MXN</Text>
                    </TouchableOpacity>

                    {/* Información de seguridad */}
                    <View style={styles.securityInfo}>
                        <Ionicons name="shield-checkmark" size={20} color="#4CAF50" />
                        <Text style={styles.securityText}>Transacción segura con encriptación SSL</Text>
                    </View>
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
        marginBottom: 30,
    },
    backButton: {
        marginRight: 15,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    amountSection: {
        marginBottom: 30,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 15,
    },
    amountInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#007AFF',
        borderRadius: 12,
        padding: 15,
        marginBottom: 20,
    },
    currencySymbol: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginRight: 5,
    },
    amountInput: {
        flex: 1,
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
    },
    currencyText: {
        fontSize: 16,
        color: '#666',
    },
    quickAmountsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
    },
    quickAmountButton: {
        backgroundColor: '#f0f0f0',
        padding: 12,
        borderRadius: 8,
        minWidth: '22%',
        alignItems: 'center',
        marginBottom: 10,
    },
    quickAmountText: {
        fontWeight: '600',
        color: '#333',
    },
    paymentSection: {
        marginBottom: 30,
    },
    paymentMethod: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        marginBottom: 10,
    },
    selectedPaymentMethod: {
        borderColor: '#007AFF',
        backgroundColor: '#f0f8ff',
    },
    paymentMethodText: {
        flex: 1,
        marginLeft: 15,
        fontSize: 16,
        color: '#333',
    },
    radioContainer: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    radio: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: 'transparent',
    },
    radioSelected: {
        backgroundColor: '#007AFF',
    },
    addButton: {
        backgroundColor: '#007AFF',
        padding: 18,
        borderRadius: 12,
        alignItems: 'center',
        marginBottom: 20,
    },
    addButtonDisabled: {
        backgroundColor: '#ccc',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
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
        fontSize: 14,
    },
});

export default AddBalancesScreen;