import { ParentProps } from "@/types/app-types";
import Footer from "./Footer";
import Topbar from "./Topbar";


export default function Page({ children, className }: ParentProps) {
  return (
    <>
      <Topbar />
      <div className="min-h-screen">
        <div className={className}>
          {children}
        </div>
      </div>
      <Footer />
    </>
  )
}