import PushNotification, { Importance } from 'react-native-push-notification'

// PushNotification.configure({
//   // (required) Called when a remote or local notification is opened or received
//   onNotification: function (notification) {
//     console.log('LOCAL NOTIFICATION ==>', notification)
//   },

//   popInitialNotification: true,
//   requestPermissions: true
// })

// PushNotification.deleteChannel("default-channel-id");

export type Notification = {
  foreground?: boolean;
  message: string;
  priority?: string;
  sound?: string;
  title: string;
  subText?: string | undefined;
  bigText?: string | undefined;
}


export const LocalNotification = (nt: Notification) => {
  console.log(nt);
  PushNotification.localNotification({
    channelId: "default-channel-id",
    autoCancel: true,
    bigText: nt.bigText || nt.message || 'This is local notification demo in React Native app. Only shown, when expanded.',
    subText: nt.subText || 'Local Notification Demo',
    title: nt.title || 'Local Notification Title',
    message: nt.message || 'Expand me to see more',
    vibrate: true,
    vibration: 300,
    playSound: true,
    soundName: 'default',
    // actions: ["Yes", "No"]
  })
}