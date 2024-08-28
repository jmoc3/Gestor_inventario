import { create } from "zustand";
import { Product } from "../types/types";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

type States = {
    products: Product[],
    productsCopy: Product[]
}

type Actions = {
    setProducts: (products:Product[])=>void,
    setProductsCopy: (products:Product[])=>void
    fetchData: (table:string)=>Promise<Product[]>
}

export const useProductStore = create<States & Actions>()((set,get)=>({
    products: [],
    productsCopy: [],
    setProducts: (products)=>set({products}),
    setProductsCopy: (productsCopy)=>set({productsCopy}),
    fetchData: async(table:string) => {
        return await (await fetch(`/api/${table}`)).json()
    }
}))