import {
  Container,
  // FlatList,
  Header,
  QuickView,
  Text,
} from '@components';
import { TQuery } from '@utils/redux';
import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, RefreshControl, StatusBar, View } from 'react-native';
import { SearchBar, Tooltip } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import * as _ from 'lodash';
import { applyArraySelector, parseArraySelector } from '@utils/selector';
import { jobListSearchSelector } from '../../redux/selector';
import { jobGetListSearch } from '../../redux/slice';
import { RootState } from '@src/redux/reducers';
import { renderListJob } from '@contents/Main/containers/MyJobs/containers/screens/ViewScreen';
import { Divider, Menu, Portal, Provider, TouchableRipple, Button, List, Card, Surface, IconButton } from 'react-native-paper';
import { get } from '@utils/api';
import { headerHeight } from '@themes/ThemeComponent/Common/CommonProps';

const screenWidth = Math.round(Dimensions.get('window').width);

export default function SearchScreen() {
  const [search, setsearch] = useState('');
  const dispatch = useDispatch();
  const getListSearch = (query?: TQuery) => dispatch(jobGetListSearch({ query }));
  const metadata = useSelector((state: RootState) => parseArraySelector(applyArraySelector(jobListSearchSelector, state)).metadata);
  const data = useSelector((state: RootState) => parseArraySelector(applyArraySelector(jobListSearchSelector, state)).data);
  const loading = useSelector((state: RootState) => parseArraySelector(applyArraySelector(jobListSearchSelector, state)).loading);

  const [visible, setVisible] = useState(true);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const [autoComplete, setautoComplete] = useState<{ name: string, id: string }[]>([]);

  const flatListRef = useRef<FlatList>(null);
  const toTop = () => {
    // use current
    flatListRef?.current?.scrollToOffset({ animated: true, offset: 0 })
  }

  const getSearchAutoComplete = async (s: string) => {
    const response = await get('/jobs/search/autocomplete', { s: s });
    console.log(response.data);
    setautoComplete(response.data);
    openMenu();
  }

  const renderCenterComponent = () => {
    return (
      <SearchBar
        containerStyle={{
          borderRadius: 10,
          width: screenWidth - 20,
          height: 40,
          alignSelf: 'center',
          justifyContent: 'center',
          backgroundColor: '#d8d4dc',
        }}
        inputStyle={{ fontSize: 14 }}
        placeholder="Type Here ..."
        platform="android"
        clearIcon
        returnKeyType="search"
        onChangeText={(text) => {
          setsearch(text);
          getSearchAutoComplete(text);
        }}
        value={search}
        searchIcon
        placeholderTextColor="black"
        cancelIcon
        onSubmitEditing={() => {
          sendSearchRequest(search);
          closeMenu();
        }}
        onCancel={() => closeMenu()}
        onFocus={() => openMenu()}
      />
    );
  };
  const sendSearchRequest = (payload: any) => {
    const objectFilter: any = [];
    objectFilter.push({ name: { $contL: payload } });
    objectFilter.push({ 'tags.name': { $contL: payload } });
    objectFilter.push({ 'user.profile.name': { $contL: payload } });
    objectFilter.push({ 'address.description': { $contL: payload } });
    const s = {
      $or: objectFilter,
    };
    getListSearch({ s, limit: 9999 });
    toTop();
  };
  return (
    <Container>
      <Portal.Host>
        <StatusBar backgroundColor="transparent" />
        <Header
          backIcon
          title="Job search"
        />

        <QuickView backgroundColor="white" height={80} justifyContent="center" shadow>
          {renderCenterComponent()}

          <Portal>
            {visible ?
              <View
                style={{
                  top: headerHeight + 50, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, backgroundColor: '#E0E7EA',
                  marginHorizontal: 10
                }}
              >
                <Divider />
                {autoComplete.map((i) => (
                  <List.Item
                    key={i.id}
                    title={i.name}
                    style={{}}
                    onPress={() => {
                      setsearch(i.name);
                      sendSearchRequest(i.name);
                      closeMenu();
                    }}
                  />
                )
                )}
              </View> : null}

          </Portal>

          <Text fontSize={14} color="black" marginLeft={20}>
            {metadata.total}
            {' '}
            jobs matched
          </Text>


        </QuickView>

        <QuickView alignItems="center" flex={1}>
          <FlatList
            ref={flatListRef}
            data={data}
            renderItem={renderListJob}
            contentContainerStyle={{ flexGrow: 0 }}
            refreshControl={
              <RefreshControl
                size={0}
                refreshing={loading}
                onRefresh={() => sendSearchRequest(search)}
              />
            }
          />
        </QuickView>
      </Portal.Host>
    </Container >
  );
}