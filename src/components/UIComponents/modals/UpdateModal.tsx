import React, { useEffect, useState } from "react";
import {Input, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@nextui-org/react";

import { inputHandler } from "@/src/services/inputHadler"
import Notify from "@/src/services/Notify";
import { useProductStore } from "@/src/store/products";
import { useSession } from "next-auth/react";

export default function App({isOpen, onOpenChange}:{isOpen:boolean, onOpenChange:()=>void}) {
  const {setUser, user} = useProductStore() 
  const [formData, setFormData] = useState<Record<string,string>>({})
  const {data:session} = useSession()

  useEffect(()=>{
      formData.name = user.name
      formData.email = user.email
  },[])

  const handleSubmit = async(onClose:()=>void) => {
    
    const resUpdate = await fetch(`/api/users/update/${session?.user.id}`,{
      method:'PUT',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })

    if (resUpdate.ok) Notify({message:"User Updated succesfully",backgroundColor:'#183B2A',color:'#18C764'})

    setUser({...formData})
    onClose()
  }


  return (
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="w-fit p-10">
            {(onClose) => (
            <>
                <ModalHeader className="flex flex-col gap-1 text-xl">Update Profile</ModalHeader>
                <form autoComplete="off" >
                    <ModalBody className="gap-4">
                    <Input isRequired type="name" name="name" label="Name" className="max-w-xs flex" variant="underlined" value={formData.name} onChange={(e)=>inputHandler(e,formData,setFormData)}/>
                    <Input isRequired type="email" name="email" label="Email" className="max-w-xs" variant="underlined" value={formData.email} onChange={(e)=>inputHandler(e,formData,setFormData)}/>
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
