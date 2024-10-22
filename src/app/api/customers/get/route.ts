import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(){
    try{

      const customers = await prisma.customers.findMany({orderBy: {
        id: 'asc'
      }})
      return NextResponse.json(customers)
    
    } catch (error){
      return NextResponse.json(error)
    } 
}