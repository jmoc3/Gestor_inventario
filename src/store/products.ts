import { create } from "zustand";
import { Product } from "../types/types";

type States = {
    products: Product[]
}

type Actions = {
    setProducts: (products:Product[])=>void
}

export const useProductStore = create<States & Actions>()((set,get)=>({
    products: [],
    setProducts: (products)=>set({products})
}))