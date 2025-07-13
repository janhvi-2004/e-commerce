import type { ButtonProps } from "./Button.types";
import styles from "./Button.module.scss";

function Button({ type, text, className }: ButtonProps) {
  return (
    <div className={styles.ButtonWrapper}>
      <button type="submit" className={`${styles.Button} ${className} ${styles[`Button${type}`]}`}>
        {text}
      </button>
    </div>
  );
}

export default Button;
