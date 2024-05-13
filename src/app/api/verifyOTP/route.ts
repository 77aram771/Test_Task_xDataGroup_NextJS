import {NextRequest, NextResponse} from "next/server";
import {cookies} from "next/headers";

export async function POST(req: NextRequest) {
    const data = await req.json();

    if (data.otpCode === data.enterOtp) {
        cookies().set('accessToken', data.accessToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60,
        });
        cookies().set('refreshToken', data.refreshToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60,
        });

        return NextResponse.json({
            status: 200,
            message: 'Success',
        });
    } else {
        return NextResponse.json({
            status: 400,
            message: 'Error',
        });
    }
}


