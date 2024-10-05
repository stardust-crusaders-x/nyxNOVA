import clsx from "clsx";
import { PrismicNextLink, PrismicNextLinkProps } from "@prismicio/next";

export default function Button({
  className,
  prefetch,
  ...restProps
}: PrismicNextLinkProps) {
  return (
    <PrismicNextLink
      {...(prefetch !== null && { prefetch })}  // Only pass prefetch if not null
      className={clsx(
        "bg-black text-white hover:text-yellow-200 hover:bg-gray-500 transition duration-200 px-6 py-3 text-xl font-bold rounded-full shadow-md hover:shadow-lg active:scale-90",
        className
      )}
      {...restProps}
    />
  );
}
