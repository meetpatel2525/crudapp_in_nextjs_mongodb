import React from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/router";
import jwt_decode from "jwt-decode";
import { useSession, signOut } from "next-auth/react";

const NavBar = ({ logout, user }) => {
const router = useRouter()

  //decode the tokan for display data
  if (user.data) {
    var decod = { user: jwt_decode(user.data) };
  }
  
  const { data: session } = useSession();
 
  // for remove local login user after google login
  if(session){
    localStorage.removeItem("token")
  }  
  
  //check local login is true or not 
  const locallogin = user.status == "unauthenticated" ? null : user;

  //chech local user is enter or google and store in check
  const check = session ? session : locallogin;

  return (

    
    <div class=" "
     >
      {/* in next js we need to give a path of the file we want to link */}
      <nav className="px-2  sm:px-4 py-2.5 font-bold text-white bg-blue-500 border border-blue-700" >
        <ul  className="flex flex-wrap items-center justify-between">
          <li >
            <Link href="/">home</Link>
          </li>
          {check ? (
            <>
              <li >
                <Link href="/about">About</Link>
              </li>
              <li >
                <Link href="/blog">blog</Link>
              </li>
              <li>
                <Link href="/Newcontect">Contect</Link>
              </li>
              <div className="h-8 text-black bg-blue-200 rounded-md w-25">
                {decod ? (
                  <h1>{decod.user.name}</h1>
                ) : session ? (
                  <h1>{session.user.name}</h1>
                ) : null}
              </div>
              <div class="flex flex-wrap justify-center">
                {session ? (
                  <img class="rounded-full" src={session.user.image} />
                ) : null}
              </div>
            </>
          ) : null}
          {check ? (
            <>
              {session ? (
                <button
                  className="font-bold "
                  onClick={() =>
                    signOut({
                      callbackUrl: "http://localhost:3000",
                    })
                  }
                >
                  Logout
                </button>
              ) : (
                <button
                  className="flex items-center space-x-8 font-bold"
                  style={{ width: "3%" }}
                  onClick={() =>
                    logout({})
                  }
                >
                  Logout
                </button>
              )}
            </>
          ) : (
            <li style={{ width: "3%" }}>
              <Link href="/auth/LoginUser">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default NavBar;
