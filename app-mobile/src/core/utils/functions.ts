/* eslint-disable no-mixed-operators */

import _ from 'lodash';

/* eslint-disable import/prefer-default-export */
export const globalAny:any = global;

export function enumToArray(enumme: any) {
  return Object.keys(enumme)
    .map((key: string) => enumme[key]);
}

export function vndPriceFormat(price: number) {
  if (price > 0 && price < 1000000) {
    return `${Math.round(price / 1000 * 100) / 100} ngàn`;
  }
  if (price >= 1000000 && price < 1000000000) {
    return `${Math.round(price / 1000000 * 100) / 100} triệu`;
  }
  if (price > 1000000000) {
    return `${Math.round(price / 1000000000 * 100) / 100} tỷ`;
  }
  return price;
}

export function selectFields(collection: Array<any>, fields: Array<string> | string) {
  if (typeof fields === 'string') {
    const result: any = [];
    collection.forEach((e: any) => {
      result.push(e[fields]);
    });
    return result;
  }
  return _.map(collection, _.partialRight(_.pick, fields));
}

/* eslint-disable */

export const findDeepFields = (theObject: any, field: string, value: any): any => {
  let result = null;
  if (theObject instanceof Array) {
    for (let i = 0; i < theObject.length; i++) {
      result = findDeepFields(theObject[i], field, value);
      if (result) {
        break;
      }
    }
  } else {
    for (const prop in theObject) {
      if (prop === field) {
        if (theObject[prop] == value) {
          return theObject;
        }
      }
      if (theObject[prop] instanceof Object || theObject[prop] instanceof Array) {
        result = findDeepFields(theObject[prop], field, value);
        if (result) {
          break;
        }
      }
    }
  }
  return result;
}
