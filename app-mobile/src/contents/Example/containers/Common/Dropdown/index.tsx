import React, { PureComponent } from 'react';
import {
  Dropdown, Container, Header, Body, Text, QuickView,
} from '@components';

export default class DropdownExample extends PureComponent {
  render() {
    const dataDropdown = [
      {
        label: 'Dự án Complex Quy Nhon',
        value: '1',
      },
      {
        label: 'Partner',
        value: '2',
      },
      {
        label: 'Partner1',
        value: '3',
      },
      {
        label: 'Lorem ipsum dolor sit',
        value: '4',
      },
      {
        label: 'architecto voluptatum. Neque?',
        value: '5',
      },
      {
        label: 'Lorem Lorem, ipsum',
        value: '6',
      },
      {
        label: 'Dự án đất nền Đà Nẵng',
        value: '7',
      },
    ];
    return (
      <Container>
        <Header title="Dropdown" backIcon switchTheme />
        <Body>
          <QuickView marginBottom={20} style={{ zIndex: 100000 }}>
            <Text>
              Default Dropdown
            </Text>
            <Dropdown
              data={dataDropdown}
              // onChange={(value: any) => console.log('Value', value)}
            />
          </QuickView>
          <QuickView marginBottom={20} style={{ zIndex: 10000 }}>
            <Text>
              Custom Style Dropdown
            </Text>
            <Dropdown
              placeholder="Chọn kiểu bất động sản"
              containerStyle={{
                borderWidth: 1,
                borderRadius: 22.5,
                marginTop: 5,
                borderColor: '#012066',
                backgroundColor: '#FFFFFF',
              }}
              dropdownStyles={{
                backgroundColor: '#FFFFFF',
                borderWidth: 1,
                borderColor: '#E3E3E3',
              }}
              placeholderColor="#012066"
              activeColor="#012066"
              inActiveColor="#FFFFFF"
              activeTextColor="#FFFFFF"
              inActiveTextColor="#012066"
              iconColor="#012066"
              data={dataDropdown}
            />
          </QuickView>
        </Body>
      </Container>
    );
  }
}
