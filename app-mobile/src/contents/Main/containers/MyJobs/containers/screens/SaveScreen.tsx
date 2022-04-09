/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  QuickView,
  Text,
  Container,
  Avatar,
  FlatList,
} from '@components';
import { StyleSheet } from 'react-native';
import NavigationService from '@utils/navigation';
import { Icon } from 'react-native-elements';
import {
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import Moment from 'moment';
import { myJobsGetFavorite } from '../../redux/slice';
import { isFavorite } from '../../../Explore/redux/api';
import mainBottomTab from '@contents/Main/routes';
import { renderListJob } from './ViewScreen';

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
  myFavoriteJobs: any;
}

interface State {
  refreshing: boolean
}

class SaveScreen extends PureComponent<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  componentDidMount() {
    this.handleRefresh();
  }

  handleRefresh() {
    this.setState({ refreshing: true }, () => {
      this.getData();
    });
  }

  getData() {
    const { getList } = this.props;
    getList();
    this.setState({ refreshing: false });
  }

  // renderListJob = ({ item }: { item: any }) => {
  //   const { getList } = this.props;
  //   let typeJob;
  //   if (item.type === 'FULLTIME') {
  //     typeJob = (
  //       <Text
  //         fontSize={10}
  //         marginLeft={5}
  //         style={{
  //           backgroundColor: '#2DB5FF',
  //           height: 15,
  //           color: '#ffffff',
  //           borderRadius: 3,
  //           fontWeight: 'bold',
  //           paddingHorizontal: 3,
  //         }}
  //       >
  //         full time
  //       </Text>
  //     );
  //   } else {
  //     typeJob = (
  //       <Text
  //         fontSize={10}
  //         marginLeft={5}
  //         style={{
  //           backgroundColor: '#e08916',
  //           height: 15,
  //           color: '#ffffff',
  //           borderRadius: 3,
  //           fontWeight: 'bold',
  //           paddingHorizontal: 3,
  //         }}
  //       >
  //         part time
  //       </Text>
  //     );
  //   }
  //   return (
  //     <TouchableWithoutFeedback
  //       style={styles.listItem}
  //       onPress={() => NavigationService.navigate(mainBottomTab.exploreStack, {
  //         screen: "JobDetailScreen",
  //         params: { jobId: item.id },
  //       })}
  //     >
  //       <QuickView>
  //         <QuickView row justifyContent="space-between">
  //           <QuickView row alignItems="center" flex={8}>
  //             <Avatar source={{ uri: item.user.profile?.profileUrl }} />
  //             <Text
  //               color="#173147"
  //               fontWeight="bold"
  //               fontSize={20}
  //               marginLeft={10}
  //               style={{ opacity: 0.8 }}
  //             >
  //               {item.user.profile?.name}
  //             </Text>
  //           </QuickView>
  //           <QuickView flex={1}>
  //             <Icon
  //               type="antdesign"
  //               name="hearto"
  //               style={{ zIndex: 3 }}
  //               color="#f05b65"
  //               onPress={async () => {
  //                 await isFavorite(item.id);
  //                 getList();
  //               }}
  //             />
  //           </QuickView>
  //         </QuickView>
  //         <QuickView marginTop={15}>
  //           <Text
  //             color="#1D1D1D"
  //             fontSize={20}
  //             fontWeight="bold"
  //             style={{ letterSpacing: 0.5 }}
  //             fontFamily="GothamRoundedBold"
  //           >
  //             {item.name}
  //           </Text>
  //           <QuickView row alignItems="center">
  //             <Text color="#B5BABD" fontSize={16}>
  //               Posted on
  //               {' '}
  //               {Moment(item.createdat).format('D/M/Y')}
  //             </Text>
  //             <Text color="#B5BABD" fontSize={16} marginLeft={30}>
  //               Expires on
  //               {' '}
  //               {Moment(item.deadline).format('D/M/Y')}
  //             </Text>
  //           </QuickView>
  //         </QuickView>
  //         <QuickView row justifyContent="space-between" marginTop={15}>
  //           <QuickView row flex={6} alignItems="center">
  //             <Icon type="entypo" name="location-pin" color="#707070" />
  //             <Text color="#707070" fontSize={12}>
  //               417 Wallet Street New York USA
  //             </Text>
  //           </QuickView>
  //           <QuickView flex={2} marginLeft={50} row alignItems="center">
  //             <Icon
  //               type="antdesign"
  //               name="clockcircleo"
  //               size={16}
  //               color="#707070"
  //             />
  //             {typeJob}
  //           </QuickView>
  //         </QuickView>
  //       </QuickView>
  //     </TouchableWithoutFeedback>
  //   );
  // };

  render() {
    const {
      myFavoriteJobs: { metadata },
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
  myFavoriteJobs: state.myJobs.toJS().LIST_FAVORITE,
});

const mapDispatchToProps = (dispatch: any) => ({
  getList: () => dispatch(myJobsGetFavorite({})),
});

export default connect(mapStateToProps, mapDispatchToProps)(SaveScreen);
