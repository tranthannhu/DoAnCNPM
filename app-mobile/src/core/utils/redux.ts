import { fromJS } from 'immutable';
import _ from 'lodash';
import qs from 'qs';
import { PER_PAGE } from 'react-native-dotenv'
/**
 * Type
 */
export type TError = {
  code: number;
  messages: Array<string>;
};

export type TMetadata = {
  count: number;
  total: number;
  page: number;
  pageCount: number;
};

export type TObjectRedux = {
  loading: boolean;
  data: any;
  error: null | TError;
};

export function createObjectInitialState(parentKey?: string) {
  const result: TObjectRedux = {
    loading: false,
    data: {},
    error: null,
  };
  if (parentKey) {
    const parentResult: any = {};
    parentResult[parentKey] = result;
    return parentResult;
  }
  return result;
}

export type TArrayRedux = {
  loading: boolean;
  data: any;
  metadata: any;
  error: null | TError;
};

export function createArrayInitialState(parentKey?: string) {
  const result: TArrayRedux = {
    loading: false,
    data: [],
    metadata: {
      count: 10,
      total: 0,
      page: 1,
      pageCount: 1,
    },
    error: null,
  };
  if (parentKey) {
    const parentResult: any = {};
    parentResult[parentKey] = result;
    return parentResult;
  }
  return result;
}

export type TQuery = {
  fields?: Array<string>;
  page?: number;
  limit?: number;
  s?: any;
};

export function createObjectReducer<T>(
  name: string,
  parentKey?: string,
  listKey?: string,
): T {
  const result: any = {};
  if (parentKey) {
    result[`${name}`] = (state: any, action: any) => {
      if (listKey) {
        const dataInList = state
          .get(listKey)
          .get('data')
          .filter((item: any) => item.get('id') === action.payload.id);
        if (!dataInList.isEmpty()) {
          return state
            .setIn([parentKey, 'loading'], true)
            .setIn([parentKey, 'data'], dataInList.get(0))
            .setIn([parentKey, 'error'], null);
        }
        return state
          .setIn([parentKey, 'loading'], true)
          .setIn([parentKey, 'error'], null);
      }
      return state
        .setIn([parentKey, 'loading'], true)
        .setIn([parentKey, 'error'], null);
    };
    result[`${name}Success`] = (state: any, action: any) => {
      const data = fromJS(action.payload);
      return state
        .setIn([parentKey, 'loading'], false)
        .mergeIn([parentKey, 'data'], data)
        .setIn([parentKey, 'error'], null);
    };
    result[`${name}Fail`] = (state: any, action: any) => {
      const error = action.payload;
      return state
        .setIn([parentKey, 'loading'], false)
        .setIn([parentKey, 'error'], error);
    };
  } else {
    result[`${name}`] = (state: any, action: any) => {
      if (listKey) {
        const dataInList = state
          .get(listKey)
          .get('data')
          .filter((item: any) => item.get('id') === action.payload.id);
        if (!dataInList.isEmpty()) {
          return state
            .set('loading', true)
            .set('data', dataInList.get(0))
            .set('error', null);
        }
        return state.set('loading', true).set('error', null);
      }
      return state.set('loading', true).set('error', null);
    };
    result[`${name}Success`] = (state: any, action: any) => {
      const data = fromJS(action.payload);
      return state.set('loading', false).set('data', data).set('error', null);
    };
    result[`${name}Fail`] = (state: any, action: any) => {
      const error = action.payload;

      // Modify Error Message
      // error.messages.push('Another Message');

      return state.set('loading', false).set('error', error);
    };
  }
  return result;
}

export function createArrayReducer<T>(name: string, parentKey?: string): T {
  const result: any = {};
  if (parentKey) {
    result[name] = (state: any, action: any) => state
      .setIn([parentKey, 'loading'], true)
      .setIn([parentKey, 'error'], null);
    result[`${name}Success`] = (state: any, action: any) => {
      const metadata = fromJS(action.payload.data);
      const currentPage = action.payload.data.page;
      const dataGet = action.payload.data.data;

      const data = currentPage === 1 || !currentPage
        ? fromJS(dataGet)
        : state
          .getIn([parentKey, 'data'])
          .concat(
            fromJS(dataGet).filter(
              (item: any) => state.getIn([parentKey, 'data']).indexOf(item) < 0,
            ),
          );
      return state
        .setIn([parentKey, 'loading'], false)
        .setIn([parentKey, 'data'], data)
        .setIn([parentKey, 'metadata'], metadata)
        .setIn([parentKey, 'error'], null);
    };
    result[`${name}Fail`] = (state: any, action: any) => {
      const error = action.payload;
      return state
        .setIn([parentKey, 'loading'], false)
        .setIn([parentKey, 'error'], error);
    };
  } else {
    result[name] = (state: any, action: any) => state.set('loading', true).set('error', null);
    result[`${name}Success`] = (state: any, action: any) => {
      const metadata = fromJS(action.payload.metadata);

      const currentPage = action.payload.metadata.page;
      const dataGet = action.payload.results;
      const data = currentPage === 1
        ? fromJS(dataGet)
        : state
          .get('data')
          .concat(
            fromJS(dataGet).filter(
              (item: any) => state.get('data').indexOf(item) < 0,
            ),
          );
      return state
        .set('loading', false)
        .set('data', data)
        .set('metadata', metadata)
        .set('error', null);
    };
    result[`${name}Fail`] = (state: any, action: any) => {
      const error = action.payload;

      // Modify Error Message
      // error.messages.push('Another Message');

      return state.set('loading', false).set('error', error);
    };
  }

  return result;
}

export const immutableTransform = require('redux-persist-transform-immutable');

export function stringifyQuery(query: TQuery) {
  let defaultLimit = parseInt(PER_PAGE, 10);

  if (Number.isNaN(defaultLimit)) {
    defaultLimit = 10;
  }
  const limit = query?.limit ? query.limit : defaultLimit;
  const offset = query?.page && query.page >= 1 ? (query.page - 1) * limit : 0;
  // const handledQuery: any = _.omit(query, ['page']);

  const handledQuery: any = query;
  handledQuery.offset = offset;
  handledQuery.limit = limit;
  // if (_.has(handledQuery, 'filter')) {
  //   handledQuery.filter = JSON.stringify(handledQuery.filter);
  // }
  if (_.has(handledQuery, 's')) {
    handledQuery.s = JSON.stringify(handledQuery.s);
  }
  console.log(handledQuery)
  const stringifiedQuery = qs.stringify(handledQuery, {
    indices: false,
    strictNullHandling: true,
  });
  return stringifiedQuery;
}
