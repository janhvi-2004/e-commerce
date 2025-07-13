import { NavLink } from "react-router-dom";
import styles from "./Header.module.scss";
import Button from "../Button/Button";

function Header() {
  return (
    <div className={styles.Header}>
      <div className={styles.Logo}>logo</div>
      <div className={styles.LoginRegister}>
        <NavLink to="/login">
          <Button text={"Login"} type={"Common"} />
        </NavLink>

        <NavLink to="/register">
          <Button text={"Register"} type={"Common"} />
        </NavLink>
      </div>
    </div>
  );
}

export default Header;
