import React from 'react';
import {
  basicTest, testStyleProps, EnumComponent,
} from '@utils/testHelper';
import { Color } from '@themes/Theme';
import Avatar from '..';

const target = <Avatar />;
const type = EnumComponent.SINGLE;

describe('Avatar Component', () => {
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
    testStyleProps(target, props, type, 'containerStyle');
    const props2 = {
      backgroundColor: Color.orange,
    };
    testStyleProps(target, props2, type, 'overlayContainerStyle');
  });
});
