import Button from "@/components/indexPage/button";
import Box from "@/components/indexPage/boxes";
import { Exo_2 } from "next/font/google";
import { useRouter } from "next/router";

const exo2 = Exo_2({ subsets: ["latin"], display: "swap" });

export default function Home() {
    const router = useRouter();
    const credsHtml = (
        <>
            <section className="pr-8">
                <input
                    placeholder="Username"
                    className="m-4 p-1 px-2 rounded-lg bg-neutral-800 w-full"
                ></input>
                <input
                    placeholder="Password"
                    className="m-4 p-1 px-2 rounded-lg bg-neutral-800 w-full"
                ></input>
            </section>
        </>
    );
    return (
        <>
            <section
                className={`${exo2.className} text-2xl pt-44 pb-14 justify-center flex`}
            >
                Enter your Credentials to get your deadlines!
            </section>
            <section className="px-36 pb-12 grid sm:grid-cols-1 lg:grid-cols-3 gap-6">
                <Box topic="Teams" props={credsHtml} />
                <Box topic="LMS" props={credsHtml} />
                <Box topic="VITOL" props={credsHtml} />
            </section>
            <section className="flex justify-center p-12">
                <Button
                    label="Start Scraping!"
                    onClick={() => router.push("/credentials")}
                />
            </section>
        </>
    );
}
