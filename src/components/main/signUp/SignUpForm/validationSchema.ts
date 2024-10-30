import * as yup from 'yup';

export enum EErrorsKeys {
  MIN_LENGTH = "MIN_LENGTH",
  CONTAIN_UPPERCASE = "CONTAIN_UPPERCASE",
  CONTAIN_NUMBER = "CONTAIN_NUMBER"
}

export const FeedbackErrors = {
  [EErrorsKeys.MIN_LENGTH]: "8 characters or more (no spaces)",
  [EErrorsKeys.CONTAIN_UPPERCASE]: "Uppercase and lowercase letters",
  [EErrorsKeys.CONTAIN_NUMBER]: "At least one digit"
}

export const validationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),
  password: yup.string()
    .test('password', '', (value, context) => {
      const errors: Record<string, string> = {};
      if (!value || value.length < 8) {
        errors[EErrorsKeys.MIN_LENGTH] = FeedbackErrors[EErrorsKeys.MIN_LENGTH];
      }
      if ((value !== undefined && (!/[A-Z]/.test(value) || !/[a-z]/.test(value))) || !value) {
        errors[EErrorsKeys.CONTAIN_UPPERCASE] = FeedbackErrors[EErrorsKeys.CONTAIN_UPPERCASE];
      }
      if ((value !== undefined && !/[0-9]/.test(value)) || !value) {
        errors[EErrorsKeys.CONTAIN_NUMBER] = FeedbackErrors[EErrorsKeys.CONTAIN_NUMBER];
      }

      if (Object.keys(errors).length > 0) {
        return context.createError({
          message: errors,
          path: 'password'
        });
      }
      return true;
    })
});
