import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from "react-redux"
import { store, persistor } from "./src/redux/store"
import { PersistGate } from "redux-persist/integration/react";
import Toast from 'react-native-toast-message'

import { AppRegistry } from 'react-native';
import App from './src';
import { name as appName } from './app.json';

const AppWithRouter = () => (
  <ReduxProvider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <SafeAreaProvider>
        <NavigationContainer>
          <App />
          <Toast />
        </NavigationContainer>
      </SafeAreaProvider>
    </PersistGate>
  </ReduxProvider>
);

AppRegistry.registerComponent(appName, () => AppWithRouter);
