import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Login from "@/components/Login";
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
      <Login />
    </section>
  );
};

export default SignUp;