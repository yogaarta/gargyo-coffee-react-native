import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReduxProvider } from "react-redux"
import { store, persistor } from "./src/redux/store"
import { PersistGate } from "redux-persist/integration/react";
import Toast from 'react-native-toast-message'

import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";

import { AppRegistry, Platform } from 'react-native';
import App from './src';
import { name as appName } from './app.json';


// Must be outside of any component LifeCycle (such as `componentDidMount`).
PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  onRegister: function (token) {
    console.log("TOKEN:", token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    // notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);

    // process the action
  },

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError: function(err) {
    console.error(err.message, err);
  },

  // Should the initial notification be popped automatically
  // default: true
  popInitialNotification: true,

  /**
   * (optional) default: true
   * - Specified if permissions (ios) and token (android and ios) will requested or not,
   * - if not, you must call PushNotificationsHandler.requestPermissions() later
   * - if you are not using remote notification or do not have Firebase installed, use this:
   *     requestPermissions: Platform.OS === 'ios'
   */
  requestPermissions: Platform.OS === 'ios',
});

PushNotification.createChannel({
  channelId: "local-notification", // (required)
  channelName: "Local Notification", // (required)
},
(created) => console.log(`createChannel returned '${created ? 'created': 'avalaible'}'`) // (optional) callback returns whether the channel was created, false means it already existed.
)

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
