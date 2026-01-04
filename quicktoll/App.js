import * as WebBrowser from 'expo-web-browser';
import StackNavigator from './navigation/StackNavigator';
import { View } from 'react-native';

WebBrowser.maybeCompleteAuthSession();


export default function App() {
  return <StackNavigator />;
}
