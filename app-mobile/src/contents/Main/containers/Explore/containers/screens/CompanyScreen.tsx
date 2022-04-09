import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Container, QuickView, Text } from '@components';
import { Divider, Icon } from 'react-native-elements';
import RenderHtml from 'react-native-render-html';
import NavigationService from '@utils/navigation';
import exploreStack from '../../routes';
import { useWindowDimensions } from 'react-native';
import { RootState } from '@src/redux/reducers';


export default function CompanyScreen() {
  const data = useSelector((state: RootState) => state.jobDetail.data);
  return (
    <Container>
      <QuickView>
        <Text color="#4f4d4d" marginTop={20} fontSize={18} bold>
          {data?.user?.profile?.name} Company
        </Text>
        <Button
          onPress={() => {
            NavigationService.navigate(exploreStack.companyDetailScreen);
          }}
          title='View Detail'
        >
          <Icon
            type="evilicon"
            name="arrow-right"
            size={16}
            color="#6e5ce6"
            style={{ marginLeft: 10 }}
          />
        </Button>

        <QuickView row marginTop={20} alignItems="center">
          <Icon type="evilicon" name="location" size={20} color="#6e5ce6" />
          <Text numberOfLines={2} marginLeft={10} color="#4f4d4d">
            {data?.address?.description}
          </Text>
        </QuickView>
        <QuickView row marginTop={20} alignItems="center">
          <Icon type="foundation" name="web" size={20} color="#6e5ce6" />
          <Text numberOfLines={2} marginLeft={10} color="#4f4d4d">
            Website
          </Text>
          <Text marginLeft={5}>{data?.user?.profile?.pageURL}</Text>
        </QuickView>
        <Divider style={{ marginTop: 50, height: 1 }} />
        <QuickView marginTop={10}>
          <Text fontSize={20} color="#4f4d4d">
            Introduce Company
          </Text>
          <QuickView marginTop={20}>
            <RenderHtml contentWidth={useWindowDimensions().width} source={{ html: data?.user?.profile?.introduction }} />
          </QuickView>
        </QuickView>
      </QuickView>
    </Container>
  );

}