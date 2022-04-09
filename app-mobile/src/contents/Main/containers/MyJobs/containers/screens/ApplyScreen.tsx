/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  QuickView,
  Container,
  FlatList,
} from '@components';
import { StyleSheet } from 'react-native';
import { myJobsGetApplied } from '../../redux/slice';
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
  myAppliedJobs: any;
}

interface State {
  refreshing: boolean
}

class ApplyScreen extends PureComponent<Props, State> {
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

  render() {
    const {
      myAppliedJobs: { metadata },
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
  myAppliedJobs: state.myJobs.toJS().LIST_APPLIED,
});

const mapDispatchToProps = (dispatch: any) => ({
  getList: () => dispatch(myJobsGetApplied({})),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplyScreen);
