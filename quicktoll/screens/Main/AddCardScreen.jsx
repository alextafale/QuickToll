import React, { useState } from 'react';
import {
  View,
  StatusBar,
  Text,
  TextInput,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from "react-native-safe-area-context";


const AddCardScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardholderName: '',
    expirationDate: '',
    cvv: ''
  });
  const [saveCard, setSaveCard] = useState(true);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Validar número de tarjeta (16 dígitos)
    if (!formData.cardNumber.trim()) {
      newErrors.cardNumber = 'Card number is required';
    } else if (!/^\d{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
      newErrors.cardNumber = 'Enter a valid 16-digit card number';
    }

    // Validar nombre del titular
    if (!formData.cardholderName.trim()) {
      newErrors.cardholderName = 'Cardholder name is required';
    } else if (formData.cardholderName.trim().length < 3) {
      newErrors.cardholderName = 'Enter a valid name';
    }

    // Validar fecha de expiración (MM/YY)
    if (!formData.expirationDate.trim()) {
      newErrors.expirationDate = 'Expiration date is required';
    } else if (!/^(0[1-9]|1[0-2])\/([0-9]{2})$/.test(formData.expirationDate)) {
      newErrors.expirationDate = 'Use format MM/YY';
    }

    // Validar CVV (3 o 4 dígitos)
    if (!formData.cvv.trim()) {
      newErrors.cvv = 'CVV is required';
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = 'Enter a valid CVV';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatCardNumber = (text) => {
    // Eliminar todos los espacios existentes
    const cleanedText = text.replace(/\s/g, '');
    
    // Agregar espacio cada 4 caracteres
    const formattedText = cleanedText.replace(/(\d{4})/g, '$1 ').trim();
    
    return formattedText;
  };

  const handleInputChange = (field, value) => {
    let formattedValue = value;
    
    if (field === 'cardNumber') {
      formattedValue = formatCardNumber(value).substring(0, 19); // Limitar a 16 dígitos + 3 espacios
    } else if (field === 'expirationDate') {
      // Formato MM/YY
      formattedValue = value
        .replace(/[^0-9]/g, '')
        .replace(/^(\d{2})/, '$1/')
        .substring(0, 5);
    } else if (field === 'cvv') {
      formattedValue = value.replace(/[^0-9]/g, '').substring(0, 4);
    }
    
    setFormData({
      ...formData,
      [field]: formattedValue
    });
    
    // Limpiar error cuando el usuario escribe
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: null
      });
    }
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simular llamada a API
      setTimeout(() => {
        setIsSubmitting(false);
        Alert.alert(
          "Success", 
          "Card added successfully!",
          [
            {
              text: "OK",
              onPress: () => navigation.navigate('PaymentsScreen')
            }
          ]
        );
      }, 1500);
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoid}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView contentContainerStyle={styles.scrollContent}>
            <View style={styles.header}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="arrow-back" size={24} color="#333" />
              </TouchableOpacity>
              <Text style={styles.title}>Add Payment Card</Text>
              <View style={styles.placeholder} />
            </View>
            
            <View style={styles.cardPreview}>
              <View style={styles.card}>
                <View style={styles.cardHeader}>
                  <View style={styles.chip} />
                  <View style={styles.wifiIcon}>
                    <Ionicons name="wifi" size={20} color="#fff" />
                  </View>
                </View>
                
                <Text style={styles.cardNumberPreview}>
                  {formData.cardNumber || '•••• •••• •••• ••••'}
                </Text>
                
                <View style={styles.cardFooter}>
                  <View>
                    <Text style={styles.cardLabel}>CARDHOLDER NAME</Text>
                    <Text style={styles.cardholderPreview}>
                      {formData.cardholderName || 'YOUR NAME'}
                    </Text>
                  </View>
                  
                  <View>
                    <Text style={styles.cardLabel}>EXPIRES</Text>
                    <Text style={styles.expiryPreview}>
                      {formData.expirationDate || 'MM/YY'}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
            
            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Card Number</Text>
                <TextInput 
                  style={[styles.input, errors.cardNumber && styles.inputError]} 
                  placeholder="1234 5678 9012 3456"
                  placeholderTextColor="#999"
                  value={formData.cardNumber}
                  onChangeText={(text) => handleInputChange('cardNumber', text)}
                  keyboardType="numeric"
                  maxLength={19}
                />
                {errors.cardNumber && <Text style={styles.errorText}>{errors.cardNumber}</Text>}
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Cardholder Name</Text>
                <TextInput 
                  style={[styles.input, errors.cardholderName && styles.inputError]} 
                  placeholder="Jesus Eduardo"
                  placeholderTextColor="#999"
                  value={formData.cardholderName}
                  onChangeText={(text) => handleInputChange('cardholderName', text)}
                  autoCapitalize="words"
                />
                {errors.cardholderName && <Text style={styles.errorText}>{errors.cardholderName}</Text>}
              </View>
              
              <View style={styles.row}>
                <View style={[styles.inputGroup, styles.flex]}>
                  <Text style={styles.label}>Expiration Date</Text>
                  <TextInput 
                    style={[styles.input, errors.expirationDate && styles.inputError]} 
                    placeholder="MM/YY"
                    placeholderTextColor="#999"
                    value={formData.expirationDate}
                    onChangeText={(text) => handleInputChange('expirationDate', text)}
                    keyboardType="numeric"
                    maxLength={5}
                  />
                  {errors.expirationDate && <Text style={styles.errorText}>{errors.expirationDate}</Text>}
                </View>
                
                <View style={[styles.inputGroup, styles.flex, styles.leftMargin]}>
                  <Text style={styles.label}>CVV</Text>
                  <TextInput 
                    style={[styles.input, errors.cvv && styles.inputError]} 
                    placeholder="123"
                    placeholderTextColor="#999"
                    value={formData.cvv}
                    onChangeText={(text) => handleInputChange('cvv', text)}
                    keyboardType="numeric"
                    maxLength={4}
                    secureTextEntry
                  />
                  {errors.cvv && <Text style={styles.errorText}>{errors.cvv}</Text>}
                </View>
              </View>
            </View>
            
            <View style={styles.saveCardContainer}>
              <Text style={styles.saveCardText}>Save card for future payments</Text>
              <Switch 
                value={saveCard}
                onValueChange={setSaveCard}
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={saveCard ? '#007AFF' : '#f4f3f4'}
              />
            </View>
            
            <TouchableOpacity 
              style={[styles.addButton, isSubmitting && styles.disabledButton]}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <Ionicons name="ios-hourglass" size={20} color="#fff" />
              ) : (
                <Text style={styles.addButtonText}>Add Card</Text>
              )}
            </TouchableOpacity>
            
            <View style={styles.securityNote}>
              <Ionicons name="lock-closed" size={16} color="#666" />
              <Text style={styles.securityText}>Your payment information is encrypted and secure</Text>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
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
    marginBottom: 20,
  },
  backButton: {
    padding: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  placeholder: {
    width: 34,
  },
  cardPreview: {
    alignItems: 'center',
    marginVertical: 15,
  },
  card: {
    width: '100%',
    height: 200,
    backgroundColor: '#007AFF',
    borderRadius: 15,
    padding: 20,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  chip: {
    width: 40,
    height: 30,
    backgroundColor: '#ffcc33',
    borderRadius: 5,
  },
  wifiIcon: {
    transform: [{ rotate: '90deg' }],
  },
  cardNumberPreview: {
    fontSize: 22,
    color: '#fff',
    letterSpacing: 2,
    fontWeight: '500',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cardLabel: {
    fontSize: 10,
    color: 'rgba(255, 255, 255, 0.7)',
    marginBottom: 4,
  },
  cardholderPreview: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  expiryPreview: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  formContainer: {
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  flex: {
    flex: 1,
  },
  leftMargin: {
    marginLeft: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  inputError: {
    borderColor: '#ff3b30',
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 14,
    marginTop: 5,
  },
  saveCardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  saveCardText: {
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  disabledButton: {
    backgroundColor: '#66a3ff',
    opacity: 0.8,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  securityNote: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  securityText: {
    marginLeft: 8,
    color: '#666',
    fontSize: 14,
  },
});

export default AddCardScreen;