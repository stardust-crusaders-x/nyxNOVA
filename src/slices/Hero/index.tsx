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
      className="mb-6 md:mb-10 text-4xl md:text-5xl font-bold text-gray-400"
    >
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => (
    <p className="text-2xl font-normal leading-10 font-body text-gray-200 mb-6 md:mb-8 max-w-md">
      
      {children}
    </p>
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
          <div className="grid grid-cols-1 place-items-center text-center gap-8 md:gap-10">
            <PrismicNextImage
              field={slice.primary.image}
              className="drop-shadow-xl max-w-6xl w-full h-64 object-cover mb-6 md:mb-8" // Added margin-bottom for more space between image and heading
            />
            <PrismicRichText
              field={slice.primary.heading}
              components={components}
            />
            <div className="mb-6 md:mb-8"> {/* Added margin-bottom for more space between heading and body */}
              <PrismicRichText
                field={slice.primary.body}
                components={components}
              />
            </div>
            <div className="flex justify-center mt-4 md:mt-6"> {/* Flexbox used to center the button */}
              <Button field={slice.primary.button_link}>
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
