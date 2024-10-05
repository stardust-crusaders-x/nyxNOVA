import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { HiLocationMarker } from "react-icons/hi";
import { MdCall, MdMail } from "react-icons/md";
import Link from "next/link"; // Import Link from Next.js

const Footer = () => {
  return (
    <div className="bg-black">
      <section className="max-w-[1200px] mx-auto text-white">
        <div className="grid md:grid-cols-3 py-5">
          {/* First Column */}
          <div className="py-8 px-4">
            <h1 className="sm:text-3xl text-xl font-bold sm:text-left text-justify mb-3">
              Lets Grow With Us
            </h1>
            <p className="text-gray-400">
              Get exclusive{" "}
              <span className="text-white font-bold">best update</span>{" "}
              straight to your inbox.
            </p>
            <br />
            <div className="flex items-center h-10">
              <input
                className="py-1 px-3 w-full h-full inline-block focus:outline-none focus:border-sky-700 focus:ring-2 focus:ring-sky-500 bg-gray-800 border-gray-200 border-2"
                type="text"
                placeholder="Email"
              />
              <button className="bg-slate-700 hover:bg-yellow-400 h-full inline-block py-2 px-6 text-white">
                Ok
              </button>
            </div>
          </div>

          {/* Second Column */}
          <div className="grid grid-cols-2 sm:grid-cols-3 col-span-2 md:pl-10">
            <div className="py-8 pl-20">
              <h1 className="sm:text-xl text-xl font-bold font-display sm:text-left text-blue-600 text-justify mb-3">
                Links
              </h1>
              <ul className="flex flex-col gap-3">
                {/* Use Link component for navigation */}
                <li className="cursor-pointer hover:text-blue-400">
                  <Link href="https://nyxnova-simulator.vercel.app/">Home</Link>
                </li>
                <li className="cursor-pointer hover:text-blue-400">
                  <Link href="/update-data">Update Data</Link>
                </li>
                <li className="cursor-pointer hover:text-blue-400">
                  <Link href="/login">Login</Link>
                </li>
              </ul>
            </div>
            <div className="py-8 pl-20">
              <h1 className="sm:text-xl text-xl font-display font-bold sm:text-left text-justify mb-3 text-blue-600">
                Contact Us
              </h1>
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <HiLocationMarker />
                  <p>Kolkata, West Bengal</p>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <MdMail />
                  <p>nyxnova2024@gmail.com</p>
                </div>
                <div className="flex items-center gap-3 mt-3">
                  <MdCall />
                  <p>+91 9000300045</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="hidden sm:block">
          <div className="flex justify-between items-center text-center py-6 border-t-2 border-gray-300/40">
            <span className="text-sm text-gray-400">
              © 2024 nyxNOVA. All rights reserved.
            </span>
            <div className="flex items-center justify-center gap-4 mb-4">
              <a href="#" aria-label="Instagram">
                <FaInstagram className="text-4xl hover:text-yellow-400 transition duration-300" />
              </a>
              <a href="#" aria-label="Facebook">
                <FaFacebook className="text-4xl hover:text-yellow-400 transition duration-300" />
              </a>
              <a href="#" aria-label="LinkedIn">
                <FaLinkedin className="text-4xl hover:text-yellow-400 transition duration-300" />
              </a>
            </div>

            <span className="text-sm text-gray-400">
              <ul className="flex gap-3">
                <li className="cursor-pointer hover:text-white">Privacy Policy</li>
                <li className="cursor-pointer hover:text-white">Terms & Conditions</li>
              </ul>
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Footer;
