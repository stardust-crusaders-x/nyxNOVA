import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";
import Bounded from "./Bounded";
import Image from "next/image";



export default async function Footer(){

    const client = createClient();

    const settings = await client.getSingle("settings");

    return (<footer>
        <Bounded as ="footer" className="py-4 md:py-6 lg:py-8">
            <div className="flex gap-4 items-center justify-between px-4 md:flex">
        <Link href="/">
        
        <Image src="/images/logo (1).png" alt="AetherWatch" width={200} height={100} />
        </Link>

        <p className="text-xs py-4 md:py-6 lg:py-8 flex">
          ©{new Date().getFullYear()} {settings.data.site_title}
        </p>

        <ul className="flex">
            {settings.data.contact.map(({link, contact})=>(
                <li key={contact}>
                    <PrismicNextLink field={link}
                    className="bg-yellow-500 hover:bg-cyan-900 transition-color duration-200 ease-in-out py-3 px-12 rounded-full font-display font-bold text-slate-800 text-base tracking-wider"
                    >{contact}</PrismicNextLink>
                    </li>
                    
            ))}
        </ul>
        </div>
        </Bounded>
    </footer>)

}