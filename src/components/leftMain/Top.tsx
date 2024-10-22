import {  Input } from "@nextui-org/react";

import { BsFillPlusSquareFill } from "react-icons/bs";
import { useProductStore } from "@/src/store/products";
import { useSession } from "next-auth/react";
import { useDisclosure } from "@nextui-org/react";

import CreateModal from "../UIComponents/modals/CreateModal"

export function TopLeft({title}:{title:string}):JSX.Element{
    const {products, productsCopy, setInput, setProductsCopy} = useProductStore()
    const {isOpen:isOpenCreate, onOpen: onOpenCreate, onOpenChange:onOpenChangeCreate} = useDisclosure();

    const inputChangeController = (e:React.ChangeEvent<HTMLInputElement>) => {
        const inputText = e.target.value
        const productsFiltered = products.filter(e => {

          if (!Object.keys(e).includes("name")){
              const id = `${e.id}`
              return id.includes(inputText)       
          }
          const name = e.name.toLowerCase()
          return name.includes(inputText)
      
      });     
      setProductsCopy(productsFiltered)   
      setInput(inputText)
    }

    return (
      <div className="space-y-2 h-2/6 flex flex-col justify-center">
        <h2 className="text-5xl">{title}</h2>
        <div className="flex flex-col gap-2 ">
          <span>Search some {title.slice(0,-1).toLowerCase()}</span>
          <div className="flex gap-8 justify-center items-center">
            <Input isClearable variant="faded" name="searchContent" placeholder="search bar" onChange={inputChangeController} onClear={()=>setProductsCopy(products)}/>
            <BsFillPlusSquareFill className="text-3xl cursor-pointer text-green-500" onClick={onOpenCreate}/>
            <CreateModal isOpen={isOpenCreate} onOpenChange={onOpenChangeCreate} />
          </div>
        </div>
      </div>
    )
}