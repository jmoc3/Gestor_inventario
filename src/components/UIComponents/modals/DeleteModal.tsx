import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@nextui-org/react";
import { signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import Notify from "@/src/services/Notify";

export default function App({isOpen, onOpenChange, deleteLogic, description}:{isOpen:boolean, onOpenChange:()=>void, deleteLogic:()=>void, description:string}) {

  const {data:session} = useSession()


  return (
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Are you sure?</ModalHeader>
              <ModalBody>
                <p> 
                  {description}
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onPress={onClose}>
                  Close
                </Button>
                <Button color="danger" variant="light"  onPress={()=>{deleteLogic();onClose()}}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
  );
}