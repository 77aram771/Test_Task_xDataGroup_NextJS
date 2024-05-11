import Link from "next/link";

export default function home() {
    return (
        <>
            <h1>Hello Home Page</h1>
            <Link href={"/blog"}>My Blog</Link>
            <Link href={"/products"}>Products</Link>
        </>
    )
}
