import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `LandingSite`.
 */
export type LandingSiteProps = SliceComponentProps<Content.LandingSiteSlice>;

/**
 * Component for "LandingSite" Slices.
 */
const LandingSite = ({ slice }: LandingSiteProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for landing_site (variation: {slice.variation})
      Slices
    </section>
  );
};

export default LandingSite;
