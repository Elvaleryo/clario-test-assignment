import clsx from 'clsx';
import styles from './CustomButton.module.scss';

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{
  children: React.ReactNode;
}

const CustomButton: React.FC<IButtonProps> = ({
     children,
     type = "button" as React.ButtonHTMLAttributes<HTMLButtonElement>["type"],
     className
   }) => {
  return (
    <button
      className={clsx(styles.customBtn, className)}
      type={type}
    >
      <div className={styles.contentWrap}>
        {children}
      </div>
    </button>
  );
};

export default CustomButton;
