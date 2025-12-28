import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, StatusBar, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from '@react-navigation/native';
import { supabase } from '../../lib/supabase';


const VehicleScreen = ({ navigation }) => {
  const [vehicles,setVehicles] = useState([]);

  const getVehicleIcon = (type) => {
    switch(type.toLowerCase()) {
      case 'sedan':
        return 'car-sport';
      case 'pickup':
        return 'car';
      case 'suv':
        return 'car';
      default:
        return 'car';
    }
  };

  const handleGetVehicles = async () => {
     try {
      const { data, error } = await supabase
            .from('vehicles')
            .select('*');
      return data;
    } catch (error) {
      console.error("Error al obtener vehiculos:", error);
      throw error;
    }};

    useFocusEffect(
      React.useCallback(() => {
        const fetchUser = async () => {
          setVehicles(await handleGetVehicles());
        };
        fetchUser();
      },[])
    );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Mis Vehículos</Text>
          <Text style={styles.headerSubtitle}>Gestiona tus vehículos registrados</Text>
        </View>
        <TouchableOpacity style={styles.profileButton} onPress={() => navigation.navigate('UserScreen')}>
          <Ionicons name="person-circle-outline" size={28} color="#3D99F5" />
        </TouchableOpacity>
      </View>
      
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {vehicles.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="car-outline" size={64} color="#E5E7EB" />
            <Text style={styles.emptyStateTitle}>No hay vehículos</Text>
            <Text style={styles.emptyStateText}>Agrega tu primer vehículo para comenzar</Text>
          </View>
        ) : (
          vehicles.map((vehicle) => (
            <TouchableOpacity 
              key={vehicle.id} 
              style={styles.vehicleCard}
              onPress={() => navigation.navigate('EditInfVehiclesScreen', { vehicle })}
            >
              <View style={styles.vehicleHeader}>
                <View style={styles.vehicleIcon}>
                  <Ionicons 
                    name={getVehicleIcon(vehicle.type)} 
                    size={24} 
                    color="#3D99F5" 
                  />
                </View>
                <View style={styles.vehicleInfo}>
                  <Text style={styles.licensePlate}>{vehicle.license_plate}</Text>
                  <Text style={styles.model}>{vehicle.name}</Text>
                </View>
                <View style={styles.vehicleStatus}>
                  <View style={[
                    styles.statusBadge,
                    vehicle.active ? styles.statusActive : styles.statusInactive
                  ]}>
                    <Text style={styles.statusText}>
                      {vehicle.active ? 'Activo' : 'Inactivo'}
                    </Text>
                  </View>
                </View>
              </View>
              
              <View style={styles.vehicleDetails}>
                <View style={styles.detailItem}>
                  <Ionicons name="color-palette-outline" size={16} color="#6B7280" />
                  <Text style={styles.detailText}>{vehicle.color}</Text>
                </View>
                <View style={styles.detailItem}>
                  <Ionicons name="grid-outline" size={16} color="#6B7280" />
                  <Text style={styles.detailText}>{vehicle.type}</Text>
                </View>
              </View>
              
              <TouchableOpacity 
                style={styles.editButton}
                onPress={() => navigation.navigate('EditInfVehiclesScreen', { vehicle })}
              >
                <Ionicons name="pencil-outline" size={18} color="#3D99F5" />
                <Text style={styles.editButtonText}>Editar</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
      <TouchableOpacity 
        style={styles.addButton} 
        onPress={() => navigation.navigate('AddVehicleScreen')}
      >
        <Ionicons name="add" size={28} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  profileButton: {
    padding: 8,
  },
  scrollView: {
    flex: 1,
    padding: 20,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
    marginTop: 60,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  vehicleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  vehicleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  vehicleIcon: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#EFF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  vehicleInfo: {
    flex: 1,
  },
  licensePlate: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  model: {
    fontSize: 14,
    color: '#6B7280',
  },
  vehicleStatus: {
    marginLeft: 12,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusActive: {
    backgroundColor: '#D1FAE5',
  },
  statusInactive: {
    backgroundColor: '#FEE2E2',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#065F46',
  },
  vehicleDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#6B7280',
    marginLeft: 8,
  },
  editButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    backgroundColor: '#EFF6FF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#DBEAFE',
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3D99F5',
    marginLeft: 8,
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#3D99F5',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3D99F5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
});

export default VehicleScreen;