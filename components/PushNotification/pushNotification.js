import React from 'react';
import { SafeAreaView } from 'react-native';
import { Divider, Icon, Layout, Text, TopNavigation, TopNavigationAction, useTheme, Input, Button, } from '@ui-kitten/components';

import PushNotificationIOS from "@react-native-community/push-notification-ios";
var PushNotification = require("react-native-push-notification");

PushNotification.configure({
  // (optional) Called when Token is generated (iOS and Android)
  // onRegister: function (token) {
  //   console.log("TOKEN:", token);
  // },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);

    // process the notification

    // (required) Called when a remote is received or opened, or local notification is opened
    notification.finish(PushNotificationIOS.FetchResult.NoData);
  },

  // IOS ONLY (optional): default: all - Permissions to register.
  permissions: {
    alert: true,
    badge: true,
    sound: true,
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
  requestPermissions: true,
});


const BackIcon = (props) => (
  <Icon {...props} name='arrow-left' />
);

export const Notification = ({ navigation }) => {

  const [value, setValue] = React.useState('');
  const handleClick = () => console.log("value", value);

  const theme = useTheme();

  const notification = () => {
    console.log("notification pushed");
    PushNotification.localNotification({
      foreground: false,
      userInteraction: false,
      message: "My Notification Message",
      userInfo: { id: '123' },
      color: "red",
      ignoreInForeground: false,
      playSound: true,
      soundName: "BadReputation.aiff",
      alertBody: "this is alert Body"
});
}

  const navigateBack = () => {
    navigation.goBack();
  };

  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TopNavigation title='MyApp' alignment='center' accessoryLeft={BackAction} />
      <Divider/>
      <Layout style={{ flex: 1, alignItems: 'center' }}>
        <Text category='h1'>Notification</Text>
      </Layout>
      <Divider/>
      <Layout style={{ flex: 1, alignItems: 'center' }} >
        <Text category='h3'>What is your Notification?</Text>
        <Input
        label={evaProps => <Text {...evaProps}>Label</Text>}
        onChangeText={nextValue => setValue(nextValue)}
        />
        <Button onPress={handleClick} >Display Text</Button>
        <Button onPress={notification} >Notification</Button>

      </Layout>

    </SafeAreaView>
  );
};
