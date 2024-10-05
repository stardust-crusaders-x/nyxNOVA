import { createClient } from '@/prismicio';
import { PrismicNextLink } from '@prismicio/next';
import Link from 'next/link';
import Image from 'next/image';

export default async function Header() {
  const client = createClient();
  const settings = await client.getSingle('settings');

  return (
    <header className="bg-transparent font-bold py-4 md:py-6 lg:py-6 shadow-lg">
      <div className="flex gap-10 items-center justify-between px-8 py-4 md:flex container mx-auto">
        {/* Logo */}
        <Link href="/">
          <Image
            src="/images/logo.png"
            alt="nyxNOVA"
            width={100}
            height={50}
            className="hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Navigation Links */}
        <nav>
          <ul className="flex space-x-8 text-lg text-yellow-200 hover:text-slate-200 font-body">
            {settings.data.navigation.map(({ link, label }) => (
              <li key={label} className="group relative">
                <PrismicNextLink field={link} className="px-4 py-2 transition-colors duration-300">
                  {label}
                </PrismicNextLink>
                <span className="absolute bottom-0 left-0 h-1 w-0 bg-yellow-200 transition-all duration-300 group-hover:w-full"></span>
              </li>
            ))}
          </ul>
        </nav>

        {/* Buttons */}
        {/* <div className="flex space-x-4">
          {settings.data.navigation.map(({ link, label }) => (
            <PrismicNextLink key={label} field={link} className="flex items-center">
              <button className="px-5 py-2 bg-yellow-500 text-white rounded-full shadow-md hover:bg-yellow-600 hover:scale-105 transition-transform duration-300">
                {label}
              </button>
            </PrismicNextLink>
          ))}
        </div> */}
      </div>
    </header>
  );
}
