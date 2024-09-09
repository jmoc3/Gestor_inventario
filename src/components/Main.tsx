import { TopLeft } from "./leftMain/Top";
import { TableMain } from "./leftMain/Table";
import { StadisticInfo } from "./rightMain/StadisticInfo";
import { BarInfo } from "./rightMain/BarInfo";
import { CircularProgress } from "@nextui-org/react";

import { useProductStore } from "../store/products";
import { SectionProvider } from "../app/home/page";
import { useContext } from "react";

export function Main():JSX.Element{
    const section = useContext(SectionProvider)
    const {products} = useProductStore()
  
    return(
      <div className="mx-32 flex">
        <div className="w-2/4 h-[80vh] flex flex-col justify-center items-center border-r border-zinc-500">
          <TopLeft title={section} />
          {
            products.length!=0 ? 
            <TableMain/> : <CircularProgress aria-label="Loading..." />               
          }
        </div>
        <div className="w-2/4 h-[80vh] flex flex-col items-center gap-8 ">
          <StadisticInfo />
          <BarInfo />
        </div>
      </div>
    )
}