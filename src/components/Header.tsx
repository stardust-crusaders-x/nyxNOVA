import { createClient } from '@/prismicio';
import { PrismicNextLink } from '@prismicio/next';
import Link from 'next/link';
import Image from "next/image";

export default async function Header(){

    const client = createClient();

    const settings = await client.getSingle("settings");
    return(
        <section as ="header" className='transparent font-bold py-4 md:py-2 lg:py-2'>
            <div className="flex gap-4 items-center justify-between px-4 py-2 md:flex">
                <Link href="/">
                    <Image src="/images/logo.jpeg" alt="nyxNOVA" width={100} height={10} />
                </Link>
                <nav>
                    <ul className='flex text-lg text-yellow-200 hover:text-slate-200 '>
                        {settings.data.navigation.map(({link, label})=>(
                            <li key={label}>
                                <PrismicNextLink field={link} className="p-3">
                                    {label}
                                </PrismicNextLink>
                            </li>
                        ))}
                    </ul>
                </nav>
                
            </div>
        </section>
    )
}