import Button from "@/components/indexPage/button";
import Box from "@/components/indexPage/boxes";
import { Exo_2 } from "next/font/google";
import { useRouter } from "next/router";
import { useState } from "react";

const exo2 = Exo_2({ subsets: ["latin"], display: "swap" });

type DetailsType = {
    Teams: { username: string; password: string };
    LMS: { username: string; password: string };
};

export default function Credentials() {
    const [details, setDetails] = useState<DetailsType>({
        Teams: { username: "", password: "" },
        LMS: { username: "", password: "" },
    });

    const handleCreds = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        const [topic, field] = id.split("-");
        setDetails((prev) => ({
            ...prev,
            [topic as keyof DetailsType]: {
                ...prev[topic as keyof DetailsType],
                [field]: value,
            },
        }));
    };

    const router = useRouter();

    const credsHtml = (topic: keyof DetailsType) => {
        return (
            <>
                <section className="pr-8">
                    <input
                        onChange={handleCreds}
                        id={`${topic}-username`}
                        type="text"
                        placeholder="Username"
                        className="m-4 p-1 px-2 rounded-lg bg-neutral-800 w-full"
                    />
                    <input
                        onChange={handleCreds}
                        id={`${topic}-password`}
                        type="password"
                        placeholder="Password"
                        className="m-4 p-1 px-2 rounded-lg bg-neutral-800 w-full"
                    />
                </section>
            </>
        );
    };

    const postData = async (url: string, data: DetailsType) => {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        console.log(response);
        return response.json();
    };

    return (
        <>
            <section
                className={`${exo2.className} text-2xl pt-44 pb-14 justify-center flex`}
            >
                Enter your Credentials to get your deadlines!
            </section>
            <section className="px-36 pb-12 grid sm:grid-cols-1 lg:grid-cols-2 gap-6">
                <Box topic="Teams" props={credsHtml("Teams")} />
                <Box topic="LMS" props={credsHtml("LMS")} />
            </section>
            <section className="flex justify-center p-12 font-extrabold">
                <Button
                    label="Start Scraping!"
                    onClick={() => {
                        console.log(postData("/api/scrapeTeams", details));
                    }}
                />
            </section>
        </>
    );
}
