import { XMarkIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction, useState } from "react";
import Container from "./Container";
import IconButton from "./IconButton";

export default function Modal({ className, children, setVisible }: { className?: string, children?: React.ReactNode | React.ReactNode[], setVisible: Dispatch<SetStateAction<boolean>> }) {

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-[#00000043]">
      <Container className={"relative mx-auto mt-20 p-3 " + className}>
        <IconButton className="absolute right-3 top-3 w-8 h-8">
          <XMarkIcon onClick={() => setVisible(false)}/>
        </IconButton>
        {children}
      </Container>
    </div>
  )
}