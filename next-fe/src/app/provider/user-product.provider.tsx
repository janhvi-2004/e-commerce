import { ProductProvider } from "../context/product.context"
import { UserProvider } from "../context/user.context"

const UserProductProvider = ({ children, userId }: { children: React.ReactNode, userId: string }) => { 
    return (
        <UserProvider userId={userId}>
            <ProductProvider>
                {children}
            </ProductProvider>
        </UserProvider>
    )
}

export default UserProductProvider;