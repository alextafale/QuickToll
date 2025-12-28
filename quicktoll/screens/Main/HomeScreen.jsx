import {View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, StatusBar} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { useFocusEffect } from '@react-navigation/native';


export const HomeScreen = ({navigation}) => {
  const [tollHistory, setTollHistoy] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchUser = async () => {
        setTollHistoy(await handleGetTollHistory());
      };
      fetchUser();
    },[])
  );

  const handleGetTollHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select('*,tolls_id(name,state),rates_id(amount)');
      if(error){
        console.log(error);
      }
      return data;
      } catch (error) {
        console.error("Error al obtener historial:", error);
        throw error;
      }
  };

    return (
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="light-content" />
          <ScrollView>
           
            <View style={styles.headerContainer}>
              <Text style={styles.subtitle}>Saldo disponible</Text>
              <Text style={styles.balance}>$1,250.00 MXN</Text>
              
              <TouchableOpacity style={styles.addBalanceButton} onPress={() => navigation.navigate('AddBalancesScreen')}>
                <Ionicons name="add-circle" size={20} color="#007AFF" />
                <Text style={styles.addBalanceText}>Agregar saldo</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.historyContainer}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Historial de Casetas</Text>
                <TouchableOpacity onPress={() => navigation.navigate('HistoryScreen')}>
                  <Text style={styles.seeAllText}>Ver todo</Text>
                </TouchableOpacity>
              </View>

              {tollHistory.map((toll) => (
                <View key={toll.id} style={styles.tollItem}>
                  <View style={styles.tollIconContainer}>
                    <FontAwesome5 name="road" size={20} color="#4A90E2" />
                  </View>
                  
                  <View style={styles.tollInfo}>
                    <Text style={styles.tollName}>{toll.tolls_id.name}</Text>
                    <Text style={styles.tollLocation}>{toll.tolls_id.state}</Text>
                    <Text style={styles.tollDate}>{toll.date} • {toll.time}</Text>
                  </View>
                  
                  <View style={styles.tollAmountContainer}>
                    <Text style={styles.tollAmount}>{toll.rates_id.amount}</Text>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    backgroundColor: '#4A90E2',
    padding: 20,
    paddingBottom: 25,
  },
  subtitle: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 5,
  },
  balance: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
  },
  addBalanceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  addBalanceText: {
    marginLeft: 8,
    color: '#007AFF',
    fontWeight: '600',
  },
  historyContainer: {
    backgroundColor: '#FFFFFF',
    marginTop: -10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    flex: 1,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  seeAllText: {
    color: '#4A90E2',
    fontWeight: '600',
  },
  tollItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tollIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e8f0fe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  tollInfo: {
    flex: 1,
  },
  tollName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  tollLocation: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  tollDate: {
    fontSize: 12,
    color: '#999',
  },
  tollAmountContainer: {
    alignItems: 'flex-end',
  },
  tollAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
});

export default HomeScreen;