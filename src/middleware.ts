import {NextFetchEvent, NextResponse} from 'next/server';
import {NextRequest} from 'next/server';
import {jwtVerify} from 'jose';
import {jwtSecretKay} from "@/utils/constans/jwtSecret";

const jwtSecret = new TextEncoder().encode(
    jwtSecretKay,
);

export async function middleware(request: NextRequest, event: NextFetchEvent) {
    if (request.nextUrl.pathname.startsWith('/dashboard')) {
        const accessToken = request.cookies.get('accessToken');

        if (!accessToken) {
            const response = NextResponse.redirect(new URL('/login', request.url));
            response.cookies.delete('refreshToken');
            return response;
        }

        try {
            await jwtVerify(accessToken.value, jwtSecret);
            return NextResponse.next();
        } catch (error: any) {
            if (error.name === 'JWTExpired') {
                const refreshToken = request.cookies.get('refreshToken');
                if (!refreshToken) {
                    const response = NextResponse.redirect(new URL('/login', request.url));
                    response.cookies.delete('accessToken');
                    response.cookies.delete('refreshToken');
                    return response;
                }
                const headers = new Headers({
                    'Cookie': `${refreshToken.name}=${refreshToken.value}; `,
                })
                const responseAccessToken = await fetch('/api/refreshToken', {
                    headers,
                });
                const resJson = await responseAccessToken.json();

                if (resJson.success) {
                    const response = NextResponse.next();
                    response.cookies.set({
                        name: 'accessToken',
                        value: resJson.accessToken,
                        maxAge: 24 * 60 * 60,
                        httpOnly: true,
                    });
                    return response;
                }
                return NextResponse.redirect(new URL('/login', request.url));
            }
            return NextResponse.redirect(new URL('/login', request.url));
        }
    }

    if (request.nextUrl.pathname.startsWith('/login')) {
        const accessToken = request.cookies.get('accessToken');

        const response = NextResponse.next();
        response.cookies.delete('accessToken');
        response.cookies.delete('refreshToken');
        console.log('accessToken', accessToken)
        if (accessToken) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }

        return response;
    }
}

export const config = {
    matcher: [
        '/otp/:path*',
        '/login/:path*',
        '/refreshToken/:path*',
    ],
}
