import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Upload`.
 */
export type UploadProps = SliceComponentProps<Content.UploadSlice>;

/**
 * Component for "Upload" Slices.
 */
const Upload = ({ slice }: UploadProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for upload (variation: {slice.variation}) Slices
    </section>
  );
};

export default Upload;
