"use client"

import { Header } from "@/src/components/Header";
import { Main } from "@/src/components/Main";
import { useProductStore } from "../store/products";
import { useState, useEffect, createContext } from "react";

export const SectionProvider = createContext<string>("")
export const SetSectionProvider = createContext<React.Dispatch<React.SetStateAction<string>> | null>(null)

export default function Home() {
  const [section, setSection] = useState<string>("Customers")
  const { setProducts, setProductsCopy} = useProductStore()

  useEffect(()=>{
    const fetchingData = async()=>{
        let res = null
        if (section=="Products") res = await fetch("/api/products")
        if (section=="Customers") res = await fetch("/api/customers")
        if (section=="Supliers") res = await fetch("/api/supliers")
        const data = await res!.json()
        setProducts(data)
        setProductsCopy(data)
      }
    fetchingData()
   },[])

  return (
    <main className={`w-full min-h-screen`}>
      <SectionProvider.Provider value={section} >
      <SetSectionProvider.Provider value={setSection}>
        <Header />
      </SetSectionProvider.Provider>
        <Main />
      </SectionProvider.Provider >
      </main>
  );
}
