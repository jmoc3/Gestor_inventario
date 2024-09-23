import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
  
const prisma = new PrismaClient()

export async function GET(req:Request){
  try{
    const url = new URL(req.url);
    const id = +url.pathname.split('/').pop()!; 
    
    const detail = await prisma.details.findUnique({
        where: {
            id
          }
      })

    return NextResponse.json(detail)
  } catch (error){
    return NextResponse.json(error)
  } 

}