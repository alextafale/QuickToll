import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from '../../lib/supabase';


const UserScreen = ({ navigation }) => {
  const [user, setUser] = useState({
    name: "",
    id: "",
    email: "",
    phone: "",
    status: false,
    vehiclesCount: 0,
    transactions:0,
    joinDate: "",
    avatar: require('../../assets/user.png')
  });


  useEffect(() => {
    const loadUser = async () => {
      const { data: { user: authUser } } = await supabase.auth.getUser();
      if (!authUser) return;

      const { data, error } = await supabase
        .from('profiles')
        .select('id, full_name, email, phone, status, created_at')
        .eq('id', authUser.id)
        .single();

      if (error) {
        console.error(error);
        return;
      }

      const { count, error: vehiclesError } = await supabase
        .from('vehicles')
        .select('*', { count: 'exact', head: true })
        .eq('profiles_id', authUser.id);

      if (vehiclesError) {
        console.error(vehiclesError);
        return;
      }

      const { transactionCount,error:transactionError } = await supabase
        .from('transactions')
        .select('*', { transactionCount: 'exact',head: true })
        .eq('profiles_id', authUser.id);

      if (transactionError) {
        console.error(transactionError);
        return;
      }

      setUser({
        id: data.id,
        name: data.full_name,
        email: data.email,
        phone: data.phone ?? '',
        status: data.status,
        joinDate: data.created_at,
        vehiclesCount: count ?? 0,
        transactions: count ?? 0,
        avatar: require('../../assets/user.png')
      });
    };

    loadUser();
  }, []);


  

  const menuOptions = [
    {
      id: '1',
      title: 'Cambiar Contraseña',
      icon: 'lock-closed-outline',
      screen: 'ChangePasswordScreen',
      color: '#3D99F5'
    },
    {
      id: '2',
      title: 'Mis Vehículos',
      icon: 'car-outline',
      screen: 'VehicleScreen',
      color: '#10B981'
    },
    {
      id: '3',
      title: 'Métodos de Pago',
      icon: 'card-outline',
      screen: 'PaymentsMethodsScreen',
      color: '#F59E0B'
    },
    {
      id: '4',
      title: 'Historial de Viajes',
      icon: 'time-outline',
      screen: 'HistoryScreen',
      color: '#8B5CF6'
    },
    {
      id: '5',
      title: 'Centro de Ayuda',
      icon: 'help-circle-outline',
      screen: 'HelpCenterScreen',
      color: '#6366F1'
    },
    {
      id: '6',
      title: 'Contactarnos',
      icon: 'chatbubble-ellipses-outline',
      screen: 'ContactUsScreen',
      color: '#EC4899'
    }
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mi Perfil</Text>
        <TouchableOpacity style={styles.settingsButton}>
          <Ionicons name="settings-outline" size={24} color="#3D99F5" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Sección de Perfil */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Image 
              source={user.avatar} 
              style={styles.avatar}
              defaultSource={require('../../assets/user.png')}
            />
            <View style={[styles.statusBadge, styles.activeStatus]}>
              <Ionicons name="checkmark" size={12} color="#FFFFFF" />
            </View>
          </View>
          
          <Text style={styles.userName}>{user.name}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user.vehiclesCount}</Text>
              <Text style={styles.statLabel}>Vehículos</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>{user.transactions}</Text>
              <Text style={styles.statLabel}>Viajes</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>$450</Text>
              <Text style={styles.statLabel}>Gastado</Text>
            </View>
          </View>
        </View>

        {/* Información Personal */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Información Personal</Text>
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Ionicons name="person-outline" size={18} color="#6B7280" />
              <Text style={styles.infoLabel}>ID de Usuario</Text>
              <Text style={styles.infoValue}>{user.id}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Ionicons name="call-outline" size={18} color="#6B7280" />
              <Text style={styles.infoLabel}>Teléfono</Text>
              <Text style={styles.infoValue}>{user.phone}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Ionicons name="calendar-outline" size={18} color="#6B7280" />
              <Text style={styles.infoLabel}>Miembro desde</Text>
              <Text style={styles.infoValue}>{user.joinDate}</Text>
            </View>
            
            <View style={styles.infoItem}>
              <Ionicons name="shield-checkmark-outline" size={18} color="#6B7280" />
              <Text style={styles.infoLabel}>Estado</Text>
              <View style={[styles.statusPill, styles.activeStatus]}>
                <Text style={styles.statusText}>Verificado</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Menú de Opciones */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Configuración</Text>
          {menuOptions.map((option) => (
            <TouchableOpacity 
              key={option.id}
              style={styles.optionItem}
              onPress={() => navigation.navigate(option.screen)}
            >
              <View style={[styles.optionIcon, { backgroundColor: option.color + '20' }]}>
                <Ionicons name={option.icon} size={20} color={option.color} />
              </View>
              <Text style={styles.optionText}>{option.title}</Text>
              <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
            </TouchableOpacity>
          ))}
        </View>

        {/* Botón de Cerrar Sesión */}
        <TouchableOpacity 
          style={styles.logoutButton}
          onPress={() => navigation.navigate('LogOutScreen')}
        >
          <Ionicons name="log-out-outline" size={20} color="#DC2626" />
          <Text style={styles.logoutText}>Cerrar Sesión</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  settingsButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 24,
    borderRadius: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: '#EFF6FF',
  },
  statusBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  activeStatus: {
    backgroundColor: '#10B981',
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3D99F5',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#E5E7EB',
  },
  section: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 16,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  infoItem: {
    width: '48%',
    marginBottom: 16,
  },
  infoLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1F2937',
  },
  statusPill: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#065F46',
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  optionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#1F2937',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEF2F2',
    margin: 20,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  logoutText: {
    marginLeft: 12,
    color: '#DC2626',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default UserScreen;