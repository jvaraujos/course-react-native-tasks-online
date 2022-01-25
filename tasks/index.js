import {AppRegistry} from 'react-native';
import Navigator from './src/Navigator';
import {name as appName} from './app.json';
import 'react-native-gesture-handler'

AppRegistry.registerComponent(appName, () => Navigator);
