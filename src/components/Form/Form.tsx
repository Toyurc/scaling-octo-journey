import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react'
import { useForm } from 'react-hook-form';
import { FindBBoxSchema } from '../../utils/schema';
import { IBBoxRequest } from '../../utils/types';
import Input from '../Input/Input';
import styles from './Form.module.css';


interface FormProps {
  submitHandler: (data: IBBoxRequest) => Promise<void>;
  resetHandler: () => void;
  loading: boolean;
}
const Form = ({ submitHandler, resetHandler, loading }: FormProps) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<IBBoxRequest>({
    resolver: yupResolver(FindBBoxSchema),
  });

  const handleReset = () => {
    reset();
    resetHandler();
  }

  return (
    <form onSubmit={handleSubmit(submitHandler)} onReset={handleReset} data-testid="form">
      <Input
        {...register('minLong')}
        name='minLong'
        type={'text'}
        label="Min Longitude / Left"
        placeholder='24.202154'
        errorMsg={errors.minLong?.message}
      />
      <Input
        {...register('maxLong')}
        name='maxLong'
        type={'text'}
        label="Max Longitude / Right"
        placeholder='24.202905'
        errorMsg={errors.maxLong?.message}
      />
      <Input
        {...register('minLat')}
        name='minLat'
        type={'text'}
        label="Min Latitude / Bottom"
        placeholder='-0.482686'
        errorMsg={errors.minLat?.message}
      />
      <Input
        {...register('maxLat')}
        name='maxLat'
        type={'text'}
        label="Max Latitude / Top"
        placeholder='-0.481217'
        errorMsg={errors.maxLat?.message}
      />

      <div className={styles.buttonWrapper}>
        <button disabled={loading} type="submit">Get BBox Data</button>
        <button type="reset">Reset</button>
      </div>
    </form>
  )
}

export default Form