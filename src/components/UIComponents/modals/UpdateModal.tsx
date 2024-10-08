import React, { useEffect, useState, useContext } from "react";
import {Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@nextui-org/react";

import { SectionProvider } from "@/src/app/home/page";
import { inputHandler } from "@/src/services/inputHadler"
import Notify from "@/src/services/Notify";
import { toCapitalize } from "@/src/helpers/string.helper";

export default function App({isOpen, id, onOpenChange}:{isOpen:boolean, id:number, onOpenChange:()=>void}) {

  const [formData, setFormData] = useState<Record<string,string>>({})
  const section = useContext(SectionProvider)

  useEffect(()=>{
    setFormData({})
    const getData = async () =>{
      
      const resGetData = await fetch(`/api/${section.toLowerCase()}/findOne/${id}`)
      const res = await resGetData.json()
      const data:Record<string, any> = {}
      Object.entries(res).map(([key,value])=>{
        if (key=="id") return
        data[key] = String(value)
      })
      setFormData(data)
    }  
    getData()

  },[id,section])

  const handleSubmit = async(onClose:()=>void) => {
    console.log(formData)
    // const resUpdate = await fetch(`/api/${section.toLowerCase()}/update/${id}`,{
    //   method:'PUT',
    //   headers:{
    //     'Content-Type': 'application/json'
    //   },
    //   body: JSON.stringify(formData)
    // })

    // if (resUpdate.ok) Notify({message:"User Updated succesfully",backgroundColor:'#183B2A',color:'#18C764'})

    // setUser({...formData})
    onClose()
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
                          <Input isRequired type="text" name={key} label={toCapitalize(key)} className="max-w-xs flex" variant="underlined" value={formData[value]} onChange={(e)=>inputHandler(e,formData,setFormData)}/>
  
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