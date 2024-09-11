import { NextResponse } from "next/server";
import bcrypt from 'bcrypt' 

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(req:Request){
  try {
    const data = await req.json()

    const userFound = await prisma.users.findUnique({
      where:{
        email:data.email
      }
    })
  
    if (userFound) {
      return NextResponse.json({message:"user Already exist"},{status:406})
    }
  
    const hashed = await bcrypt.hash(data.password,10)
    data.password = hashed
    data.id_rol = 1

    const newUser = await prisma.users.create({
      data
    })
  
    const {password:_,...user} = newUser
    return NextResponse.json(user)
  
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({message: error.message},{status:500})
  }

}