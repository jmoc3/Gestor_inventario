import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(){
    try{

      const bills = await prisma.bills.findMany({orderBy: {
        id: 'asc'
      }})
      return NextResponse.json(bills)
    
    } catch (error){
      return NextResponse.json(error)
    } 
}