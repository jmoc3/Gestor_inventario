
import { Modal, ModalContent, ModalHeader, ModalBody, Input, Link, ModalFooter, Button } from "@nextui-org/react"
import axios, { AxiosError } from "axios"
import { useState } from "react"
import { inputHandler } from "@/src/services/inputHadler"
import Notify from "@/src/services/Notify"
import { toCapitalize } from "@/src/helpers/string.helper"

export const SignUpModal = ({isOpen, onOpenChange}:{isOpen:boolean, onOpenChange:()=>void}) => {

  const [formData, setFormData] = useState<Record<string,string|number>>({name:"",email:"",password:"",confirmPassword:""})

  const handleSubmit = async(onClose:()=>void) => {
    
    if (formData.password!=formData.confirmPassword) return alert('The passwords has to be the same')
    
    try {
      
      await axios.post('/api/auth/register',
      { name:formData.name,
        email:formData.email,
        password:formData.password,
        id_rol: 1 })

      Notify({message:"User registered succesfully",backgroundColor:'#183B2A',color:'#18C764'})
      
      setFormData({})  
      onClose()
      
    } catch (error) {
      if (error instanceof AxiosError) {
        Notify({message:toCapitalize(error.response?.data.message),backgroundColor:'#441729',color:'#F53859',extraStyles:{zIndex:'60'}})        
      }
    }
  }


  return(
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className="w-fit p-10">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1 text-xl">Create a new account</ModalHeader>
            <form autoComplete="off" >
              <ModalBody className="gap-4">
                <Input isRequired type="name" name="name" label="Name" className="max-w-xs" variant="underlined" value={`${formData.name}`} onChange={(e)=>inputHandler(e,formData,setFormData)}/>
                <Input isRequired type="email" name="email" label="Email" className="max-w-xs" variant="underlined" value={`${formData.email}`} onChange={(e)=>inputHandler(e,formData,setFormData)}/>
                <Input isRequired type="password" name="password" label="Password" className="max-w-xs" variant="faded" value={`${formData.password}`} onChange={(e)=>inputHandler(e,formData,setFormData)}/>
                <Input isRequired type="confirmPassword" name="confirmPassword" label="Confirm Password" className="max-w-xs" variant="faded" value={`${formData.confirmPassword}`} onChange={(e)=>inputHandler(e,formData,setFormData)}/>
              </ModalBody>
              <ModalFooter className="gap-4">
                <Link color="danger" onPress={onClose} className="text-xs cursor-pointer">
                  Already have an account?
                </Link>
                <Button color="primary" onClick={(_)=>handleSubmit(onClose)}>
                  Sign Up
                </Button>
              </ModalFooter>
            </form>

          </>
        )}
      </ModalContent>
    </Modal>

  )
}