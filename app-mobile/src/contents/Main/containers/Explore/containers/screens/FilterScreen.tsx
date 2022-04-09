/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import {
  Container,
  QuickView,
  Text,
  Header,
  FlatList,
  Picker,
  Button,
  Body,
  ListCheckBox,
} from '@components';
import { Icon, Slider } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import * as _ from 'lodash';
import { Dimensions, StatusBar } from 'react-native';
import NavigationService from '@utils/navigation';
import { stringifyQuery, TQuery } from '@utils/redux';
import { jobGetList, setFilter } from '../../redux/slice';

const jobType = [
  { id: 0, name: 'Full Time', type: 'FULLTIME' },
  { id: 1, name: 'Fresher' },
  { id: 2, name: 'Work at home' },
  { id: 3, name: 'Freelancer' },
  { id: 4, name: 'Part time', type: 'PARTTIME' },
  { id: 5, name: 'Contact' },
];
interface Props {
  theme?: any;
  setFilterRedux?: any;
  getList: any;
  filterObject: any;
}
interface State {
  jobStatus: Array<any>;
  MultiSliderFristvalue: number;
  multiValue: Array<string>;
  MultiSliderSecondvalue: number;
  selectedSalary?: any;
  selectedCity?: any;
}
const screenWidth = Math.round(Dimensions.get('window').width);
const options = [
  { name: 'Swedish', value: 'sv' },
  { name: 'English', value: 'en' },
];

const companyList = [
  {
    id: 1,
    name: 'IT software',
  },
  {
    id: 2,
    name: 'Call centre',
  },
  {
    id: 3,
    name: 'The Banking',
  },
  {
    id: 4,
    name: 'Datahouse Asia',
  },
  {
    id: 5,
    name: 'Real Estate',
  },
  {
    id: 6,
    name: 'Entertainment',
  },
];
const data = [
  { id: '1', name: '< 500$' },
  { id: '2', name: '500$ to 1000$' },
  { id: '3', name: '1000$ to 1500$' },
  { id: '4', name: '1500$ to 2000$' },
  { id: '5', name: '2000$ to 3000$' },
  { id: '6', name: 'Above 3000$' },
];
class FilterScreen extends PureComponent<Props, State> {
  private pickerRef: any;

  constructor(props: any) {
    super(props);
    this.state = {
      jobStatus: new Array(jobType.length).fill(false),
      MultiSliderFristvalue: 3,
      MultiSliderSecondvalue: 7,
      multiValue: [],
    };
  }

  componentDidMount() {
    if (this.props.filterObject.hasOwnProperty('s')) {
      const {
        filterObject: {
          s: { $and },
        },
      } = this.props;
      $and.forEach((data: any) => {
        if (data.hasOwnProperty('type') && data.type == 'FULLTIME') {
          this.setState((state) => {
            state.jobStatus[0] = true;
          });
        }
        if (data.hasOwnProperty('address.city')) {
          this.setState({ selectedCity: data['address.city'] });
        }
      });
    }
    this.setState({ selectedSalary: 1 });

    this.forceUpdate();
  }

  applyFilter = async () => {
    const { jobStatus, selectedSalary, selectedCity } = this.state;
    const { setFilterRedux, getList, filterObject } = this.props;
    const querySelected: Array<any> = [];
    const index = _.findIndex(jobStatus, (status) => status === true);
    const objectFilter = [];
    if (index >= 0) {
      objectFilter.push({ type: jobType[index].type });
    }
    if (selectedSalary && selectedSalary.id == 1) {
      objectFilter.push({ lowestWage: { $lt: 500 } });
    }
    if (selectedSalary && selectedSalary.id == 2) {
      objectFilter.push(
        { lowestWage: { $gt: 500 } },
        { highestWage: { $lt: 1000 } },
      );
    }
    if (selectedSalary && selectedSalary.id == 3) {
      objectFilter.push(
        { lowestWage: { $gt: 1000 } },
        { highestWage: { $lt: 1500 } },
      );
    }
    if (selectedSalary && selectedSalary.id == 4) {
      objectFilter.push(
        { lowestWage: { $gt: 1500 } },
        { highestWage: { $lt: 2000 } },
      );
    }
    if (selectedSalary && selectedSalary.id == 5) {
      objectFilter.push(
        { lowestWage: { $gt: 2000 } },
        { highestWage: { $lt: 3000 } },
      );
    }
    if (selectedSalary && selectedSalary.id == 6) {
      objectFilter.push({ lowestWage: { $gt: 3000 } });
    }
    if (selectedCity) {
      console.log('selected city', selectedCity);

      objectFilter.push({ 'address.city': selectedCity });
    }
    const s = {
      $and: objectFilter,
    };

    setFilterRedux({ s });

    getList({ s });
    NavigationService.goBack();
  };
  findObject = (value: any) => {
    const result = _.find(data, function (o) {
      return o.id == value[0];
    });
    this.setState({ selectedSalary: result });
  };

