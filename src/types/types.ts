type Product = {
    id: number,
    name: string,
    quantity: number,
    price:number,
    supplier_id: number,
    location?:string,
    age?:string,
    email?:string
}

export type { Product }