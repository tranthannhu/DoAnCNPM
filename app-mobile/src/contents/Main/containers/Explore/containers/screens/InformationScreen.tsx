/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useSelector } from 'react-redux';
import {
  Container, QuickView, Text, FlatList,
} from '@components';
import { Divider } from 'react-native-elements';
import RenderHtml from 'react-native-render-html';
import { ActivityIndicator, useWindowDimensions } from 'react-native';
import Moment from 'moment';
import { RootState } from '@src/redux/reducers';
import { typeJob } from '@contents/Main/containers/MyJobs/containers/screens/ViewScreen';



export default function InformationScreen() {
  const data = useSelector((state: RootState) => state.jobDetail.data);
  const loading = useSelector((state: RootState) => state.jobDetail.loading);
  const { width } = useWindowDimensions();

  const renderListTags = ({ item }: { item: any }) => (
    <QuickView
      backgroundColor="#E3F8F9"
      marginLeft={10}
      marginTop={10}
      borderRadius={5}
      paddingHorizontal={10}
      paddingVertical={2}
    >
      <Text
        color="#04B9D0"
        fontWeight="bold"
        fontSize={14}
        fontFamily="GothamRoundedBold"
      >
        {item?.name}
      </Text>
    </QuickView>
  );

  return (
    <Container>
      <QuickView marginTop={20}>
        <QuickView alignItems="center">
          <Text
            fontSize={28}
            color="#1D1D1D"
            fontWeight="bold"
            fontFamily="GothamRoundedBold"
            style={{ textAlign: 'center' }}
          >
            {data?.name}
          </Text>
        </QuickView>
        <QuickView row justifyContent="space-between" marginTop={15}>
          <QuickView row>
            <Text
              color="#B5BABD"
              fontFamily="GothamRoundedBold"
              style={{ opacity: 0.5 }}
            >
              Posted on
            </Text>
            <Text color="#B5BABD" marginLeft={5}>
              {Moment(data?.createdat).format('D/M/Y')}
            </Text>
          </QuickView>
          <QuickView>
            {data?.type ? typeJob(data.type) : null}
          </QuickView>
        </QuickView>
        <Divider
          style={{ backgroundColor: '#d9d9d9', height: 2, marginTop: 10 }}
        />
        <QuickView row alignItems="flex-start" marginTop={10} justifyContent="space-between">
          <QuickView flex={1} paddingHorizontal={10}>
            <Text
              color="#1D1D1D"
              fontWeight="bold"
              fontFamily="GothamRoundedBold"
              fontSize={14}
              numberOfLines={3}
            >
              COMPANY
            </Text>
            <Text color="#B5BABD" fontSize={14}>
              {data?.user?.profile?.name}
            </Text>
          </QuickView>
          <QuickView flex={1} paddingHorizontal={10}>
            <Text
              color="#1D1D1D"
              fontWeight="bold"
              fontFamily="GothamRoundedBold"
              fontSize={14}
              style={{ textAlign: "right" }}
            >
              LOCATION
            </Text>
            <Text color="#B5BABD" fontSize={14} style={{ textAlign: "right" }} numberOfLines={3}>
              {data?.address?.description}
            </Text>
          </QuickView>
        </QuickView>

        <QuickView>
          <FlatList
            data={data?.tags}
            renderItem={renderListTags}
            contentContainerStyle={{
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}
          />
        </QuickView>
        {loading ? (
          <QuickView>
            <ActivityIndicator size="large" color="#ff6a00" />
          </QuickView>
        ) : (
          <QuickView marginTop={10}>
            <Text
              color="#1D1D1D"
              fontWeight="bold"
              fontFamily="GothamRoundedBold"
              fontSize={14}
              style={{paddingHorizontal: 10}}
            >
              JOB DESCRIPTION:
            </Text>
            <RenderHtml contentWidth={width} source={{ html: data?.description }} />
            <RenderHtml contentWidth={width} source={{ html: data?.content }} />
          </QuickView>
        )}
      </QuickView>
    </Container>
  );

}
