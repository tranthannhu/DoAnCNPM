import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  QuickView,
  Text,
  Container,
  FlatList,
  Image,
} from '@components';
import { StyleSheet } from 'react-native';
import { Icon } from 'react-native-elements';
import NavigationService from '@utils/navigation';
import Moment from 'moment';
import { myJobsGetRecently } from '../../redux/slice';
import mainBottomTab from '@contents/Main/routes';
import { IconButton, TouchableRipple } from 'react-native-paper';
import rootStack from '@contents/routes';

export const typeJob = (type: string) => {
  if (type === 'FULLTIME') {
    return (
      <Text
        fontSize={10}
        marginLeft={5}
        style={{
          backgroundColor: '#2DB5FF',
          // height: 15,
          color: '#ffffff',
          borderRadius: 3,
          fontWeight: 'bold',
          paddingHorizontal: 5,
          paddingVertical: 5
        }}
      >
        full time
      </Text>
    );
  } else {
    return (
      <Text
        fontSize={10}
        marginLeft={5}
        style={{
          backgroundColor: '#e08916',
          // height: 15,
          color: '#ffffff',
          borderRadius: 3,
          fontWeight: 'bold',
          paddingHorizontal: 5,
          paddingVertical: 5
        }}
      >
        part time
      </Text>
    );
  }
}


export const renderListJob = ({ item }: { item: any }, inExplore?: any) => {

  return (
    <TouchableRipple
      style={
        {
          ...styles.listItem,
          ...{ backgroundColor: item?.isAccepted ? '#b2ff59' : item?.isDenied ? '#ffcdd2' : '#ffffff' },
        }
      }
      {...(inExplore ? {
        onPress: () => NavigationService.navigate(
          "JobDetailScreen",
          { jobId: item.id }
        )
      } : {
        onPress: () => NavigationService.push(rootStack.mainBottomTab, {
          screen: mainBottomTab.exploreStack, params: {
            screen: "JobDetailScreen",
            params: { jobId: item.id },
          }
        })
      })}
    >
      <QuickView>
        <QuickView row justifyContent="space-between">
          <QuickView row alignItems="center" flex={8} >
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
              style={{ opacity: 0.8, minWidth: 0, paddingRight: 35 }}
            >
              {item?.user?.profile?.name}
            </Text>
          </QuickView>

          <QuickView >
            {item?.isAccepted ?
              <Text
                fontSize={10}
                // marginLeft={5}
                style={{
                  backgroundColor: '#33691e',
                  color: '#ffffff',
                  borderRadius: 3,
                  fontWeight: 'bold',
                  paddingHorizontal: 5,
                  paddingVertical: 5,
                }}
              >
                Accepted
              </Text>
              : item?.isDenied ?
                <Text
                  fontSize={10}
                  // marginLeft={5}
                  style={{
                    backgroundColor: '#b71c1c',
                    color: '#ffffff',
                    borderRadius: 3,
                    fontWeight: 'bold',
                    paddingHorizontal: 5,
                    paddingVertical: 5
                  }}
                >
                  Denied
                </Text>
                : null
            }
            {item?.isFavorite ? <IconButton icon='heart' size={30} color="#b3296b" /> : null}
          </QuickView>


        </QuickView>
        <QuickView marginTop={15}>
          <Text
            color="#1D1D1D"
            fontSize={20}
            fontWeight="bold"
            style={{ letterSpacing: 0.5 }}
            fontFamily="GothamRoundedBold"
          >
            {item?.name}
          </Text>
          <QuickView row alignItems="center" justifyContent="space-between">
            <Text color="#B5BABD" fontSize={15}>
              Posted on
              {' '}
              {Moment(item?.createdat).format('D/M/Y')}
            </Text>
            <Text color="#B5BABD" fontSize={15}>
              Expires on
              {' '}
              {Moment(item?.deadline).format('D/M/Y')}
            </Text>
          </QuickView>
        </QuickView>
        <QuickView row justifyContent="space-between" marginTop={7}>
          <QuickView row flex={6} alignItems="center">
            <Icon type="entypo" name="location-pin" color="#707070" />
            <Text color="#707070" fontSize={12} numberOfLines={1}>
              {item?.address?.description || '417 Wallet Street New York USA'}
            </Text>
          </QuickView>
          <QuickView flex={2} marginLeft={50} row alignItems="center">
            <Icon
              type="antdesign"
              name="clockcircleo"
              size={16}
              color="#707070"
            />
            {typeJob(item?.type)}
          </QuickView>
        </QuickView>
      </QuickView>
    </TouchableRipple >
  );
};


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
  },
});

interface Props {
  getList: () => any;
  myRecentlyJob: any;
}

interface State {
  refreshing: boolean
}

class ViewScreen extends PureComponent<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  componentDidMount() {
    this.handleRefresh();
  }

  getData() {
    const { getList } = this.props;
    getList();
    this.setState({ refreshing: false });
  }

  handleRefresh() {
    this.setState({ refreshing: true }, () => {
      this.getData();
    });
  }


  render() {
    const {
      myRecentlyJob: { metadata },
    } = this.props;

    return (
      <Container>
        <QuickView>
          <FlatList
            style={{ height: '100%' }}
            data={metadata}
            renderItem={renderListJob}
            refreshing={this.state.refreshing}
            onRefresh={() => this.handleRefresh()}
          />
        </QuickView>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  myRecentlyJob: state.myJobs.toJS().LIST_RECENTLY,
});

const mapDispatchToProps = (dispatch: any) => ({
  getList: () => dispatch(myJobsGetRecently({})),
});

export default connect(mapStateToProps, mapDispatchToProps)(ViewScreen);
