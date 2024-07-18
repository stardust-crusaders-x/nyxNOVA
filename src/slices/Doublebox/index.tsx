import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Doublebox`.
 */
export type DoubleboxProps = SliceComponentProps<Content.DoubleboxSlice>;

/**
 * Component for "Doublebox" Slices.
 */
const Doublebox = ({ slice }: DoubleboxProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for doublebox (variation: {slice.variation}) Slices
    </section>
  );
};

export default Doublebox;
