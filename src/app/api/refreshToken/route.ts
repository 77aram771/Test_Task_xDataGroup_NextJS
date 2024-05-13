import {cookies} from "next/headers";
import {NextRequest, NextResponse} from "next/server";
import jwt from 'jsonwebtoken';
import {jwtSecretKay} from "@/utils/constans/jwtSecret";

export async function GET(req: NextRequest) {
    const refreshToken = req.cookies.get('refreshToken');

    if (!refreshToken) {
        return NextResponse.json({
            status: 404,
            success: false,
            message: 'Error',
        });
    }

    const newAccessToken = jwt.sign({}, jwtSecretKay, {
        expiresIn: 60,
    });

    if (newAccessToken) {
        cookies().set('accessToken', newAccessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60,
        });

        return NextResponse.json({
            status: 200,
            success: true,
            message: 'Success',
            newAccessToken,
        });
    }

    return NextResponse.json({
        success: false,
        message: 'Error',
    })
}
