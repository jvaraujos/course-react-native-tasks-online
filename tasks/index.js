import {AppRegistry} from 'react-native';
import Navigator from './src/Navigator';
import {name as appName} from './app.json';
import 'react-native-gesture-handler'
import {LogBox } from 'react-native';
LogBox.ignoreLogs(['Reanimated 2']);

AppRegistry.registerComponent(appName, () => Navigator);
