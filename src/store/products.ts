import { create } from "zustand";
import { Product } from "../types/types";

type States = {
    products: Product[],
    productsCopy: Product[]
}

type Actions = {
    setProducts: (products:Product[])=>void,
    setProductsCopy: (products:Product[])=>void
}

export const useProductStore = create<States & Actions>()((set,get)=>({
    products: [],
    productsCopy: [],
    setProducts: (products)=>set({products}),
    setProductsCopy: (productsCopy)=>set({productsCopy})
}))