'use client'

import { Top } from "./main/Top";
import { TableMain } from "./main/Table";
import { useEffect } from "react";
import { useProductStore } from "../store/products";

export function Main():JSX.Element{

    const {  setProducts } = useProductStore()

    useEffect(()=>{
        const fetchingData = async()=>{
            const res = await fetch("/api/data")
            const data = await res.json()
            setProducts(data)
            console.log("done")
        }

        fetchingData()
    },[])

    return(
        <div className="mx-32">
            <Top title="Products" />
            <TableMain/>
        </div>
    )
}