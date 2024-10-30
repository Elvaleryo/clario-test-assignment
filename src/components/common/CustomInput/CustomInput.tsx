import React from 'react';
import clsx from 'clsx';
import { FieldInputProps, useFormikContext } from 'formik';
import styles from './CustomInput.module.scss';
import ShowIcon from '@/components/common/icons/ShowIcon';
import HideIcon from '@/components/common/icons/HideIcon';

interface ICustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  name: string;
  fieldProps?: FieldInputProps<any>;
  isValidateOnChange?: boolean;
  feedbackErrors?: Record<string, string>;
}

const CustomInput = ({ type = "text", name, className, fieldProps, isValidateOnChange, feedbackErrors, onBlur, ...props }: ICustomInputProps) => {
  const { values, validateField, errors, touched, submitCount } = useFormikContext<any>();
  const [isShowPassword, setIsShowPassword] = React.useState<boolean>(false);
  const [inputType, setInputType] = React.useState<string>(type as string);
  const [feedbackErrorsKeys, setFeedbackErrorsKeys] = React.useState<string[]>([]);

  const value = values[name];
  const error = errors[name];
  const isTouched = touched[name];
  const isTypePassword = type === "password";

  const handleClickPasswordIcon = () => {
    setIsShowPassword(prev => !prev);
    setInputType(prev => prev === "password" ? "text" : "password");
  };

  const handelOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (fieldProps?.onBlur) {
      fieldProps?.onBlur(e);
    }
    if (onBlur) {
      onBlur(e);
    }
    if (!isValidateOnChange) {
      validateField(name)
    }
  };

  React.useEffect(() => {
    if (!isValidateOnChange) return;
    if (value) {
      validateField(name);
    }
  }, [value, isValidateOnChange]);

  React.useEffect(() => {
    if (!feedbackErrors) return;
    setFeedbackErrorsKeys(error ? Object.keys(error) : []);
  }, [error, feedbackErrors]);

  return (
    <div className={styles.customInputWrap}>
      <div className={clsx(styles.inputWrap, !error && isTouched && value && styles.inputValid, error && submitCount && styles.inputError)}>
        <input
          type={inputType}
          name={name}
          className={clsx(styles.customInput, className, isTypePassword && styles.password)}
          {...fieldProps}
          {...props}
          onBlur={handelOnBlur}
        />
        {isTypePassword && (
          <div className={styles.passwordIconWrap} onClick={handleClickPasswordIcon}>
            {isShowPassword ? <ShowIcon className={styles.passwordIcon} /> :  <HideIcon className={styles.passwordIcon} />}
          </div>)}
      </div>

      {error && !feedbackErrors && typeof error === 'string' && <p className={clsx(styles.errorMessage, styles.error)}>{error}</p>}

      {feedbackErrors && <div className={styles.errorsWrap}>
        {Object.keys(feedbackErrors).map((key) => (
          <p key={key} className={clsx(feedbackErrorsKeys.includes(key) && styles.error, value && !feedbackErrorsKeys.includes(key) && styles.valid)}>
            {feedbackErrors[key]}
          </p>
        ))}
      </div>}
    </div>

  );
};

export default CustomInput;