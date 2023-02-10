import { ParentProps } from "@/types/app-types";


export default function Button({ className, ...props }: ParentProps) {

  return (
    <button className={"bg-sky-500 rounded-xl px-5 py-2 font-bold hover:bg-sky-700 " + className} {...props} />
  )
}