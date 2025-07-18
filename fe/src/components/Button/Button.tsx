import type { ButtonProps } from "./Button.types";
import styles from "./Button.module.scss";

function Button({ type, text, className, onClick }: ButtonProps) {
  return (
    <div className={styles.ButtonWrapper}>
      <button type="submit" className={`${styles.Button} ${className} ${styles[`Button${type}`]}`} onClick={onClick}>
        {text}
      </button>
    </div>
  );
}

export default Button;
