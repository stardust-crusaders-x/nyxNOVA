import clsx from "clsx";
import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next";

export default function Button({
  className,
  ...restProps
}: PrismicNextLinkProps) {
  return (
    <PrismicNextLink
    
      className={clsx(
        "grid grid-cols-1 mt-6 md:mt-10 place-items-center bg-yellow-500 hover:bg-cyan-900 transition-color duration-200 ease-in-out py-3 px-12 rounded-full font-display font-bold text-slate-800 text-base tracking-wider",
        className
      )}
      {...restProps}
    />
  );
}