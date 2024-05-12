import {NextRequest, NextResponse} from "next/server";

export async function POST(req: NextRequest) {
    const data = await req.json();

    if (data.otpCode === data.enterOtp) {
        return NextResponse.json({
            status: 200
        });
    } else {
        return NextResponse.json({
            status: 400
        });
    }
}


