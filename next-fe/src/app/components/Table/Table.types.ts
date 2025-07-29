import type { ProductCardProps } from "../ProductCard/ProductCard.types";

export interface TableProps {
    caption: string,
    headers: string[],
    data: ProductCardProps[],
    handleDelete?:any;
    handleUpdate?: any;
}