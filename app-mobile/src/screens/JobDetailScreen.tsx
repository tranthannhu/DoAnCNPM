import React, { useEffect } from 'react';
import { RefreshControl, TouchableOpacity } from 'react-native';
import {
  QuickView,
  Text,
  Container,
  Header,
  Body,
  ParallaxScrollView,
  Image,
} from '@components';
import TopTabs from '@contents/Main/containers/Explore/containers/screens/TopTabs';
import NavigationService from '@utils/navigation';
import rootStack from '@contents/routes';
import exploreStack from '@contents/Main/containers/Explore/routes';
import { Global } from '@utils/appHelper';
import { useSelector } from 'react-redux';
import { favorite, fetchJobDetail, fetchJobDetailNoUpdate } from '@src/redux/jobDetail/jobDetailSlice';
import { RootState, useAppThunkDispatch } from '@src/redux/reducers';
import { ActivityIndicator, IconButton, TouchableRipple } from 'react-native-paper';
import { headerHeight } from '@themes/ThemeComponent/Common/CommonProps';
import moment from 'moment';



export default function JobDetailScreen({ route: { params: { jobId } } }: { route: { params: { jobId: string } } }) {
  const dispatch = useAppThunkDispatch();
  // const data: any = useSelector((state: RootState) => state.jobDetail.data);
  const loading: boolean = useSelector((state: RootState) => state.jobDetail.loading);
  const isAccepted: boolean = useSelector((state: RootState) => state.jobDetail.data?.isAccepted);
  const isDenied: boolean = useSelector((state: RootState) => state.jobDetail.data?.isDenied);
  const isApplied: boolean = useSelector((state: RootState) => state.jobDetail.data?.isApplied);
  const isFavorite: boolean = useSelector((state: RootState) => state.jobDetail.data?.isFavorite);
  const introImg = useSelector((state: RootState) => state.jobDetail.data?.introImg);
  const profileUrl = useSelector((state: RootState) => state.jobDetail.data?.user?.profile?.profileUrl);
  const name = useSelector((state: RootState) => state.jobDetail.data?.user?.profile?.name);
  const lowestWage = useSelector((state: RootState) => state.jobDetail.data?.lowestWage);
  const highestWage = useSelector((state: RootState) => state.jobDetail.data?.highestWage);
  const deadline = useSelector((state: RootState) => state.jobDetail.data?.deadline);


  const { token } = Global;
  const datediff = useSelector((state: RootState) => state.jobDetail.datediff);

  useEffect(() => {
    console.log('did mount', jobId);
    dispatch(fetchJobDetail(jobId));
  }, [jobId]);

  return (
    // <View></View>
    <Container>
      <ParallaxScrollView
        refreshControl={<RefreshControl refreshing={loading} onRefresh={() => { dispatch(fetchJobDetailNoUpdate(jobId)) }} />}
        parallaxHeaderHeight={200}
        backgroundImageSource={{
          uri: introImg,
        }}
        renderStickyHeader={() => <Header title='Job Detail' />}
        stickyHeaderHeight={headerHeight}
      >
        <Body>
          <Image
            source={{
              uri: profileUrl,
            }}
            width={100}
            height={100}
            center
            resizeMode="contain"
            containerStyle={{ marginTop: 20 }}
          />
          <Text
            marginTop={10}
            fontSize={30}
            fontWeight="medium"
            fontFamily="GothamRoundedBold"
            color="#000000"
            center
            style={{ opacity: 0.8 }}
          >
            {name}
          </Text>

          <QuickView
            justifyContent="center"
            alignItems="center"
            marginTop={20}
          >
            <Text
              fontSize={20}
              color="#188ded"
              fontWeight="bold"
              fontFamily="GothamRoundedBold"
            >
              {`$${lowestWage}`}
              -
              {`$${highestWage}`}
            </Text>
          </QuickView>

          <QuickView row justifyContent="space-between" margin={20}>
            <QuickView row alignItems="center">
              <Text color="#a09a9a" fontSize={15}>
                {datediff}
              </Text>
            </QuickView>
            <Text color="#B5BABD" >
              Expires on {moment(deadline).format('D/M/Y')}
            </Text>
          </QuickView>
          <QuickView row alignItems="center">
            <TouchableRipple
              style={{
                backgroundColor: '#dee1e3',
                borderRadius: 5,
              }}
              onPress={() => { dispatch(favorite(jobId)); }}
            >
              {isFavorite ?
                <IconButton icon='heart' size={30} color="#b3296b" />
                :
                <IconButton icon='heart-outline' size={30} color="#b3296b" />
              }
            </TouchableRipple>
            <QuickView flex={10} paddingLeft={10}>
              <TouchableOpacity
                style={{
                  backgroundColor: `${isAccepted ? '#64dd17' : isDenied ? '#f44336' : isApplied ? '#a298e3' : '#6e5ce6'}`,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 15,
                  borderRadius: 5,
                }}
                onPress={async () => {
                  console.log('applied');
                  if (!token) {
                    NavigationService.navigate(rootStack.authStack);
                  } else {
                    NavigationService.navigate(exploreStack.applyScreen, {
                      jobId,
                    });
                  }
                }}
              >
                <Text color="#ffffff" fontWeight="medium" fontSize={18}>
                  {isAccepted ? 'Accepted' : isDenied ? 'Denied' : isApplied ? 'Pending' : 'Apply Now'}
                </Text>
              </TouchableOpacity>
            </QuickView>
          </QuickView>
          <TopTabs />
        </Body>
      </ParallaxScrollView>


    </Container>

  );
}
