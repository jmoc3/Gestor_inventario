import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
  
const prisma = new PrismaClient()

export async function DELETE(request:Request){
  
  const url = new URL(request.url);
  const id = +url.pathname.split('/').pop()!; 

  const delRes = await prisma.users.delete({
    where: {
      id
    }
  })
  return NextResponse.json(delRes)
}