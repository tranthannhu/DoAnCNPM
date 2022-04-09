import React from 'react';
import {
  basicTest, testStyleProps, EnumComponent, getStyle, getComponent,
} from '@utils/testHelper';
import { lightTheme } from '@themes';
import { Color } from '@themes/Theme';
import Header from '..';

const target = <Header />;
const type = EnumComponent.HOC;

describe('Header Component', () => {
  basicTest(target, type);

  it('should apply all style-related props', () => {
    const props = {
      position: 'absolute',
      height: 10,
      width: 10,
      top: 10,
      left: 10,
      right: 10,
      bottom: 10,
      borderBottomColor: Color.orange,
      borderBottomWidth: 1,
      backgroundColor: Color.orange,
    };
    testStyleProps(target, props, type, 'containerStyle');
  });

  it('should apply all custom props', () => {
    /**
     * transparent
     */
    const testStyle = getStyle(target, { transparent: true }, type, 'containerStyle');
    expect(testStyle.backgroundColor).toBe('transparent');

    /**
     * backIcon, closeIcon
     */
    const props = getComponent(target, { backIcon: true }, type).props();
    expect(props.leftComponent).toMatchObject({
      icon: 'arrowleft',
      type: 'antdesign',
      size: 25,
      color: lightTheme.Header.leftColor,
    });

    const props2 = getComponent(target, { closeIcon: true }, type).props();
    expect(props2.leftComponent).toMatchObject({
      icon: 'close',
      type: 'antdesign',
      size: 25,
      color: lightTheme.Header.leftColor,
    });

    /**
     * title, logo
     */
    const props3 = getComponent(target, { title: 'Header' }, type).props();
    expect(props3.centerComponent).toMatchObject({
      text: 'Header',
    });

    const props4 = getComponent(target, { logo: true }, type).props();
    expect(props4.centerComponent.props.testID).toBe('centerComponentLogo');

    /**
     * switchTheme
     */
    const props5 = getComponent(target, { switchTheme: true }, type).props();
    expect(props5.rightComponent.props.testID).toBe('rightComponentSwitchTheme');

    /**
     * shadow
     */
    const testStyle2 = getStyle(target, { shadow: true }, type, 'containerStyle');
    expect(testStyle2).toMatchObject(lightTheme.shadowView);

    /**
     * leftColor, centerColor, rightColor, color
     */
    const props6 = getComponent(target, {
      leftColor: Color.orange, backIcon: true,
    }, type).props();
    expect(props6.leftComponent.color).toBe(Color.orange);

    const props7 = getComponent(target, {
      centerColor: Color.orange, title: 'Header',
    }, type).props();
    expect(props7.centerComponent.style.color).toBe(Color.orange);

    const props8 = getComponent(target, {
      rightColor: Color.orange, switchTheme: true,
    }, type).props();
    expect(props8.rightComponent.props.children[0].props.color).toBe(Color.orange);

    const props9 = getComponent(target, {
      color: Color.orange, backIcon: true, switchTheme: true, title: 'Header',
    }, type).props();
    expect(props9.leftComponent.color).toBe(Color.orange);
    expect(props9.centerComponent.style.color).toBe(Color.orange);
    expect(props9.rightComponent.props.children[0].props.color).toBe(Color.orange);
  });
});
