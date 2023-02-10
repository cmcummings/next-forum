import { useSession, signOut } from "next-auth/react"
import TextLink from "./TextLink"


export default function Topbar() {
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
        warechat
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