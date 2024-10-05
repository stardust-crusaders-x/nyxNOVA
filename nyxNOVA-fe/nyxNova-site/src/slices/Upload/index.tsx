import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import { PrismicNextImage } from '@prismicio/next';  // Import Prismic's Next.js Image helper
import Bounded from "@/components/Bounded";
import Link from "next/link";

export type UploadProps = SliceComponentProps<Content.UploadSlice>;

const Upload = ({ slice }: UploadProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className="w-full h-auto py-20 bg-gradient-to-r from-purple-900 to-black text-white space-y-24 overflow-hidden relative"
    >
      {/* Animated Background */}
      
      {/* Title Section */}
      <div className="container mx-auto text-center relative z-10">
        <h4 className="text-4xl md:text-8xl font-extrabold font-display text-slate-700 bg-clip-text">
          Types of Exoplanets
        </h4>
        <p className="mt-6 text-2xl md:text-2xl font-light font-body max-w-3xl mx-auto">
          Each planet type varies in appearance, depending on its composition. Discover the diverse and fascinating world of exoplanets, from gas giants to terrestrial wonders.
        </p>
      </div>

      {/* Planet Sections */}
      {/* Gas Giant */}
      <div className="container mx-auto flex flex-wrap items-center justify-between py-10 relative z-10">
        <div className="w-full md:w-1/2 mb-10 md:mb-0 text-center transform transition-transform duration-500 hover:scale-110">
          {/* Using PrismicNextImage instead of URL */}
          <PrismicNextImage
            field={slice.primary.image}
            className="rounded-full object-cover"
            width={500}
            height={500}
          />
        </div>
        <div className="w-full md:w-1/2 text-left md:text-right px-6 md:px-0">
          <h3 className="text-4xl font-bold font-display text-transparent bg-clip-text">
            Gas Giants
          </h3>
          <p className="mt-4 text-lg md:text-xl font-body font-light">
            Planets the size of Saturn or Jupiter, or even larger. Some, like hot Jupiters, orbit so closely to their stars that their temperatures soar into the thousands of degrees.
          </p>
        </div>
      </div>

      {/* Neptune-like */}
      <div className="container mx-auto flex flex-wrap items-center justify-between py-10 relative z-10">
        <div className="w-full md:w-1/2 order-last md:order-first text-center transform transition-transform duration-500 hover:scale-110">
          <PrismicNextImage
            field={slice.primary.neptuneimage} 
            className="rounded-full object-cover"
            width={500}
            height={500}
          />
        </div>
        <div className="w-full md:w-1/2 text-left px-6 md:px-0">
          <h3 className="text-4xl font-bold font-display text-transparent bg-clip-text">
            Neptune-like Planets
          </h3>
          <p className="mt-4 text-lg md:text-xl font-body font-light">
            Similar in size to Neptune or Uranus, with a hydrogen and helium-dominated outer atmosphere and rocky cores. Includes mini-Neptunes, which donot exist in our solar system.
          </p>
        </div>
      </div>

      {/* Super-Earths */}
      <div className="container mx-auto flex flex-wrap items-center justify-between py-10 relative z-10">
        <div className="w-full md:w-1/2 mb-10 md:mb-0 text-center transform transition-transform duration-500 hover:scale-110">
          <PrismicNextImage
            field={slice.primary.superearthimage}
            className="rounded-full object-cover"
            width={500}
            height={500}
          />
        </div>
        <div className="w-full md:w-1/2 text-left md:text-right px-6 md:px-0">
          <h3 className="text-4xl font-bold font-display text-transparent bg-clip-text">
            Super-Earths
          </h3>
          <p className="mt-4 text-lg md:text-xl font-body font-light">
            Terrestrial planets more massive than Earth, but lighter than Neptune. Some have atmospheres, while others may be barren rock worlds.
          </p>
        </div>
      </div>

      {/* Terrestrial */}
      <div className="container mx-auto flex flex-wrap items-center justify-between py-10 relative z-10">
        <div className="w-full md:w-1/2 order-last md:order-first text-center transform transition-transform duration-500">
          <PrismicNextImage
            field={slice.primary.terrestrialimage}
            className="rounded-full object-cover"
            width={500}
            height={500}
          />
        </div>
        <div className="w-full md:w-1/2 text-left px-6 md:px-0">
          <h3 className="text-4xl font-bold font-display text-transparent bg-clip-text">
            Terrestrial Planets
          </h3>
          <p className="mt-4 text-lg md:text-xl font-body font-light">
            Earth-sized and smaller planets composed of rock, silicate, water, or carbon. These planets may possess atmospheres, oceans, or even signs of habitability.
          </p>
        </div>
      </div>

      {/* Button Section */}
      <div className="w-full text-center mt-12 relative z-10">
        <Link
          className="px-8 py-4 text-2xl font-bold font-body text-slate-900  shadow-lg animate-pulse-glow transition-all duration-300 ease-in-out transform hover:scale-105"
          href={"https://nyxnova-exoplanet.vercel.app/"}
        >
          Explore More Exoplanets
        </Link>
      </div>
    </Bounded>
  );
};

export default Upload;
