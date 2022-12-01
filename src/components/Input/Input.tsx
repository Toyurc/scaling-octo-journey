import React from 'react';
import { composeClasses } from '../../utils';
import styles from './Input.module.css';


export interface InputProps extends React.ComponentPropsWithRef<'input'> {
  name: string;
  label?: string;
  errorMsg?: string;
}
const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, name, errorMsg, ...rest }, ref) => {
    return (
      <div className={styles.inputGroup}>
        <label className={styles.label} htmlFor={name}>{label}</label>
        <div className={styles.inputWrapper}>
          <input className={composeClasses(styles.input, !!errorMsg && styles.errorBorder)} id={name} name={name} ref={ref} {...rest} />
          <span className={styles.error}>{errorMsg}</span>
        </div>
      </div>
    )
  });

export default Input;