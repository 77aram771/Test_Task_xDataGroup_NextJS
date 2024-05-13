import {NextRequest, NextResponse} from "next/server";
import jwt from 'jsonwebtoken';
import {jwtSecretKay} from "@/utils/constans/jwtSecret";


export async function POST(req: NextRequest) {
    const body = await req.json();

    if (body.login.length === 0 || body.password.length === 0) {
        return NextResponse.json({
            status: 401,
            success: false,
            message: 'Credential Error',
        });
    }

    const accessToken = jwt.sign(
        {
            login: body.login,
        },
        jwtSecretKay,
        {
            expiresIn: 60,
        });

    const refreshToken = jwt.sign(
        {
            login: body.login,
            password: body.password,
        },
        jwtSecretKay,
        {
            expiresIn: 60,
        });

    if (accessToken && refreshToken) {
        return NextResponse.json({
            status: 200,
            message: 'Success',
            login: body.login,
            accessToken,
            refreshToken,
        });
    }

    return NextResponse.json({
        success: 404,
        message: 'Credential Error',
    })
}
