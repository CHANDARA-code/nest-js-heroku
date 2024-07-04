/* tslint:disable:naming-convention */
import { plainToClass, Transform } from 'class-transformer';
import { findPhoneNumbersInText } from 'libphonenumber-js';
import * as _ from 'lodash';

/**
 * @description trim spaces from start and end, replace multiple spaces with one.
 * @example
 * @ApiProperty()
 * @IsString()
 * @Trim()
 * name: string;
 * @returns {(target: any, key: string) => void}
 * @constructor
 */
export const Trim = () => Transform(({ value }) => _.isArray(value) ? value.map((v) => _.trim(v).replace(/\s\s+/g, ' ')) : value ? _.trim(value).replace(/\s\s+/g, ' ') : null); // prettier-ignore

/**
 * @description convert string or number to integer
 * @example
 * @IsNumber()
 * @ToInt()
 * name: number;
 * @returns {(target: any, key: string) => void}
 * @constructor
 */

export const TransformToNumber = () => Transform(({ value }) => value ? parseInt(value, 10) : 0, { toClassOnly: true }); // prettier-ignore

/**
 * @description convert string or number to integer
 * @example
 * @IsNumber()
 * @ToInt()
 * name: number;
 * @returns {(target: any, key: string) => void}
 * @constructor
 */
export const TransformToZoneCode = () => Transform(({ value }) => (value > 0 && value < 9) ?  `0${value}`: `${value}`, { toClassOnly: true }); // prettier-ignore

/**
 * @description transforms to array, specially for query params
 * @example
 * @IsNumber()
 * @ToArray()
 * name: number;
 * @constructor
 */
export const TransformToStringArray = () => Transform(({ value: v }) => v?.split('|')?.map(v => v)?.filter(x => x)); // prettier-ignore

/**
 * Transform input to number array.
 * @example
 */
export const TransformToPhoneNumberString = () => Transform(({ value: v }) => findPhoneNumbersInText(v, 'KH').map(v => v?.number?.nationalNumber.toString() || '').join(',')); // prettier-ignore

/**
 * Transform input to number array.
 * @example
 */
export const TransformToClassObject = <T>(className: new () => T) => Transform(({ value }) => plainToClass(className, value)); // prettier-ignore

/**
 * Transform sort.
 * @example
 */
export const TransformToSorting = () => Transform(({ value: v }) => v.split('|')?.map(v => v)?.reduce((a, v) => ({ ...a, ...mapSorting(v) }), {})); // prettier-ignore
const mapSorting = (v: string) => {
  const value = v.includes('-') ? 'DESC' : 'ASC';
  // const key = v.replace(/\\+|-|\s/gi, '');
  const key = v?.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>\{\}\[\]\\\/]|\s/gi, '') || '';
  return key ? { [key]: value } : {};
  // return { [key]: value };
};

/**
 * Transform input to query string for redis search
 * @example
 * @constructor
 */
export const TransformToQueryString = () => Transform(({ value: v }) => v ? v?.trim()?.split(' ')?.map(v => v.trim()).reduce((a, v) => getQueryString(a, v), '') : undefined); // prettier-ignore
const getQueryString = (a, v) => {
  const regex = /[@#!$%^&*()+|~=`{}\[\]:";'<>?,.\/\\]/g;

  const prev = a;
  const replacedString = v?.replace(regex, '');
  const cur = replacedString.length > 2 ? replacedString + '*' : replacedString;
  const result = prev ? (cur ? prev + '|' + cur : prev) : cur;

  return result;
};

/**
 * @description transforms to string of emails separated by comma "," to array of emails, specially for query params
 * @example
 * @IsNumber()
 * @ToArray()
 * name: number;
 * @constructor
 */
export const TransformStringToEmailArray = () => Transform(({ value: v }) => v?.split(',')?.map(v => v?.trim())?.filter(x => x)); // prettier-ignore
