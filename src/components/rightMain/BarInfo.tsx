import {BarChart} from "./chart/Barchart"
import { CircularProgress } from "@nextui-org/react";
import { useContext } from "react";

import { SectionProvider } from "@/src/app/home/page";
import { countFrequencies, getTopRecords, classifyAges } from "../../helpers/data.helper";
import { BsChevronBarRight, BsChevronBarLeft  } from "react-icons/bs";
import { useProductStore } from "@/src/store/products";

export function BarInfo(){

    const section = useContext(SectionProvider)

    const {products, productsCopy} = useProductStore()
    let names:string[] = []

    if(productsCopy.length!=0 && Object.keys(productsCopy[0]).includes("name")){
      names = productsCopy.map(e => e.name)
    }else{
      names = productsCopy.map(e => `${e.id}`)
    }
    const quantity = productsCopy.map(e => e.quantity)

    let x = [""], y = [0] 
    let xlabel = "", ylabel = ""
    let type = ""
    console.log(productsCopy[0])
    if (productsCopy.length!=0 && Object.keys(productsCopy[0]).includes("location")){
      console.log(Object.keys(productsCopy[0]))
      const locations = productsCopy.map(e => e.location)
      const groupLocations = locations.map(e=> e!.split(" ").slice(1).join(" "))
      const donutData = ((getTopRecords(countFrequencies(groupLocations),10)))

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
      x = names , y = quantity
      xlabel = "Products", ylabel = "Quantitys" 
      type = "bar"
    }

    console.log(x, y)

    return(
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
    </div>)
}