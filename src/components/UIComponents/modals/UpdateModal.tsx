import React, { useEffect, useState } from "react";
import {Input, Link, Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { inputHandler } from "@/src/services/inputHadler"

export default function App({isOpen, onOpenChange}:{isOpen:boolean, onOpenChange:()=>void}) {

  const {data:session} = useSession()
  const [formData, setFormData] = useState<Record<string,string>>({})

  useEffect(()=>{
      formData.name = session?.user.name
      formData.email = session?.user.email
  },[])

  const handleSubmit = async(onClose:()=>void) => {
    const userIdResponse = await fetch(`/api/users/findOne/${session?.user?.email}`)
  
    if (!userIdResponse.ok) return console.log("Something went wrong") 
    const userId = await userIdResponse.json()
    console.log(userId)
    const res = await fetch(`/api/users/update/${userId}`,{
      method:'UPDATE',
      headers:{
        'Content-type':'application/json'
      },
      body: JSON.stringify(formData)
    })
    console.log(await res.json())
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
                    <Input isRequired type="name" name="name" label="Name" className="max-w-xs" variant="underlined" value={formData.name} onChange={(e)=>inputHandler(e,formData,setFormData)}/>
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
