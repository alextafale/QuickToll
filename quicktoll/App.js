import * as WebBrowser from 'expo-web-browser';
import { SQLiteProvider } from 'expo-sqlite';
import StackNavigator from './navigation/StackNavigator';

WebBrowser.maybeCompleteAuthSession();

export default function App() {
  return (
    <SQLiteProvider
      databaseName="app.db"
    >
      <StackNavigator />
    </SQLiteProvider>
  );
}
