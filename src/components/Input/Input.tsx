import React from 'react';
import classNames from "classnames";
import styles from './Input.module.scss'

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({onChange,afterSlot,className,onClick,...props},ref) => <div onClick={onClick} className={classNames(className,styles.Input)}>
    <input {...props} type="text" onChange={(e)=>onChange(e.target.value)} ref={ref}/>
    {afterSlot}
  </div>)

export default Input;
