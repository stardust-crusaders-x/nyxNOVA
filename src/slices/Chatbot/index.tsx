import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";

/**
 * Props for `Chatbot`.
 */
export type ChatbotProps = SliceComponentProps<Content.ChatbotSlice>;

/**
 * Component for "Chatbot" Slices.
 */
const Chatbot = ({ slice }: ChatbotProps): JSX.Element => {
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      Placeholder component for chatbot (variation: {slice.variation}) Slices
    </section>
  );
};

export default Chatbot;
