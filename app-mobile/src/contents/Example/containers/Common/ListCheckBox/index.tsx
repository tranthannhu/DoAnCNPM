import React, { Component } from 'react';
import {
  ListCheckBox, Container, Header, Body, Text,
} from '@components';
import { withTheme, ThemeProps } from 'react-native-elements';

interface CustomLengthArray<T extends any, L extends number> extends Array<T> {
  0: T;
  length: L;
}

interface Props {

}

/**
 * The state data type must be equivalent to the input data type.
 */

interface State {
  multiValue: Array<string>;
  singleValue: CustomLengthArray<number, 1>;
  multiValueRow: Array<number>;
}
class ListCheckBoxExample extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      multiValue: ['17', '2'],
      singleValue: [11],
      multiValueRow: [1, 2],
    };
  }

  render() {
    const { multiValue, singleValue, multiValueRow } = this.state;
    const data = [
      { id: '0', name: 'Mở bán dự án Residences Quy Nhơn' },
      { id: '17', name: 'Công bố dự án Phúc Yên Prosper Phố Đông Thủ Đức' },
      { id: '2', name: 'Công bố dự án Century City Long Thành' },
      { id: '5', name: 'Mở bán dự án Green Dragon City Quảng Ninh' },
    ];
    const datas = [
      {
        id: 13,
        name: 'inventore rem saepe ut in iste et adipisci',
      },
      {
        id: 11,
        name: 'quam possimus expedita possimus reiciendis fugiat',
      },
      {
        id: 7,
        name: 'harum quo impedit porro explicabo sed itaque',
      },
      {
        id: 5,
        name: 'amet quis voluptatibus et culpa consequatur iste consequatur',
      },
      {
        id: 4,
        name: 'iure placeat dolore autem laboriosam sit esse veritatis',
      },
    ];
    const dataRow = [
      { id: 1, name: 'Click Here' },
      { id: 2, name: 'Click There' },
      { id: 3, name: 'Please Click' },
      { id: 4, name: 'Clickkkkk' },
    ];
    return (
      <Container>
        <Header title="ListCheckBox" backIcon switchTheme />
        {/* <Body>
          <ListCheckBox
            defaultValue={multiValue}
            onChange={(value: any) => console.log('screenMulti', value)}
            data={data}
          />
        </Body> */}
        <Body scroll marginBottom={50}>
          <Text primary type="title" bold marginLeft={20} marginTop={20}>Multiple check</Text>
          <ListCheckBox
            data={data}
            defaultValue={multiValue}
            // onChange={(value: any) => console.log('screenMulti', value)}
          />
          <Text primary type="title" bold marginLeft={20} marginTop={20}>Single check</Text>
          <ListCheckBox
            data={datas}
            single
            defaultValue={singleValue}
            // onChange={(value: any) => console.log('screenSingle', value)}
          />
          <Text primary type="title" bold marginLeft={20} marginTop={20}>Multiple check row</Text>
          <ListCheckBox
            data={dataRow}
            defaultValue={multiValueRow}
            // onChange={(value: any) => console.log('screenMultiRow', value)}
            row
            widthElement="42%"
          />
          <Text primary type="title" bold marginLeft={20} marginTop={20}>Multiple check icon right</Text>
          <ListCheckBox
            data={dataRow}
            defaultValue={multiValueRow}
            // onChange={(value: any) => console.log('screenMultiIconRight', value)}
            row
            widthElement="42%"
            // backgroundColorElement="red"
            // backgroundColor="#E3E3E3"
            checkBoxProps={{ iconRight: true, textStyle: { width: '70%' } }}
            containerStyle={{
              backgroundColor: 'red',
              borderWidth: 1,
            }}
          />
        </Body>
      </Container>
    );
  }
}
export default withTheme(ListCheckBoxExample as React.ComponentType<null & ThemeProps<any>>);
