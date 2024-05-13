'use client'

import {useRouter} from 'next/navigation';
import {userDataContext} from "@/context";
import Card from "@/components/ui/Card";
import CustomButton from "@/components/ui/CustomButton";

const Dashboard = () => {
    const {userData} = userDataContext();
    const router = useRouter();

    const handleLogout = async () => {
        const response = await fetch('/api/logout');
        const resJson = await response.json();
        console.log(resJson);
        router.push('/');
    }

    return (
        <Card className={"w-2/4 flex flex-col justify-center items-center"}>
            <div className={"text-4xl my-10"}>Welcome</div>
            <span className={"text-2xl w-full whitespace-pre-wrap my-2"}>login: {userData?.login}</span>
            <span className={"text-2xl w-full whitespace-pre-wrap my-2 break-all"}>accessToken: {userData?.accessToken}</span>
            <span className={"text-2xl w-full whitespace-pre-wrap my-2 break-all"}>refreshToken: {userData?.refreshToken}</span>

            <CustomButton
                value={"Logout"}
                className="flex flex-row my-5 items-center justify-center text-center w-full rounded-xl outline-none py-5 bg-blue-700 border-none text-white"
                type={"button"}
                onClick={handleLogout}
            />
        </Card>
    )
}

export default Dashboard
