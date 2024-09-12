import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(){
    const products = await prisma.products.findMany()
    return NextResponse.json(products)
}