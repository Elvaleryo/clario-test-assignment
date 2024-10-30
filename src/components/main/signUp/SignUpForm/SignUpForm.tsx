"use client"

import React from 'react';
import { useFormik } from 'formik';
import { ISignUpForm } from '@/components/main/signUp/SignUpForm/types';
import CustomInput from '@/components/common/CustomInput';
import CustomButton from '@/components/common/CustomButton';
import { FeedbackErrors, validationSchema } from '@/components/main/signUp/SignUpForm/validationSchema';
import CustomForm from '@/components/common/CustomForm';
import styles from './SignUpForm.module.scss';

const SignUpForm = () => {
  const formik = useFormik<ISignUpForm>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: (values, formikHelpers) => {
      console.log("Form submitted" ,values);
      formikHelpers.resetForm();
    },
  });

  return (
      <CustomForm formik={formik} className={styles.signUpForm}>
        <CustomInput placeholder="Enter your email" name="email" fieldProps={formik.getFieldProps('email')} />
        <CustomInput placeholder="Create your password" name="password" type="password" maxLength={64} isValidateOnChange={true} feedbackErrors={FeedbackErrors} fieldProps={formik.getFieldProps('password')} />
        <CustomButton className={styles.btn} type="submit">Sign up</CustomButton>
      </CustomForm>
  );
};

export default SignUpForm;