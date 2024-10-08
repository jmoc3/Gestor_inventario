import React from "react";
import {Listbox, ListboxItem} from "@nextui-org/react";
import {useDisclosure} from "@nextui-org/react";
import {ListboxWrapper} from "./ListBoxWrapper";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";

import Notify from "@/src/services/Notify";
import DeleteModal from "../modals/DeleteModal"
import UpdateModal from "../modals/UpdateModal"

export default function App() {
  const {isOpen:isOpenDelete, onOpen: onOpenDelete, onOpenChange:onOpenChangeDelete} = useDisclosure();
  const {isOpen:isOpenUpdate, onOpen: onOpenUpdate, onOpenChange:onOpenChangeUpdate} = useDisclosure();
  const {data:session} = useSession()

  const deleteUserLogic = async () => {
    console.log(session?.user.id)
    const delResPromise = await fetch(`/api/users/delete/${session?.user.id}`,{
      method: 'DELETE'
    })
    
    if (delResPromise.ok) signOut()
    else Notify({message:"User not founded in the database",backgroundColor:'#441729',color:'#F53859',extraStyles:{zIndex:'60'}})

  }

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
      <UpdateModal isOpen={isOpenUpdate} onOpenChange={onOpenChangeUpdate} />
      <DeleteModal isOpen={isOpenDelete} onOpenChange={onOpenChangeDelete} deleteLogic={deleteUserLogic} description="With this decision you will delete all the data that this account has and any possibility of accessing it, are you sure you want to delete it?"/> 
    </div>
  );
}
