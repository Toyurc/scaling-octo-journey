// @ts-nocheck
import * as yup from 'yup';

// I decided to also use a custom validation as an extra step to ensure data validity
// also to ensure that the min lat/lng is not greater than the max lat/lng
export const FindBBoxSchema = yup.object().shape({
  minLong: yup.number()
    .typeError('Decimal Numbers only')
    .test(
      'is-decimal',
      'Decimal Numbers only',
      value => (value + "").match(/^-?\d+(\.\d+)?$/),
    )
    .required(),
  maxLong: yup.number()
    .typeError('Decimal Numbers only')
    .test(
      'is-decimal',
      'Decimal Numbers only',
      value => (value + "").match(/^-?\d+(\.\d+)?$/),
    )
    .required()
    .moreThan(yup.ref('minLong'), 'Max Longitude must be greater than Min Longitude'),
  minLat: yup.number()
    .typeError('Decimal Numbers only')
    .test(
      'is-decimal',
      'Decimal Numbers only',
      value => (value + "").match(/^-?\d+(\.\d+)?$/),
    )
    .required(),
  maxLat: yup.number()
    .typeError('Decimal Numbers only')
    .test(
      'is-decimal',
      'Decimal Numbers only',
      value => (value + "").match(/^-?\d+(\.\d+)?$/),
    )
    .required()
    .moreThan(yup.ref('minLat'), 'Max Latitude must be greater than Min Latitude'),
});