import * as _ from 'lodash';
import slugify from 'slugify';
import moment = require('moment');

export function enumToArray(enume) {
  return Object.keys(enume).map(key => enume[key]);
}
export function getSlug(slug: string) {
  const now = moment();

  return (
    slugify(slug, {
      replacement: '-', // replace spaces with replacement character, defaults to `-`
      remove: undefined, // remove characters that match regex, defaults to `undefined`
      lower: true, // convert to lower case, defaults to `false`
      strict: false, // strip special characters except replacement, defaults to `false`
      locale: 'vi',
    }) +
    '-' +
    now
  );
}
export function slugToName(slug: string) {
  var re = /-/gi;
  var result = slug.replace(re, " ");
  
  return result;
}
