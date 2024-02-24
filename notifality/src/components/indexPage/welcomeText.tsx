import { Exo_2 } from "next/font/google";

const exo2 = Exo_2({ subsets: ["latin"], display: "swap" });

export const WelcomeText = ({ className }: { className: string }) => {
    return (
        <>
            <section
                className={
                    `${exo2.className} text-7xl font-black text-zinc-100 ` +
                    className
                }
            >
                Welcome to Notifality!
            </section>
        </>
    );
};
