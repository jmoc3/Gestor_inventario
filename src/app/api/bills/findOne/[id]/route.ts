import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
  
const prisma = new PrismaClient()

export async function GET(req:Request){
  try{
      const url = new URL(req.url);
      const id = +url.pathname.split('/').pop()!; 
      
      const bill = await prisma.bills.findUnique({
          where: {
              id
            }
        })

      return NextResponse.json(bill)
  } catch (error){
    return NextResponse.json(error)
  } 

}