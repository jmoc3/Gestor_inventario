import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
  
const prisma = new PrismaClient()

export async function GET(request:Request){
  try{
      const url = new URL(request.url);
      const email = url.pathname.split('/').pop()!; 
      
      const user = await prisma.users.findUnique({
          where: {
              email
            }
        })
      
      return NextResponse.json(user?.id)
  } catch (error){
    console.log(error)
    return NextResponse.json(error)
  } 

}