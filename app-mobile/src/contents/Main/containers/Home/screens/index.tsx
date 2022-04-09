/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import {
  QuickView,
  Text,
  Container,
  Header,
} from '@components';
import { Image } from 'react-native-elements';
import { Dimensions, StyleSheet, StatusBar, View, ActivityIndicator, RefreshControl, FlatList } from 'react-native';
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import NavigationService from '@utils/navigation';
import rootStack from '@contents/routes';
import { get } from '@utils/api';
import { renderListJob } from '../../MyJobs/containers/screens/ViewScreen';
import { tokenContext } from '../../../../../../hooks/tokenContext';
import { LocalNotification } from '@src/services/LocalPushController';
import { flushSync } from 'react-dom';

const { width: screenWidth } = Dimensions.get('window');

const styles = StyleSheet.create({
  footer: {
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  headerStyle: {
    backgroundColor: '#5864ec',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    height: 80,
  },
  listItem: {
    borderRadius: 9,
    backgroundColor: '#ffffff',
    paddingTop: 15,
    paddingBottom: 20,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,

    marginTop: 20,
  },
  articleContent: {
    borderBottomColor: '#d9d9d9',
    borderWidth: 2,
    paddingBottom: 30,
    opacity: 0.7,
    borderRadius: 3,
    borderTopWidth: 0,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderStyle: 'solid',
  },
  tagStyle: {},
  listJob: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    marginHorizontal: 5,
    marginTop: 0,
    width: screenWidth - 60,
  },
});

export default function HomeScreen() {
  const token = useContext(tokenContext);

  const [loading, setLoading] = useState(true);
  const [dataSource, setDataSource] = useState<any>([]);
  const [offset, setOffset] = useState(1);

  useEffect(() => { getData() }, []);

  const getData = async () => {
    flushSync(() => {
      setLoading(true);
    })
    const response = await get('/jobs/rs/all', { page: offset });
    console.log(response.data.data);
    setOffset(offset + 1);
    setDataSource([...dataSource, ...response.data.data]);
    setLoading(false);
  };

  const onRefresh = async () => {
    console.log(offset);
    setLoading(true);
    const response = await get('/jobs/rs/all', { page: 1 });
    setOffset(2);
    setDataSource(response.data.data);
    setLoading(false);
  }

  const renderCenterComponent = () => (
    <QuickView row alignItems="center" marginTop={10}>
      <Text fontSize={18} color="#fff" fontFamily="RobotoBold">IT</Text>
      <QuickView backgroundColor="#fff" borderRadius={20} height={38} width={38}>
        <Image
          source={require('@assets/images/logoJob.png')}
          style={{ width: 40, height: 40 }}
        />
      </QuickView>
    </QuickView>
  );

  const renderFooter = () => {
    return (
      //Footer View with Load More button
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={getData}
          //On Click of button load more data
          style={styles.loadMoreBtn}>
          <Text style={styles.btnText}>Load more</Text>
          {loading ? (
            <ActivityIndicator
              color="white"
              style={{ marginLeft: 8 }} />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <Container>
      <StatusBar backgroundColor="transparent" />
      <Header
        containerStyle={styles.headerStyle}
        centerComponent={renderCenterComponent()}
      />
      {token ? (
        <Container
          backgroundColor="#1f4780"
          paddingHorizontal={5}
        >
          <QuickView
            paddingVertical={10}
            row
            justifyContent="space-between"
            paddingHorizontal={5}
          >
            <Text fontWeight="bold" color="#fff" fontSize={15}>
              Việc làm đề xuất cho bạn
            </Text>
            <TouchableOpacity
              onPress={() => {
                LocalNotification({
                  bigText: 'This is local notification demo in React Native app. Only shown, when expanded.',
                  subText: 'Local Notification Demo',
                  title: 'Local Notification Title',
                  message: 'Expand me to see more',
                });
              }}
            >
              <Text color="#fff" fontSize={12} underline>
                Xem thêm
              </Text>
            </TouchableOpacity>
          </QuickView>

          <FlatList
            style={{ height: '100%' }}
            data={dataSource}
            renderItem={renderListJob}
            ListFooterComponent={renderFooter}
            keyExtractor={(item) => item?.id}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={onRefresh}
              />
            }
          />
        </Container>
      ) : (
        <QuickView paddingHorizontal={50}>
          <QuickView
            style={{
              backgroundColor: '#ffffff',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 5,
              },
              borderRadius: 10,
              shadowOpacity: 0.36,
              shadowRadius: 6.68,
              elevation: 11,
            }}
          >
            <Image
              source={{
                uri:
                  'https://www.orangescrum.com/blog/wp-content/uploads/2019/10/6-Reasons-you-should-Adopt-Agile-Project-Management-NOW.jpg',
              }}
              style={{ height: 100 }}
              width={200}
              resizeMode="cover"
            />
            <QuickView paddingHorizontal={10} paddingVertical={20}>
              <Text color="#000">Become an Applicant</Text>
              <Text color="#52504e">
                When you fill in the registration form, you have mandotary
                field an optional fields. Mandatory fields will have red
                asterisc
              </Text>
              {/* <Button title="Login or Register"/> */}
              <TouchableWithoutFeedback
                onPress={() => {
                  NavigationService.navigate(rootStack.authStack);
                }}
              >
                <Text center marginTop={5} color="#4771b5">
                  Login or Register
                </Text>
              </TouchableWithoutFeedback>
            </QuickView>
          </QuickView>
        </QuickView>
      )}
    </Container>
  );
}
