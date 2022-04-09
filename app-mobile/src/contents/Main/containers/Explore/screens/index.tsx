/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  QuickView,
  Text,
  Container,
  Header,
  ButtonGroup,
  FlatList,
  Image,
} from '@components';
import {
  Icon,
} from 'react-native-elements';
import {
  StyleSheet,
  Dimensions,
  ImageBackground,
  ActivityIndicator,
  StatusBar,
  RefreshControl,
} from 'react-native';
import {
  TouchableOpacity,
} from 'react-native-gesture-handler';
import NavigationService from '@utils/navigation';
import { TQuery } from '@utils/redux';
import { applyArraySelector, parseArraySelector } from '@utils/selector';
import exploreStack from '../routes';
import { jobGetList } from '../redux/slice';
import { jobListSelector } from '../redux/selector';
import { renderListJob } from '../../MyJobs/containers/screens/ViewScreen';
import { setCurrentTag, setIndex, setPage } from '@src/redux/tags/tagsSlice';
import { RootState } from '@src/redux/reducers';
import { Divider } from 'react-native-paper';

const { width: screenWidth } = Dimensions.get('window');
const styles = StyleSheet.create({
  item: {
    width: screenWidth - 60,
    height: 200,
    marginLeft: 60,
    marginRight: 60,
  },
  imageContainer: {
    flex: 1,
    maxHeight: 150,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  image: {
    width: screenWidth - 60,
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
  },
  containerSearch: {
    borderTopColor: 'transparent',
    borderBottomColor: 'transparent',
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    borderRadius: 5,
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
    justifyContent: 'center',
    height: 50,
  },
  imageStyle: {
    flex: 1,
    height: 550,
    resizeMode: 'cover',
  },
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

const titleList = [
  'All',
  'Mobile',
  'Full stack',
  'Backend',
  'Frontend',
  'Engineer',
];

export default function ExploreScreen() {
  const dispatch = useDispatch();
  const [onEndReachedCalledDuringMomentum, setonEndReachedCalledDuringMomentum] = useState(true);
  const getList = (query?: TQuery) => dispatch(jobGetList({ query }));
  const currentTag = useSelector((state: RootState) => state.tags.currentTag);
  const index = useSelector((state: RootState) => state.tags.index);
  const page = useSelector((state: RootState) => state.tags.page);

  const data = useSelector((state: RootState) =>
    parseArraySelector(applyArraySelector(jobListSelector, state)).data
  );
  const loading = useSelector((state: RootState) =>
    parseArraySelector(applyArraySelector(jobListSelector, state)).loading
  );
  const error = useSelector((state: RootState) =>
    parseArraySelector(applyArraySelector(jobListSelector, state)).error
  );

  useEffect(() => {
    getList({});
  }, [])

  const onItemPress = (index: number) => {
    if (index === 0) {
      getList({});
      dispatch(setCurrentTag({ name: '', id: '' }))
      dispatch(setPage(1));
      dispatch(setIndex(index));
    }
    else {
      const payload: TQuery = {
        s: { name: { $contL: titleList[index] } },
        limit: 10,
      };
      getList(payload);
      dispatch(setCurrentTag({ name: '', id: '' }));
      dispatch(setPage(1));
      dispatch(setIndex(index));
    }
  };

  const renderRightComponent = () => (
    <QuickView row alignItems="center">
      <Icon
        type="antdesign"
        name="search1"
        color="#fff"
        onPress={() => {
          NavigationService.navigate(exploreStack.searchScreen)
        }}
      />
    </QuickView>
  );

  const loadMoreData = () => {
    const payload: TQuery = {
      limit: 10,
      page: page + 1,
      s: {
        name: { $contL: (index === 0) ? '' : titleList[index] },
        ...(currentTag.id && { $and: [{ 'tags.id': currentTag.id }] })
      },

    };
    getList(payload);
  };

  const onEndReached = () => {
    if (!onEndReachedCalledDuringMomentum) {
      loadMoreData();
      setonEndReachedCalledDuringMomentum(true);
    }
  }

  return (
    <Container>
      <StatusBar backgroundColor="transparent" />
      <ImageBackground
        style={styles.imageStyle}
        source={{
          uri:
            'https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
        }}
      >
        <Header
          title="Explore Jobs"
          rightComponent={renderRightComponent()}
        />
        <QuickView
          style={{ backgroundColor: '#fff' }}
          borderTopLeftRadius={5}
          borderTopRightRadius={5}
        >
          <QuickView />
          <QuickView row marginTop={15} paddingHorizontal={20}>
            <QuickView flex={6}>
              <Text color="#707070" fontFamily="GothamRoundedBold">
                {/* Top Companies */}
                Tag: {currentTag.name}
              </Text>
            </QuickView>
            <TouchableOpacity
              style={{ flex: 1 }}
              onPress={() => {
                NavigationService.navigate(exploreStack.selectCateScreen);
              }}
            >
              <Icon type="material" name="tune" color="#707070" />
            </TouchableOpacity>
          </QuickView>
          <QuickView>
            <ButtonGroup
              activeIndex={index}
              marginHorizontal={15}
              titleList={titleList}
              onItemPress={onItemPress}
              defaultActiveIndex={0}
              propsChange={false}
              outline={false}
              activeBackgroundColor="#9EB6FF"
              backgroundColor="#FFFF"
              titleColor="#707070"
              activeTitleColor="#FFF"
            />
          </QuickView>
        </QuickView>
        <Divider />
        <FlatList
          onEndReached={onEndReached}
          onMomentumScrollBegin={() => { setonEndReachedCalledDuringMomentum(false); }}
          refreshControl={
            <RefreshControl
              refreshing={loading}
              onRefresh={() => { onItemPress(index) }}
            />
          }
          data={data}
          renderItem={(item) => renderListJob(item, true)}
          onEndReachedThreshold={0}
          ListFooterComponent={() =>
            (loading) ?
              (
                <QuickView style={{ flex: 1, alignItems: 'center' }}>
                  <ActivityIndicator size="large" color="#ff6a00" />
                </QuickView>
              ) :
              (error) ?
                <Text
                  style={{
                    paddingHorizontal: 80,
                    textAlign: 'center',
                    color: '#000',
                  }}
                  bold
                >
                  {JSON.stringify(error)}
                </Text> : null
          }
        />
        {data?.length > 0 ? null : (
          <QuickView
            backgroundColor="#fff"
            flex={1}
            alignItems="center"
            justifyContent="center"
          >
            <Image
              source={{
                uri:
                  'https://www.startupindia.gov.in/content/dam/invest-india/Blogs/404.PNG',
              }}
              style={{ width: '100%' }}
            />
            <QuickView>
              <Text
                style={{
                  paddingHorizontal: 80,
                  textAlign: 'center',
                  color: '#000',
                }}
                bold
              >
                We have not found jobs for this search at the moment
              </Text>
            </QuickView>
          </QuickView>
        )}
      </ImageBackground>
    </Container>
  );
}
