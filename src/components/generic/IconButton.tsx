import { ParentProps } from "@/types/app-types";

export default function IconButton({ children, className, ...props }: ParentProps) {
  return <button className={"hover:bg-slate-700 p-1 rounded-lg " + className} {...props}>
    {children}
  </button>
}