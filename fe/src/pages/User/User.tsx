import Card from '../../components/Card/Card';
import styles from './User.module.scss'
import image from "../../../public/vite.svg"
import { useProductContext } from '../../context/product.context';

function User() {
  const {products, loading} = useProductContext();
  console.log(products, loading);
  
  return (
    <div className={styles.UserPage}>
      <div className={styles.ProductList}>
      {
        products.map((product) => (
          <Card 
            key={product._id}
            productName={product.productName}
            category={product.category}
            productImage={product.productImage}
            price={product.price} 
            quantity={product.quantity}          
            />
        ))
      }
      </div>
    </div>
  )
}

export default User
