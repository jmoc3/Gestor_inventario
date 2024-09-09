import { useProductStore } from "@/src/store/products"
import {std} from "mathjs"

export function StadisticInfo(){
    const {products, productsCopy} = useProductStore()
    const prices = productsCopy.map(e=>e.price)
    
    let emptyCount = 0;

    productsCopy.forEach(obj => {
      Object.values(obj).forEach(value => {
        if (value === null || value === undefined || value === '' ) {
          emptyCount++;
        }
      });
    });

    return (
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
            </div>
          ) : <></>
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
    )
}