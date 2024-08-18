import { TopLeft } from "./leftMain/Top";
import { TableMain } from "./leftMain/Table";
import { useProductStore } from "../store/products";
import { CircularProgress } from "@nextui-org/react";
import {BarChart} from "./rightMain/Barchart"
import { BsArrowRightSquareFill, BsArrowLeftSquareFill  } from "react-icons/bs";

export function Main():JSX.Element{
    
    const {products} = useProductStore()

    const labels = products.map(e => e.name)
    const quantity = products.map(e => e.quantity)

    return(
        <div className="mx-32 flex">
          <div className="w-2/4 h-[80vh] flex flex-col items-center border-r border-zinc-500">
            <TopLeft title="Products" />
            {
            products.length!=0 ? 
            <TableMain/> : <CircularProgress aria-label="Loading..." />               
        }
          </div>
          <div className="w-2/4 h-[80vh] flex flex-col items-center ">
            <div className="h-2/6 flex flex-col justify-center items-center gap-2">
              <div className="flex gap-8 text-2xl justify-center items-center">
                <BsArrowLeftSquareFill className="opacity-[0.4] cursor-pointer"/>
                  <h2 className="text-5xl">Data distribution</h2>
                <BsArrowRightSquareFill className="opacity-[0.4] cursor-pointer"/>
              </div>
              <span>Summary and comparison of the dataset</span>
            </div>
            <div className="w-full h-4/6 flex flex-col justify-center items-center px-16 gap-2 border-t border-zinc-500">
              <span className="opacity-[0.4]">Product - Quantity</span>
              <BarChart labels={labels} quantity={quantity} />
            </div>
          </div>
        </div>
    )
}