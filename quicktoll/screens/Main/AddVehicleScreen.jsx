import React,{ useState, useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Menu } from 'react-native-paper';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  StatusBar, 
  TextInput,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../../lib/supabase';


//import { set } from 'mongoose';
const AddVehicleScreen = ({ navigation }) => {
  const [formData, setFormData] = useState({
    vehicleName: '',
    licensePlate: '',
    ownerName: '',
    carColor: '',
    year: ''
  });

  const [type, setType] = useState('Sedan');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [visible, setVisible] = useState(false);
  const toggleMenu = () => setVisible(!visible);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.vehicleName.trim()) {
      newErrors.vehicleName = 'Vehicle model is required';
    }

    if (!formData.licensePlate.trim()) {
      newErrors.licensePlate = 'License plate is required';
    } else if (!/^[A-Z0-9-]{3,10}$/i.test(formData.licensePlate)) {
      newErrors.licensePlate = 'Enter a valid license plate';
    }

    if (!formData.ownerName.trim()) {
      newErrors.ownerName = 'Owner name is required';
    }

    if(!formData.year.trim()){
      newErrors.year = 'Year of car is required'
    }

    if (!formData.carColor.trim()) {
      newErrors.carColor = 'Car color is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      setIsSubmitting(true);
      const { data: { user } } = await supabase.auth.getUser(); 
      if (!user) {
          Alert.alert('Error', 'Debe iniciar sesión.');
          return;
      }
      const userId = user.id;
      const { data, error } = await supabase
        .from('vehicles')
        .insert({
          name:formData.vehicleName, 
          license_plate: formData.licensePlate, 
          owner: formData.ownerName,
          color: formData.carColor,
          type: type,
          year: formData.year,
          profiles_id: userId
        }).select().single();
      navigation.goBack();

      if (error) {
        console.error("Error from Supabase:", error);
        const errorMessage = (error.code === '23505') 
        ? 'The license plate is already insert.' 
        : `Error: ${error.message}`;
                  
        Alert.alert('Error', errorMessage);
        throw error;
      }
    }
  };

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
    
    if (errors[field]) {
      setErrors({
        ...errors,
        [field]: null
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 80 : 0}
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
              <Text style={styles.title}>Add New Vehicle</Text>
              <View style={styles.placeholder} />
            </View>
            
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2065/2065065.png' }}
                style={styles.carImage}
                resizeMode="contain"
              />
            </View>
            
            <View style={styles.formContainer}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Vehicle Name *</Text>
                <TextInput 
                  style={[styles.input, errors.vehicleName && styles.inputError]} 
                  placeholder="e.g., Camaro" 
                  placeholderTextColor="#999"
                  value={formData.vehicleName}
                  onChangeText={(text) => handleInputChange('vehicleName', text)}
                />
                {errors.vehicleName && <Text style={styles.errorText}>{errors.vehicleName}</Text>}
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>License Plate *</Text>
                <TextInput 
                  style={[styles.input, errors.licensePlate && styles.inputError]} 
                  placeholder="e.g., ABC-123" 
                  placeholderTextColor="#999"
                  value={formData.licensePlate}
                  onChangeText={(text) => handleInputChange('licensePlate', text.toUpperCase())}
                  autoCapitalize="characters"
                />
                {errors.licensePlate && <Text style={styles.errorText}>{errors.licensePlate}</Text>}
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Owner's Name *</Text>
                <TextInput 
                  style={[styles.input, errors.ownerName && styles.inputError]} 
                  placeholder="e.g., Guero" 
                  placeholderTextColor="#999"
                  value={formData.ownerName}
                  onChangeText={(text) => handleInputChange('ownerName', text)}
                />
                {errors.ownerName && <Text style={styles.errorText}>{errors.ownerName}</Text>}
              </View>
              
              <View style={styles.row}>
                <View style={[styles.inputGroup, styles.flex]}>
                  <Text style={styles.label}>Car Color *</Text>
                  <TextInput 
                    style={[styles.input, errors.carColor && styles.inputError]} 
                    placeholder="e.g., Red" 
                    placeholderTextColor="#999"
                    value={formData.carColor}
                    onChangeText={(text) => handleInputChange('carColor', text)}
                  />
                  {errors.carColor && <Text style={styles.errorText}>{errors.carColor}</Text>}
                </View>
                
                <View style={[styles.inputGroup, styles.flex, styles.leftMargin]}>
                  <Text style={styles.label}>Year</Text>
                  <TextInput 
                    style={[styles.input, errors.year && styles.inputError]} 
                    placeholder="e.g., 2020" 
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    value={formData.year}
                    onChangeText={(text) => handleInputChange('year', text.replace(/[^0-9]/g, ''))}
                    maxLength={4}
                  />
                  {errors.year && <Text style={styles.errorText}>{errors.year}</Text>}
                </View>
              </View>
              
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Model (Optional)</Text>
                <TextInput 
                  style={styles.input} 
                  placeholder="e.g., SS" 
                  placeholderTextColor="#999"
                  value={formData.model}
                  onChangeText={(text) => handleInputChange('model', text)}
                />
              </View>
            </View>
            
            <View style={styles.separator} />
            
            <View style={styles.buttonContainer}>
              <TouchableOpacity 
                style={[styles.button, styles.cancelButton]} 
                onPress={() => navigation.goBack()}
                disabled={isSubmitting}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.button, styles.addButton, isSubmitting && styles.disabledButton]}
                onPress={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <Ionicons name="ios-hourglass" size={20} color="#fff" />
                ) : (
                  <Text style={styles.addButtonText}>Add Vehicle</Text>
                )}
              </TouchableOpacity>
            </View>
            
            <Text style={styles.requiredText}>* Required fields</Text>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
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
    marginBottom: 15,
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
  imageContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  carImage: {
    width: 100,
    height: 80,
    tintColor: '#007AFF',
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
  separator: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  button: {
    flex: 1,
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cancelButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  addButton: {
    backgroundColor: '#007AFF',
  },
  disabledButton: {
    backgroundColor: '#66a3ff',
    opacity: 0.8,
  },
  cancelButtonText: {
    color: '#333',
    fontWeight: '600',
    fontSize: 16,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  requiredText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
    marginTop: 10,
  },
});

export default AddVehicleScreen;