  renderJobsType = ({ item }: { item: any }) => {
    const { jobStatus } = this.state;
    if (!jobStatus[item.id]) {
      return (
        <TouchableOpacity
          onPress={() => {
            jobStatus.forEach((_data, index) => {
              if (item.id === index) {
                this.setState((state) => {
                  state.jobStatus[item.id] = !state.jobStatus[item.id];
                });
              } else {
                this.setState((state) => {
                  state.jobStatus[index] = false;
                });
              }
            });

            // this.state.jobStatus[item.id] = !this.state.jobStatus[item.id];
            this.forceUpdate();
          }}
          style={{
            marginHorizontal: 5,
            marginVertical: 5,
            marginTop: 5,
            borderRadius: 10,
          }}
        >
          <LinearGradient
            colors={['#ffffff', '#ffffff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              paddingHorizontal: 20,
              borderRadius: 7,
              paddingVertical: 8,
              borderWidth: 1,
              borderColor: '#eaecef',
            }}
          >
            <Text
              color="#7b7b7b"
              fontWeight="bold"
              fontSize={14}
              fontFamily="GothamRoundedBold"
            >
              {item.name}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      );
    }
    return (
      <TouchableOpacity
        onPress={() => {
          this.setState((state) => {
            state.jobStatus[item.id] = !state.jobStatus[item.id];
          });
          this.forceUpdate();
        }}
        style={{
          marginHorizontal: 5,
          marginVertical: 5,
          marginTop: 5,
          borderRadius: 7,
        }}
      >
        <LinearGradient
          colors={['#554ef5', '#9230f3']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            paddingHorizontal: 20,
            borderRadius: 3,
            paddingVertical: 8,
          }}
        >
          <Text
            color="#c0c2c4"
            fontWeight="bold"
            fontSize={14}
            fontFamily="GothamRoundedBold"
          >
            {item.name}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  renderListCompany = ({ item }: { item: any }) => {
    const { jobStatus } = this.state;
    if (!jobStatus[item.id]) {
      return (
        <TouchableOpacity
          onPress={() => {
            this.setState((state) => {
              state.jobStatus[item.id] = !state.jobStatus[item.id];
            });
            this.forceUpdate();
          }}
          style={{
            marginHorizontal: 5,
            marginVertical: 5,
            marginTop: 5,
            borderRadius: 10,
          }}
        >
          <LinearGradient
            colors={['#fff', '#fff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              paddingHorizontal: 20,
              borderRadius: 3,
              paddingVertical: 8,
              borderWidth: 1,
              borderColor: '#d7d9db',
            }}
          >
            <Text
              color="#929496"
              fontWeight="bold"
              fontSize={14}
              fontFamily="GothamRoundedBold"
            >
              {item.name}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      );
    }
    return (

      <TouchableOpacity
        onPress={() => {
          this.setState((state) => {
            state.jobStatus[item.id] = !state.jobStatus[item.id];
          });
          this.forceUpdate();
        }}
        style={{
          marginHorizontal: 5,
          marginVertical: 5,
          marginTop: 5,
          borderRadius: 10,
        }}
      >
        <LinearGradient
          colors={['#4124e3', '#8252e3']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            paddingHorizontal: 20,
            borderRadius: 3,
            paddingVertical: 8,
          }}
        >
          <Text
            color="#c0c2c4"
            fontWeight="bold"
            fontSize={14}
            fontFamily="GothamRoundedBold"
          >
            {item.name}
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  renderCenterComponent = () => (
    <QuickView>
      <Text fontWeight="bold" color="#000" fontSize={18}>
        Filter
      </Text>
    </QuickView>
  );

  renderLeftComponent = () => (
    <Icon
      type="antdesign"
      name="close"
      onPress={() => {
        NavigationService.goBack();
      }}
    />
  );

  multiSliderValuesChange = (values: any) => {
    this.setState({ MultiSliderFristvalue: values[0] });
    this.setState({ MultiSliderSecondvalue: values[1] });
    console.log('value', values);
  };

  render() {
    const {
      MultiSliderSecondvalue,
      MultiSliderFristvalue,
      multiValue,
      selectedCity,
      selectedSalary,
    } = this.state;

    return (
      <Container>
        <StatusBar barStyle="dark-content" />
        <Header
          // height={100}
          // backgroundColor="#f5f5f9"
          leftComponent={this.renderLeftComponent()}
          centerComponent={this.renderCenterComponent()}
        />
        <Body>
          <ScrollView>
            <QuickView marginTop={30}>
              <Text fontSize={20} fontWeight="bold" color="#838383">
                Job Type
              </Text>
              <QuickView marginTop={30}>
                <FlatList
                  data={jobType}
                  renderItem={this.renderJobsType}
                  contentContainerStyle={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                  }}
                />
              </QuickView>
            </QuickView>
            <QuickView marginTop={10}>
              <QuickView row marginTop={20} marginBottom={10}>
                <Icon type="material-community" name="city" color="#64b4d9" />
                <Text
                  fontSize={20}
                  fontWeight="bold"
                  color="#787a80"
                  style={{ marginLeft: 10 }}
                >
                  Select City
                </Text>
              </QuickView>
              <Picker
                labels={[
                  'Thành phố Hồ Chí Minh',
                  'Thành phố Đà Nẵng',
                  'Thành phố Hà Nội',
                ]}
                values={['79', '48', '01']}
                width={screenWidth - 40}
                // height={40}
                shadow
                placeholder="Select Location"
                selectedValue={selectedCity}
                ref={(ref) => {
                  this.pickerRef = ref;
                }}
                style={{ backgroundColor: '#fff' }}
                onValueChange={(value) => {
                  this.setState({ selectedCity: value });
                }}
              />
            </QuickView>

            <QuickView>
              <QuickView row marginTop={20} marginBottom={10}>
                <Icon
                  name="office-building"
                  type="material-community"
                  color="#64b4d9"
                />
                <Text
                  fontSize={20}
                  fontWeight="bold"
                  color="#545050"
                  style={{ marginLeft: 10 }}
                >
                  Company
                </Text>
              </QuickView>
              <Picker
                labels={['Java', 'Javascript']}
                values={['java', 'js']}
                width={screenWidth - 40}
                // height={40}
                shadow
                placeholder="Select Location"
                // selectedValue={1}
                ref={(ref) => {
                  this.pickerRef = ref;
                }}
                style={{ backgroundColor: '#fff' }}
                onValueChange={(value) => {
                  // console.log('onValueChange: ', value);
                }}
              />
            </QuickView>

            <QuickView>
              <QuickView row marginTop={20} marginBottom={10}>
                <QuickView row flex={4}>
                  <Icon type="entypo" name="ruler" color="#64b4d9" />
                  <Text
                    fontSize={20}
                    fontWeight="bold"
                    color="#545050"
                    style={{ marginLeft: 10 }}
                  >
                    Distance
                  </Text>
                </QuickView>
                <QuickView flex={1}>
                  <Text bold color="#64b4d9">
                    {MultiSliderFristvalue}-{MultiSliderSecondvalue} km
                  </Text>
                </QuickView>
              </QuickView>
              <MultiSlider
                values={[MultiSliderFristvalue, MultiSliderSecondvalue]}
                sliderLength={screenWidth - 30}
                onValuesChange={this.multiSliderValuesChange}
                selectedStyle={{ backgroundColor: '#4d2eab', height: 5 }}
                trackStyle={{ height: 5, borderRadius: 5 }}
                min={0}
                max={20}
                step={1}
                // markerContainerStyle={{ backgroundColor: 'red' }}
                markerStyle={{
                  backgroundColor: '#fff',
                  borderColor: '#4d2eab',
                  borderWidth: 2,
                  width: 20,
                  height: 20,
                }}
                touchDimensions={{
                  height: 100,
                  width: 100,
                  borderRadius: 15,
                  slipDisplacement: 200,
                }}
                allowOverlap
                snapped
              // customLabel={CustomLabel}
              />
            </QuickView>

            <QuickView marginTop={10}>
              <Text fontSize={20} fontWeight="bold" color="#545050">
                Salary
              </Text>
              <QuickView>
                <ListCheckBox
                  data={data}
                  containerStyle={{ color: '#64b4d9' }}
                  horizontal
                  onChange={(value: any) => {
                    this.findObject(value);
                  }}
                />
              </QuickView>
            </QuickView>
          </ScrollView>
          <Button title="Apply" onPress={this.applyFilter} />
        </Body>
      </Container>
    );
  }
}

const mapStateToProps = (state: any) => ({
  filterObject: state.job.toJS().setFilter,
});

const mapDispatchToProps = (dispatch: any) => ({
  setFilterRedux: (s: any) => dispatch(setFilter({ s })),
  getList: (query?: TQuery) => dispatch(jobGetList({ query })),
});
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilterScreen as any);
