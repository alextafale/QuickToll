//Imports React and Navigation
import React from "react";
import 'react-native-gesture-handler';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import NavigationBar from '../components/NavigationBar';

// Imports Auth Screens
import SignUpScreen from '../screens/Auth/SignUpScreen';
import LogInScreen from '../screens/Auth/LogInScreen';
import ForgottenPasswordScreen from '../screens/Auth/ForgottenPasswordScreen';

// Main Screens
import AddBalancesScreen from '../screens/Main/AddBalancesScreen';
import HistoryScreen from '../screens/Main/HistoryScreen';
import HomeScreen from '../screens/Main/HomeScreen';
import PaymentsMethodsScreen from '../screens/Main/PaymentsMethodsScreen';
import PaymentsScreen from '../screens/Main/PaymentsScreen';
import SettingsScreen from '../screens/Main/SettingsScreen';
import VehicleScreen from '../screens/Main/VehicleScreen';

// Support Screens
import ContactUsScreen from '../screens/Support/ContactUsScreen';
import HelpCenterScreen from '../screens/Support/HelpCenterScreen';

// Splash
import SplashScreen from '../screens/SplashScreen';

// CONST Stack AND TABS
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Tab Navigator for main app screens
function MainTabNavigator() {
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
        name="HistoryScreen"
        component={HistoryScreen}
        options={{ tabBarLabel: 'History' }}
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
}
// Stack Navigator for the entire app
export default function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen" screenOptions={{ headerShown: false }}>
        {/* Auth Flow Screens */}
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LogInScreen" component={LogInScreen} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
        <Stack.Screen name="ForgottenPasswordScreen" component={ForgottenPasswordScreen} />
        
        {/* Main App with Tab Navigation - CORRECCIÓN AQUÍ */}
        <Stack.Screen name="MainApp" component={MainTabNavigator} />
        
        {/* Modal Screens (accessed from tabs) */}
        <Stack.Screen name="AddBalancesScreen" component={AddBalancesScreen} />
        <Stack.Screen name="ContactUsScreen" component={ContactUsScreen} />
        <Stack.Screen name="HelpCenterScreen" component={HelpCenterScreen} />
        <Stack.Screen name="PaymentsMethodsScreen" component={PaymentsMethodsScreen} />
        <Stack.Screen name="VehicleScreen" component={VehicleScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}