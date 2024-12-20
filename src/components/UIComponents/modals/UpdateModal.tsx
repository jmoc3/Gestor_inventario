import React, { useEffect, useState, useContext } from "react";
import {Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@nextui-org/react";

import { SectionProvider } from "@/src/app/home/page";
import { inputHandler } from "@/src/services/inputHadler"
import Notify from "@/src/services/Notify";
import { toCapitalize } from "@/src/helpers/string.helper";
import { useProductStore } from "@/src/store/products";

export default function App({isOpen, id, modalCase="",  onOpenChange}:{isOpen:boolean, id?:number, modalCase?:string, onOpenChange:()=>void}) {

  const { user, setProducts, setProductsCopy, setUser, fetchData} = useProductStore()
  const [formData, setFormData] = useState<Record<string,string|number>>({})
  const [counter, setCounter] = useState<number>(0)
  let section = useContext(SectionProvider)
  
  useEffect(()=>{
    if(modalCase=="profile") section="Users"
    
    const getData = async () =>{
      const resGetData = await fetch(`/api/${section.toLowerCase()}/findOne/${id}`)
      const res = await resGetData.json()
      const data:Record<string, any> = {}
      Object.entries(res).map(([key,value])=>{
        console.log(key,value)
        if (key=="id" || ["id","password","id_rol","createdAt","updatedAt"].includes(key)) return
        data[key] = value
      })
      setFormData(data)
    }  
    getData()
    
  },[id,modalCase,section])
  
  const handleSubmit = async(onClose:()=>void) => {
    setCounter(counter+1)
    console.log(counter)
    if (counter!=1){
      return
    }

    if(modalCase=="profile") section="Users"
    const resUpdate = await fetch(`/api/${section.toLowerCase()}/update/${id}`,{
      method:'PUT',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    
    setCounter(0)
    const res = await resUpdate.json()
    
    onClose();
    
    if (res.response=="ok") { Notify({message:`${section.slice(0,-1)} updated succesfully `,backgroundColor:'#183B2A',color:'#18C764'})}

    if(section!="Users"){
      const reFetch = await fetchData(section.toLowerCase())
      setProducts(reFetch)
      setProductsCopy(reFetch)
    } else{

      setUser({...formData})
    }
    console.log(formData,section)
  }

  return (
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="w-fit p-10">
            {(onClose) => (
            <>
                <ModalHeader className="flex flex-col gap-1 text-xl">Update {section}</ModalHeader>
                <form autoComplete="off" >
                    <ModalBody className="gap-4">
                      {
                        Object.entries(formData).map(([key,value])=>(
                          <Input isRequired type="text" key={key} name={key} label={toCapitalize(key)} className="max-w-xs flex"  variant="underlined" value={`${value==""?"":value}`} onChange={(e)=>{inputHandler(e,formData,setFormData)}}/>
  
                        ))
                      }
                </ModalBody>
                <ModalFooter className="gap-4">
                    <Button color="primary" onClick={(_)=>handleSubmit(onClose)}>
                      Update
                    </Button>
                </ModalFooter>
                </form>

            </>
            )}
        </ModalContent>
      </Modal>
  );
}
