import React from "react";
import {Listbox, ListboxItem} from "@nextui-org/react";
import {useDisclosure} from "@nextui-org/react";
import {ListboxWrapper} from "./ListBoxWrapper";
import { useSession } from "next-auth/react";

import DeleteModal from "../modals/DeleteModal"
import UpdateModal from "../modals/UpdateModal"

export default function App() {
  const {isOpen:isOpenDelete, onOpen: onOpenDelete, onOpenChange:onOpenChangeDelete} = useDisclosure();
  const {isOpen:isOpenUpdate, onOpen: onOpenUpdate, onOpenChange:onOpenChangeUpdate} = useDisclosure();
  const {data:session} = useSession()

  return (
    <div className="flex flex-col gap-4 w-full  ">
      <ListboxWrapper>      
        <Listbox
          aria-label="Listbox Variants"
          color="warning"
          variant="bordered"
        >
          <ListboxItem key="new" className="text-warning text-center" onPress={onOpenUpdate} >Editar perfil</ListboxItem>
          <ListboxItem key="delete" className="text-danger text-center" color="danger" onPress={onOpenDelete}>Eliminar perfil </ListboxItem>
        </Listbox>
      </ListboxWrapper> 
      <UpdateModal isOpen={isOpenUpdate} onOpenChange={onOpenChangeUpdate} modalCase="profile" id={session?.user.id}/>
      <DeleteModal isOpen={isOpenDelete} onOpenChange={onOpenChangeDelete} id={session?.user.id} description="With this decision you will delete all the data that this account has and any possibility of accessing it, are you sure you want to delete it?"/> 
    </div>
  );
}
