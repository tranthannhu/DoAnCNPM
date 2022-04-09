import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  CheckBox,
  CheckBoxProps as ECheckBoxProps,
} from 'react-native-elements';
import _ from 'lodash';
import FlatList from '@components/Common/FlatList/DefaultFlatList';

interface State {
  valuePrice?: number;
  dataRender?: any;
  value?: number | string;
}
export interface Props {
  data?: any;
  // height?: number | string;
  widthElement?: number | string;
  single?: boolean;
  onChange?: any;
  defaultValue?: Array<number | string>;
  backgroundColorElement?: string;
  assistVal?: Array<number | string>;
  row?: boolean;
  checkBoxProps?: Omit<ECheckBoxProps, 'checked'>;
  backgroundColor?: string;
  containerStyle?: any;
  horizontal?: boolean;
}

const styles = StyleSheet.create({
  wrapStyles: {
    // paddingHorizontal: 20,
    // flexDirection: 'column',
    // flexWrap: 'wrap',
    // borderWidth: 1,
    // backgroundColor: 'red',
    // borderColor: '#E3E3E3',
    // flexDirection: 'row',
    // flexWrap: 'wrap',
    // justifyContent: 'space-between',
  },
  buttonContainer: {
    // borderWidth: 1,
    justifyContent: 'center',
    marginLeft: 0,
    // alignItems: 'flex-start',
  },
});
class ListCheckBox extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    const { data, defaultValue, assistVal } = this.props;
    data.map((item: any) => _.assign(item, { isChecked: false }));
    const newData = data;
    let defaultSelect: any = [];
    let defaultSingleSelect: number | string;
    const dataExtract = newData.map((d: any) => d.id);
    if (!_.isUndefined(defaultValue)) {
      const valuesCopy = JSON.parse(JSON.stringify(newData));
      defaultValue.forEach((d: any) => {
        // eslint-disable-next-line max-len
        valuesCopy[_.indexOf(dataExtract, d)].isChecked = !valuesCopy[
          _.indexOf(dataExtract, d)
        ].isChecked;
      });
      defaultSelect = valuesCopy;
      [defaultSingleSelect] = defaultValue;
    } else {
      if (assistVal) {
        newData.forEach((n: any) => {
          for (let index = 0; index < assistVal.length; index += 1) {
            if (assistVal[index] === n.id) {
              n.isChecked = !n.isChecked;
            }
          }
        });
      }
      defaultSelect = newData;
      defaultSingleSelect = assistVal ? assistVal[0] : 0;
    }
    this.state = {
      valuePrice: 0,
      value: defaultSingleSelect,
      dataRender: defaultSelect,
    };
  }

  toggleCheckbox = (id: number) => () => {
    const { dataRender } = this.state;
    const { onChange } = this.props;
    const valuesCopy = JSON.parse(JSON.stringify(dataRender));
    const index = dataRender.findIndex((cb: any) => cb.id === id);
    valuesCopy[index].isChecked = !valuesCopy[index].isChecked;
    const arrValues: any = [];
    valuesCopy.forEach((v: any) => {
      if (v.isChecked) {
        arrValues.push(v.id);
      }
    });
    if (!_.isUndefined(onChange)) {
      onChange(arrValues);
    }

    this.setState((prevState) => ({
      ...prevState,
      dataRender: valuesCopy,
    }));
  };

  onSelect = (value: any) => () => {
    const { onChange } = this.props;
    if (!_.isUndefined(onChange)) {
      onChange(value);
    }
    // defaultSingleSelect = value;
    this.setState((prevState) => ({
      ...prevState,
      value,
    }));
  };

  render() {
    const {
      single,
      widthElement,
      backgroundColorElement,
      row,
      checkBoxProps,
      backgroundColor,
      containerStyle,
      horizontal,
    } = this.props;
    const { dataRender, value } = this.state;
    const wrapStyles: any = StyleSheet.flatten([
      row && {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
      },
      { backgroundColor: backgroundColor || 'transparent' },
      // styles.wrapStyles,
      containerStyle,
    ]);

    const buttonContainer = StyleSheet.flatten([
      {
        width: widthElement || '100%',
        backgroundColor: backgroundColorElement,
        borderWidth: 0,
      },
      styles.buttonContainer,
    ]);
    if (single) {
      return (
        <View style={wrapStyles} testID="ListRadioButton">
          {dataRender.map((item: any) => (
            <CheckBox
              containerStyle={buttonContainer}
              key={item.id}
              title={item.name}
              checkedIcon="dot-circle-o"
              uncheckedIcon="circle-o"
              // textStyle={{ fontSize: 14, fontWeight: 'normal' }}
              checked={value === item.id}
              onPress={this.onSelect(item.id)}
              size={16}
              {...checkBoxProps}
            />
          ))}
        </View>
      );
    }
    if (horizontal)
      return (
        <FlatList
          data={dataRender}
          renderItem={({ item }) => (
            <CheckBox
              containerStyle={buttonContainer}
              key={item.id}
              title={item.name}
              checked={item.isChecked}
              onPress={this.toggleCheckbox(item.id)}
              {...checkBoxProps}
            />
          )}
          contentContainerStyle={{
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}
        />
      );
    return (
      <View style={wrapStyles} testID="ListCheckBox">
        {dataRender.map((item: any) => (
          <CheckBox
            containerStyle={buttonContainer}
            key={item.id}
            title={item.name}
            checked={item.isChecked}
            onPress={this.toggleCheckbox(item.id)}
            {...checkBoxProps}
          />
        ))}
      </View>
    );
  }
}

export default ListCheckBox;
