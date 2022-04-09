import React from 'react';
import {
  testStyleProps, basicTest, EnumComponent,
} from '@utils/testHelper';
import Container from '..';

const target = <Container />;
const type = EnumComponent.HOC;

describe('Container Component', () => {
  basicTest(target, type);

  it('should apply all style-related props', () => {
    const props = {
      backgroundColor: '#FF8C00',
    };
    testStyleProps(target, props, type, 'style');
  });
});
