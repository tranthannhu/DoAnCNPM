import { Body, Button, Container, FlatList, Header, QuickView, Text } from '@components';
import { jobGetList } from '@contents/Main/containers/Explore/redux/slice';
import { RootState } from '@src/redux/reducers';
import { setCurrentTag, setFilter, setIndex, setPage } from '@src/redux/tags/tagsSlice';
import { get } from '@utils/api';
import NavigationService from '@utils/navigation';
import React, { useEffect, useState } from 'react';
import { RefreshControl, ScrollView } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';

export default function SelectTagsScreen() {
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  // const [onActive, setonActive] = useState({ name: '', id: '' });
  const [data, setdata] = useState([]);
  const currentTag = useSelector((state: RootState) => state.tags.currentTag);
  const renderCenterHeaderComponent = () => (
    <QuickView>
      <Text color="#FFFFFF" fontSize={24} fontWeight="bold">
        Pick Tag
      </Text>
    </QuickView>
  );
  const renderRightHeaderComponent = () => {
    return (
      <TouchableRipple
        onPress={() => {
          const s = { $and: [{}] };
          dispatch(setFilter({ s }));
          dispatch(setCurrentTag({ name: '', id: '' }));
          dispatch(jobGetList({ query: {} }));
          dispatch(setIndex(0));
          dispatch(setPage(1));
          NavigationService.goBack();
        }}
      >
        <Text color="#ffffff" fontSize={18}>
          Clear
        </Text>
      </TouchableRipple>
    );
  };
  const renderListCate = ({ item }: { item: any }) => {
    return (
      <TouchableRipple
        style={{
          marginHorizontal: 5,
          marginVertical: 5,
          marginTop: 5,
          borderRadius: 5,
          paddingVertical: 8,
          backgroundColor: (item.id === currentTag.id) ? 'rgba(3, 54, 255, 0.25)' : 'rgba(83, 134, 197, 0.1)',
          paddingHorizontal: 20,
          zIndex: -3,
        }}
        onPress={() => {
          dispatch(setCurrentTag(item));
        }}
      >
        <Text
          color="#0336FF"
          fontWeight="medium"
          center
          fontSize={18}
          fontFamily="GothamRoundedBold"
        >
          {item.name}
        </Text>
      </TouchableRipple>
    );
  };

  const getTags = async () => {
    setRefreshing(true);
    const response = await get('/jobs/tags/all');
    setdata(response.data);
    setRefreshing(false);
  }

  useEffect(() => {
    getTags();
  }, [])

  return (
    <Container>
      <Header
        backIcon
        backgroundColor="#5856d6"
        // height={110}
        centerComponent={renderCenterHeaderComponent()}
        rightComponent={renderRightHeaderComponent()}
      />
      <Body>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={getTags}
            />
          }
        >
          <FlatList
            style={{ marginTop: 20 }}
            data={data}
            renderItem={renderListCate}
            contentContainerStyle={{
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}
          />
        </ScrollView>
        <Button
          title="Done"
          borderRadius={5}
          marginTop={-5}
          paddingVertical={15}
          onPress={() => {
            const s = { $and: [{ 'tags.id': currentTag.id }] };
            dispatch(setFilter({ s }));
            dispatch(jobGetList({ query: { s } }));;
            dispatch(setIndex(0));
            dispatch(setPage(1));
            NavigationService.goBack();
          }}
        />
      </Body>
    </Container>
  );
}