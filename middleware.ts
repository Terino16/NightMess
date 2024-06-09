import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET });

  // Check if token is not available, which means the user is not authenticated
  if (!token) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  const cookie = request.cookies.get('Seller')?.value;
  const sellerStatus = cookie === "true";

  // Redirect user to home if not a seller
  if (!sellerStatus) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next(); 
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/dashboard/:path*','/snacks/:paths*'],
};
