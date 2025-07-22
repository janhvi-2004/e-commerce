import { useEffect, useState } from "react";
import styles from "./Admin.module.scss";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import axiosInstance from "../../axiosInstance";
import { toast } from "react-toastify";
import Table from "../../components/Table/Table";
import type { ProductCardProps } from "../../components/ProductCard/ProductCard.types";
import {
  addProduct,
  deleteProduct,
  fetchProducts,
  updateProduct,
} from "../../services/product.service";

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

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [productToUpdate, setProductToUpdate] = useState<string>("");

  const [loading, setLoading] = useState(false);
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
    setLoading(true);
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
    } finally {
      setLoading(false);
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
  const handleShowUpdateModal = (_id: string) => {
    setProductToUpdate(_id);
    setForm({
      productName:
        data.find((product) => product._id === _id)?.productName || "",
      category: data.find((product) => product._id === _id)?.category || "",
      price: String(data.find((product) => product._id === _id)?.price ?? ""),
      quantity: String(
        data.find((product) => product._id === _id)?.quantity ?? ""
      ),
    });
    setShowUpdateModal((prev) => !prev);
  };
  const handleDeleteProduct = async (_id: string) => {
    setLoading(true);
    try {
      await deleteProduct(_id);
      setData((prev) => prev.filter((product) => product._id !== _id));
      toast.success("Product deleted successfully");
    } catch (error) {
      throw new Error();
    } finally {
      setLoading(false);
    }
  };

  const submitEditProductForm = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();

    if (!uploadedImage) {
      throw new Error("Please select an image file");
    }
    formData.append("productName", form.productName);
    formData.append("category", form.category);
    formData.append("price", form.price);
    formData.append("quantity", form.quantity);
    formData.append("productImage", uploadedImage);
    formData.append("_id", productToUpdate);
    try {
      const res = await updateProduct(formData);
      setForm({
        productName: "",
        category: "",
        price: "",
        quantity: "",
      });
      setUploadedImage(null);
      toast.success("Product updated successfully");
      setShowUpdateModal(false);
    } catch (error) {
      throw new Error("Error in form submission");
    } finally {
      setLoading(false);
    }
  };
  const showModal = showAddModal || showUpdateModal;
  return (
    <div className={styles.AdminPage}>
     {loading && (
      <div className={styles.FallbackOverlay}>
        <div className={styles.Spinner}>Loading...</div>  
      </div>
     )} 
      {showModal && (
        <div className={styles.ModalOverlay}>
          <div className={styles.Modal}>
            <form
              className={styles.Form}
              onSubmit={
                showAddModal ? submitAddProductForm : submitEditProductForm
              }
            >
              <div className={styles.ModalHeader}>
                <Button
                  onClick={
                    showAddModal ? handleShowAddModal : handleShowUpdateModal
                  }
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
                text={showAddModal ? "Add" : "Update"}
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
        handleUpdate={handleShowUpdateModal}
        handleDelete={handleDeleteProduct}
      />
    </div>
  );
}

export default Admin;
