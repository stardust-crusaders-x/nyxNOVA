import { Inter, Roboto_Mono } from 'next/font/google'
import "./globals.css";
import { Nova_Mono } from 'next/font/google';
import Header from "@/components/Header";
import type { Metadata, ResolvingMetadata } from "next";
import clsx from 'clsx';
import { createClient } from '@/prismicio';
import Footer from '@/components/Footer';


const nova_mono = Nova_Mono({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-nova-mono', 
  display: 'swap',
});
 
const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
})
export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();

  const settings = await client.getSingle("settings");

  return {
    title: settings.data.site_title || "AETHERWATCH",
    description:
      settings.data.meta_description || "Aetherwatch is an advanced finance fraud detection and prevention management system designed to safeguard financial transactions. Leveraging sophisticated algorithms and real-time data analytics, Aetherwatch detects anomalies and suspicious activities.",
    openGraph: {
      images: [settings.data.image.url || ""],
    },
  };
}
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={clsx('block bg-blackish-green text-slate-300', roboto_mono.variable, nova_mono.variable)}>
      <body>
        <Header />
        {children}
        <div className="flex">/</div>
        <Footer />
      </body>
    </html>
  )
}