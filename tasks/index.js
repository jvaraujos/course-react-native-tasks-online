import {AppRegistry} from 'react-native';
import Auth from './src/screens/Auth';
import {name as appName} from './app.json';
import 'react-native-gesture-handler'

AppRegistry.registerComponent(appName, () => Auth);
