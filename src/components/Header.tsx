import { SectionProvider, SetSectionProvider } from "../app/home/page";
import Image from "next/image"
import PopOver from "@/src/components/UIComponents/UserListBox/PopOver"
import { BsMenuButtonWideFill } from "react-icons/bs";

import { useSession } from "next-auth/react";

import React, { useState, useEffect, useContext } from "react"
import { useProductStore } from "../store/products";

export function Header():JSX.Element{
    const section = useContext(SectionProvider)
    const setSection = useContext(SetSectionProvider)
    
    const { input, fetchData, setProducts, setProductsCopy, setUser, user } = useProductStore()
    const [headers, setHeaders] = useState<string[]>([])
    const {data:session} = useSession()
    
    useEffect(()=>{

        const fetchingDbData = async()=>{
            let Headers = []
            const res = await (await fetch("api/dbInfo")).json() 
            const generalHeaders = res.map((e:Record<string,string>)=>e.table_name)
            
            if (session?.user.id_rol==2) Headers.push("Products","Customers","Suppliers","Bills","Details")
            else Headers.push("Products","Customers","Suppliers")

            const header = generalHeaders.filter((e:string) => Headers.includes(e))
            setHeaders(header.reverse())
        }

        const setSession = async () =>{
          let userData 
          if(session?.user.provider!="credentials"){
            userData = session?.user
          }else{
            const resGetUserData = await fetch(`/api/users/findOne/${session?.user.id}`)
            userData = await resGetUserData.json()
            if (!userData.id){
                userData = {}
            }
          }
          const {name, email, image} = userData
          setUser({name, email, image})
        }
          
        setSession()
        fetchingDbData()
    },[session])

    const liClickEvent = (header:string)=>(e:React.MouseEvent<HTMLLIElement>)=>{
      setSection!(header)
        
      const fetchingTableData = async()=> {
        const res = await fetchData(header.toLowerCase())
        setProducts(res)
        
        const productsFiltered = res.filter(e => {
            
          if (!Object.keys(e).includes("name")){
            const id = `${e.id}`
            return id.includes(input)       
          }
          const name = e.name.toLowerCase()
          return name.includes(input)
            
        });     
        setProductsCopy(productsFiltered)   
      }
      fetchingTableData()
    }

    const [hiddenHeader, setHiddenHeader] = useState<boolean>(true)

    const headerIconEvent = ()=>setHiddenHeader(!hiddenHeader)
    
    return (
        <div className="flex flex-col sm:flex-row gap-8 py-16 sm:py-0 mx-32 justify-center sm:justify-between items-center border-b border-zinc-500 select-none">
            <div className="hidden sm:flex w-22 h-fit rounded-full overflow-hidden ">
                <Image alt="logo" width={40} height={0} src="https://images.unsplash.com/photo-1722459154931-74de2a3acccc?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
            </div>
            <div className="flex flex-col items-center gap-5 sm:flex-row">
                <BsMenuButtonWideFill className="text-4xl sm:hidden" onClick={headerIconEvent}/>
                <ul className={`flex ${hiddenHeader ? "hidden" : ""} flex-col sm:flex-row items-center cursor-pointer`}>
                    {
                        headers.map((item,key)=>(
                            <li key={key} className={`text-white rounded px-5 py-8  ${item==section ? "text-[#D5C1BC] font-bold ":""} transition ease-in duration-300`} onClick={liClickEvent(item)}>{item}</li>
                        ))
                    }
                </ul>
            </div>
            <div className={`flex ${hiddenHeader ? "" : "hidden"} sm:block justify-center items-center cursor-pointer`}>    
                <PopOver name={user.name as string} description={user.email as string} img={user.image! as string}/>
            </div>  
        </div>
    )
}