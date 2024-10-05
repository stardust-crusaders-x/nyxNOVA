import { Protest_Guerrilla } from 'next/font/google'
import "./globals.css";
import { Roboto_Mono } from 'next/font/google';
import Header from "@/components/Header";
import type { Metadata } from "next";
import clsx from 'clsx';
import { createClient } from '@/prismicio';
import Footer from '@/components/Footer';
import React, { useRef, useEffect } from 'react';

const robo_mono = Roboto_Mono({
  weight: '400',
  subsets: ['vietnamese'],
  variable: '--font-robo_mono', 
  display: 'swap',
});
 
const protestGuerrilla = Protest_Guerrilla({
  weight: '400',
  subsets: ['latin-ext'],
  display: 'swap',
  variable: '--font-protestGuerrilla',
});

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient();

  const settings = await client.getSingle("settings");

  return {
    title: settings.data.site_title || " ",
    description: settings.data.meta_description || " ",
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
    <html lang="en" className={clsx(protestGuerrilla.variable, robo_mono.variable)}>
      <body>
        {/* Video Background */}
        <div className="video-background">
          <video autoPlay muted loop className="background-video">
            <source src="/images/224142_medium.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Content */}
        <div className="content font-protestGuerrilla text-slate-300 ">
          <Header />
          <div className="content font-handjet">
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  )
}
