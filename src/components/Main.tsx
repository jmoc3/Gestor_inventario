import { Top } from "./main/Top";
import { TableMain } from "./main/Table";
import { useProductStore } from "../store/products";
import { CircularProgress } from "@nextui-org/react";

export function Main():JSX.Element{
    
    const {products} = useProductStore()

    return(
        <div className="mx-32">
          <div className="leftMain w-2/4 h-[80vh] flex flex-col items-center border-r border-zinc-500">
            <Top title="Products" />
            {
            products.length!=0 ? 
            <TableMain/> : <CircularProgress aria-label="Loading..." />               
        }
          </div>
          <div className="rightMain">
            
          </div>
        </div>
    )
}