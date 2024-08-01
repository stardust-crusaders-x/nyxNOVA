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
      <iframe
        src="https://www.chatbase.co/chatbot-iframe/dNIZ_vm2s3hnjJ518qOD2"
        width="100%"
        style={{ height: "100%", minHeight: 700 }}
        frameBorder="0"
      />
    </section>
  );
};

export default Chatbot;