import _ from 'lodash';

type IConditionalOperator = 'OR' | 'AND';

type IOperator = '$eq' | '$not'
| '$ne'
| '$gt'
| '$lt'
| '$gte'
| '$lte'
| '$starts'
| '$ends'
| '$cont'
| '$like'
| '$ilike'
| '$excl'
| '$in'
| '$notin'
| '$isnull'
| '$notnull'
| '$between'
| '$eqL'
| '$neL'
| '$startsL'
| '$endsL'
| '$contL'
| '$exclL'
| '$inL'
| '$notinL'
| '$contL';

class Filter {
  constructor(filterObject: any = {}) {
    this.filterObject = filterObject;
  }

  public filterObject: any;

  public mergeFilter(
    key: string,
    operator: IOperator,
    value: string | number | Array<number> | boolean,
    conditionalOperator: IConditionalOperator = 'AND',
  ): any {
    const valueWithCondition: any = {};
    valueWithCondition[operator] = value;
    const newFilter: any = {};
    newFilter[key] = valueWithCondition;

    if (conditionalOperator === 'AND') {
      this.filterObject = _.merge(this.filterObject, newFilter);
    } else {
      const orNewFilter: any = {};
      orNewFilter.$or = _.merge(this.filterObject[key], newFilter[key]);
      this.filterObject[key] = orNewFilter;
    }
    return this.filterObject;
  }

  public clearFilter(): void {
    this.filterObject = {};
  }
}

export default Filter;
