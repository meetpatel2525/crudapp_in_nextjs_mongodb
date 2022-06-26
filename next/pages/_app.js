import '../styles/globals.css'
{/* //we use global css hear  */}
import '../styles/forallpage.css'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { useState } from 'react'
import { useEffect } from 'react'
import { Router, useRouter } from "next/router";
import LoginUser from './auth/LoginUser'
import {SessionProvider,useSession,signIn, signOut } from "next-auth/react"
//we set components here for constant component we want to display like nava and footer
function  MyApp({Component,pageProps,session}) {

const router = useRouter()

const [user, setUser] = useState({data:null,status:"unauthenticated"})
useEffect(() => {
const token =  localStorage.getItem("token") 
if(token){
  setUser({data:token,status:"authenticated"})
}
//if we use router.query in use Effect than when the url is change data will we refresh
},[router.query])

const logout = () =>{
 localStorage.removeItem("token")
 console.log("call");
  setUser({data:null})
if(user){
  console.log("hi redirect");
  // router.push('/')
  signOut({ callbackUrl: "http://localhost:3000"})
  //for refresh the page with relode
  // router.reload(window.location.pathname)
}}

return  <>
<SessionProvider  session={session} >
<NavBar logout={logout}  user={user}  />
<Component  {...pageProps} />
</SessionProvider>;
<Footer/>
</>
}
export default  MyApp
