import { Alert,View, Text, ScrollView, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { clearAllLocalData } from '../../db/sqlite';
import { supabase } from '../../lib/supabase';

const SettingsScreen = ({ navigation }) => {

  const db = useSQLiteContext();

  const confirmLogout = () => {
    Alert.alert(
      'Cerrar sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Cerrar sesión',
          style: 'destructive',
          onPress: async () => {
            await clearAllLocalData(db);
            await supabase.auth.signOut();
          },
        },
      ]
    );
  };


  return (
    <SafeAreaView style={styles.safeArea} edges={['top', 'left', 'right']}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <Text style={styles.title}>Settings</Text>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>
            
            <TouchableOpacity style={styles.option} onPress={() => {navigation.navigate('UserScreen')}}>
              <View style={styles.optionLeft}>
                <Icon name="person" size={24} color="#333" style={styles.icon} />
                <View style={styles.optionContent}>
                  <Text style={styles.optionTitle}>Account Details</Text>
                  <Text style={styles.optionDescription}>Manage your personal information</Text>
                </View>
              </View>
              <Icon name="chevron-right" size={24} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.option} onPress={() => {navigation.navigate('AddCardScreen')}}>
              <View style={styles.optionLeft}>
                <Icon name="payment" size={24} color="#333" style={styles.icon} />
                <View style={styles.optionContent}>
                  <Text style={styles.optionTitle}>Add Card</Text>
                  <Text style={styles.optionDescription}>Add a new payment card</Text>
                </View>
              </View>
              <Icon name="chevron-right" size={24} color="#999" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.option} onPress={() => {navigation.navigate('EditInfVehiclesScreen')}}>
              <View style={styles.optionLeft}>
                <Icon name="directions-car" size={24} color="#333" style={styles.icon} />
                <View style={styles.optionContent}>
                  <Text style={styles.optionTitle}>Vehicles</Text>
                  <Text style={styles.optionDescription}>Manage your vehicle information</Text>
                </View>
              </View>
              <Icon name="chevron-right" size={24} color="#999" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Notifications</Text>
            
            <View style={styles.option}>
              <View style={styles.optionLeft}>
                <Icon name="notifications" size={24} color="#333" style={styles.icon} />
                <View style={styles.optionContent}>
                  <Text style={styles.optionTitle}>Notification Preferences</Text>
                  <Text style={styles.optionDescription}>Manage your notification preferences</Text>
                </View>
              </View>
            </View>
          </View>

       <View style={styles.section}>
            <Text style={styles.sectionTitle}>Account</Text>
            
            <TouchableOpacity style={styles.option} onPress={() => {navigation.navigate('HelpCenterScreen')}}>
              <View style={styles.optionLeft}>
                <Icon name="help-center" size={24} color="#333" style={styles.icon} />
                <View style={styles.optionContent}>
                  <Text style={styles.optionTitle}>Help Center</Text>
                  <Text style={styles.optionDescription}>Get help with QuickTool</Text>
                </View>
              </View>
              <Icon name="chevron-right" size={24} color="#999" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.option} onPress={() => {navigation.navigate('HelpCenterScreen')}}>
              <View style={styles.optionLeft}>
                <Icon name="contact-support" size={24} color="#333" style={styles.icon} />
                <View style={styles.optionContent}>
                  <Text style={styles.optionTitle}>Contact Us</Text>
                  <Text style={styles.optionDescription}>Contact us for support</Text>
                </View>
              </View>
              <Icon name="chevron-right" size={24} color="#999" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.option} onPress={confirmLogout}>
              <View style={styles.optionLeft}>
                <Icon name="logout" size={24} color="#333" style={styles.icon} />
                <View style={styles.optionContent}>
                  <Text style={styles.optionTitle}>Log Out</Text>
                  <Text style={styles.optionDescription}>Log out of your account</Text>
                </View>
              </View>
              <Icon name="chevron-right" size={24} color="#999" />
            </TouchableOpacity>

          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    marginTop: 10,
    color: '#000000'
  },
  section: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 24,
    paddingHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingVertical: 16,
    color: '#000000',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionContent: {
    flex: 1,
    marginLeft: 12,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#000000'
  },
  optionDescription: {
    fontSize: 14,
    color: '#666666'
  },
  icon: {
    width: 24,
    marginRight: 8,
  },
});

export default SettingsScreen;