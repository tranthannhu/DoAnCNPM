/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  testStyleProps, basicTest, EnumComponent, getComponent,
} from '@utils/testHelper';
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import Input from '..';

const target = <Input />;
const type = EnumComponent.SINGLE;
const mockStore = configureStore([]);

describe('Input Component', () => {
  let store;
  let component;

  beforeEach(() => {
    // store = mockStore({
    //   myState: 'sample text',
    // });

    // store.dispatch = jest.fn();

    // component = renderer.create(
    //   <Provider store={store}>
    //     <Input />
    //   </Provider>,
    // );
    // console.log('component', component);
  });

  basicTest(target, type);

  // it('should apply all style-related props', () => {
  //   const props = {
  //     backgroundColor: '#FF8C00',
  //   };
  //   testStyleProps(target, props, type);
  // });

  it('should apply all custom props', () => {
    /**
     * scroll
     */
    // const props3 = getComponent(target, {}, type).props();
    // console.log(props3);

    // expect(props3.testID).toBe('InputScrollView');
  });
});
