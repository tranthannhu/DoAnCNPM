import React from 'react';
import {
  EnumComponent, basicTest, getComponent,
} from '@utils/testHelper';
import Dropdown from '..';

const dataDropdown = [
  {
    label: 'Dự án Complex Quy Nhon',
    value: 1,
  },
  {
    label: 'Partner',
    value: 2,
  },
  {
    label: 'Partner1',
    value: 3,
  },
  {
    label: 'Lorem ipsum dolor sit',
    value: 4,
  },
  {
    label: 'architecto voluptatum. Neque?',
    value: 5,
  },
  {
    label: 'Lorem Lorem, ipsum',
    value: 6,
  },
  {
    label: 'Dự án đất nền Đà Nẵng',
    value: 7,
  },
];
const target = <Dropdown data={dataDropdown} />;
const type = EnumComponent.HOC;
describe('Dropdown Component', () => {
  basicTest(target, type, 1, false, false);
  it('should apply all custom props', () => {
    const initialTest = getComponent(target, { containerStyle: { borderWidth: 1 } }, type).props();
    expect(initialTest.children[0].props.children[0].props.children.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          borderWidth: 1,
        }),
      ]),
    );
  });
});
