import React from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";

export default function App({isOpen, onOpenChange}:{isOpen:boolean, onOpenChange:()=>void}) {

  const deleteLogic = async () => {
    const delRes = await fetch(`/api/users/delete/${1}`)
    console.log(delRes)
  }

  return (
    <>
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
    </>
  );
}
