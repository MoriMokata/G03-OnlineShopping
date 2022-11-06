export interface Product{
    type: string,
    _id: string,
    name: string,
    detail: string,
    quantity: number,
    price: number,
    img: string,
}

export interface Cart {
    _id: string,
    productId: string,
    product: Product,
    userId: string,
    quantity: number,
    isOrdered: boolean,
}