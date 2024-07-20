import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `SignUp`.
 */
export type SignUpProps = SliceComponentProps<Content.SignUpSlice>;

/**
 * Component for "SignUp" Slices.
 */
const SignUp = ({ slice }: SignUpProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for sign_up (variation: {slice.variation}) Slices
    </section>
  );
};

export default SignUp;
