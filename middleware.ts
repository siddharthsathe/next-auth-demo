import { NextRequest, NextResponse } from 'next/server';
import { auth } from './auth';
import { UserRole } from './app/types';
import { hasRole } from './app/utils/roles';

export async function middleware(request: NextRequest) {
    const session = await auth();

    if (!session) {
        return NextResponse.redirect(new URL('/signin?error=login', request.url));
    }

    if (request.nextUrl.pathname.startsWith('/admin')) {
        if (!hasRole(session.user.role, UserRole.ADMIN)) {
            return NextResponse.redirect(new URL('/?error=access_denied', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/admin/:path*',
    ]
};
