import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Container, Header, QuickView, Text, Button,
} from '@components';
import { RefreshControl, StatusBar, StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import NavigationService from '@utils/navigation';
import { applyObjectSelector, parseObjectSelector } from '@utils/selector';
import LogoutButton from '@contents/Auth/containers/Index/Login/Shared/LogoutButton';
import rootStack from '@contents/routes';
import { Global } from '@utils/appHelper';
import { profileSelector } from '../redux/selector';
import profileStack from '../routes';
import { RootState } from '@src/redux/reducers';
import { profileGetDetail } from '../redux/slice';
import { Divider, List, Paragraph } from 'react-native-paper';
import AvatarContainer from '@components/AvatarContainer';
import { put } from '@utils/api';

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontFamily: 'Gill Sans',
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
  },
  avatar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },
  informationCard: {
    width: '100%',
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
  },
});

export default function ProfileScreen() {
  const dispatch = useDispatch();
  const { data } = useSelector(
    (state) => parseObjectSelector(applyObjectSelector(profileSelector, state))
  );
  const refreshing = useSelector((state: RootState) => parseObjectSelector(applyObjectSelector(profileSelector, state)).loading);
  const { token } = Global;

  const onRefresh = () => {
    if (token) {
      dispatch(profileGetDetail({}));
    }
  }
  useEffect(() => {
    onRefresh();
    console.log(JSON.stringify(data));
  }, []);

  const handleChangeAvatar = async (url: string) => {
    console.log(url);
    put('/auth/me/avatar', { profileUrl: url }).then(() => { onRefresh() })
  };

  return (
    <Container>
      <StatusBar backgroundColor="transparent" />
      <Header
        leftColor="#fff"
        backgroundColor="#5864ec"
        title="Profile"
        rightComponent={(
          <QuickView row justifyContent="center" alignItems="center">
            <LogoutButton fontSize={14} backgroundColor="transparent" />
          </QuickView>
        )}
      />
      {token ? (
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
          <AvatarContainer initialImage={data?.profile?.profileUrl} onChangeImage={handleChangeAvatar} />
          <Divider />
          <Text style={{ padding: 20, fontSize: 40, textAlign: "center" }}>{data?.profile?.name}</Text>
          <Divider />
          <List.Item
            onPress={() => { }}
            left={() => <List.Icon icon="phone" />}
            title={
              <View>
                <Paragraph style={{ fontSize: 17 }}>{data?.profile?.phone ? data?.profile?.phone : '0905268245'}</Paragraph>
              </View>
            }
            right={() => <List.Icon icon="message-text" />}
          />
          <Divider />
          <List.Item
            onPress={() => { }}
            left={() => <List.Icon icon="email" />}
            title={
              <View>
                <Paragraph style={{ fontSize: 17 }}>{data?.email}</Paragraph>
              </View>
            }
            right={() => <List.Icon icon="message-text" />}
          />
          <QuickView style={styles.informationCard}>
            <Button
              onPress={() => {
                NavigationService.navigate(profileStack.CVScreen);
              }}
              title='Manage your CV'
            />
          </QuickView>
        </ScrollView>
      ) : (
        <QuickView justifyContent="center" alignItems="center" flex={1}>
          <Text fontSize={20}>You are not logged in now.</Text>
          <Button onPress={() => { NavigationService.navigate(rootStack.authStack); }} title="Login or Register" />
        </QuickView>
      )}
    </Container>
  );
}
