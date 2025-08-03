import Link from "next/link";
import styles from "./Header.module.scss";
import Button from "../Button/Button";
import { RiHeart2Fill } from "react-icons/ri";
// import { useParams } from "next/navigation";

function Header() {
  return (
    <div className={styles.Header}>
      <div className={styles.Logo}>logo</div>
      <div className={styles.LoginRegister}>
        <Link href="/user/wishlist/6873b3cf29cda6b888ca4fe4">
          <RiHeart2Fill color="#9090f4" size={25}/>
        </Link>
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
