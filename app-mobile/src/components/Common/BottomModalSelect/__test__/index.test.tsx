import React from 'react';
import { EnumComponent, basicTest } from '@utils/testHelper';
import BottomModalSelect from '..';

const data = [
  { id: '0', name: 'Mở bán dự án Residences Quy Nhơn' },
  { id: '17', name: 'Công bố dự án Phúc Yên Prosper Phố Đông Thủ Đức' },
  { id: '3', name: 'Công bố dự án Century City Long Thành' },
  { id: '5', name: 'Mở bán dự án Green Dragon City Quảng Ninh' },
  { id: '6', name: 'Mở bán dự án Red Dragon City Hà Nội' },
  { id: '7', name: 'Mở bán dự án Violet Dragon City Hải Phòng' },
  { id: '8', name: 'Mở bán dự án Black Dragon City Lào Cai' },
];
const target = <BottomModalSelect data={data} />;
const type = EnumComponent.SINGLE;

describe('BottomModalSelect', () => {
  basicTest(target, type, 1, false, false);
});
