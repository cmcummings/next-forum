import { ParentProps } from "@/types/app-types";

export default function PageContents({ children, className, ...props }: ParentProps ) {
  return <div className={"lg:mx-80 mt-10 " + className} {...props} >{children}</div>
}