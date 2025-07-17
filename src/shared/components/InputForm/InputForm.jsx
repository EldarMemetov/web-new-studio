'use client';
import React from 'react';
import { useField } from 'formik';
import clsx from 'clsx';
import FadeError from '@/shared/components/FadeError/FadeError';
import styles from './InputForm.module.scss';
import IconGradient from '@/shared/IconGradient/IconGradient';

export function TextField({ label, id, autoComplete, className, ...props }) {
  const [field, meta] = useField(props);
  return (
    <div className={styles.fieldContainer}>
      <input
        id={id || props.name}
        autoComplete={autoComplete || props.name}
        {...field}
        {...props}
        className={clsx(styles.input, className)}
      />
      {meta.touched && meta.error && (
        <FadeError message={meta.error} className={styles.error} />
      )}
    </div>
  );
}

export function TextAreaField({
  label,
  id,
  autoComplete,
  className,
  ...props
}) {
  const [field, meta] = useField(props);
  return (
    <div className={styles.fieldContainer}>
      <textarea
        id={id || props.name}
        autoComplete={autoComplete || 'off'}
        {...field}
        {...props}
        className={clsx(styles.inputText, className)}
      />
      {meta.touched && meta.error && (
        <FadeError message={meta.error} className={styles.error} />
      )}
    </div>
  );
}

export function CheckboxField({ children, id, className, ...props }) {
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <div className={styles.checkboxContainer}>
      <input
        id={id || props.name}
        {...field}
        {...props}
        type="checkbox"
        className={clsx(styles.checkbox, className)}
      />
      <label htmlFor={id || props.name} className={styles.checkboxLabel}>
        {children}
      </label>
      {meta.touched && meta.error && (
        <FadeError message={meta.error} className={styles.error} />
      )}
    </div>
  );
}
export function RatingField({ label, className }) {
  const [field, meta, helpers] = useField('rating');
  const { setValue } = helpers;

  return (
    <div className={styles.fieldContainer}>
      {label && <label className={styles.ratingLabel}>{label}</label>}

      <div className={styles.rating}>
        {[1, 2, 3, 4, 5].map((i) => (
          <IconGradient
            key={i}
            iconName={
              field.value >= i ? 'icon-star-filled' : 'icon-star-outline'
            }
            className={styles.star}
            onClick={() => setValue(i)}
          />
        ))}
      </div>

      {meta.touched && meta.error && (
        <FadeError message={meta.error} className={styles.error} />
      )}
    </div>
  );
}
