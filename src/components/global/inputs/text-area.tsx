import React, { useId } from 'react';
import classNames from 'classnames';
import styles from './input-field.module.css';

export default function TextArea({
  inputClassName,
  containerClassName,
  name,
  label,
  labelText,
  placeholder,
  errors,
  defaultValue,
}: {
  inputClassName?: string;
  containerClassName?: string;
  name: string;
  label: boolean;
  labelText?: string;
  placeholder: string;
  errors?: string;
  defaultValue?: string;
}) {
  const inputId = useId();
  return (
    <div className={classNames(styles.genericInputDiv, containerClassName)}>
      {label && <label htmlFor={inputId + `-${name}`}>{labelText}</label>}
      <textarea
        className={classNames(styles.genericInput, 'nbShadow', inputClassName)}
        id={inputId + `-${name}`}
        name={`${name}`}
        placeholder={`${placeholder}`}
        defaultValue={defaultValue}
      />
      <div className={styles.inputErrorDiv}>
        <span>{errors}</span>
      </div>
    </div>
  );
}
