import NextAuth from 'next-auth'
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials";
import GitHubProvider from "next-auth/providers/github";

import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
  }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
  }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        
        const userFound = await prisma.users.findUnique({
            where: {      
              email: credentials!.email,
            },
          })

        if (!userFound) throw new Error('No user Founded')
    
        const matchPassword = await bcrypt.compare(credentials!.password, userFound.password )

        if(!matchPassword) throw new Error('Wrong Password')
      
        const token = jwt.sign({
          exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
          email:userFound.email,
          name:userFound.name,
          id_rol:userFound.id_rol
        },process.env.SECRET as string)

        return {
          id:userFound.id,
          name:userFound.name,
          email:userFound.email,
          id_rol:userFound.id_rol,
          accessToken:token
        } as any
       
      }
    })],
    callbacks:{
      async signIn({user, account, profile}){
        console.log("account",account)
        console.log("profile",profile)
        return true
      },
      async jwt({token,user, account}){
        if (account) {
          token.provider = account.provider;
        }
  
        if (user) {
          return { ...token, ...user };
        }
        return token
      },
      async session({session, token}){
        session.user = {...session.user,...token} as any
        return session
      } 
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages:{
      signIn: "/"
    }
  })

export { handler as GET, handler as POST }