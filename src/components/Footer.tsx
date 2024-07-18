import { createClient } from "@/prismicio";
import { PrismicNextLink } from "@prismicio/next";
import Link from "next/link";




export default async function Footer(){

    const client = createClient();

    const settings = await client.getSingle("settings");

    return (<footer>
        <Link href="/">
        
        </Link>
        <p className="text-xs">
          ©{new Date().getFullYear()} {settings.data.site_title}
        </p>
        <ul>
            {settings.data.contact.map(({link, contact})=>(
                <li key={contact}>
                    <PrismicNextLink field={link}>{contact}</PrismicNextLink>
                    </li>
            ))}
        </ul>
    </footer>)

}