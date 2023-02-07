import { useSession, signOut } from "next-auth/react"


export default function Topbar() {
  const { data: session, status } = useSession()

  if(!session) return <></>

  return (
    <div className="dark:bg-slate-900 text-slate-200 p-4 sticky grid grid-cols-3 w-screen">
      <div>
        ware
      </div>
      <div className="text-center">
        
      </div>
      <div className="inline text-right">
        <p><span className="text-slate-400">Logged in as </span>{session.user.name}</p>
        <button className="text-slate-500 hover:text-slate-300" onClick={() => signOut()}>(Sign Out)</button>
      </div>
    </div>

  )
}