import { Content } from "@prismicio/client";
import {SliceComponentProps, PrismicRichText,JSXMapSerializer,} from "@prismicio/react";
import Bounded from "@/components/Bounded";
import Heading from "@/components/Heading";
import { PrismicNextImage } from "@prismicio/next";

const components: JSXMapSerializer = {
  heading2: ({ children }) => (
    <Heading as="h2" size="md" className="text-center mb-12 text-yellow-500">
      {children}
    </Heading>
  ),
  heading3: ({ children }) => (
    <Heading
      as="h3"
      size="sm"
      className="mb-3 font-medium sm:text-left text-center">
      {children}
    </Heading>
  ),
  paragraph: ({ children }) => (
    <p className="text-2xl font-normal leading-10 font-body text-slate-600 mb-4 md:mb-8 max-w-md">
      {children}
    </p>
  ),
};

export type FeaturesProps = SliceComponentProps<Content.FeaturesSlice>;

/**
 * Component for "Features" Slices.
 */
const Features = ({ slice }: FeaturesProps): JSX.Element => {
  return (
    <Bounded
    data-slice-type={slice.slice_type}
    data-slice-variation={slice.variation}
  >
    <PrismicRichText components={components} field={slice.primary.heading} />
    <div className="mx-auto py-4 md:py-6 lg:py-8">
      <table className="w-full">
        <tbody>
          {slice.primary.icons.map((item, index) => (
            <tr key={index} className="border-b border-gray-200 mb-4">
              <td className="px-4 py-2">
                <div className="mb-4 flex items-center justify-center" style={{ width: '60px', height: '60px' }}>
                  <PrismicNextImage field={item.icons} style={{ width: '60px', height: '60px', objectFit: 'contain' }} />
                </div>
              </td>
              <td className="px-4 py-2">
                <PrismicRichText
                  field={item.title}
                  components={{
                   ...components,
                    heading1: ({ children }) => (
                      <span className="text-lg font-bold">{children}</span>
                    ),
                    paragraph: ({ children }) => (
                      <span className="text-lg">{children}</span>
                    ),
                  }}
                />
              </td>
              <td className="px-4 py-2">
                <PrismicRichText
                  field={item.description}
                  components={{
                   ...components,
                    heading1: ({ children }) => (
                      <span className="text-sm">{children}</span>
                    ),
                    paragraph: ({ children }) => (
                      <span className="text-sm">{children}</span>
                    ),
                  }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Bounded>
  );
};

export default Features;

