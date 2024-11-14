import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function PUT(req:Request){
    try{
        const url = new URL(req.url);
        const id = +url.pathname.split('/').pop()!; 

        const data = await req.json()
        
        const updatedProduct = await prisma.products.update({
            where: { id },
            data,
          })
        
        return NextResponse.json({response:"ok"})
    }catch (error){
        console.log(error)
        return NextResponse.json(error)
    }
}