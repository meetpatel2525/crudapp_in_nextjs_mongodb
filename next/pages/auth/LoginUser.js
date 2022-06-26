import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { getProviders, signIn, signOut } from "next-auth/react";

function LoginUser({ providers }) {
  const router = useRouter();

  // const { data: session } = useSession()

  const [adminLog, setAdminLog] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminLog({ ...adminLog, [name]: value });
  };
  const login = (e) => {
    //for not send data in url
    e.preventDefault();
    fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(adminLog),
    }).then((res) => {
      (async () => {
        const msg = await res.json();
        console.log(msg);
        alert(msg.message);
        if (msg.message === "Login Successfull") {
          localStorage.setItem("token", msg.data);
          //remove the token of nextAuth using signOut() function
          signOut({ callbackUrl: "http://localhost:3000" });
          // router.push("/")
        }
      })();
    });
  };

  return (
    <div className="flex items-center justify-center w-full h-screen bg-gradient-to-br from-blue-600 to-indigo-600">
      <div className="w-screen max-w-sm px-10 py-8 bg-white shadow-md rounded-xl">
        <form>
          <div className="space-y-4">
            <h1 className="text-2xl font-semibold text-center text-gray-600">
              User Login
            </h1>
            <div>
              <label
                for="email"
                className="block mb-1 font-semibold text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={adminLog.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full px-4 py-2 rounded-md outline-none bg-indigo-50"
              />
            </div>
            <div>
              <label
                for="email"
                className="block mb-1 font-semibold text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={adminLog.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full px-4 py-2 rounded-md outline-none bg-indigo-50"
              />
            </div>
          </div>
          <button
            type="submit"
            onClick={login}
            className="w-full py-2 mt-4 text-lg tracking-wide text-indigo-100 rounded-md bg-gradient-to-tr from-blue-600 to-indigo-600"
          >
            Login
          </button>
          <div className="m-3">
            <p>
              {" "}
              Dont have an account{" "}
              <b style={{ color: "#2563eb" }}>
                <Link href="/auth/Registration"> Register</Link>
              </b>{" "}
            </p>
          </div>
        </form>
        {/* Link of google login */}
        <>
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button
                className="flex items-center justify-center w-full px-3 py-2 text-sm text-white text-gray-700 border border-gray-300 rounded-lg hover:border-gray-500 focus:border-gray-500"
                onClick={() =>
                  signIn(
                    provider.id,
                    {
                      callbackUrl: "http://localhost:3000/",
                    },
                 
                   {

                    }
                  )
                }
              >
                <img width={40} height={40} src="/google_PNG19635.png" />
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </>
      </div>
    </div>
  );
}

//serverside rendoring data function for google login

export async function getServerSideProps(context) {
  const providers = await getProviders();
  console.log(providers);
     
  return {
    props: { providers },
  };
}

export default LoginUser;
