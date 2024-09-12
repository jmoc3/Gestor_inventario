import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"
  
const prisma = new PrismaClient()

export async function DELETE({ params }: { params: { slug: string } }){
  return NextResponse.json(params)
}