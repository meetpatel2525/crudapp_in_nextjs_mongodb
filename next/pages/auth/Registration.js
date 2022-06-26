import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";

const Registration = () => {
  const router = useRouter();

  const [admin, setAdmin] = useState({
    name: "",
    email: "",
    number: "",
    password: "",
    reEnterPassword: "",
  });

//save input user data 
  const handleChange = (e) => {
    //store input value
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };

  // registration logic

   const register =  (e) => {
    //for not send form details in url
    e.preventDefault();

    // form validations
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    //for number
    const pattern = new RegExp(/^[0-9\b]+$/);
    const { name, email, number, password, reEnterPassword } = admin;

    //validation conditions for registration new user

    if (name && email && number && password) {
      if (password === reEnterPassword) {
        if (pattern.test(number) && number.length === 10) {
          if (regex.test(email)) {
            if (password.length >= 4 && password.length <= 10) {
              fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(admin),
              }).then((res) => {
                //for print responce msg in popup becose in next js we need to use res.json()
                (async () => { 
                const msg = await res.json()
               alert(msg.message);
              })();
              router.push("/auth/LoginUser");
              });
            } else {
              alert("Password must be Between 4 to 10 characters");
            }
          } else {
            alert("Email is not valid !");
          }
        } else {
          alert("Number  is not valid!");
        }
      } else {
        alert("password and Reenter Password mustbe same ");
      }
    } else {
      alert(" Must be Fullfill all Filds ");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center w-full h-screen bg-gradient-to-br from-blue-600 to-indigo-600">
        <form>
          <div className="w-screen max-w-sm px-10 py-8 bg-white shadow-md rounded-xl">
            <div className="space-y-4">
              <h1 className="text-2xl font-semibold text-center text-gray-600">
                Register
              </h1>
              <div>
                <label
                  for="email"
                  className="block mb-1 font-semibold text-gray-600"
                >
                  Username
                </label>
                <input
                  type="text"
                  name="name"
                  value={admin.name}
                  onChange={handleChange}
                  placeholder="Full name"
                  className="w-full px-4 py-2 rounded-md outline-none bg-indigo-50"
                />
              </div>
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
                  value={admin.email}
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
                  Phone
                </label>
                <input
                  type="number"
                  name="number"
                  value={admin.number}
                  onChange={handleChange}
                  placeholder="Number"
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
                  value={admin.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full px-4 py-2 rounded-md outline-none bg-indigo-50"
                />
              </div>
              <div>
                <label
                  for="email"
                  className="block mb-1 font-semibold text-gray-600"
                >
                  reEnterPassword
                </label>
                <input
                  type="password"
                  name="reEnterPassword"
                  value={admin.reEnterPassword}
                  onChange={handleChange}
                  placeholder="Retype password"
                  className="w-full px-4 py-2 rounded-md outline-none bg-indigo-50"
                />
              </div>
            </div>
            <button
              type="submit"
              onClick={register}
              className="w-full py-2 mt-4 text-lg tracking-wide text-indigo-100 rounded-md bg-gradient-to-tr from-blue-600 to-indigo-600"
            >
              Register
            </button>
            <div className="m-3" >
           <p>Alredy have an account <b style={{ color: "#2563eb"}} ><Link  href="LoginUser" > Login </Link></b> </p>   
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Registration;
