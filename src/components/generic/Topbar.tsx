import { useSession, signOut } from "next-auth/react"


export default function Topbar() {
  const { data: session, status } = useSession()

  if(!session) return <></>

  return (
    <div className="dark:bg-slate-900 text-slate-200 px-5 lg:px-44 py-2 sticky top-0 grid grid-cols-3 w-screen">
      <div>
        warechat
      </div>
      <div className="text-center">
        
      </div>
      <div className="inline text-right">
        <p><span className="text-slate-400">Logged in as </span>{session.user.name} <button className="text-slate-500 hover:text-slate-300" onClick={() => signOut()}>(Sign Out)</button></p>
        
      </div>
    </div>

  )
}