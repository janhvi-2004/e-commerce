import React, { useState } from "react";
import type { AdminProps } from "./Admin.types";
import styles from "./Admin.module.scss";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";

function Admin() {
  const [form, setForm] = useState({
    productName: "",
    category: "",
    price: "",
    quantity: "",
    productImage: "",
  });
  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };
  const submitAddProductForm = async (e: any) => {
    e.preventDefault();
    const data = form;
    console.log(data, "Added product successfully");
  };
  return (
    <div className={styles.AdminPage}>
      <div className={styles.ProductForm}>
        <form className={styles.Form} onSubmit={submitAddProductForm}>
          <Input
            type={"text"}
            value={form.productName}
            id={"productName"}
            placeholder={"Enter product name"}
            onChange={handleChange}
          />
          <div className={styles.SelectInput}>
            <label>Product Category</label>
            <select
              id="category"
              value={form.category}
              onChange={handleChange}
              className={styles.Select}
            >
              <option value="">Select Category</option>
              <option value="Top Wear">Top Wear</option>
              <option value="Bottom Wear">Bottom Wear</option>
            </select>
          </div>
          <Input
            type={"text"}
            value={form.price}
            id={"price"}
            placeholder="Enter price"
            onChange={handleChange}
          />
          <Input
            type={"text"}
            value={form.quantity}
            id={"quantity"}
            placeholder="Enter quantity"
            onChange={handleChange}
          />
          <Input
            type={"text"}
            value={form.productImage}
            id={"productImage"}
            placeholder="Enter image url"
            onChange={handleChange}
          />
          <Button
            className={styles.AddProductBtn}
            text={"Add Product"}
            type={"Success"}
          />
        </form>
      </div>
    </div>
  );
}

export default Admin;
