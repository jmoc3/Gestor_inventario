import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
  
const prisma = new PrismaClient()

export async function GET(req:Request){
  try{
      const url = new URL(req.url);
      const id = +url.pathname.split('/').pop()!; 
      
      const user = await prisma.bills.findUnique({
          where: {
              id
            }
        })

      return NextResponse.json(user)
  } catch (error){
    return NextResponse.json(error)
  } 

}