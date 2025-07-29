import  Link  from "next/link"
import styles from "./Header.module.scss";
import Button from "../Button/Button";

function Header() {
  return (
    <div className={styles.Header}>
      <div className={styles.Logo}>logo</div>
      <div className={styles.LoginRegister}>
        <Link href="/login">
          <Button text={"Login"} type={"Common"} />
        </Link>
        <Link href="/register">
          <Button text={"Register"} type={"Common"} />
        </Link>
     </div>
    </div>
  );
}

export default Header;
