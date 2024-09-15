import { Content } from "@prismicio/client";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import {
  JSXMapSerializer,
  PrismicRichText,
  SliceComponentProps,
} from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Button from "@/components/Button";
import Heading from "@/components/Heading";
import { ChevronRight } from 'lucide-react';
import React from 'react';

const components: JSXMapSerializer = {
  heading1: ({ children }) => (
    <Heading
      as="h2"
      size="xl"
      className="mt-6 md:mt-10 glow"
    >
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => (
    <p 
      className="mt-6 md:mt-10 text-2xl md:text-2xl font-body gap-8 max-w-md space-y-4 neon-text"
    >
      {children}
    </p>
  ),
  // Add bold and list support
  strong: ({ children }) => (
    <strong className="font-bold glow">{children}</strong>
),
  list: ({ children }) => (
    <ul className="list-disc list-inside mt-3 md:mt-10 text-2xl text-yellow-300 space-y-4 neon-list">
      {children}
    </ul>
  ),
  listItem: ({ children }) => (
    <li className="mt-2 font-bold space-y-4 glow">{children}</li>
  ),
};
const AboutNyxNova = () => {
  const features = [
    // { name: "Precision Detection", description: "Utilizes state-of-the-art technology to detect terrain anomalies, including craters, boulders, and other obstacles on the lunar surface." },
    // { name: "Smart Navigation", description: "With advanced machine learning algorithms, charts the most optimized path from point A to point B, ensuring safe and efficient navigation." },
    // { name: "Obstacle Avoidance", description: "Intelligently avoids dangerous lunar terrain, enhancing safety and reliability for lunar missions." },
    // { name: "Optimized Route Planning", description: "Algorithms minimize traversal time and energy usage by finding the most efficient path through the Moon's challenging landscape." },
    // { name: "Future-Ready Exploration", description: "Built for lunar exploration and beyond, supports the next wave of space missions with cutting-edge navigation technology." }
  ];

  return (
    <div className="mt-80 font-body bg-gray-900 text-gray-100 py-20">
      <div className="grid grid-cols-1 justify-items-center w-full pt-16"> {/* Added pt-16 for top padding */}
      <h2 className="text-4xl px-6 font-bold font-display text-center mb-6 md:mb-16 text-yellow-400 max-w-3xl"> </h2>
    </div>
      <div className="max-w-4xl mx-auto">
        {features.map((feature, index) => (
          <div key={index} className="mb-20">
            <h3 className="text-2xl font-bold text-yellow-400 mb-2 flex items-center">
              <ChevronRight className="mr-2 text-yellow-500" />
              {feature.name}
            </h3>
            <p className="text-yellow-200 hover:text-slate-300 pl-6">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export type HeroProps = SliceComponentProps<Content.HeroSlice>;

const Hero = ({ slice }: HeroProps): JSX.Element => {
  return (
    <>
      {slice.variation === "default" && (
        <Bounded
          data-slice-type={slice.slice_type}
          data-slice-variation={slice.variation}
        >
          <div className="grid min-h-screen grid-cols-1 place-items-center text-center py-20">
            {/* <PrismicNextImage
              field={slice.primary.image}
              className="drop-shadow-xl max-w-6xl w-full h-64 object-cover mb-6 md:mb-8 rounded-lg"
            /> */}
            <PrismicRichText
              field={slice.primary.heading}
              components={components}
            />
            <div className="mb-6 md:mb-16 text-4xl font-body font-bold text-yellow-200 hover:text-slate-300 neon-text"> {/* Apply font-body */}
              <PrismicRichText
                field={slice.primary.body}
                components={components}
              />
            </div>
            <div className="w-full py-30 flex justify-center mt-50 mb-50 mb-6 md:mb-16"> {/* Adjust margin top to create space */}
              <Button
                field={slice.primary.button_link}
                className="px-6 text-4xl font-body font-bold shadow-md hover:shadow-lg active:scale-90 glow"  // Ensure font-body for button text
              >
                {slice.primary.button_text}
              </Button>
            </div>
            <AboutNyxNova />
          </div>
        </Bounded>
      )}
    </>
  );
};

export default Hero;
