import React, { PureComponent } from 'react';
import {
  Container,
  Header,
  QuickView,
  Body,
  Text,
  BottomModalSelect,
} from '@components';
import { TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Slider } from 'react-native-elements';

interface Props {}
interface State {
  valueSlider: number;
}

class BottomModalSelectExample extends PureComponent<Props, State> {
  private handleOpen: any;

  private custom: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      valueSlider: 0,
    };
  }

  onClick = () => {
    this.handleOpen.handleOpenFilter();
  };

  onClickCustom = () => {
    this.custom.handleOpenFilter();
  };

  renderContents = () => {
    const { valueSlider } = this.state;
    return (
      <View
        style={{
          flex: 1,
          marginLeft: 10,
          marginRight: 10,
          alignItems: 'stretch',
          justifyContent: 'center',
        }}
      >
        <Slider
          minimumValue={0}
          maximumValue={100}
          step={1}
          value={valueSlider}
          onValueChange={(value: number) => this.setState({ valueSlider: value })}
        />
        <Text>
          Value:
          {valueSlider}
        </Text>
      </View>
    );
  };

  render() {
    const data = [
      { id: '0', name: 'Mở bán dự án Residences Quy Nhơn' },
      { id: '17', name: 'Công bố dự án Phúc Yên Prosper Phố Đông Thủ Đức' },
      { id: '3', name: 'Công bố dự án Century City Long Thành' },
      { id: '5', name: 'Mở bán dự án Green Dragon City Quảng Ninh' },
      { id: '6', name: 'Mở bán dự án Red Dragon City Hà Nội' },
      { id: '7', name: 'Mở bán dự án Violet Dragon City Hải Phòng' },
      { id: '8', name: 'Mở bán dự án Black Dragon City Lào Cai' },
    ];
    return (
      <Container>
        <Header title="BottomModalSelect" backIcon switchTheme />
        <Body>
          <QuickView marginVertical={10}>
            <Text bold fontSize={14}>
              Chọn sự kiện
            </Text>
          </QuickView>
          <QuickView justifyContent="center" marginBottom={20}>
            <TouchableOpacity
              onPress={this.onClick}
              style={{
                padding: 15,
                borderRadius: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: '#FFFFFF',
                // textAlign: 'center',
                // alignContent: 'center',
                alignItems: 'center',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.2,
                shadowRadius: 1.41,
                elevation: 3,
              }}
            >
              <QuickView width="90%">
                <Text numberOfLines={1} fontSize={14} color="#727A8E">
                  Chọn sự kiện đang diễn ra
                </Text>
              </QuickView>
              <QuickView center width="10%">
                <Icon name="chevron-down" size={16} color="#315DF7" />
              </QuickView>
            </TouchableOpacity>
          </QuickView>

          <QuickView marginVertical={10}>
            <Text bold fontSize={14}>
              Khu vực trong thành phố
            </Text>
          </QuickView>
          <QuickView justifyContent="center" marginBottom={20}>
            <TouchableOpacity
              onPress={this.onClickCustom}
              style={{
                paddingVertical: 11,
                paddingHorizontal: 20,
                borderRadius: 22.5,
                flexDirection: 'row',
                justifyContent: 'space-between',
                backgroundColor: '#E6E9F0',
                alignItems: 'center',
              }}
            >
              <QuickView width="90%">
                <Text numberOfLines={1} fontSize={14} color="#012066">
                  Chọn khu vực
                </Text>
              </QuickView>
              <QuickView center width="10%">
                <Icon name="chevron-down" size={16} color="#012066" />
              </QuickView>
            </TouchableOpacity>
          </QuickView>
        </Body>
        <BottomModalSelect
          ref={(ref) => {
            this.handleOpen = ref;
          }}
          data={data}
          // closeIcon={false}
          // titleConfirm="Done"
          // title="Choose"
          // titleStyles={{ color: 'red' }}
          // buttonConfirmStyles={{ backgroundColor: 'red' }}
          // titleConfirmStyles={{ color: 'yellow' }}
          // onChange={(val: string) => console.log('value', val)}
          // onConfirm={(valConfirm: string) => console.log('valueConfirm', valConfirm)}
          defaultVal={['17']}
        />
        <BottomModalSelect
          ref={(ref) => {
            this.custom = ref;
          }}
          renderContent={this.renderContents()}
          headerContainerStyles={{ backgroundColor: '#012066' }}
          wrapStyles={{ backgroundColor: '#012066' }}
          contentContainerStyles={{ backgroundColor: '#E6E9F0' }}
          titleStyles={{ color: '#E6E9F0' }}
          iconColor="#E6E9F0"
          buttonConfirmStyles={{ backgroundColor: '#E6E9F0', borderRadius: 10 }}
          titleConfirmStyles={{ color: '#012066' }}
        />
      </Container>
    );
  }
}

export default BottomModalSelectExample;
