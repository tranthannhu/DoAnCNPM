import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  Container, Header, QuickView, Text,
} from '@components';
import axios from 'axios';
import {
  Linking, StatusBar, Alert, StyleSheet, ScrollView, RefreshControl,
} from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Icon, Divider } from 'react-native-elements';
import DocumentPicker from 'react-native-document-picker';
import { get, post, del } from '@utils/api';
import { logout } from '@contents/Auth/containers/Index/Login/redux/slice';
import NavigationService from '@utils/navigation';

const styles = StyleSheet.create({
  listItem: {

    borderRadius: 9,
    zIndex: -3,
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
    marginBottom: 15,
    flexGrow: 0,
  },
});

export default function CVScreen() {
  const [listCV, setlistCV] = useState([]);
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    onRefresh();
  }, [])

  const onRefresh = React.useCallback(() => {
    setisLoading(true);
    get('/apply/cv').then((response) => {
      setisLoading(false);
      setlistCV(response.data)
    })
      .catch((err) => {
        setisLoading(false);
        if (err.message === "Unauthorized") {
          Alert.alert('Session', 'Session timeout, please login again');
          dispatch(logout());
          NavigationService.popToTop();
        };
      });
  }, []);

  const renderCenterComponent = () => (
    <Text color="#fff" fontSize={20} fontWeight="bold">
      Manage CV
    </Text>
  );

  const renderRightComponent = () => (
    <Icon
      name="plus"
      type="antdesign"
      color="white"
      onPress={async () => {
        try {
          const uploadFile = await DocumentPicker.pickSingle({
            type: [
              DocumentPicker.types.pdf,
              DocumentPicker.types.docx,
              DocumentPicker.types.doc,
              DocumentPicker.types.images
            ],
          });
          const image: any = {
            uri: uploadFile.uri,
            type: uploadFile.type,
            name: uploadFile.name,
          };
          const file = new FormData();
          file.append('file', image);
          const result: any = await axios.post(
            'https://vietdanh.bike/api/v1/apply/upload',
            file,
            {
              headers: {
                'Content-Type': 'multipart/form-data; ',
              },
            },
          );

          await post(
            `/apply/cv`,
            {
              name: image.name,
              cvURL: result.data.data.url,
            },
          );
          if (result.data.data.url) {
            setisLoading(false)
            Alert.alert('Add successful!');
            onRefresh();
          }
        } catch (err) {
          console.log('err', err);
        }
      }}
    />
  );

  const renderListCV = ({ item }: { item: any }) => (
    <QuickView>
      <QuickView style={styles.listItem}>
        <QuickView marginTop={10}>
          <Text
            color="#1D1D1D"
            fontSize={16}
            fontWeight="bold"
            style={{ letterSpacing: 0.5 }}
            fontFamily="GothamRoundedBold"
          >
            File name:
          </Text>
          <Text
            color="#1D1D1D"
            fontSize={16}
          >
            {item.name}
          </Text>
        </QuickView>
        <QuickView marginTop={10}>
          <Text
            color="#1D1D1D"
            fontSize={16}
            fontWeight="bold"
            style={{ letterSpacing: 0.5 }}
            fontFamily="GothamRoundedBold"
          >
            Link :
            {' '}
          </Text>
          <Text
            color="#1D1D1D"
            fontSize={16}
          >
            {item.cvURL}
          </Text>
        </QuickView>
        <Divider style={{ backgroundColor: '#000', marginTop: 10 }} />
        <QuickView row justifyContent="space-around" marginTop={15}>
          <Icon
            name="eye"
            color="rgba(173, 181, 189, 0.7)"
            type="antdesign"
            // style={{ marginRight: 20, paddingRight:20 }}
            onPress={() => { Linking.openURL(item.cvURL); }}
          />
          <Icon
            // style={{ marginLeft: 20, justifyContent: 'center' }}
            name="delete"
            color="rgba(173, 181, 189, 0.7)"
            type="antdesign"

            onPress={() => {
              del(
                `/apply/cv/${item.id}`,
              ).then((response) => { Alert.alert('Alert', JSON.stringify(response?.data)); onRefresh(); });
            }}
          />
        </QuickView>
      </QuickView>
    </QuickView>
  );

  return (
    <Container>
      <StatusBar backgroundColor="transparent" />
      <Header
        backIcon
        leftColor="#fff"
        backgroundColor="#5760eb"
        // height={100}
        centerComponent={renderCenterComponent()}
        rightComponent={renderRightComponent()}
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={onRefresh}
          />
        }
      >
        {(listCV.length > 0) ?
          (
            <QuickView alignItems="center" flex={1}>
              <FlatList
                data={listCV}
                renderItem={renderListCV}
                contentContainerStyle={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}
              />
            </QuickView>
          ) : (
            <QuickView row alignItems="center">
              <Text>No CV in your profile, please click + button to add one</Text>
            </QuickView>
          )
        }
      </ScrollView>
    </Container>
  );

}


