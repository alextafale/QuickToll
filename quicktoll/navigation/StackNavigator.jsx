//Imports React and Navigation
import React from "react";
import 'react-native-gesture-handler';
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import NavigationBar from '../components/NavigationBar';

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";


// Imports Auth Screens
import SignUpScreen from '../screens/Auth/SignUpScreen';
import LogInScreen from '../screens/Auth/LogInScreen';
import ChangePasswordScreen from '../screens/Auth/ChangePasswordScreen';
import LogOutScreen from '../screens/Auth/LogOutScreen';

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
import WelcomeScreen from '../screens/Main/WelcomeScreen';

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
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Obtener sesión inicial
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setLoading(false);
    });

    // Escuchar cambios de sesión
    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
      }
    );

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  if (loading) return null; // o tu Splash

    return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {session ? (
          // Usuario logueado
          <>
            <Stack.Screen name="MainApp" component={MainTabNavigator} />
          </>
        ) : (
          // Usuario NO logueado
          <>
            <Stack.Screen name="SplashScreen" component={SplashScreen} />
            <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
            <Stack.Screen name="LogInScreen" component={LogInScreen} />
            <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
            <Stack.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
          </>
        )}

        {/* Screens accesibles desde la app */}
        <Stack.Screen name="AddCardScreen" component={AddCardScreen} />
        <Stack.Screen name="HistoryScreen" component={HistoryScreen} />
        <Stack.Screen name="AddBalancesScreen" component={AddBalancesScreen} />
        <Stack.Screen name="ContactUsScreen" component={ContactUsScreen} />
        <Stack.Screen name="HelpCenterScreen" component={HelpCenterScreen} />
        <Stack.Screen name="PaymentsMethodsScreen" component={PaymentsMethodsScreen} />
        <Stack.Screen name="AddVehicleScreen" component={AddVehicleScreen} />
        <Stack.Screen name="UserScreen" component={UserScreen} />
        <Stack.Screen name="EditInfVehiclesScreen" component={EditInfVehiclesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}