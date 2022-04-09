import { post } from '@utils/api';
import React, { useEffect } from 'react'
import PushNotification, { Importance } from 'react-native-push-notification'
import { LocalNotification, Notification } from './LocalPushController';

const RemotePushController = () => {
  useEffect(() => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {
        console.log("TOKEN:", token);
        post('/auth/appToken', { appToken: token.token });
      },

      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        console.log('REMOTE NOTIFICATION ==>', notification)

        // process the notification here
        if (notification.foreground && !notification.userInteraction) {
          LocalNotification(notification as unknown as Notification)
        }
      },

      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      // Android only: GCM or FCM Sender ID
      popInitialNotification: true,
      requestPermissions: true
    });

    PushNotification.createChannel(
      {
        channelId: "default-channel-id", // (required)
        channelName: `Default channel`, // (required)
        channelDescription: "A default channel", // (optional) default: undefined.
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
        playSound: true,
      },
      (created) => console.log(`createChannel 'default-channel-id' returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }, [])



  return null
}

export default RemotePushController