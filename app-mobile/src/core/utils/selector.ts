import { createSelector, OutputSelector } from 'reselect';
import { TObjectRedux, TArrayRedux } from './redux';

/**
 * getSelector
 */
export const getSelector = (root: any, field: string) => createSelector(
  root,
  (data: any) => data.get(field),
);

/**
 * getInSelector
 */
export const getInSelector = (
  root: any,
  fields: Array<string>,
) => createSelector(
  root,
  (data: any) => data.getIn(fields),
);

/**
 * createObjectSelector
 */
type TObjectSelector = {
  loading: OutputSelector<unknown, any, (res: any) => any>;
  data: OutputSelector<unknown, any, (res: any) => any>;
  error: OutputSelector<unknown, any, (res: any) => any>;
};
export const createObjectSelector = (root: any, parentKey?: string): TObjectSelector => {
  if (parentKey) {
    return ({
      loading: getInSelector(root, [parentKey, 'loading']),
      data: getInSelector(root, [parentKey, 'data']),
      error: getInSelector(root, [parentKey, 'error']),
    });
  }
  return ({
    loading: getSelector(root, 'loading'),
    data: getSelector(root, 'data'),
    error: getSelector(root, 'error'),
  });
};

/**
 * applyObjectSelector
 */
export const applyObjectSelector = (selector: TObjectSelector, state: any): TObjectRedux => ({
  loading: selector.loading(state),
  data: selector.data(state),
  error: selector.error(state),
});
export const parseObjectSelector = (object: TObjectRedux): TObjectRedux => ({
  loading: object.loading,
  data: object.data.toJS(),
  error: object.error,
});

/**
 * createArraySelector
 */
type TArraySelector = {
  loading: OutputSelector<unknown, any, (res: any) => any>;
  data: OutputSelector<unknown, any, (res: any) => any>;
  metadata: OutputSelector<unknown, any, (res: any) => any>;
  error: OutputSelector<unknown, any, (res: any) => any>;
};
export const createArraySelector = (root: any, parentKey?: string): TArraySelector => {
  if (parentKey) {
    return ({
      loading: getInSelector(root, [parentKey, 'loading']),
      data: getInSelector(root, [parentKey, 'data']),
      metadata: getInSelector(root, [parentKey, 'metadata']),
      error: getInSelector(root, [parentKey, 'error']),
    });
  }
  return ({
    loading: getSelector(root, 'loading'),
    data: getSelector(root, 'data'),
    metadata: getSelector(root, 'metadata'),
    error: getSelector(root, 'error'),
  });
};

/**
 * applyArraySelector
 */
export const applyArraySelector = (selector: TArraySelector, state: any): TArrayRedux => ({
  loading: selector.loading(state),
  data: selector.data(state),
  metadata: selector.metadata(state),
  error: selector.error(state),
});

export const parseArraySelector = (object: TArrayRedux): TArrayRedux => ({
  loading: object.loading,
  data: object.data.toJS(),
  metadata: object.metadata.toJS(),
  error: object.error,
});

export default getSelector;
