import Image from "next/image";
import Link from "next/link";
import { Instagram, Facebook, MapPin } from "lucide-react";
const buttons = [
  {
    href: "/",
    name: "Ver Menú",
  },
  {
    href: "/",
    name: "Info De Contacto",
  },
  {
    href: "/",
    name: "Info De Contacto",
  },
  {
    href: "/",
    name: "Info De Contacto",
  },
];

interface ProfileProps {
  name: string;
  description: string;
}

export default function Profile({ name, description }: ProfileProps) {
  return (
    <section className="flex items-center w-screen justify-center flex-col h-[90%] max-md:h-full bg-white py-8">
      <Image
        src="/next.svg"
        alt="pepe"
        width={500}
        height={500}
        className="max-md:w-[33vw] max-md:h-[33vw] h-50 w-50 p-4 max-md:mt-6 mb-4 rounded-full border-white border-3 shadow-[#aaa] shadow-sm"
      />
      <h1 className="text-5xl max-md:text-2xl text-black font-semibold mt-2">
        {name}
      </h1>
      <h2 className="text-stone-600 w-90 text-center mt-4 max-md:px-2">
        {description}
      </h2>
      <div className="flex flex-col w-screen justify-center items-center gap-4 mt-6 max-md:mt-8">
        {buttons.map((b, index) => (
          <div
            key={index}
            className="flex justify-center text-center w-[25%] max-md:w-[80%] "
          >
            <Link
              href={b.href}
              className=" bg-[hsl(25,100%,56%)] font-semibold w-full px-5 py-4 max-md:py-3 rounded-full shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            >
              {b.name}
            </Link>
          </div>
        ))}
      </div>
      <ul className="flex gap-8 mt-16">
        <Link
          href="/"
          className="text-primary bg-[hsl(25,100%,50%)] rounded-full p-2 cursor-pointer"
        >
          <Instagram className=""></Instagram>
        </Link>
        <Link
          href="/"
          className="text-primary bg-[hsl(25,100%,50%)] rounded-full p-2 cursor-pointer"
        >
          <Facebook className=""></Facebook>
        </Link>
        <Link
          href="/"
          className="text-primary bg-[hsl(25,100%,50%)] rounded-full p-2 cursor-pointer"
        >
          <MapPin className=""></MapPin>
        </Link>
      </ul>
      <Link href="/" className="text-gray-600 underline text-[12px] mt-10">
        Powered by Cartita
      </Link>
    </section>
  );
}
