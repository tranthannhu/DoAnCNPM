import React from 'react';
import { fontFamily, fontWeight, fontSize } from '@themes/Font';
import {
  basicTest, testStyleProps, EnumComponent, getStyle, getComponent,
} from '@utils/testHelper';
import { lightTheme, Fonts } from '@themes';
import { Platform } from 'react-native';
import { Color } from '@themes/Theme';
import Text from '..';

const target = <Text />;
const type = EnumComponent.HOC;

describe('Text Component', () => {
  basicTest(target, type);

  it('should apply all style-related props', () => {
    const props = {
      margin: 10,
      marginVertical: 10,
      marginHorizontal: 10,
      marginTop: 10,
      marginBottom: 10,
      marginLeft: 10,
      marginRight: 10,
    };
    testStyleProps(target, props, type);
  });

  it('should apply all custom props', () => {
    /**
     * center
     */
    const testStyle = getStyle(target, { center: true }, type);
    expect(testStyle.textAlign).toBe('center');

    /**
     * fontFamily, fontWeight, fontSize
     */
    const props2 = {
      fontFamily: 'RobotoBold',
      fontWeight: 'thin',
      fontSize: 'large',
    };
    const testStyle2 = getStyle(target, props2, type);
    expect(testStyle2.fontFamily).toBe(fontFamily.RobotoBold);
    expect(testStyle2.fontWeight).toBe(fontWeight.thin);
    expect(testStyle2.fontSize).toBe(fontSize.large);

    /**
     * primary, secondary, success,  warning, error, color,
     */
    Platform.OS = 'android';
    const testStyle3 = getStyle(target, { primary: true }, type);
    expect(testStyle3.color).toBe(lightTheme.colors.platform.android.primary);
    const testStyle4 = getStyle(target, { secondary: true }, type);
    expect(testStyle4.color).toBe(lightTheme.colors.platform.android.secondary);
    const testStyle5 = getStyle(target, { success: true }, type);
    expect(testStyle5.color).toBe(lightTheme.colors.platform.android.success);
    const testStyle6 = getStyle(target, { error: true }, type);
    expect(testStyle6.color).toBe(lightTheme.colors.platform.android.error);
    const testStyle7 = getStyle(target, { warning: true }, type);
    expect(testStyle7.color).toBe(lightTheme.colors.platform.android.warning);
    const testStyle8 = getStyle(target, { color: Color.orange }, type);
    expect(testStyle8.color).toBe(Color.orange);
    jest.resetModules();

    Platform.OS = 'ios';
    const testStyle9 = getStyle(target, { primary: true }, type);
    expect(testStyle9.color).toBe(lightTheme.colors.platform.ios.primary);
    const testStyle10 = getStyle(target, { secondary: true }, type);
    expect(testStyle10.color).toBe(lightTheme.colors.platform.ios.secondary);
    const testStyle11 = getStyle(target, { success: true }, type);
    expect(testStyle11.color).toBe(lightTheme.colors.platform.ios.success);
    const testStyle12 = getStyle(target, { error: true }, type);
    expect(testStyle12.color).toBe(lightTheme.colors.platform.ios.error);
    const testStyle13 = getStyle(target, { warning: true }, type);
    expect(testStyle13.color).toBe(lightTheme.colors.platform.ios.warning);
    const testStyle14 = getStyle(target, { color: Color.orange }, type);
    expect(testStyle14.color).toBe(Color.orange);
    jest.resetModules();

    /**
     * underline, bold, italic
     */
    const testStyle15 = getStyle(target, { underline: true }, type);
    expect(testStyle15.textDecorationLine).toBe('underline');
    const testStyle16 = getStyle(target, { bold: true }, type);
    expect(testStyle16.fontWeight).toBe(Fonts.fontWeight.bold);
    const testStyle17 = getStyle(target, { italic: true }, type);
    expect(testStyle17.fontFamily).toBe(Fonts.fontFamily.RobotoItalic);

    /**
     * icon
     */
    // const component = mount(<Text icon={{ name: 'account' }} />);
    // const demo = component.findWhere((node) => node.prop('testID') === 'EIconText');
    // expect(demo.length).toBeGreaterThanOrEqual(1);

    const props3 = getComponent(target, { icon: { name: 'account' } }, type).props();
    expect(props3.testID).toBe('EIconText');
    expect(props3.row).toBe(true);
    expect(props3.rowReverse).not.toBe(true);

    /**
     * iconRight
     */
    const props4 = getComponent(target, { icon: { name: 'account' }, iconRight: true }, type).props();
    expect(props3.testID).toBe('EIconText');
    expect(props4.row).not.toBe(true);
    expect(props4.rowReverse).toBe(true);

    /**
     * iconContainerStyle
     */
    const props5 = getComponent(target, { icon: { name: 'account' }, iconContainerStyle: { color: Color.orange } }, type).childAt(0).props();
    expect(props3.testID).toBe('EIconText');
    expect(props5.style).toMatchObject({ color: Color.orange });

    /**
     * type
     */
    const testStyle18 = getStyle(target, { type: 'xTitle' }, type);
    expect(testStyle18).toMatchObject(lightTheme.Text.xTitle);
  });
});
