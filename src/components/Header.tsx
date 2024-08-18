import React from "react"
import Image from "next/image"
import { BsGrid3X3GapFill } from "react-icons/bs";

export function Header():JSX.Element{
    return (
        <div className="flex mx-32  justify-between items-center border-b border-zinc-500 select-none">
            <div className="flex w-22 h-fit rounded-full overflow-hidden ">
                <Image alt="logo" width={40} height={0} src="https://images.unsplash.com/photo-1722459154931-74de2a3acccc?q=80&w=1986&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
            </div>
            <div className="flex ">
                <ul className="flex items-center cursor-pointer ">
                    <li className="hover:bg-zinc-500 px-5 py-8 transition ease-in duration-300">Products</li>
                    <li className="hover:bg-zinc-500 px-5 py-8 transition ease-in duration-300">Clients</li>
                    <li className="hover:bg-zinc-500 px-5 py-8 transition ease-in duration-300">Supliers</li>
                </ul>
            </div>
            <div className="flex justify-center items-center cursor-pointer">
                <BsGrid3X3GapFill className="text-3xl"  />
            </div>
        </div>
    )
}