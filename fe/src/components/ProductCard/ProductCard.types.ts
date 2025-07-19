export interface ProductCardProps {
    _id?: string,
    productName: string,
    category: "Topwear" | "Bottomwear",
    price: number,
    quantity: number,
    productImage: string
}