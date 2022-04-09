/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import {
  QuickView, Text, Container, Header, Button,
} from '@components';
import { StatusBar } from 'react-native';
import { Global } from '@utils/appHelper';
import NavigationService from '@utils/navigation';
import rootStack from '@contents/routes';
import MyJobTopTab from '../containers/index.toptab';
import { tokenContext } from '../../../../../../hooks/tokenContext';

export default function MyJobScreen() {
  const token = useContext(tokenContext);
  return (
    <Container>
      <StatusBar backgroundColor="transparent" />
      <Header
        // backIcon
        leftColor="#fff"
        backgroundColor="#5864ec"
        // height={80}
        title="My Job"
      />
      {token ? (
        <MyJobTopTab />
      ) : (
        <QuickView justifyContent="center" alignItems="center" flex={1}>
          <Text fontSize={20}>You are not logged in now.</Text>
          <Button onPress={() => { NavigationService.navigate(rootStack.authStack); }} title="Login or Register" />
        </QuickView>

      )}
    </Container>
  );
}
