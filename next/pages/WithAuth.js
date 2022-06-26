import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSession} from "next-auth/react"

//fix code for give authentication 

const withAuth = (WrappedComponent) => {
    
  return (props) => {
    const [showChild, setShowChild] = useState(false);
  
    useEffect(() => {
      setShowChild(true);
    }, []);

    const cooki = useSession()

    if (!showChild) {
        return null;
      }

    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {

      const Router = useRouter();
      const accessToken = localStorage.getItem("token");
 
      const authdata = (cooki.status == "unauthenticated") ? null : cooki  ;

      const check = (accessToken) ? accessToken : authdata ;
      // If there is no access token we redirect to "LoginUser" page.
      if (!check) {
        Router.replace("/auth/LoginUser");
        return null;
      }
      // If this is an accessToken we just render the component that was passed with all its props
      return <WrappedComponent {...props} />;
    }
    // If we are on server, return null
    return null;
  };
};


export default withAuth;