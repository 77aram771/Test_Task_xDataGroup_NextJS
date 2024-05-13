import crypto from 'crypto';
import {NextRequest, NextResponse} from "next/server";

export async function POST(_req: NextRequest, _res: NextResponse) {
    const otp = crypto.randomInt(100000, 999999)

    return NextResponse.json({
        otp: otp,
        status: 200,
        message: 'Success',
    });
}
