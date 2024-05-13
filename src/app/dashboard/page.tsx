'use client'

import {useRouter} from 'next/navigation';
import {Card} from "@/components/ui/Card";
import {CustomButton} from "@/components/ui/CustomButton";
// import {getCookie} from 'cookies-next';

const Dashboard = () => {
    // const accessToken: any = getCookie("accessToken");
    // const refreshToken: any = getCookie('refreshToken');

    const router = useRouter();

    const handleLogout = async () => {
        const response = await fetch('/api/logout');
        const resJson = await response.json();
        console.log(resJson);
        router.push('/');
    }

    return (
        <Card className={"w-2/4 flex flex-col justify-center items-center"}>
            <div className={"text-4xl my-10"}>Dashboard</div>
            {/*<span className={"text-2xl w-full whitespace-pre-wrap my-2"}>accessToken: {accessToken}</span>*/}
            {/*<span className={"text-2xl w-full whitespace-pre-wrap my-2"}>refreshToken: {refreshToken}</span>*/}

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
