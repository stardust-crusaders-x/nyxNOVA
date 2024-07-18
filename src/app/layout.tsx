import { Inter, Roboto_Mono } from 'next/font/google'
import "./globals.css";
import { Nova_Mono } from 'next/font/google';
// import Header from "@/components/Header";
import type { Metadata } from "next";
import clsx from 'clsx';

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
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={clsx('block bg-blackish-green text-slate-300', roboto_mono.variable, nova_mono.variable)}>
      <body>
        {children}
        <div className="flex">/</div>
      </body>
    </html>
  )
}