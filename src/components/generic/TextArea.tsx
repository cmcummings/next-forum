import { ParentProps } from "@/types/app-types";


export default function TextArea({ className, ...props }: ParentProps) {
  return (
    <textarea 
      className={"focus:outline-none ring-1 ring-slate-700 focus:ring-2 ring-inset focus:ring-sky-500 rounded-lg bg-transparent p-3 " + className}
      {...props} />
  )
}