import { FormikProvider, FormikValues, useFormik } from 'formik';

interface ICustomFormProps<T extends FormikValues> extends React.HTMLAttributes<HTMLFormElement> {
  formik: ReturnType<typeof useFormik<T>>;
  children: React.ReactNode;
}

const CustomForm = <T extends FormikValues>({ formik, children, ...restProps }: ICustomFormProps<T>) => {
  return (
    <FormikProvider value={formik}>
      <form onSubmit={formik.handleSubmit} {...restProps}>
        {children}
      </form>
    </FormikProvider>
  );
};

export default CustomForm;