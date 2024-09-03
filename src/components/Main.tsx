import { TopLeft } from "./leftMain/Top";
import { TableMain } from "./leftMain/Table";
import { useProductStore } from "../store/products";
import { CircularProgress } from "@nextui-org/react";
import {BarChart} from "./rightMain/Barchart"
import { BsChevronBarRight, BsChevronBarLeft  } from "react-icons/bs";
import {std} from "mathjs"
import { useContext } from "react";
import { SectionProvider } from "../app/page";
import { countFrequencies, getTopRecords, classifyAges } from "../helpers/dataHelpers";

export function Main():JSX.Element{
  
    const section = useContext(SectionProvider)
    const {products, productsCopy} = useProductStore()

    const names = productsCopy.map(e => e.name)
    const quantity = productsCopy.map(e => e.quantity)
    const prices = productsCopy.map(e=>e.price)

    let x = [""]
    let xlabel = ""
    let y = [0] 
    let ylabel = ""
    let type = ""

    if (productsCopy.length!=0 && Object.keys(productsCopy[0]).includes("location")){

      const locations = productsCopy.map(e => e.location)
      const groupLocations = locations.map(e=> e!.split(" ").slice(1).join(" "))

      const donutData = ((getTopRecords(countFrequencies(groupLocations),10)))
      console.log(donutData)
      xlabel = "Top 10"
      x = donutData.map(e=>e[0]).reverse()

      ylabel = "Supplier locations"
      y = donutData.map(e=>e[1]).reverse()

      type = "dou"
      
    } else if (productsCopy.length!=0 && Object.keys(productsCopy[0]).includes("age")){

      const ages = productsCopy.map(e => +e.age!)
      xlabel = "Age"
      x = Object.keys(classifyAges(ages)).map(e => e.charAt(0).toUpperCase() + e.slice(1).toLowerCase())
      
      ylabel = "Distribution"
      y = Object.values(classifyAges(ages))

      type="polar"

    } else {
      x = names 
      xlabel = "Products"

      y = quantity
      ylabel = "Quantitys" 

      type = "bar"
    }

    let emptyCount = 0;

    productsCopy.forEach(obj => {
      Object.values(obj).forEach(value => {
        if (value === null || value === undefined || value === '' ) {
          emptyCount++;
        }
      });
    });
    
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
            <div className="w-full h-[40%] flex flex-col justify-center items-center gap-6 border-b border-zinc-500 ">
              <div className="flex flex-col items-center">
                <h4 className="text-3xl">Stadistic Information</h4>
              </div>
              <div className="w-full flex gap-[5rem] justify-center">
                  {
                    productsCopy.length!=0 && Object.keys(productsCopy[0]).includes("price") ?(
                <div className="flex flex-col items-center gap-4">

                    <span className="opacity-[0.4]">Price</span>
                  <div className="grid  grid-rows-2 grid-cols-2 ">
                    <div className="flex gap-2 p-4 justify-center border-b-1 border-zinc-400"><span className="font-semibold">Mean:</span><span>{ productsCopy.length!=0 ? (prices.reduce((a,b) => (+a)+(+b),0)/productsCopy.length).toFixed(2) : "0"}</span></div>
                    <div className="flex gap-2 p-4 justify-center border-b-1 border-zinc-400"><span className="font-semibold">Min:</span><span>{ productsCopy.length!=0 ? Math.min(...prices):"0"}</span></div>
                    <div className="flex gap-2 p-4 justify-center border-zinc-400"><span className="font-semibold">Std:</span><span>{productsCopy.length!=0 && productsCopy ? (+std(prices)).toFixed(2) : "0"}</span></div>
                    <div className="flex gap-2 p-4 justify-center border-zinc-400"><span className="font-semibold">Max:</span><span>{productsCopy.length!=0 ? Math.max(...prices): "0"}</span></div>
                  </div>
                </div>) : <></>
                  }
                <div className="flex flex-col items-center gap-4">
                  <span className="opacity-[0.4]">Table</span>
                  <div>
                    <div className="flex gap-2 p-4 justify-center  border-b-1 border-zinc-400"><span className="font-semibold">Empty fields:</span><span>{ productsCopy.length!=0 ? emptyCount : "0"}</span></div>
                    <div className="flex gap-2 p-4 justify-center "><span className="font-semibold">Rows:</span><span>{productsCopy.length}</span></div>
                  </div>
                </div>
              </div>
              </div>
            <div className="w-full h-[60%] flex flex-col justify-center items-center gap-2 ">
              <div className="flex gap-8 text-xl justify-center items-center">
                <BsChevronBarRight className="opacity-[0.4] hover:opacity-[0.7] "/>
                  <h4 className="text-3xl">Data distribution</h4>
                <BsChevronBarLeft className="opacity-[0.4] hover:opacity-[0.7] "/>
              </div>
                {
                  products.length!=0 ? 
                  <div className="w-full h-full flex flex-col justify-center items-center text-center gap-8">
                    <span className="opacity-[0.4]">{xlabel} - {ylabel}</span>  
                    <BarChart labels={x} quantity={y} type={type}/> 
                  </div> : <CircularProgress aria-label="Loading..." />
                }
            </div>
          </div>
        </div>
    )
}