import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

// Main Screens
import AddCardScreen from '../screens/Main/AddCardScreen';
import AddBalancesScreen from '../screens/Main/AddBalancesScreen';
import HistoryScreen from '../screens/Main/HistoryScreen';
import HomeScreen from '../screens/Main/HomeScreen';
import PaymentsMethodsScreen from '../screens/Main/PaymentsMethodsScreen';
import PaymentsScreen from '../screens/Main/PaymentsScreen';
import SettingsScreen from '../screens/Main/SettingsScreen';
import VehicleScreen from '../screens/Main/VehicleScreen';
import AddVehicleScreen from '../screens/Main/AddVehicleScreen';
import UserScreen from '../screens/Main/UserScreen';
import EditInfVehiclesScreen from '../screens/Main/EditInfVehiclesScreen';
// Support Screens
import ContactUsScreen from '../screens/Support/ContactUsScreen';
import HelpCenterScreen from '../screens/Support/HelpCenterScreen';

// Splash
import SplashScreen from '../screens/SplashScreen';
import NavigationBar from '../components/NavigationBar';

export default function MainTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => <NavigationBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ tabBarLabel: 'Home' }}
      />
      <Tab.Screen
        name="Vehicles"
        component={VehicleScreen}
        options={{ tabBarLabel: 'Vehicles' }}
      />
      <Tab.Screen
        name="PaymentsScreen"
        component={PaymentsScreen}
        options={{ tabBarLabel: 'Payments' }}
      />
      <Tab.Screen
        name="SettingsScreen"
        component={SettingsScreen}
        options={{ tabBarLabel: 'Settings' }}
      />
    </Tab.Navigator>
  );
};
