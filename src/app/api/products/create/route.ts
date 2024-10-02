import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function POST(req:Request){
    try{
        const data = await req.json()

        const product = await prisma.products.create({
            data
          })

        return NextResponse.json({"Message":"Product created Succesfully"})
    
    } catch (error){
      return NextResponse.json(error)
    } 
}