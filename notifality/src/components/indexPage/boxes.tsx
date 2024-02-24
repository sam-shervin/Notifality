import { Exo_2 } from "next/font/google";

const exo2 = Exo_2({ subsets: ["latin"], display: "swap" });

interface BoxProps {
    topic: string;
    description?: string;
    props?: any;
}

const Box: React.FC<BoxProps> = ({ topic, description, props }) => {
    return (
        <section
            className={`${exo2.className}  text-white p-8 rounded-3xl border border-red-500 shadow-xl backdrop-blur-lg shadow-red-900`}
        >
            <section className="font-bold text-2xl">{topic}</section>
            <br />
            <section className="indent-8 text-lg">{description}</section>
            {props}
        </section>
    );
};

export default Box;
