import { ParentProps } from "@/types/app-types";
import Link from "next/link";


export default function TextLink({ children, href, ...props }: ParentProps & { href: string }) {
  return (
    <Link className="text-sky-400 hover:text-sky-200 hover:underline" href={href} {...props}>{children}</Link>
  )
}