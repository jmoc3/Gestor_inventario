import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@nextui-org/react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Notify from "@/src/services/Notify";

export default function App({isOpen, onOpenChange}:{isOpen:boolean, onOpenChange:()=>void}) {

  const {data:session} = useSession()
  const deleteLogic = async () => {

    const userIdResponse = await fetch(`/api/users/findOne/${session?.user?.email}`)
  
    if (!userIdResponse.ok) return console.log("Something went wrong") 
    const userId = await userIdResponse.json()

    const delResPromise = await fetch(`/api/users/delete/${userId}`,{
      method: 'DELETE'
    })
    
    if (delResPromise.ok) signOut()
    else Notify({message:"User not founded in the database",backgroundColor:'#441729',color:'#F53859',extraStyles:{zIndex:'60'}})

  }

  return (
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Are you sure?</ModalHeader>
              <ModalBody>
                <p> 
                  With this decision you will delete all the data that this account has and any possibility of accessing it, are you sure you want to delete it?
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Close
                </Button>
                <Button color="danger" variant="light"  onPress={deleteLogic}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
  );
}
