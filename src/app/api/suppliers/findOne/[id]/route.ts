import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
  
const prisma = new PrismaClient()

export async function GET(req:Request){
  try{
      const url = new URL(req.url);
      const id = +url.pathname.split('/').pop()!; 
      
      const supplier = await prisma.suppliers.findUnique({
          where: {
              id
            }
        })

      return NextResponse.json(supplier)
  } catch (error){
    return NextResponse.json(error)
  } 

}