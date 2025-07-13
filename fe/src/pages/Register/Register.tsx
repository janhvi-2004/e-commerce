import React, { useState } from "react";
import styles from "./Register.module.scss";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const submitRegisterForm = (e: any) => {
    // e.preventDefault();
    console.log(firstName, lastName, username, password);
    
    
  }

  return (
    <div className={styles.Register}>
      <form className={styles.Form} action={submitRegisterForm}>
        <Input
          type={"text"}
          value={firstName}
          id={"First Name"}
          placeholder={"Enter First Name"}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          type={"text"}
          value={lastName}
          id={"Last Name"}
          placeholder={"Enter Last Name"}
          onChange={(e) => setLastName(e.target.value)}
        />
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
       <Button className={styles.RegisterButton} text={"Register"} type={"Common"}/>
      </form>
    </div>
  );
}

export default Register;
