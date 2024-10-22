import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(){
    try{

      const supliers = await prisma.users.findMany({orderBy: {
        id: 'asc'
      }})
      return NextResponse.json(supliers)
    
    } catch (error){
      return NextResponse.json(error)
    } 
}