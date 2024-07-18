import clsx from "clsx";
import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next";

export default function Button({
  className,
  ...restProps
}: PrismicNextLinkProps) {
  return (
    <PrismicNextLink
      className={clsx(
        "block w-fit bg-yellow-300 hover:bg-cyan-900 transition-color duration-200 ease-in-out py-3 px-12 rounded-full font-display text-slate-300 font-bold text-base tracking-wider",
        className
      )}
      {...restProps}
    />
  );
}