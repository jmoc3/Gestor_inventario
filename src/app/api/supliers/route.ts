import { NextResponse } from "next/server"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET(){
    const supliers = await prisma.supliers.findMany()
    return NextResponse.json(supliers)
}