import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
  SectionList,
  RefreshControl,
  TextInput,
  Image
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";


const HistoryScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Datos de ejemplo 
  const tollData = [
    {
      title: 'HOY',
      data: [
        {
          id: '1',
          highway: 'México - Querétaro',
          booth: 'Tepotzotlán',
          amount: 115.00,
          time: '10:30 AM',
          status: 'completed',
          vehicle: 'Camaro ABC-123',
          location: 'Estado de México',
          direction: 'Norte'
        },
        {
          id: '2',
          highway: 'Arco Norte',
          booth: 'Huehuetoca',
          amount: 218.00,
          time: '09:15 AM',
          status: 'completed',
          vehicle: 'Camaro ABC-123',
          location: 'Estado de México',
          direction: 'Pachuca'
        }
      ]
    },
    {
      title: 'AYER',
      data: [
        {
          id: '3',
          highway: 'México - Pachuca',
          booth: 'Venta de Carpio',
          amount: 64.00,
          time: '05:45 PM',
          status: 'completed',
          vehicle: 'Camaro ABC-123',
          location: 'Estado de México',
          direction: 'Sur'
        },
        {
          id: '4',
          highway: 'Periférico',
          booth: 'San Jerónimo',
          amount: 42.00,
          time: '11:20 AM',
          status: 'refunded',
          vehicle: 'Camaro ABC-123',
          location: 'CDMX',
          direction: 'Este'
        }
      ]
    },
    {
      title: 'ESTA SEMANA',
      data: [
        {
          id: '5',
          highway: 'México - Cuernavaca',
          booth: 'La Pera',
          amount: 87.00,
          time: 'Mar 15, 02:30 PM',
          status: 'completed',
          vehicle: 'Camaro ABC-123',
          location: 'Morelos',
          direction: 'Sur'
        },
        {
          id: '6',
          highway: 'México - Toluca',
          booth: 'Lerma',
          amount: 55.00,
          time: 'Mar 14, 09:10 AM',
          status: 'completed',
          vehicle: 'Camaro ABC-123',
          location: 'Estado de México',
          direction: 'Poniente'
        },
        {
          id: '7',
          highway: 'México - Puebla',
          booth: 'San Marcos',
          amount: 135.00,
          time: 'Mar 13, 04:15 PM',
          status: 'pending',
          vehicle: 'Camaro ABC-123',
          location: 'Puebla',
          direction: 'Este'
        }
      ]
    }
  ];

  const onRefresh = () => {
    setRefreshing(true);
    // Simular carga de datos
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const filterTransactions = () => {
    let filteredData = [...tollData];
    
    // Aplicar filtro por estado
    if (filter !== 'all') {
      filteredData = filteredData.map(section => ({
        ...section,
        data: section.data.filter(item => item.status === filter)
      })).filter(section => section.data.length > 0);
    }
    
    // Aplicar búsqueda
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredData = filteredData.map(section => ({
        ...section,
        data: section.data.filter(item => 
          item.highway.toLowerCase().includes(query) || 
          item.booth.toLowerCase().includes(query) ||
          item.location.toLowerCase().includes(query)
        )
      })).filter(section => section.data.length > 0);
    }
    
    return filteredData;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return '#4CAF50';
      case 'pending': return '#FF9800';
      case 'refunded': return '#9C27B0';
      case 'failed': return '#F44336';
      default: return '#666';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed': return 'COMPLETADO';
      case 'pending': return 'PENDIENTE';
      case 'refunded': return 'REEMBOLSADO';
      case 'failed': return 'FALLIDO';
      default: return status;
    }
  };

  const getDirectionIcon = (direction) => {
    switch (direction) {
      case 'Norte': return 'navigate';
      case 'Sur': return 'navigate';
      case 'Este': return 'navigate';
      case 'Oeste': return 'navigate';
      case 'Poniente': return 'navigate';
      default: return 'navigate';
    }
  };

  const renderTransactionItem = ({ item }) => (
    <TouchableOpacity style={styles.transactionItem}>
      <View style={styles.transactionIcon}>
        <Ionicons 
          name={getDirectionIcon(item.direction)} 
          size={24} 
          color="#007AFF" 
        />
      </View>
      
      <View style={styles.transactionDetails}>
        <Text style={styles.highwayName}>{item.highway}</Text>
        <Text style={styles.boothName}>{item.booth}</Text>
        <View style={styles.locationContainer}>
          <Ionicons name="location" size={12} color="#666" />
          <Text style={styles.locationText}>{item.location}</Text>
        </View>
        <Text style={styles.vehicleText}>{item.vehicle}</Text>
        <Text style={styles.transactionTime}>{item.time}</Text>
      </View>
      
      <View style={styles.transactionAmountContainer}>
        <Text style={styles.transactionAmount}>
          ${item.amount.toFixed(2)} MXN
        </Text>
        <View style={[styles.statusBadge, { backgroundColor: getStatusColor(item.status) + '20' }]}>
          <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
            {getStatusText(item.status)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderSectionHeader = ({ section: { title } }) => (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionHeaderText}>{title}</Text>
    </View>
  );

  const ListEmptyComponent = () => (
    <View style={styles.emptyState}>
      <Image 
        source={{ uri: 'https://cdn-icons-png.flaticon.com/512/992/992700.png' }} 
        style={styles.emptyImage}
      />
      <Text style={styles.emptyStateTitle}>No hay transacciones de casetas</Text>
      <Text style={styles.emptyStateText}>
        {searchQuery 
          ? `No hay resultados para "${searchQuery}"` 
          : 'No tienes transacciones de casetas que mostrar'}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Historial de Casetas</Text>
          <Text style={styles.subtitle}>Tus transacciones en carreteras mexicanas</Text>
        </View>

      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Buscar por carretera, caseta o estado..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            clearButtonMode="while-editing"
          />
        </View>
      </View>

      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <TouchableOpacity 
            style={[styles.filterButton, filter === 'all' && styles.filterButtonActive]}
            onPress={() => setFilter('all')}
          >
            <Text style={[styles.filterButtonText, filter === 'all' && styles.filterButtonTextActive]}>
              Todas
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.filterButton, filter === 'completed' && styles.filterButtonActive]}
            onPress={() => setFilter('completed')}
          >
            <Text style={[styles.filterButtonText, filter === 'completed' && styles.filterButtonTextActive]}>
              Completadas
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.filterButton, filter === 'pending' && styles.filterButtonActive]}
            onPress={() => setFilter('pending')}
          >
            <Text style={[styles.filterButtonText, filter === 'pending' && styles.filterButtonTextActive]}>
              Pendientes
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.filterButton, filter === 'refunded' && styles.filterButtonActive]}
            onPress={() => setFilter('refunded')}
          >
            <Text style={[styles.filterButtonText, filter === 'refunded' && styles.filterButtonTextActive]}>
              Reembolsos
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <SectionList
        sections={filterTransactions()}
        keyExtractor={(item) => item.id}
        renderItem={renderTransactionItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={styles.listContent}
        stickySectionHeadersEnabled={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#007AFF']}
            tintColor={'#007AFF'}
          />
        }
        ListEmptyComponent={ListEmptyComponent}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {filterTransactions().reduce((total, section) => total + section.data.length, 0)} 
          transacciones de casetas
        </Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  titleContainer: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  mexicanFlag: {
    flexDirection: 'row',
    width: 60,
    height: 40,
    borderRadius: 4,
    overflow: 'hidden',
    marginLeft: 10,
  },
  flagGreen: {
    flex: 1,
    backgroundColor: '#006847',
  },
  flagWhite: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flagEmblem: {
    width: 20,
    height: 20,
  },
  flagRed: {
    flex: 1,
    backgroundColor: '#CE1126',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f1f2f6',
    borderRadius: 10,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
  },
  filterContainer: {
    paddingVertical: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f1f2f6',
    marginHorizontal: 6,
  },
  filterButtonActive: {
    backgroundColor: '#007AFF',
  },
  filterButtonText: {
    color: '#666',
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
  sectionHeader: {
    backgroundColor: '#f8f9fa',
    paddingVertical: 8,
    marginBottom: 8,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  transactionItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  transactionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f1f2f6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  highwayName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  boothName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#007AFF',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  locationText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  vehicleText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 2,
  },
  transactionTime: {
    fontSize: 12,
    color: '#999',
  },
  transactionAmountContainer: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '600',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  emptyImage: {
    width: 80,
    height: 80,
    tintColor: '#ddd',
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
  footer: {
    padding: 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
  },
});

export default HistoryScreen;