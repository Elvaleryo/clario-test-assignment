import styles from "./page.module.css";
import Link from 'next/link';
import CustomButton from '@/components/common/CustomButton/CustomButton';

export default function Home() {
  return (
    <div className={styles.homePage}>
      <h1>Welcome to the Home Page</h1>
      <p>Click the button below to sign up:</p>
      <Link href="/sign-up">
        <CustomButton>
          Sign Up
        </CustomButton>
      </Link>
    </div>
  );
}
