import { useEffect, useState } from "react";
import styles from "./Admin.module.scss";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import axiosInstance from "../../axiosInstance";
import { toast } from "react-toastify";

function Admin() {
  const [form, setForm] = useState({
    productName: "",
    category: "",
    price: "",
    quantity: "",
  });

  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const handleChange = (e: any) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };
  const submitAddProductForm = async (e: any) => {
    e.preventDefault();
    if (!uploadedImage) {
      toast.error("Please select an image file");
      return;
    }
    const formData = new FormData();
    formData.append("productName", form.productName);
    formData.append("category", form.category);
    formData.append("price", form.price);
    formData.append("quantity", form.quantity);
    formData.append("productImage", uploadedImage);
    try {
      const res = await axiosInstance.post("/product/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Product added successfully");
      setForm({
        productName: "",
        category: "",
        price: "",
        quantity: "",
      });
      setUploadedImage(null);
      console.log(res);
    } catch (error) {
      throw new Error();
    }
  };

  const getProducts = async () => {
    const products = await axiosInstance.get("/product/products");
    console.log(products, "");
  };

  useEffect(() => {
    getProducts();
  }, []);

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
            type={"file"}
            id={"productImage"}
            placeholder="Enter image url"
            onChange={(e) => setUploadedImage(e.target.files?.[0] || null)}
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
