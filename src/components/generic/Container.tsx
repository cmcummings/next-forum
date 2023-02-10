import { ParentProps } from "@/types/app-types";

export default function Container({ children, className, ...props }: ParentProps) {
  return <div className={"border border-slate-600 bg-slate-900 rounded-md " + className} {...props}>{children}</div>
}