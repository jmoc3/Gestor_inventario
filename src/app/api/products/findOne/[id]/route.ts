import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
  
const prisma = new PrismaClient()

export async function GET(req:Request){
  try{
      const url = new URL(req.url);
      const id = +url.pathname.split('/').pop()!; 
      
      const product = await prisma.products.findUnique({
          where: {
              id
            }
        })

      return NextResponse.json(product)
  } catch (error){
    return NextResponse.json(error)
  } 

}