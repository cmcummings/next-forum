import { ParentProps } from "@/types/app-types";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Dispatch, SetStateAction, useState } from "react";
import { useSession, signOut } from "next-auth/react"
import Link from "next/link";


export function Button({ className, ...props }: ParentProps) {
  return (
    <button className={"bg-sky-500 rounded-xl px-5 py-2 font-bold hover:bg-sky-700 " + className} {...props} />
  )
}


export function Container({ children, className, ...props }: ParentProps) {
  return <div className={"border border-slate-600 bg-slate-900 rounded-md " + className} {...props}>{children}</div>
}


export function Divider() {
  return <div className="border-t my-3 border-slate-600" />
}


export function Footer() {
  return (
    <footer className="py-5 bg-slate-900 px-5 lg:px-44">
      <p className="text-slate-600">warechat </p>
    </footer>
  )
}


export function IconButton({ children, className, ...props }: ParentProps) {
  return <button className={"hover:bg-slate-700 p-1 rounded-lg " + className} {...props}>
    {children}
  </button>
}


export function Modal({ className, children, setVisible }: { className?: string, children?: React.ReactNode | React.ReactNode[], setVisible: Dispatch<SetStateAction<boolean>> }) {

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


export function PageContents({ children, className, ...props }: ParentProps ) {
  return <div className={"lg:mx-80 mt-10 " + className} {...props} >{children}</div>
}


export function Page({ children, className }: ParentProps) {
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

export function TextArea({ className, ...props }: ParentProps) {
  return (
    <textarea 
      className={"focus:outline-none ring-1 ring-slate-700 focus:ring-2 ring-inset focus:ring-sky-500 rounded-lg bg-transparent p-3 " + className}
      {...props} />
  )
}


export function TextLink({ children, href, ...props }: ParentProps & { href: string }) {
  return (
    <Link className="text-sky-400 hover:text-sky-200 hover:underline" href={href} {...props}>{children}</Link>
  )
}


export function TextInput({ className, ...props }: ParentProps) {
  return (
    <input 
      type="text" 
      className={"focus:outline-none ring-1 ring-slate-700 focus:ring-2 ring-inset focus:ring-sky-500 rounded-lg bg-transparent p-3 " + className}
      {...props} />
  )
}


export function Topbar() {
  const { data: session, status } = useSession()

  function getSessionText() {
    if (session) {
      return (
        <>
          <span className="text-slate-400">Logged in as</span> {session!.user.name} 
          <button className="ml-1 text-slate-500 hover:text-slate-300" onClick={() => signOut()}>(Sign Out)</button>
        </>
      )
    } else {
      return (
        <>
          <TextLink href="/login">Log in</TextLink> or <TextLink href="/signup">sign up</TextLink>
        </>
      )
    }
  }

  return (
    <div className="bg-slate-900 text-slate-200 px-5 lg:px-44 py-2 sticky top-0 grid grid-cols-3 w-screen">
      <div>
        <Link href="/" className="hover:underline">warechat</Link>
      </div>
      <div className="text-center">
        
      </div>
      <div className="inline text-right">
        <p>
          {getSessionText()}
        </p>
      </div>
    </div>

  )
}