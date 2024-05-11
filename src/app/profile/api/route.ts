import {type NextRequest} from "next/server";
import {headers, cookies} from "next/headers";

export async function GET(request: NextRequest) {
    const requestHeaders = new Headers(request.headers);
    const headerList = headers();


    cookies().set("resultsPerPage", "20")
    const theme = request.cookies.get("theme")

    console.log("requestHeaders", requestHeaders.get("Authorization"));
    console.log("requestHeaders", headerList.get("Authorization"));

    console.log("theme", theme);
    console.log("cookies", cookies().get("resultsPerPage"));

    return new Response("Profile API Data", {
        headers: {
            "Content-Type": "text/html",
            "Set-Cookie": "theme=dark",
        },
    })
}
