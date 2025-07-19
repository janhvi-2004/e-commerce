import { useEffect, useState } from "react";
import styles from "./Admin.module.scss";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import axiosInstance from "../../axiosInstance";
import { toast } from "react-toastify";
import Table from "../../components/Table/Table";
import type { ProductCardProps } from "../../components/ProductCard/ProductCard.types";
import { addProduct, deleteProduct, fetchProducts } from "../../services/product.service";

function Admin() {
  const [form, setForm] = useState({
    productName: "",
    category: "",
    price: "",
    quantity: "",
  });

  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const [data, setData] = useState<ProductCardProps[]>([]);

  const [showAddModal, setShowAddModal] = useState(false);

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
      const res = await addProduct(formData);
      setShowAddModal(false);
      toast.success("Product added successfully");
      setForm({
        productName: "",
        category: "",
        price: "",
        quantity: "",
      });
      setUploadedImage(null);
console.log("response", res);

      const addedProduct = res.data;
      setData((prev) => [
        ...prev,
        {
          _id: addedProduct._id,
          productName: addedProduct.productName,
          category: addedProduct.category,
          price: addedProduct.price,
          quantity: addedProduct.quantity,
          productImage: addedProduct.productImage,
        },
      ]);
    } catch (error) {
      throw new Error();
    }
  };

  const getProducts = async () => {
    const products = await fetchProducts();
    setData(products);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const finalProducts: ProductCardProps[] = data.map((product) => {
    return {
      _id: product._id,
      productName: product.productName,
      category:
        product.category.toLowerCase() === "top wear"
          ? "Topwear"
          : "Bottomwear",
      price: product.price,
      quantity: product.quantity,
      productImage: product.productImage,
    };
  });

  const handleShowAddModal = () => {
    setShowAddModal((prev) => !prev);
  };

  const handleDeleteProduct = async (_id: string) => {
    console.log("dfghj", _id);
    
    try {
      await deleteProduct(_id);
      setData((prev) => prev.filter((product) => product._id !== _id));
    } catch (error) {
      throw new Error();
    }
  };

  return (
    <div className={styles.AdminPage}>
      {showAddModal && (
        <div className={styles.ModalOverlay}>
          <div className={styles.Modal}>
            <form className={styles.Form} onSubmit={submitAddProductForm}>
              <div className={styles.ModalHeader}>
                <Button
                  onClick={handleShowAddModal}
                  text={"X"}
                  type={"Common"}
                />
              </div>
              <div className={styles.ModalBody}>
                <div className={styles.Row}>
                  <Input
                    type="text"
                    value={form.productName}
                    id="productName"
                    placeholder="Enter product name"
                    onChange={handleChange}
                    className={styles.Label}
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
                </div>

                <div className={styles.Row}>
                  <Input
                    type="text"
                    value={form.price}
                    id="price"
                    placeholder="Enter price"
                    onChange={handleChange}
                    className={styles.Label}
                  />
                  <Input
                    type="text"
                    value={form.quantity}
                    id="quantity"
                    placeholder="Enter quantity"
                    onChange={handleChange}
                    className={styles.Label}
                  />
                </div>

                <div className={styles.Row}>
                  <Input
                    type="file"
                    id="productImage"
                    placeholder="Enter image"
                    onChange={(e) =>
                      setUploadedImage(e.target.files?.[0] || null)
                    }
                  />
                </div>
              </div>
              <Button
                className={styles.AddProductBtn}
                text={"Add Product"}
                type={"Success"}
              />
            </form>
          </div>
        </div>
      )}
      <Button
        text={"Add Product"}
        type={"Common"}
        onClick={handleShowAddModal}
      />
      <Table
        caption={"Products Table"}
        headers={["Product Name", "Category", "Price", "Quantity", "Image"]}
        data={finalProducts}
        handleDelete={handleDeleteProduct}
      />
    </div>
  );
}

export default Admin;
