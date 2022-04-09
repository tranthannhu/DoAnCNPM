/* eslint-disable max-len */
export const PATTERN_NAME: RegExp = /[a-z ,.'-]+/;
export const PATTERN_DOB: RegExp = /\d{1,2}\/\d{1,2}\/\d{4}/;
export const PATTERN_EMAIL: RegExp = /\S+@\S+\.\S+/;
export const PATTERN_PASSWORD: RegExp = /[a-z0-9]{5,}/;
export const PATTERN_PHONE: RegExp = /((09|03|07|08|05|023)+([0-9]{8})\b)/;
export const PATTERN_SMS_CODE: RegExp = /\d{4}/;
export const PATTERN_CARD_NUMBER: RegExp = /\d{4} \d{4} \d{4} \d{4}/;
export const PATTERN_CARD_EXPIRE_DATE: RegExp = /\d{2}\/\d{2}/;
export const PATTERN_CARD_CVV: RegExp = /\d{3}/;
export const PATTERN_FULLNAME: RegExp = /^$|^[a-zA-ZčČćĆđĐšŠžŽ-]+ [a-zA-ZčČćĆđĐšŠžŽ-]+$/;
export const PATTERN_ID: RegExp = /([0-9]{9}\b)/;
export const PATTERN_VERIFIED_EMAIL_CODE: RegExp = /^[0-9]{6}$/;

const RegExpValidator = (regexp: RegExp, value: string): boolean => regexp.test(value);

export const NameValidator = (value: string): boolean => RegExpValidator(PATTERN_NAME, value);

export const DOBValidator = (value: string): boolean => RegExpValidator(PATTERN_DOB, value);

export const EmailValidator = (value: string): boolean => RegExpValidator(PATTERN_EMAIL, value);

export const PasswordValidator = (value: string): boolean => RegExpValidator(PATTERN_PASSWORD, value);

export const PhoneNumberValidator = (value: string): boolean => RegExpValidator(PATTERN_PHONE, value);

export const SMSCodeValidator = (value: string): boolean => RegExpValidator(PATTERN_SMS_CODE, value);

export const CardNumberValidator = (value: string): boolean => RegExpValidator(PATTERN_CARD_NUMBER, value);

export const ExpirationDateValidator = (value: string): boolean => RegExpValidator(PATTERN_CARD_EXPIRE_DATE, value);

export const CvvValidator = (value: string): boolean => RegExpValidator(PATTERN_CARD_CVV, value);

// export const CardholderNameValidator = (value: string): boolean => {
//   return RegExpValidator(PATTERN_FULLNAME, value);
// };

export const StringValidator = (value: string): boolean => !!value && value.length > 0;

export const IDValidator = (value: string): boolean => RegExpValidator(PATTERN_ID, value);

export const VerifiedEmailCodeValidator = (value: string): boolean => RegExpValidator(PATTERN_VERIFIED_EMAIL_CODE, value);
