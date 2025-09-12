import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, ScrollView, Image } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

export const PaymentsScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.scrollView}>
                <View style={styles.container}>
// Header con Saldo Disponible
                    <View style={styles.headerContainer}>
                        <Text style={styles.subtitle}>Saldo disponible</Text>
                        <Text style={styles.balance}>$1,250.00 MXN</Text>
                        <TouchableOpacity style={styles.addBalanceButton} onPress={() => navigation.navigate('AddBalancesScreen')}>
                            <Ionicons name="add-circle" size={20} color="#007AFF" />
                            <Text style={styles.addBalanceText}>Agregar saldo</Text>
                        </TouchableOpacity>
                    </View>

// Payment Methods Section
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Métodos de Pago</Text>
                        
                        <TouchableOpacity 
                            style={styles.paymentMethodButton} 
                            onPress={() => navigation.navigate('PaymentsMethodsScreen')}
                        >
                            <View style={styles.methodLeft}>
                                <View style={[styles.iconContainer, { backgroundColor: '#FF6B6B' }]}>
                                    <FontAwesome5 name="credit-card" size={20} color="#FFFFFF" />
                                </View>
                                <View style={styles.methodInfo}>
                                    <Text style={styles.methodTitle}>Tarjeta de Crédito/Débito</Text>
                                    <Text style={styles.methodSubtitle}>Visa ••7845</Text>
                                </View>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="#999" />
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.paymentMethodButton} 
                            onPress={() => navigation.navigate('PaymentsMethodsScreen')}
                        >
                            <View style={styles.methodLeft}>
                                <View style={[styles.iconContainer, { backgroundColor: '#4ECDC4' }]}>
                                    <Ionicons name="cash" size={20} color="#FFFFFF" />
                                </View>
                                <View style={styles.methodInfo}>
                                    <Text style={styles.methodTitle}>OXXO</Text>
                                    <Text style={styles.methodSubtitle}>Pago en efectivo</Text>
                                </View>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="#999" />
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={styles.paymentMethodButton} 
                            onPress={() => navigation.navigate('PaymentsMethodsScreen')}
                        >
                            <View style={styles.methodLeft}>
                                <View style={[styles.iconContainer, { backgroundColor: '#45B7D1' }]}>
                                    <MaterialIcons name="account-balance" size={20} color="#FFFFFF" />
                                </View>
                                <View style={styles.methodInfo}>
                                    <Text style={styles.methodTitle}>Transferencia Bancaria</Text>
                                    <Text style={styles.methodSubtitle}>BBVA ••8912</Text>
                                </View>
                            </View>
                            <Ionicons name="chevron-forward" size={20} color="#999" />
                        </TouchableOpacity>
                    </View>

// Recent Payments Section
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Pagos Recientes</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('HistoryScreen')}>
                                <Text style={styles.seeAllText}>Ver todos</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.recentPaymentsList}>
                            <View style={styles.paymentItem}>
                                <View style={styles.paymentLeft}>
                                    <View style={[styles.paymentIcon, { backgroundColor: '#E3F2FD' }]}>
                                        <Ionicons name="car-sport" size={20} color="#1976D2" />
                                    </View>
                                    <View style={styles.paymentInfo}>
                                        <Text style={styles.paymentTitle}>Estacionamiento Centro</Text>
                                        <Text style={styles.paymentDate}>Hoy, 14:30</Text>
                                    </View>
                                </View>
                                <Text style={styles.paymentAmount}>-$85.00</Text>
                            </View>

                            <View style={styles.paymentItem}>
                                <View style={styles.paymentLeft}>
                                    <View style={[styles.paymentIcon, { backgroundColor: '#F3E5F5' }]}>
                                        <Ionicons name="time" size={20} color="#7B1FA2" />
                                    </View>
                                    <View style={styles.paymentInfo}>
                                        <Text style={styles.paymentTitle}>Tiempo extra</Text>
                                        <Text style={styles.paymentDate}>Ayer, 18:15</Text>
                                    </View>
                                </View>
                                <Text style={styles.paymentAmount}>-$45.00</Text>
                            </View>

                            <View style={styles.paymentItem}>
                                <View style={styles.paymentLeft}>
                                    <View style={[styles.paymentIcon, { backgroundColor: '#E8F5E9' }]}>
                                        <Ionicons name="refresh" size={20} color="#388E3C" />
                                    </View>
                                    <View style={styles.paymentInfo}>
                                        <Text style={styles.paymentTitle}>Recarga de saldo</Text>
                                        <Text style={styles.paymentDate}>12 Oct, 10:20</Text>
                                    </View>
                                </View>
                                <Text style={[styles.paymentAmount, styles.positiveAmount]}>+$500.00</Text>
                            </View>
                        </View>
                    </View>

// Quick Actions Section
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
                        <View style={styles.quickActions}>
                            <TouchableOpacity style={styles.quickActionButton}>
                                <View style={[styles.actionIcon, { backgroundColor: '#FFECB3' }]}>
                                    <Ionicons name="qr-code" size={24} color="#FFA000" />
                                </View>
                                <Text style={styles.actionText}>Pagar con QR</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.quickActionButton}>
                                <View style={[styles.actionIcon, { backgroundColor: '#C8E6C9' }]}>
                                    <Ionicons name="repeat" size={24} color="#388E3C" />
                                </View>
                                <Text style={styles.actionText}>Pago Automático</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.quickActionButton}>
                                <View style={[styles.actionIcon, { backgroundColor: '#BBDEFB' }]}>
                                    <Ionicons name="document-text" size={24} color="#1976D2" />
                                </View>
                                <Text style={styles.actionText}>Facturas</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    scrollView: {
        flex: 1,
    },
    container: {
        flex: 1,
        padding: 16,
    },
    headerContainer: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderRadius: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    balance: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 15,
    },
    addBalanceButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F8FF',
        padding: 12,
        borderRadius: 10,
        alignSelf: 'flex-start',
    },
    addBalanceText: {
        color: '#007AFF',
        fontWeight: '600',
        marginLeft: 5,
    },
    section: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        padding: 16,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    seeAllText: {
        color: '#007AFF',
        fontWeight: '500',
    },
    paymentMethodButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    methodLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    methodInfo: {
        flex: 1,
    },
    methodTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#000',
        marginBottom: 2,
    },
    methodSubtitle: {
        fontSize: 14,
        color: '#666',
    },
    recentPaymentsList: {
        marginTop: 10,
    },
    paymentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0',
    },
    paymentLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },
    paymentIcon: {
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    paymentInfo: {
        flex: 1,
    },
    paymentTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#000',
        marginBottom: 2,
    },
    paymentDate: {
        fontSize: 12,
        color: '#999',
    },
    paymentAmount: {
        fontSize: 16,
        fontWeight: '600',
        color: '#FF3B30',
    },
    positiveAmount: {
        color: '#34C759',
    },
    quickActions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    quickActionButton: {
        alignItems: 'center',
        width: 80,
    },
    actionIcon: {
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    actionText: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
    },
});

export default PaymentsScreen;