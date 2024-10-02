import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(){
    try{

      const suppliers = await prisma.suppliers.findMany()
      return NextResponse.json(suppliers)
    
    } catch (error){
      return NextResponse.json(error)
    } 
}