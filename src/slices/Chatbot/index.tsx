import { Content } from "@prismicio/client";
import { SliceComponentProps } from "@prismicio/react";
import Bounded from "@/components/Bounded";

/**
 * Props for `Chatbot`.
 */
export type ChatbotProps = SliceComponentProps<Content.ChatbotSlice>;

/**
 * Component for "Chatbot" Slices.
 */
const Chatbot = ({ slice }: ChatbotProps): JSX.Element => {
  return (
    <Bounded
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
    >
      <iframe
        src="https://www.chatbase.co/chatbot-iframe/dNIZ_vm2s3hnjJ518qOD2"
        width="100%"
        style={{ height: "100%", minHeight: 700 }}
        frameBorder="0"
      />
    </Bounded>
  );
};

export default Chatbot;