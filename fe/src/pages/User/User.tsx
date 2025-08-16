import Card from '../../components/Card/Card';
import styles from './User.module.scss'
import { useProductContext } from '../../context/product.context';

function User() {
  const {products} = useProductContext();
  
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
