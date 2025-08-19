import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import {HistoryScreen} from '../src/HistoryScreen';
import {HomeScreen} from '../src/HomeScreen';
import {LogInScreen} from '../src/LogInScreen';
import {PaymentsScreen} from '../src/PaymentsScreen';
import {SettingsScreen} from '../src/SettingsScreen';
import {SignUpScreen} from '../src/SignUpScreen';
import {SplashScreen} from '../src/SplashScreen';


const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Vinicio">    
                <Stack.Screen component={SplashScreen} options={{headerShown: false}}/>
                <Stack.Screen component={HomeScreen} options={{headerShown: false}}/>
                <Stack.Screen name="LogIn" component={LogInScreen} options= {{headerShown: false}}/>
                <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}}/>
                <Stack.Screen name="History" component={HistoryScreen} options= {{headerShown: false}}/>
                <Stack.Screen name="Payments" component={PaymentsScreen} options= {{headerShown: false}}/>
                <Stack.Screen name="Settings" component={SettingsScreen} options= {{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;