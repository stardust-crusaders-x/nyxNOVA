import { createClient } from '@/prismicio';
import { PrismicNextLink } from '@prismicio/next';
import Link from 'next/link';
import Bounded from './Bounded';
// import Logo from './Logo';
import Image from "next/image";

export default async function Header(){

    const client = createClient();

    const settings = await client.getSingle("settings");
    return(
        <Bounded as ="header" className='py-4 md:py-6 lg:py-8'>
            <div className="flex gap-4 items-center justify-between px-4 md:flex">
            <Link href="/">
        <Image src="/images/logo (1).png" alt="AetherWatch" width={200} height={100} />
         
            </Link>
        
        <nav>
            <ul className='flex'>
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
        </Bounded>
    
    )
}