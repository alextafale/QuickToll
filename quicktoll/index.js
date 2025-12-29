import * as WebBrowser from 'expo-web-browser';
import { registerRootComponent } from 'expo';
import StackNavigator from './navigation/StackNavigator';

WebBrowser.maybeCompleteAuthSession();

registerRootComponent(StackNavigator);