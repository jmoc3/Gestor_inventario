import React, {useState, useContext} from "react";
import {Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button} from "@nextui-org/react";
import Notify from "@/src/services/Notify";
import { SectionProvider } from "@/src/app/home/page";
import { useProductStore } from "@/src/store/products";

export default function App({isOpen, onOpenChange, id, description}:{isOpen:boolean, onOpenChange:()=>void, id:number, description:string}) {

  const { setProducts, setProductsCopy, fetchData} = useProductStore()
  const [counter, setCounter] = useState<number>(0)

  let section = useContext(SectionProvider)

  const deleteFunction = async (onClose:()=>void) =>{
    setCounter(counter+1)
    if (counter!=1){
       return
    }

    const delResPromise = await fetch(`/api/${section.toLowerCase()}/delete/${id}`,{
      method: 'DELETE'
    })

    setCounter(0)
    console.log(counter)
    
    const delRes = await delResPromise.json()

    if(!Object.keys(delRes).includes("id")) { 
        onClose()
        return Notify({message:`${section} row with id ${id} is called in another table`,backgroundColor:'#441729',color:'#F53859',extraStyles:{zIndex:'60'},duration:5000})
      }

    if(section!="Users"){
      const reFetch = await fetchData(section.toLowerCase())
      setProducts(reFetch)
      setProductsCopy(reFetch)
    } 

    onClose()
    return Notify({message:`${section} deletion completed`,backgroundColor:'#183B2A',color:'#18C764'})
  }

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
                <Button color="danger" variant="light"  onPress={()=>{deleteFunction(onClose)}}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
  );
}
