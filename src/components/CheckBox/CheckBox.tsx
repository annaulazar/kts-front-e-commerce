import React from 'react';
import classNames from "classnames";
import CheckIcon from "components/icons/CheckIcon";
import styles from './Checkbox.module.scss'

export type CheckBoxProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange'
> & {
  /** Вызывается при клике на чекбокс */
  onChange: (checked: boolean) => void;
};

const CheckBox: React.FC<CheckBoxProps> = ({onChange, ...props
}) => {
  return <label className={classNames(props.className, styles.Checkbox, {[styles.Checkbox_disabled]: props.disabled})}>
    <input {...props} type="checkbox" onClick={() => onChange(!props.checked)}/>
    <CheckIcon color={props.disabled ? 'secondary' : 'accent'} width={40} height={40}/>
  </label>
};

export default CheckBox;
