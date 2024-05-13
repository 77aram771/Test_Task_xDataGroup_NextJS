"use client"
import {useRouter} from "next/navigation";
import {CustomButton} from "@/components/ui/CustomButton";
import {Card} from "@/components/ui/Card";

export default function home() {
    const router = useRouter();

    return (
        <Card>
            <h1 className={"text-4xl my-14"}>Test task xDataCode</h1>

            <CustomButton
                value={"Start test"}
                className="flex flex-row my-5 items-center justify-center text-center w-full rounded-xl outline-none py-5 bg-blue-700 border-none text-white"
                type={"button"}
                onClick={() => router.push('/login')}
            />
        </Card>
    )
}
