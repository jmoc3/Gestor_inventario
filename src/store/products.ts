import { create } from "zustand";
import { Product } from "../types/types";

type States = {
    products: Product[],
    productsCopy: Product[],
    user: Record<string,string|number>,
    input: string
}

type Actions = {
    setProducts: (products:Product[])=>void,
    setProductsCopy: (products:Product[])=>void,
    setUser: (user:Record<string,string|number>)=>void,
    setInput: (input:string) => void,
    fetchData: (table:string)=>Promise<Product[]>
}

export const useProductStore = create<States & Actions>()((set,get)=>({
    products: [],
    productsCopy: [],
    user: {},
    input: "",
    setProducts: (products)=>set({products}),
    setProductsCopy: (productsCopy)=>set({productsCopy}),
    setUser: (user)=>set({user}),
    setInput: (input:string)=>set({input}),
    fetchData: async(table:string) => {
        return await (await fetch(`/api/${table}/get`)).json()
    }
}))