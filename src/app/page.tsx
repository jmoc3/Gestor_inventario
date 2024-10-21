'use client'

import { Card, Input, Button, Divider, Link, useDisclosure } from "@nextui-org/react";
import { GoogleLog } from "@/src/assets/GoogleLogo";
import { SignUpModal } from "@/src/components/login/SignUpModal";
import { GoEye , GoEyeClosed } from "react-icons/go";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { inputHandler } from "@/src/services/inputHadler";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Notify from "@/src/services/Notify";

export default function LogIn(){
  
  const [credentials, setCredentials] = useState<Record<string,string|number>>({email:"", password:""})  
  const {isOpen, onOpen, onOpenChange} = useDisclosure();
  const router = useRouter()

  const handleSubmit:React.FormEventHandler<HTMLFormElement> = async(e) => {
    e.preventDefault()
    const res =  await signIn('credentials',{...credentials,redirect:false})
    if (res!.error) return Notify({message:res!.error,backgroundColor:'#441729',color:'#F53859',extraStyles:{zIndex:'60'}})

    router.push('/home')
  }

  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return(
    <div className="screen flex items-center justify-center w-full h-screen">
      <Card className="w-fit px-12 py-12 space-y-12 items-center">
        <form onSubmit={handleSubmit} className="flex h-full gap-8 " autoComplete="off">
          <div className="leftLogin flex flex-col justify-between">
          <legend className="text-xl">Log In</legend>

          <div className="flex flex-col gap-6">

          <Button className="py-[1.5rem]" onClick={()=>{signIn('github',{callbackUrl:'/home'})}}>
              <FaGithub className="text-black-400 text-3xl" />
            </Button>
            <Button className="py-[1.5rem] " onClick={()=>{signIn('google',{callbackUrl:'/home'})}}>
              <GoogleLog />
            </Button>
          </div>
          
          </div>
          <Divider orientation="vertical" className="h-[12rem]"/>
          <div className="flex flex-col gap-8 items-end">
            <div className="flex flex-col gap-6"> 

              <Input isRequired type="email" name="email" label="Email" value={`${credentials.email}`} className="max-w-xs" onChange={(e)=>inputHandler(e,credentials, setCredentials)} />
              <Input isRequired name="password" type={isVisible ? "text" : "password"} label="Password" value={`${credentials.password}`} className="max-w-xs" 
                endContent={
                  <button className="focus:outline-none" type="button" onClick={toggleVisibility}>
                      {isVisible ? (
                        <GoEye className="text-xl text-default-400 pointer-events-none" />
                      ) : (
                        <GoEyeClosed className="text-xl text-default-400 pointer-events-none" />
                      )}
                    </button>
                  }
                  onChange={(e)=>inputHandler(e,credentials,setCredentials)}/>
              
            </div>
            <div className="actionsButton space-x-4">
              <Link className="text-sm cursor-pointer" color="secondary" onPress={onOpen}>Sign Up</Link>
              <Button color="success" variant="flat" type="submit" >Go</Button>
              <SignUpModal isOpen={isOpen} onOpenChange={onOpenChange} />
            </div>
          </div>
        </form>
        <Divider />
      </Card>
    </div>
  )
}
