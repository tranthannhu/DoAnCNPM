import React from 'react';
import {
  getStyle, testStyleProps, basicTest, EnumComponent, getComponent,
} from '@utils/testHelper';
import QuickView from '..';

const target = <QuickView />;
const type = EnumComponent.SINGLE;

describe('QuickView Component', () => {
  basicTest(target, type);

  it('should apply all style-related props', () => {
    const props = {
      width: 10,
      height: 10,
      margin: 10,
      marginVertical: 10,
      marginHorizontal: 10,
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 10,
      marginRight: 10,
      padding: 10,
      paddingVertical: 10,
      paddingHorizontal: 10,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 10,
      paddingRight: 10,
      borderRadius: 10,
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      position: 'absolute',
      top: 10,
      bottom: 10,
      left: 10,
      right: 10,
      justifyContent: 'flex-start',
      alignSelf: 'flex-start',
      alignItems: 'flex-start',
      backgroundColor: '#FFFFFF',
      flex: 1,
    };
    testStyleProps(target, props, type);
  });

  it('should apply all custom props', () => {
    /**
     * center
     */
    const testStyle = getStyle(target, { center: true }, type);
    expect(testStyle.alignSelf).toBe('center');
    expect(testStyle.alignItems).toBe('center');
    expect(testStyle.justifyContent).toBe('center');

    /**
     * horizontalCenter
     */
    const testStyle2 = getStyle(target, { horizontalCenter: true }, type);
    expect(testStyle2.alignItems).toBe('center');
    expect(testStyle2.justifyContent).not.toBe('center');

    const testStyle3 = getStyle(target, { horizontalCenter: true, row: true }, type);
    expect(testStyle3.justifyContent).toBe('center');
    expect(testStyle3.alignItems).not.toBe('center');

    /**
     * verticalCenter
     */
    const testStyle4 = getStyle(target, { verticalCenter: true }, type);
    expect(testStyle4.alignItems).not.toBe('center');
    expect(testStyle4.justifyContent).toBe('center');

    const testStyle5 = getStyle(target, { verticalCenter: true, row: true }, type);
    expect(testStyle5.justifyContent).not.toBe('center');
    expect(testStyle5.alignItems).toBe('center');

    /**
     * TouchableOpacity || View
     */
    const onPress = jest.fn();
    const props1 = getComponent(target, { onPress }, type);
    expect(props1.name()).toBe('ForwardRef');

    const props2 = getComponent(target, {}, type);
    expect(props2.name()).toBe('View');
  });
});
