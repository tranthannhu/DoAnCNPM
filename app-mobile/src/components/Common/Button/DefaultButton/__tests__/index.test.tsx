import React from 'react';
import Font from '@themes/Font';
import {
  basicTest, testStyleProps, getStyle, EnumComponent,
} from '@utils/testHelper';
import { lightTheme } from '@themes';
import { Platform } from 'react-native';
import { Color } from '@themes/Theme';
import Button from '..';

const target = <Button />;
const type = EnumComponent.HOC;

describe('Button Component', () => {
  basicTest(target, type);

  it('should apply all style-related props', () => {
    const props = {
      width: 100,
      height: 100,
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
    };
    testStyleProps(target, props, type, 'containerStyle');

    const props1 = {
      borderRadius: 20,
      borderColor: Color.orange,
      borderWidth: 5,
    };
    testStyleProps(target, props1, type, 'buttonStyle');
  });

  it('should apply all custom props', () => {
    /**
     * center
     */
    const testStyle = getStyle(target, { center: true }, type, 'containerStyle');
    expect(testStyle.alignSelf).toBe('center');

    /**
     * bold, titleColor
     */
    const testStyle1 = getStyle(target, { bold: true }, type, 'titleStyle');
    expect(testStyle1.fontWeight).toBe(Font.fontWeight.bold);
    const testStyle2 = getStyle(target, { titleColor: Color.orange }, type, 'titleStyle');
    expect(testStyle2.color).toBe(Color.orange);

    /**
     * type = solid | null, primary, secondary, success, warning, error, backgroundColor,
     */
    Platform.OS = 'android';
    const testStyle3 = getStyle(target, { primary: true }, type, 'buttonStyle');
    expect(testStyle3.backgroundColor).toBe(lightTheme.colors.platform.android.primary);
    const testStyle4 = getStyle(target, { secondary: true }, type, 'buttonStyle');
    expect(testStyle4.backgroundColor).toBe(lightTheme.colors.platform.android.secondary);
    const testStyle5 = getStyle(target, { success: true }, type, 'buttonStyle');
    expect(testStyle5.backgroundColor).toBe(lightTheme.colors.platform.android.success);
    const testStyle6 = getStyle(target, { error: true }, type, 'buttonStyle');
    expect(testStyle6.backgroundColor).toBe(lightTheme.colors.platform.android.error);
    const testStyle7 = getStyle(target, { warning: true }, type, 'buttonStyle');
    expect(testStyle7.backgroundColor).toBe(lightTheme.colors.platform.android.warning);
    const testStyle8 = getStyle(target, { backgroundColor: Color.orange }, type, 'buttonStyle');
    expect(testStyle8.backgroundColor).toBe(Color.orange);
    jest.resetModules();

    Platform.OS = 'ios';
    const testStyle9 = getStyle(target, { primary: true }, type, 'buttonStyle');
    expect(testStyle9.backgroundColor).toBe(lightTheme.colors.platform.ios.primary);
    const testStyle10 = getStyle(target, { secondary: true }, type, 'buttonStyle');
    expect(testStyle10.backgroundColor).toBe(lightTheme.colors.platform.ios.secondary);
    const testStyle11 = getStyle(target, { success: true }, type, 'buttonStyle');
    expect(testStyle11.backgroundColor).toBe(lightTheme.colors.platform.ios.success);
    const testStyle12 = getStyle(target, { error: true }, type, 'buttonStyle');
    expect(testStyle12.backgroundColor).toBe(lightTheme.colors.platform.ios.error);
    const testStyle13 = getStyle(target, { warning: true }, type, 'buttonStyle');
    expect(testStyle13.backgroundColor).toBe(lightTheme.colors.platform.ios.warning);
    const testStyle14 = getStyle(target, { backgroundColor: Color.orange }, type, 'buttonStyle');
    expect(testStyle14.backgroundColor).toBe(Color.orange);
    jest.resetModules();

    /**
     * type = outline, primary, secondary, success, warning, error,
     */
    const testStyle15 = getStyle(target, { outline: true }, type, 'buttonStyle');
    expect(testStyle15.backgroundColor).toBe('transparent');
    expect(testStyle15.borderColor).toBe(lightTheme.Button.outlineBorderColor);

    Platform.OS = 'android';
    const testStyleOutline3 = getStyle(target, { outline: true, primary: true }, type, 'buttonStyle');
    expect(testStyleOutline3.borderColor).toBe(lightTheme.colors.platform.android.primary);
    const testStyleOutline4 = getStyle(target, { outline: true, secondary: true }, type, 'buttonStyle');
    expect(testStyleOutline4.borderColor).toBe(lightTheme.colors.platform.android.secondary);
    const testStyleOutline5 = getStyle(target, { outline: true, success: true }, type, 'buttonStyle');
    expect(testStyleOutline5.borderColor).toBe(lightTheme.colors.platform.android.success);
    const testStyleOutline6 = getStyle(target, { outline: true, error: true }, type, 'buttonStyle');
    expect(testStyleOutline6.borderColor).toBe(lightTheme.colors.platform.android.error);
    const testStyleOutline7 = getStyle(target, { outline: true, warning: true }, type, 'buttonStyle');
    expect(testStyleOutline7.borderColor).toBe(lightTheme.colors.platform.android.warning);
    jest.resetModules();

    Platform.OS = 'ios';
    const testStyleOutline9 = getStyle(target, { outline: true, primary: true }, type, 'buttonStyle');
    expect(testStyleOutline9.borderColor).toBe(lightTheme.colors.platform.ios.primary);
    const testStyleOutline10 = getStyle(target, { outline: true, secondary: true }, type, 'buttonStyle');
    expect(testStyleOutline10.borderColor).toBe(lightTheme.colors.platform.ios.secondary);
    const testStyleOutline11 = getStyle(target, { outline: true, success: true }, type, 'buttonStyle');
    expect(testStyleOutline11.borderColor).toBe(lightTheme.colors.platform.ios.success);
    const testStyleOutline12 = getStyle(target, { outline: true, error: true }, type, 'buttonStyle');
    expect(testStyleOutline12.borderColor).toBe(lightTheme.colors.platform.ios.error);
    const testStyleOutline13 = getStyle(target, { outline: true, warning: true }, type, 'buttonStyle');
    expect(testStyleOutline13.borderColor).toBe(lightTheme.colors.platform.ios.warning);
    jest.resetModules();

    /**
     * type = clear, primary, secondary, success, warning, error,
     */
    const testStyle16 = getStyle(target, { clear: true }, type, 'buttonStyle');
    expect(testStyle16.backgroundColor).toBe('transparent');
    expect(testStyle16.borderWidth).toBe(0);
    const testStyle17 = getStyle(target, { clear: true }, type, 'titleStyle');
    expect(testStyle17.color).toBe(lightTheme.Button.outlineTitleColor);

    Platform.OS = 'android';
    const testStyleClear3 = getStyle(target, { clear: true, primary: true }, type, 'titleStyle');
    expect(testStyleClear3.color).toBe(lightTheme.colors.platform.android.primary);
    const testStyleClear4 = getStyle(target, { clear: true, secondary: true }, type, 'titleStyle');
    expect(testStyleClear4.color).toBe(lightTheme.colors.platform.android.secondary);
    const testStyleClear5 = getStyle(target, { clear: true, success: true }, type, 'titleStyle');
    expect(testStyleClear5.color).toBe(lightTheme.colors.platform.android.success);
    const testStyleClear6 = getStyle(target, { clear: true, error: true }, type, 'titleStyle');
    expect(testStyleClear6.color).toBe(lightTheme.colors.platform.android.error);
    const testStyleClear7 = getStyle(target, { clear: true, warning: true }, type, 'titleStyle');
    expect(testStyleClear7.color).toBe(lightTheme.colors.platform.android.warning);
    jest.resetModules();

    Platform.OS = 'ios';
    const testStyleClear9 = getStyle(target, { clear: true, primary: true }, type, 'titleStyle');
    expect(testStyleClear9.color).toBe(lightTheme.colors.platform.ios.primary);
    const testStyleClear10 = getStyle(target, { clear: true, secondary: true }, type, 'titleStyle');
    expect(testStyleClear10.color).toBe(lightTheme.colors.platform.ios.secondary);
    const testStyleClear11 = getStyle(target, { clear: true, success: true }, type, 'titleStyle');
    expect(testStyleClear11.color).toBe(lightTheme.colors.platform.ios.success);
    const testStyleClear12 = getStyle(target, { clear: true, error: true }, type, 'titleStyle');
    expect(testStyleClear12.color).toBe(lightTheme.colors.platform.ios.error);
    const testStyleClear13 = getStyle(target, { clear: true, warning: true }, type, 'titleStyle');
    expect(testStyleClear13.color).toBe(lightTheme.colors.platform.ios.warning);
    jest.resetModules();

    /**
     * active, activeBorderColor, activeBackgroundColor, activeTitleColor
     */
    const testStyle18 = getStyle(target, {
      active: 'true', activeBorderColor: Color.orange, activeBackgroundColor: Color.orange,
    }, type, 'buttonStyle');
    expect(testStyle18.borderColor).toBe(Color.orange);
    expect(testStyle18.backgroundColor).toBe(Color.orange);

    const testStyle19 = getStyle(target, {
      active: 'true', activeTitleColor: Color.orange,
    }, type, 'titleStyle');
    expect(testStyle19.color).toBe(Color.orange);

    /**
     * sharp, rounded, circle
     */
    const testStyle20 = getStyle(target, { sharp: 'true' }, type, 'buttonStyle');
    expect(testStyle20.borderRadius).toBe(0);

    const testStyle21 = getStyle(target, { rounded: 'true' }, type, 'buttonStyle');
    expect(testStyle21.borderRadius).toBe(lightTheme.Button.roundedBorderRadius);

    const testStyle22 = getStyle(target, { circle: 'true' }, type, 'buttonStyle');
    expect(testStyle22.width).toBe(testStyle22.height);
    expect(testStyle22.width).toBe(testStyle22.borderRadius);

    /**
     * shadow
     */
    const testStyle23 = getStyle(target, { shadow: true }, type, 'buttonStyle');
    expect(testStyle23).toMatchObject(lightTheme.shadowView);
    const testStyle24 = getStyle(target, { shadow: true }, type, 'containerStyle');
    expect(testStyle24.paddingBottom).toBeGreaterThanOrEqual(3);
  });
});
