"use client"

import { Header } from "@/src/components/Header";
import { Main } from "@/src/components/Main";
import { useProductStore } from "../store/products";
import { useState, useEffect, createContext } from "react";
import { LogIn } from "@/src/components/Login";

export const SectionProvider = createContext<string>("")
export const SetSectionProvider = createContext<React.Dispatch<React.SetStateAction<string>> | null>(null)

export const setInputTextContext = createContext<React.Dispatch<React.SetStateAction<string>>| null>(null);
export const InputTextContext = createContext('');

export default function Home() {
  const [section, setSection] = useState<string>("Products")
  const { setProducts, setProductsCopy, fetchData} = useProductStore()

  let conditional = false

  useEffect(()=>{
    const fetchingData = async()=>{
        const data = await fetchData("products")
      
        setProducts(data)
        setProductsCopy(data)
      }
    fetchingData()
   },[])

  return (
    <main className={`w-full min-h-screen`}>
    {
      conditional ? (
      <SectionProvider.Provider value={section} >
        <SetSectionProvider.Provider value={setSection}>
          <Header />
          </SetSectionProvider.Provider>
          <Main />
      </SectionProvider.Provider >) : <LogIn />
    }  
    </main>
  );
}
