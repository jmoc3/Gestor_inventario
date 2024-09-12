import React from "react";
import {Listbox, ListboxItem} from "@nextui-org/react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure} from "@nextui-org/react";
import {ListboxWrapper} from "./ListBoxWrapper";

import DeleteModal from "../DeleteModal"

export default function App() {
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <div className="flex flex-col gap-4 w-full  ">
      <ListboxWrapper>
        <Listbox
          aria-label="Listbox Variants"
          color="warning"
          variant="bordered"
        >
          <ListboxItem key="new" className="text-warning">Editar perfil</ListboxItem>
          <ListboxItem key="delete" className="text-danger" color="danger" onPress={onOpen}>Eliminar perfil </ListboxItem>
        </Listbox>
      </ListboxWrapper> 
      <DeleteModal isOpen={isOpen} onOpenChange={onOpenChange} /> 
    </div>
  );
}
