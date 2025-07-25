import Card from '../../components/Card/Card';
import styles from './User.module.scss'
import image from "../../../public/vite.svg"

function User() {
  return (
    <div className={styles.UserPage}>
      <Card productName={"Dressberry"} category={"Top Wear"} price={199} quantity={20} productImage={image}/>
    </div>
  )
}

export default User
