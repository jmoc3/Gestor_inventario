import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  if (pathname.startsWith('/api')) {
    const token = await getToken({ req, secret });

    if (!token) {
      return NextResponse.json(
        { message: "No autorizado" },
        { status: 401 }
      );
    }

    return NextResponse.next();
  }

  if (pathname.startsWith('/home')) {
    const token = await getToken({ req, secret });
    if (!token) {
      return NextResponse.redirect(new URL('/', req.url));
    }
    
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/:path*', 
    '/home/:path*'  
  ],
};
