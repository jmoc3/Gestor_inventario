import React, { useEffect, useState, useContext } from "react";
import {Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@nextui-org/react";

import { SectionProvider } from "@/src/app/home/page";
import { inputHandler } from "@/src/services/inputHadler"
import Notify from "@/src/services/Notify";
import { toCapitalize } from "@/src/helpers/string.helper";
import { useProductStore } from "@/src/store/products";

export default function App({isOpen, onOpenChange}:{isOpen:boolean, onOpenChange:()=>void}) {

  const {setProducts, setProductsCopy, fetchData} = useProductStore()

  const [formData, setFormData] = useState<Record<string,string|number>>({})
  const [counter, setCounter] = useState<number>(0)

  const section = useContext(SectionProvider)!
  
  useEffect(()=>{
    const getData = async () =>{
      const resGetData = await fetch(`/api/${section.toLowerCase()}/findOne/1`)
      const res = await resGetData.json()
      const data:Record<string, any> = {}
      console.log(res)
      Object.keys(res).map((key)=>{
        if (key=="id") return
        data[key] = ""
      })
      setFormData(data)
    }  
    getData()
  },[section])

  const handleSubmit = async(onClose:()=>void) => {
    setCounter(counter+1)
    if (counter!=1){
      return
    }

    const resCreate = await fetch(`/api/${section.toLowerCase()}/create`,{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    setCounter(0)
    const res = await resCreate.json()
    
    if (!Object.keys(res).includes("Message")){
      if (res.meta.field_name="Products_supplier_id_fkey (index)") return Notify({message:"Supplier doesn't exist" ,backgroundColor:'#441729',color:'#F53859'})
      return Notify({message:"Something went wrong" ,backgroundColor:'#441729',color:'#F53859'})
    }
    
    onClose()
    if(section!="Users"){
      const reFetch = await fetchData(section.toLowerCase())
      setProducts(reFetch)
      setProductsCopy(reFetch)
    } 
    return Notify({message:`${section.slice(0,-1)} created succesfully `,backgroundColor:'#183B2A',color:'#18C764'})
  }

  return (
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="w-fit p-10">
            {(onClose) => (
            <>
                <ModalHeader className="flex flex-col gap-1 text-xl">Create {section}</ModalHeader>
                <form autoComplete="off" >
                    <ModalBody className="gap-4">
                      {
                        Object.keys(formData).map((key,id)=>(
                          <Input isRequired type="text" key={id} name={key} label={toCapitalize(key)} className="max-w-xs flex"  variant="underlined" value={`${formData[key]==""?"":formData[key]}`} onChange={(e)=>inputHandler(e,formData,setFormData)}/>
  
                        ))
                      }
                </ModalBody>
                <ModalFooter className="gap-4">
                    <Button color="primary" onClick={(_)=>handleSubmit(onClose)}>
                      Create
                    </Button>
                </ModalFooter>
                </form>

            </>
            )}
        </ModalContent>
      </Modal>
  );
}
