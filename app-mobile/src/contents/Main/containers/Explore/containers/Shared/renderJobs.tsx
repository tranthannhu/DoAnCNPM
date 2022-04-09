import React, { Component, PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import {
  QuickView,
  Text,
  Container,
  Header,
  Body,
  ButtonGroup,
  Button,
  FlatList,
  Image,
} from '@components';
import NavigationService from '@utils/navigation';
import rootStack from '@contents/routes';
import { setIdIntoParams } from '@utils/appHelper';
import { Icon } from 'react-native-elements';
import Moment from 'moment';
import exploreStack from '../../routes';

const styles = StyleSheet.create({
  listItem: {
    backgroundColor: '#ffffff',
    paddingTop: 15,
    paddingBottom: 20,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
});

export default function renderJobs({ item }: { item: any }): any {
  let typeJob;
  if (item.type === 'FULLTIME') {
    typeJob = (
      <Text
        fontSize={10}
        marginLeft={5}
        style={{
          backgroundColor: '#2DB5FF',
          height: 15,
          color: '#ffffff',
          borderRadius: 3,
          fontWeight: 'bold',
          paddingHorizontal: 3,
        }}
      >
        full time
      </Text>
    );
  } else {
    typeJob = (
      <Text
        fontSize={10}
        marginLeft={5}
        style={{
          backgroundColor: '#e08916',
          height: 15,
          color: '#ffffff',
          borderRadius: 3,
          fontWeight: 'bold',
          paddingHorizontal: 3,
        }}
      >
        part time
      </Text>
    );
  }
  return (
    <QuickView
      style={styles.listItem}
      onPress={() => {
        // NavigationService.navigate(rootStack.exploreStack, {
        //   screen: exploreStack.applicantscreens,
        //   params: setIdIntoParams(item),
        // });
        NavigationService.navigate('JobDetailScreen',
          { jobId: item.id });
      }}
    >
      <QuickView>
        <QuickView row justifyContent="space-between">
          <QuickView row alignItems="center">
            {/* <Avatar source={{ uri: item.user.profile?.profileUrl }} /> */}
            <Image
              source={{ uri: item?.user?.profile?.profileUrl }}
              resizeMode="contain"
              height={50}
              width={50}
            />
            <Text
              color="#173147"
              fontWeight="bold"
              fontSize={20}
              marginLeft={10}
              style={{ opacity: 0.8 }}
            >
              {item?.user?.profile?.name}
            </Text>
          </QuickView>
          <Icon type="material" name="bookmark-border" />
        </QuickView>
        <QuickView marginTop={15}>
          <Text
            color="#1D1D1D"
            fontSize={20}
            fontWeight="bold"
            style={{ letterSpacing: 0.5 }}
            fontFamily="GothamRoundedBold"
          >
            {item.name}
          </Text>
          <QuickView row alignItems="center">
            <Text color="#B5BABD" fontSize={16}>
              Posted on
              {' '}
              {Moment(item.createdat).format('D/M/Y')}
            </Text>
            <Text color="#B5BABD" fontSize={16} marginLeft={30}>
              Expires on
              {' '}
              {Moment(item.deadline).format('D/M/Y')}
            </Text>
          </QuickView>
        </QuickView>
        <QuickView row justifyContent="space-between" marginTop={15}>
          <QuickView row flex={6} alignItems="center">
            <Icon type="entypo" name="location-pin" color="#707070" />
            <Text color="#707070" fontSize={12}>
              {item?.address.description}
            </Text>
          </QuickView>
          <QuickView flex={2} marginLeft={50} row alignItems="center">
            <Icon
              type="antdesign"
              name="clockcircleo"
              size={16}
              color="#707070"
            />
            {typeJob}
          </QuickView>
        </QuickView>
      </QuickView>
    </QuickView>
  );
}
