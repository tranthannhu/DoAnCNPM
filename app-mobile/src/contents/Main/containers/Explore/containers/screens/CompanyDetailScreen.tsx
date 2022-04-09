import {
  BackIcon,
  Container,
  QuickView,
  Text,
} from '@components';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { ImageBackground, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import CompanyTopTabs from './TopTabsCompany';
import { RootState } from '@src/redux/reducers';

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
  },
  child: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});

export default function CompanyDetailScreen() {
  const data = useSelector((state: RootState) => state.jobDetail.data);
  return (
    <Container>
      <BackIcon />
      <QuickView>
        <ImageBackground source={{ uri: data?.introImg }} style={styles.image}>
          <QuickView style={styles.child} />
        </ImageBackground>
        <QuickView
          row
          position="absolute"
          bottom={0}
          center
          style={{ zIndex: 999 }}
        >
          <QuickView flex={1}>
            <FastImage
              style={{ height: 60, width: 60 }}
              source={{
                uri: data?.user?.profile?.profileUrl,
                headers: { Authorization: 'someAuthToken' },
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </QuickView>
          <QuickView flex={4}>
            <Text color="#fff" fontSize={20} fontWeight="bold">
              {data?.name}
            </Text>
            <Text color="#fff">{data?.user?.profile?.name}</Text>
          </QuickView>
        </QuickView>
      </QuickView>
      <CompanyTopTabs />
    </Container>
  );
}
