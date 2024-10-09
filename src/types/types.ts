type Product = {
    id: number,
    name: string,
    quantity: number,
    price:number,
    supplier_id: number,
    location?:string,
    age?:string,
    email?:string,
    product_id: number
}

type Credentials = { [key:string]:string|number }

export type { Product, Credentials }