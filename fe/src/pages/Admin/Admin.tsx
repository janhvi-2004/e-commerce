import { useEffect, useState } from "react";
import styles from "./Admin.module.scss";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { toast } from "react-toastify";
import Table from "../../components/Table/Table";
import { useProductContext } from "../../context/product.context";

function Admin() {
  const [form, setForm] = useState({
    productName: "",
    category: "",
    price: "",
    quantity: "",
  });
const { products, loading, addProduct, deleteProduct, updateProduct, refetch} = useProductContext();
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const [showAddModal, setShowAddModal] = useState(false);

  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const [productToUpdate, setProductToUpdate] = useState<string>("");

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
      addProduct(formData);
      refetch();
      setShowAddModal(false);
      toast.success("Product added successfully");
      setForm({
        productName: "",
        category: "",
        price: "",
        quantity: "",
      });
      setUploadedImage(null);

    } catch (error) {
      throw new Error();
    } finally {
      
    }
  };

  useEffect(() => {
    refetch();
  }, []);
  
  const handleShowAddModal = () => {
    setShowAddModal((prev) => !prev);
  };
  const handleShowUpdateModal = (_id: string) => {
    setProductToUpdate(_id);
    setForm({
      productName:
        products.find((product) => product._id === _id)?.productName || "",
      category: products.find((product) => product._id === _id)?.category || "",
      price: String(products.find((product) => product._id === _id)?.price ?? ""),
      quantity: String(
        products.find((product) => product._id === _id)?.quantity ?? ""
      ),
    });
    setShowUpdateModal((prev) => !prev);
  };
  const handleDeleteProduct = async (_id: string) => {
    
    try {
     deleteProduct(_id);
      refetch();
      toast.success("Product deleted successfully");
    } catch (error) {
      throw new Error();
    } finally {
      
    }
  };

  const submitEditProductForm = async (e: any) => {
    e.preventDefault();
    
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
      updateProduct(formData);
      refetch();
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
        data={products}
        handleUpdate={handleShowUpdateModal}
        handleDelete={handleDeleteProduct}
      />
    </div>
  );
}

export default Admin;
