import { NextRequest, NextResponse } from "next/server";

export async function GET(_req: NextRequest) {
    const response = NextResponse.json({
        status: 200,
        message: 'Success'
    });

    response.cookies.delete('accessToken');
    response.cookies.delete('refreshToken');

    return response;
}
