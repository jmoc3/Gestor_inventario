import { NextResponse } from "next/server";
import bcrypt from 'bcrypt' 

import { PrismaClient } from "@prisma/client/extension";

const prisma = new PrismaClient()

export async function POST(req:Request){
  try {
    const data = await req.json()

    const userFound = await prisma.user.findUnique({
      where:{
        email:data.email
      }
    })
  
    if (userFound) {
      return NextResponse.json({message:"user Already exist"},{status:406})
    }
  
    const hashed = await bcrypt.hash(data.password,10)
    data.password = hashed
  
    const newUser = await prisma.user.create({
      data
    })
  
    const {password:_,...user} = newUser
    return NextResponse.json(user)
  
  } catch (error) {
    if (error instanceof Error) return NextResponse.json({message: error.message},{status:500})
  }

}