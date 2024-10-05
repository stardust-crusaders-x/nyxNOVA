import { Content } from "@prismicio/client";
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import React from "react";
import { PrismicNextImage } from "@prismicio/next";

const components: JSXMapSerializer = {
  heading1: ({ children }) => (
    <Heading as="h2" size="xl" className="mt-6 md:mt-10 glow">
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => (
    <p className="mt-6 md:mt-10 text-2xl md:text-2xl font-body gap-8 max-w-md space-y-4 neon-text">
      {children}
    </p>
  ),
  strong: ({ children }) => <strong className="font-bold glow">{children}</strong>,
  list: ({ children }) => (
    <ul className="list-disc list-inside mt-3 md:mt-10 text-2xl text-yellow-500 space-y-4 neon-list">
      {children}
    </ul>
  ),
  listItem: ({ children }) => <li className="mt-2 font-bold space-y-4 glow">{children}</li>,
};

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero = ({ slice }: HeroProps): JSX.Element => {
  return (
    <>
      {slice.variation === "default" && (
        <div
          className="w-full h-screen flex items-center justify-center text-center relative"
          style={{
            backgroundImage: `url(${slice.primary.image.url})`,
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
        >

          <Bounded
            data-slice-type={slice.slice_type}
            data-slice-variation={slice.variation}
            className="relative z-10"
          >
            <div className="grid min-h-screen grid-cols-1 place-items-center text-center">
              {/* Heading */}
              <PrismicRichText field={slice.primary.heading} components={components} />

              {/* Body Text */}
              <div className="mb-6 md:mb-16 text-4xl font-body font-bold text-yellow-200 hover:text-slate-300 neon-text">
                <PrismicRichText field={slice.primary.body} components={components} />
              </div>

              {/* Button Section */}
              <div className=" px-20 py-6 justify-center">
                <Button
                  field={slice.primary.button_link}
                  className="px-20 py-4 text-5xl font-body font-bold shadow-md hover:shadow-lg active:scale-90 glow" // Adjusted the padding for a bigger button
                >
                  {slice.primary.button_text}
                </Button>
              </div>
            </div>
          </Bounded>
        </div>
      )}
    </>
  );
};


export default Hero;
