import React from 'react';
import { Container, QuickView, Text } from '@components';
import { useSelector } from 'react-redux';
import RenderHtml from 'react-native-render-html';
import MapView, { Marker } from 'react-native-maps';
import { Dimensions, ScrollView, useWindowDimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import { RootState } from '@src/redux/reducers';

export default function CompanyIntroductionScreen() {
  const screenWidth = Math.round(Dimensions.get('window').width);
  const data = useSelector((state: RootState) => state.jobDetail.data);

  return (
    <Container>
      <QuickView marginTop={20} marginLeft={20}>
        <Text color="#000" bold>
          Introduction
        </Text>
        <RenderHtml contentWidth={useWindowDimensions().width} source={{ html: data?.user?.profile?.introduction }} />

      </QuickView>
      <QuickView marginTop={20} marginLeft={20}>
        <Text color="#000" bold>
          Contact:
        </Text>
      </QuickView>
      <QuickView row marginLeft={10} marginTop={5}>
        <Icon type="evilicon" name="location" />
        <Text color="#4f4d4d">{data?.address?.description}</Text>
      </QuickView>
      <QuickView center>
        <MapView
          // ref={(m) => {
          //   map = m;
          // }}
          style={{ flex: 1, width: screenWidth - 30 }}
          initialRegion={{
            latitude: 16.06375,
            longitude: 108.17969,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          <Marker
            coordinate={{
              latitude: 16.06375,
              longitude: 108.17969,
            }}
          />
        </MapView>
      </QuickView>
    </Container>
  );
}
