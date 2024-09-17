import { NextResponse } from "next/server"

export async function UPDATE(req:Request){
    try{
        console.log(req)
        return NextResponse.json({response:"a"})
    }catch (error){
        return NextResponse.json(error)
    }
}