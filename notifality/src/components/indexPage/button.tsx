import Image from "next/image";
import { Exo_2 } from "next/font/google";

const exo2 = Exo_2({ subsets: ["latin"], display: "swap" });

interface ButtonProps {
    label: string;
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
    return (
        <button
            className={`${exo2.className} text-3xl border border-red-500 hover:shadow-red-700 shadow-2xl rounded-full px-14 backdrop-blur-xl flex items-center py-2`}
            onClick={onClick}
        >
            {label}
            <Image
                src={"/arrow.png"}
                width={50}
                height={50}
                alt={"right pointing arrow"}
                className="ml-3"
            ></Image>
        </button>
    );
};

export default Button;
