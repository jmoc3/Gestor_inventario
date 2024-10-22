import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(){
    try{

      const details = await prisma.details.findMany({orderBy: {
        id: 'asc'
      }})
      return NextResponse.json(details)
    
    } catch (error){
      return NextResponse.json(error)
    } 
}