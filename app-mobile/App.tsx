import { persistor, store } from '@src/redux/store';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import AppContainer from './src/app/app.container';
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import RemotePushController from '@src/services/RemotePushController';


export default function App() {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <PaperProvider theme={DefaultTheme}>
              <AppContainer />
              <RemotePushController />
            </PaperProvider>
          </PersistGate>
        </Provider>
        <StatusBar />
      </SafeAreaProvider>
    );
  }
}
