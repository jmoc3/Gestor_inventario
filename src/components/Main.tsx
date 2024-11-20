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
    const { products } = useProductStore()
    
    return(
      <div className="flex flex-col gap-8 sm:gap-0 sm:flex-row sm:mx-32 justify-center items-center">
        <div className="w-3/4 sm:w-2/4 h-[80vh] flex flex-col gap-8 justify-center items-center sm:border-r sm:border-zinc-500">
          <TopLeft title={section} />
          {
            products.length!=0 ?
            <TableMain/> : <CircularProgress aria-label="Loading..." />               
          }
        </div>
        <div className="w-full sm:w-2/4 h-[80vh] flex flex-col items-center gap-8 ">
          <StadisticInfo />
          <BarInfo />
        </div>
      </div>
    )
}