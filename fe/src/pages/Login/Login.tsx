import { useState } from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import styles from "./Login.module.scss";
import { toast } from "react-toastify";
import { loginUser } from "../../services/user.service";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
   
  const submitLoginForm = async (e: any) => {
    e.preventDefault();
    const data = { username, password };
    try {
      await loginUser(data);
      toast.success("User Logged in successfully");
      setUsername("");
      setPassword("");
    } catch (err) {
      toast.error("Something went wrong !!");
    }
  };
   
  return (
    <div className={styles.Login}>
      <form className={styles.Form} onSubmit={submitLoginForm}>
        <Input
          type={"text"}
          value={username}
          id={"Username"}
          placeholder="Enter username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type={"text"}
          value={password}
          id={"Password"}
          placeholder="Enter password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button className={styles.LoginButton} text={"Login"} type={"Common"} />
      </form>
    </div>
  );
}

export default Login;
