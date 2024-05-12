"use client"
import {useRouter} from "next/navigation";
import {Card} from "@/components/card";
import {CustomButton} from "@/components/ui/CustomButton";

export default function home() {
    const router = useRouter();

    return (
        <Card>
            <h1 className={"text-4xl my-2"}>Hello this is a test task xDataCode</h1>
            <h2 className={"text-4xl my-2"}>Pls click Login and start</h2>

            <CustomButton
                value={"Login"}
                className="flex flex-row my-5 items-center justify-center text-center w-full rounded-xl outline-none py-5 bg-blue-700 border-none text-white"
                type={"button"}
                onClick={() => router.push('/login')}
            />
        </Card>
    )
}
