"use client"

import { Header } from "@/src/components/Header";
import { Main } from "@/src/components/Main";
import { useProductStore } from "../store/products";
import { useEffect } from "react";

export default function Home() {
  const {products, setProducts} = useProductStore()
  
  useEffect(()=>{
      const fetchingData = async()=>{
          const res = await fetch("/api/data")
          const data = await res.json()
          setProducts(data)
          console.log("data fetched")
      }
      fetchingData()
  },[])

  return (
    <main className={`w-full min-h-screen`}>
        <Header />
        <Main />
      </main>
  );
}
