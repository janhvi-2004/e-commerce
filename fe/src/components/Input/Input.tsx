import React from "react";
import styles from "./Input.module.scss";
import type { InputProps } from "./Input.types";

function Input({type, placeholder, value, id, onChange, required=false, className}: InputProps) {
  return (
    <div className={`${styles.Input}`}>
      <label className={className} htmlFor={id}>{id}</label>
      <input type={type} placeholder={placeholder} value={value} id={id} onChange={onChange} required={required}/>
    </div>
  );
}

export default Input;
