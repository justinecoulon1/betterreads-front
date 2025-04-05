import React, { useId } from 'react';
import classNames from 'classnames';
import styles from './book-form-input.module.css';

export default function AddBookInput({
  name,
  type,
  label,
  labelText,
  placeholder,
  errors,
  defaultValue,
}: {
  name: string;
  type: string;
  label: boolean;
  labelText?: string;
  placeholder: string;
  errors?: string;
  defaultValue?: string;
}) {
  const inputId = useId();
  return (
    <div className={styles.genericInputDiv}>
      {label && <label htmlFor={inputId + `-${name}`}>{labelText}</label>}
      <input
        className={classNames(styles.genericInput, 'nbShadow')}
        id={inputId + `-${name}`}
        name={`${name}`}
        type={type}
        placeholder={`${placeholder}`}
        defaultValue={defaultValue}
      />
      <div className={styles.inputErrorDiv}>
        <span>{errors}</span>
      </div>
    </div>
  );
}
