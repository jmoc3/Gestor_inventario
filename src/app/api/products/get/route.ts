import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(){
    try{

      const products = await prisma.products.findMany()
      return NextResponse.json(products)
    
    } catch (error){
      return NextResponse.json(error)
    } 
}