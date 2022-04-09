import {
  Body,
  Button,
  Container,
  FlatList,
  Header,
  QuickView,
  Text,
} from '@components';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withTheme } from 'react-native-elements';
import { TQuery } from '@utils/redux';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { jobGetList, jobGetListCate, setFilter, setMoreFilter } from '../../redux/slice';
import NavigationService from '@utils/navigation';
import exploreStack from '../../routes';

interface Props {
  theme?: any;
  getListCate: any;
  listCate: any;
  setFilterRedux: any;
  getList: any;
  setMoreCategory: any;
}

interface State {
  onActive: number;
  categoryName: string;
}

class SelectCateDetail extends PureComponent<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      onActive: 0,
      categoryName: ''
    };
  }

  componentDidMount() {
    const { getListCate } = this.props;
    getListCate();
  }

  renderListCate = ({ item }: { item: any }) => {
    const { onActive } = this.state;
    if (item.id === onActive) {
      return (
        <TouchableOpacity
          style={{
            marginHorizontal: 5,
            marginVertical: 5,
            marginTop: 5,
            borderRadius: 5,
            paddingVertical: 8,
            backgroundColor: 'rgba(3, 54, 255, 0.25)',
            paddingHorizontal: 20,
            zIndex: -3,
          }}
          onPress={() => {
            this.setState({ onActive: item.id, categoryName: item.name });
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
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        style={{
          marginHorizontal: 5,
          marginVertical: 5,
          marginTop: 5,
          borderRadius: 5,
          paddingVertical: 8,
          backgroundColor: 'rgba(83, 134, 197, 0.1)',
          paddingHorizontal: 20,
          zIndex: -3,
        }}
        onPress={() => {
          this.setState({ onActive: item.id, categoryName: item.name });
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
      </TouchableOpacity>
    );
  };

  renderCenterHeaderComponent = () => (
    <QuickView>
      <Text color="#FFFFFF" fontSize={24} fontWeight="bold">
        Pick topics of your interest
      </Text>
    </QuickView>
  );

  renderRightHeaderComponent = () => {
    const { setFilterRedux, getList } = this.props;
    return (
      <TouchableOpacity
        onPress={() => {
          const s = { $and: [{}] };
          setFilterRedux({ s });
          getList({ s });
          NavigationService.goBack();
        }}
      >
        <Text color="#ffffff" fontSize={18}>
          Clear
        </Text>
      </TouchableOpacity>
    );
  };

  // selectOneCate = () => {

  // }
  render() {
    const {
      listCate: { metadata },
      setFilterRedux,
      getList,
    } = this.props;
    const { onActive } = this.state;
    return (
      <Container>
        <Header
          backIcon
          backgroundColor="#5856d6"
          height={150}
          centerComponent={this.renderCenterHeaderComponent()}
          rightComponent={this.renderRightHeaderComponent()}
        />
        <Body>
          <ScrollView>
            <FlatList
              style={{ marginTop: 20 }}
              data={metadata}
              renderItem={this.renderListCate}
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
              const s = { $and: [{ 'categories.id': onActive }] };
              setFilterRedux({ s });
              this.props.setMoreCategory(this.state.categoryName);
              getList({ s });
              NavigationService.goBack();
            }}
          />
        </Body>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  listCate: state.job.toJS().LIST_CATE,
});

const mapDispatchToProps = (dispatch: any) => ({
  getListCate: (query?: TQuery) => dispatch(jobGetListCate({ query })),
  setFilterRedux: (s: any) => dispatch(setFilter({ s })),
  getList: (query?: TQuery) => dispatch(jobGetList({ query })),
  setMoreCategory: (s: string) => dispatch(setMoreFilter(s)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(SelectCateDetail as any));
