import React, { useState } from "react";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import styles from "./Login.module.scss";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const submitLoginForm = () => {
    
  };
  return (
    <div className={styles.Login}>
      <form className={styles.Form} action={submitLoginForm}>
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
