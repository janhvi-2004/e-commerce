import { useState } from "react";
import styles from "./Register.module.scss";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import axiosInstance from "../../axiosInstance";
import { toast } from "react-toastify";
import { registerUser } from "../../services/user.service";

function Register() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };
  const submitRegisterForm = async (e: any) => {
    e.preventDefault();
    try {
      await registerUser(form);
      toast.success("User registered successfully!");
      setForm({
        firstName: "",
        lastName: "",
        username: "",
        password: "",
      });
    } catch (error) {
      toast.error("Registration failed. Please try again.")
    }
  };

  return (
    <div className={styles.Register}>
      <form className={styles.Form} onSubmit={submitRegisterForm}>
        <Input
          type={"text"}
          value={form.firstName}
          id={"firstName"}
          placeholder={"Enter First Name"}
          onChange={handleChange}
        />
        <Input
          type={"text"}
          value={form.lastName}
          id={"lastName"}
          placeholder={"Enter Last Name"}
          onChange={handleChange}
        />
        <Input
          type={"text"}
          value={form.username}
          id={"username"}
          placeholder="Enter username"
          onChange={handleChange}
        />
        <Input
          type={"text"}
          value={form.password}
          id={"password"}
          placeholder="Enter password"
          onChange={handleChange}
        />
        <Button
          className={styles.RegisterButton}
          text={"Register"}
          type={"Common"}
        />
      </form>
    </div>
  );
}

export default Register;
