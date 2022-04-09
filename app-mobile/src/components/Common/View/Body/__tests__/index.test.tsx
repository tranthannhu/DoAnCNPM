import React from 'react';
import {
  basicTest, EnumComponent, getComponent,
} from '@utils/testHelper';
import { lightTheme } from '@themes';
import Body from '..';

const target = <Body />;
const type = EnumComponent.HOC;

describe('Body Component', () => {
  basicTest(target, type, 2);

  it('should apply all custom props', () => {
    /**
     * primary, secondary
     */
    const props1 = getComponent(target, { primary: true }, type).props();
    expect(props1.children.props.style.backgroundColor).toBe(lightTheme.colors.bgColor);

    const props2 = getComponent(target, { secondary: true }, type).props();
    expect(props2.children.props.style.backgroundColor).toBe(lightTheme.colors.bgColorSecondary);

    /**
     * fullWidth, fullHeight, fullView
     */
    const props3 = getComponent(target, { fullWidth: true }, type).props();
    expect(props3.children.props.style.paddingHorizontal).toBe(0);
    expect(props3.testID).toBe('SafeAreaBodyView');

    const props4 = getComponent(target, { fullHeight: true }, type).props();
    expect(props4.testID).toBe('FullHeightBodyView');
    expect(props4.style.paddingHorizontal).toBe(lightTheme.bodyPaddingHorizontal);

    const props5 = getComponent(target, { fullView: true }, type).props();
    expect(props5.testID).toBe('FullHeightBodyView');
    expect(props5.style.paddingHorizontal).toBe(0);
  });
});
