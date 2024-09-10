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
            <PrismicNextImage
              field={slice.primary.image}
              className="drop-shadow-xl max-w-6xl w-full h-64 object-cover mb-6 md:mb-8 rounded-lg"
            />
            <PrismicRichText
              field={slice.primary.heading}
              components={components}
            />
            <div className="mb-6 md:mb-16 text-4xl font-body neon-text"> {/* Apply font-body */}
              <PrismicRichText
                field={slice.primary.body}
                components={components}
              />
            </div>
            <div className="w-full flex justify-center mt-50"> {/* Adjust margin top to create space */}
              <Button
                field={slice.primary.button_link}
                className="px-6 py-3 text-2xl font-body font-bold shadow-md hover:shadow-lg active:scale-90 glow"  // Ensure font-body for button text
              >
                {slice.primary.button_text}
              </Button>
            </div>
          </div>
        </Bounded>
      )}
    </>
  );
};

export default Hero;
