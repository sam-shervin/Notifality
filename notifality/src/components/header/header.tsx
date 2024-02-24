import { Exo_2 } from "next/font/google";

const exo2 = Exo_2({ subsets: ["latin"], display: "swap" });

export default function Header() {
    return (
        <>
            <section
                className={`bg-neutral-950 p-3 border-b-2 border-red-700 ${exo2.className} font-extrabold text-3xl text-center`}
            >
                Notifality
            </section>
        </>
    );
}
