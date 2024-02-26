import Button from "@/components/indexPage/button";
import { WelcomeText } from "@/components/indexPage/welcomeText";
import Box from "@/components/indexPage/boxes";
import { Exo_2 } from "next/font/google";
import { useRouter } from "next/router";

const exo2 = Exo_2({ subsets: ["latin"], display: "swap" });

export default function Home() {
    const router = useRouter();

    return (
        <>
            <section className="">
                <WelcomeText className="justify-center flex pt-44 pb-10" />
            </section>
            <section
                className={`${exo2.className} text-2xl pb-14 justify-center flex`}
            >
                Tired of juggling deadlines from all over the place? Notifality
                is here to help!
            </section>
            <section className="px-36 pb-12 grid sm:grid-cols-1 lg:grid-cols-3 gap-6">
                <Box
                    topic="Consolidate deadlines:"
                    description="View upcoming deadlines from LMS,
                    Teams, and VITOL in a single, centralized location. No more
                    switching between platforms!"
                />
                <Box
                    topic="Prioritize tasks:"
                    description=" Organize your tasks based on importance
                    and urgency, ensuring you focus on what matters most."
                />
                <Box
                    topic="Schedule your days: "
                    description="Craft your daily or weekly schedule,
                    incorporating deadlines and tasks for a clear overview of
                    your commitments."
                />
            </section>
            <section className="flex justify-center p-12">
                <Button
                    label="Get Started"
                    onClick={() => router.push("/scraper")}
                />
            </section>
            {/*
                Tired of juggling deadlines from all over the place? Notifality
                is here to help!
            </p>
            <p>
                This is your one-stop solution to manage deadlines, set
                priorities, and build your schedule, all in one place. Say
                goodbye to scattered information and hello to a stress-free,
                organized day-to-day life.
            </p>
            
            </ul>
            <p>
                We're constantly working to improve Notifality! Stay tuned for
                the exciting addition of an AI bot to further enhance your
                experience and streamline your workflow.
            </p>
    <p>Get started today and take control of your time! </p>*/}
        </>
    );
}
