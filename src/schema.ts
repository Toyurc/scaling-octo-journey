import * as yup from 'yup';

export const FindBBoxSchema = yup.object().shape({
  minLong: yup.string().required('Minimum Longitude is required').max(12, 'Maximum characters(12) exceeded')
    .matches(/^\S*$/, 'No spaces allowed')
    .matches(/^-?[0-9]\d*\.\d+?$/, 'Decimal Numbers only'),
  maxLong: yup.string().required('Maximum Longitude is required').max(12, 'Maximum characters(12) exceeded')
    .matches(/^\S*$/, 'No spaces allowed')
    .matches(/^-?[0-9]\d*\.\d+?$/, 'Decimal Numbers only'),
  minLat: yup.string().required('Minimum Latitude is required').max(12, 'Maximum characters(12) exceeded')
    .matches(/^\S*$/, 'No spaces allowed')
    .matches(/^-?[0-9]\d*\.\d+?$/, 'Decimal Numbers only'),
  maxLat: yup.string().required('Minimum Longitude is required').max(12, 'Maximum characters(12) exceeded')
    .matches(/^\S*$/, 'No spaces allowed')
    .matches(/^-?[0-9]\d*\.\d+?$/, 'Decimal Numbers only'),
});