import { useState } from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import styles from "./Login.module.scss";
import axiosInstance from "../../axiosInstance";
import { toast } from "react-toastify";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const submitLoginForm = async (e: any) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post("/login", { username, password });
      toast.success("User Logged in successfully");
      setUsername("");
      setPassword("");
      console.log(res, "login response");
    } catch (err) {
      throw new Error();
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
