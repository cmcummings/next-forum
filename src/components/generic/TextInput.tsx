import { ParentProps } from "@/types/app-types";


export default function TextInput({ className, ...props }: ParentProps) {
  return (
    <input 
      type="text" 
      className="focus:outline-none focus:ring-2 ring-inset ring-sky-500 rounded-lg bg-transparent p-3"
      {...props} />
  )
}