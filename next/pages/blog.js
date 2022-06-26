import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Pagination from "@mui/material/Pagination";
import withAuth from "./WithAuth";

const blog = () => {
  const router = useRouter();

  // for serverside prirendoring
  const [blogs, setBlogs] = useState([]);

  //for pagination

  //set params as pageno for put page=1 in url
  const { pageNumber } = router.query;
  const pageno = pageNumber || 1;

  const [Loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [page, setPage] = useState(pageno);
  const [pages, setPages] = useState(1);

  //for refresh data withou relode use useefect and put data variable blogd
  useEffect(() => {
    fetchUser();
  }, [page]);

  //fetch the data from the databise and display api call
  const fetchUser = async () => {
    console.log("function called");
    try {
      const response = await fetch(`api/blogs/?page=${page}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { data, pages: totalPages } = await response.json();
      setPages(totalPages);
      if(data){
        setBlogs(data);
      }
      
      setLoading(false);
      //pagination logic end
    } catch (error) {
      setLoading(false);
      setError("some error ocured  ");
    }
  };

  //delete single data api call
  const deleteSingleDatacat = async (id) => {
    console.log("delete");
    // const id = router.query.id
    console.log(id);
   const data = await fetch(`api/${id}`, { method: "DELETE" });
   
   fetchUser()
    // router.push('/about')
    //for resfresh the function
    // setTimeout(fetchUser(), 300);
  };

  //for delete selected multiple data
  //variable for selecte  datas for delete multiple
  // const [selectedRows, setSelectedRows] = useState([]);

  // const onValueCheched = async (e) =>  {
  //   //check check box check or uncheck
  //   let ischecked = e.target.checked
  // if(ischecked) {
  //   setSelectedRows([...selectedRows, { id: e.target.value }]);
  //   console.log(selectedRows);
  // }else{
  //   let value = e.target.value;
  //   console.log(value);
  //   setSelectedRows(selectedRows.filter((t) => t.id !== value));
  // }
  // }

  //delete multiple data
  const deleteMultipleDatacat = async () => {
    let arrayids = [];
    //get the valu from the checkbox using getEliment
    document.getElementsByName("ids[]").forEach((e) => {
      if (e.checked) {
        arrayids.push(e.value);
      }
    });
    {
      await fetch("/api/delete", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(arrayids),
      });
      //after delete refresh new data
      fetchUser();
      //after delete unchech the chech box
      document.getElementsByName("ids[]").forEach((e) => {
        e.checked = false;
      });
    }
  };

  //variable for serching
  const [search, setSearch] = useState("");

  //search  logic start
  //for serch button click
  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      //meaning of this if is enter//

      //when serch button is click than the serch logis is active
      searchMyData();
    }
  };

  // rearch logic and function

  const searchMyData = async () => {
    console.log(search);
    if (search.trim()) {
      //trime() is for no empty space
      const response = await fetch(`api/searchdata/?searchuser=${search}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      //store the responce in a user variable for display
      const user = await response.json();
      console.log(user);
      //reson whay we use same state setUsers for two things allusers and serched data  :- hear we set the serched user data in users that also have a data of all users but we put sem state setUsers becouse when this method is call than users satae  only map the serched users data only and if this method is not active than it display or map allusers data as auseal
      setBlogs(user);
    } else {
      router.push("/blog");
    }
  };

  return (

    <div className="" >
      <div class="flex flex-row mt-14 ml-20 ">
        <div>
          <button
            // style={{margin:'-50px 0px 0px 53px'}}
            onClick={() => deleteMultipleDatacat()}
            className="px-6 py-3 ml-3 font-bold text-white bg-blue-500 border border-blue-700 rounded widhth-2 hover:bg-blue-700"
          >
            Delete
          </button>
        </div>
        <div>
          <input
            //  style={{margin:'00px 0px 0px 0px'}}
            onKeyPress={handleKeyPress}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-3 py-2 leading-tight text-gray-700 border rounded "
            id="name"
            name="search"
            placeholder="Enter name"
          />
        </div>
        <div>
          <button
            onClick={searchMyData}
            type="submit"
            className="px-6 py-3 ml-3 font-bold text-white bg-blue-500 border border-blue-700 rounded widhth-2 hover:bg-blue-700"
          >
            Search
          </button>
        </div>
        <div >
          <Pagination className="fixed"
            defaultPage={page}
            count={pages}
            page={page}
            pages={pages}
            variant="outlined"
            shape="rounded"
            onChange={(e, value) => setPage(value)}
          />
        </div>
      </div>
      {/* <div className='flex' style={{margin:'-45px 0px 0px 157px'}} >
<input style={{margin:'00px 0px 0px 0px'}}
 onKeyPress={handleKeyPress}
 value={search}
 onChange={(e) => setSearch(e.target.value)}
className="px-3 py-2 leading-tight text-gray-700 border rounded "  id="name" name='search'  placeholder="Enter name"/>
<button  onClick={searchMyData}
  type="submit"
 className='px-6 py-3 ml-3 font-bold text-white bg-blue-500 border border-blue-700 rounded widhth-2 hover:bg-blue-700'>Search</button>

</div> */}

      <div className="flex content-center "
      //  style={{ margin: "-40px 0px 0px 500px" }}
       ></div>
      <div
      
        className="w-full p-20 m-20 mx-auto "
      >
        <table className="w-full ml-10 text-left whitespace-no-wrap table-auto ">
          <thead>
            <tr>
              <th className="px-4 py-3 text-sm font-medium tracking-wider text-gray-900 bg-gray-100 rounded-tl rounded-bl title-font">
                Select
              </th>
              <th className="px-4 py-3 text-sm font-medium tracking-wider text-gray-900 bg-gray-100 rounded-tl rounded-bl title-font">
                id
              </th>
              <th className="px-4 py-3 text-sm font-medium tracking-wider text-gray-900 bg-gray-100 title-font">
                Name
              </th>
              <th className="px-4 py-3 text-sm font-medium tracking-wider text-gray-900 bg-gray-100 title-font">
                Email
              </th>
              <th className="px-4 py-3 text-sm font-medium tracking-wider text-gray-900 bg-gray-100 title-font">
                image
              </th>
              <th className="px-4 py-3 text-sm font-medium tracking-wider text-gray-900 bg-gray-100 title-font">
                phone
              </th>
              <th className="px-4 py-3 text-sm font-medium tracking-wider text-gray-900 bg-gray-100 title-font">
                Delete
              </th>
              <th className="px-4 py-3 text-sm font-medium tracking-wider text-gray-900 bg-gray-100 title-font">
                Edit
              </th>
            </tr>
          </thead>
          <tbody className="flax">
            {blogs.map((pro) => (
              <tr key={pro.id}>
                <td>
                  <input name="ids[]" type="checkbox" value={pro._id} />
                </td>
                <td className="px-4 py-3">{pro._id}</td>
                <td className="px-4 py-3">{pro.name}</td>
                <td className="px-4 py-3">{pro.email}</td>
                <td className="px-4 py-3">
                  <img
                    class=" text-center block w-8 h-8 "
                    src={"/uploads/" + pro.image}
                  />
                </td>

                <td className="px-4 py-3 flax ">{pro.phone}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => deleteSingleDatacat(pro._id)}
                    className="px-2 py-2 font-bold text-white bg-blue-500 border border-blue-700 rounded widhth-2 hover:bg-blue-700"
                  >
                    Delete
                  </button>
                </td>
                <td className="px-4 py-3">
                  <Link
                    href="/[id]/edit"
                    as={`/${pro._id}/edit`}
                    className="px-2 py-2 font-bold text-black border border-blue-700 rounded widhth-2 hover:bg-blue-700"
                  >
                    Edit
                  </Link>
                </td>
                <td className="w-10 text-center"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

//for serverside prirendoring data //lode data alredy on webpage
// export async function getServerSideProps(context) {
// let mydata = await fetch('http://localhost:3000/api/blogs')
// let allblogs = await mydata.json()
// return {
//   props:{allblogs}, // will be passed to the page component as props
// }
// }

export default withAuth(blog);
