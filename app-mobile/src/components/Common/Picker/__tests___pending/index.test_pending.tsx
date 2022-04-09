import React from 'react';
import {
  basicTest, EnumComponent, getComponent,
} from '@utils/testHelper';
import { Platform } from 'react-native';
import Picker from '..';

const target = <Picker values={[]} />;
const type = EnumComponent.HOC;

describe('Picker Component', () => {
  basicTest(target, type);

  it('should apply all custom props', () => {
    /**
     * Check-Platform
     */

    Platform.OS = 'ios';
    const platformIOS = getComponent(target, { values: [] }, type).props();
    expect(platformIOS.testID).toBe('PickerIOS');

    Platform.OS = 'android';
    const platformAndroid = getComponent(target, { values: [] }, type).props();
    expect(platformAndroid.testID).toBe('PickerAndroid');

    /**
     * labels
     */
    Platform.OS = 'ios';
    const props = getComponent(target, { values: ['Val1', 'Val2'] }, type).props();
    expect(props.title).toBe('Val1');

    const instanceIOS: any = getComponent(target, { values: ['Val1', 'Val2'] }, type).instance();
    expect(instanceIOS.getSelectedIndex()).toBe(0);
    expect(instanceIOS.getSelectedValue()).toBe('Val1');

    Platform.OS = 'android';
    const instanceAndroid : any = getComponent(target, { values: ['Val1', 'Val2'] }, type).instance();
    expect(instanceAndroid.getSelectedIndex()).toBe(0);
    expect(instanceAndroid.getSelectedValue()).toBe('Val1');

    /**
     * values
     */
    Platform.OS = 'ios';
    const props1 = getComponent(target, { labels: ['Test1', 'Test2'], values: ['Val1', 'Val2'] }, type).props();
    expect(props1.title).toBe('Test1');

    const instance1IOS: any = getComponent(target, { labels: ['Test1', 'Test2'], values: ['Val1', 'Val2'] }, type).instance();
    expect(instance1IOS.getSelectedIndex()).toBe(0);
    expect(instance1IOS.getSelectedValue()).toBe('Val1');

    Platform.OS = 'android';
    const instance1Android: any = getComponent(target, { labels: ['Test1', 'Test2'], values: ['Val1', 'Val2'] }, type).instance();
    expect(instance1Android.getSelectedIndex()).toBe(0);
    expect(instance1Android.getSelectedValue()).toBe('Val1');

    /**
     * selectedValue
     */
    Platform.OS = 'ios';
    const props2 = getComponent(target, { labels: ['Test1', 'Test2'], values: ['Val1', 'Val2'], selectedValue: 1 }, type).props();
    expect(props2.title).toBe('Test2');

    const props3 = getComponent(target, { labels: ['Test1', 'Test2'], values: ['Val1', 'Val2'], selectedValue: 'Val2' }, type).props();
    expect(props3.title).toBe('Test2');

    const instance2IOS: any = getComponent(target, { labels: ['Test1', 'Test2'], values: ['Val1', 'Val2'], selectedValue: 'Val2' }, type).instance();
    expect(instance2IOS.getSelectedIndex()).toBe(1);
    expect(instance2IOS.getSelectedValue()).toBe('Val2');

    Platform.OS = 'android';
    const instance2Android: any = getComponent(target, { labels: ['Test1', 'Test2'], values: ['Val1', 'Val2'], selectedValue: 'Val2' }, type).instance();
    expect(instance2Android.getSelectedIndex()).toBe(1);
    expect(instance2Android.getSelectedValue()).toBe('Val2');

    /**
     * placeholder
     */
    Platform.OS = 'ios';
    const props4 = getComponent(target, {
      labels: ['Test1', 'Test2'], values: ['Val1', 'Val2'], selectedValue: 'Val2', placeholder: 'PlaceHolder',
    }, type).props();
    expect(props4.title).toBe('Test2');

    const instance3IOS: any = getComponent(target, {
      labels: ['Test1', 'Test2'], values: ['Val1', 'Val2'], placeholder: 'PlaceHolder',
    }, type).instance();
    expect(instance3IOS.getSelectedIndex()).toBe(null);
    expect(instance3IOS.getSelectedValue()).toBe(null);

    Platform.OS = 'android';
    const instance3Android: any = getComponent(target, {
      labels: ['Test1', 'Test2'], values: ['Val1', 'Val2'], placeholder: 'PlaceHolder',
    }, type).instance();
    expect(instance3Android.getSelectedIndex()).toBe(null);
    expect(instance3Android.getSelectedValue()).toBe(null);

    /**
     * width
     */
    Platform.OS = 'ios';
    const props5IOS = getComponent(target, { width: 200 }, type).props();
    expect(props5IOS.width).toBe(200);

    Platform.OS = 'android';
    const props5Android = getComponent(target, { width: 200 }, type).props();
    expect(props5Android.style.width).toBe(200);

    jest.resetModules();
  });
});
