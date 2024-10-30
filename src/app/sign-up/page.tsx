import styles from './sign-up.module.scss';
import SignUpForm from '@/components/main/signUp/SignUpForm';

const SignUpPage = () => {
  return (
    <div className={styles.signUpPage}>
      <h1 className={styles.title}>Sign Up</h1>
      <SignUpForm />
    </div>
  );
};

export default SignUpPage;