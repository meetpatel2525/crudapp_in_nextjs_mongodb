import React from 'react'
import { useState } from 'react';
import { useRouter } from 'next/router'
import { mutate } from 'swr'
import styles from '../styles/Home.module.css'
import withAuth from './WithAuth'

  const ContectForm = ({formId,petForm,forNewPet = true}) => {
  const router = useRouter()
  const contentType = 'application/json'
  const [errors, setErrors] = useState({})
  const [message, setMessage] = useState('')
  
  const [product, setProduct] = useState({
  name:petForm.name,
  email:petForm.email,
  phone:petForm.phone,
  password:petForm.password,  
  image:petForm.image  
});

  /* The PUT method edits an existing entry in the mongodb database. */
    const putData = async (product) => {
    console.log("put call");
    const { id } = router.query
    const formdata = new FormData();
    if(product.newimage){
    formdata.append("myFile", product.newimage, product.newimage.name);
    }
    formdata.append("name", product.name);
    formdata.append("email", product.email);  
    formdata.append("phone", product.phone);
    formdata.append("password", product.password);  

  // Display the values of FormData
    for (var value of formdata.values()) {
       console.log(value);
    }
   
    try {
        const res = await fetch(`/api/${id}`, {
        method: 'PUT',
        // headers: {
        //   Accept: contentType,
        //   'Content-Type': contentType,
        // },
        body: formdata,
      })
      if (!res.ok){
      throw new Error(res.status);
      }
      const { data } = await res.json()
     
      mutate(`/api/${id}`, data, false) // Update the local data without a revalidation
      router.push('/blog')
    }catch (error) {
      setMessage('Failed to update pet')
    }
  }
  const onValueChange = (e) => { 
    console.log(e.target.value);
    setProduct({...product, [e.target.name]: e.target.value})
  }

  const handlePhoto = (e) => {

//condition for if new user create of edit 
    {
      forNewPet ? setProduct({ ...product,image: e.target.files[0]})
      : setProduct({ ...product,newimage: e.target.files[0]}); 
    } 
 }

  const postData = async(product)=>{

   const formdata = new FormData();
   
    formdata.append("myFile", product.image,product.image.name); 
    formdata.append("name", product.name);
    formdata.append("email", product.email);  
    formdata.append("phone", product.phone);
    formdata.append("password", product.password);

    // Display the values of FormData
    // for (var value of formdata.values()) {
    //    console.log(value);
    // }
   
try {

 fetch('/api/postcontact',{
 method: 'POST',
//  headers: {
//   Accept: "multipart/form-data",
// },
 body: formdata
 }
 )
 router.push('/blog')
} catch (error) {
setMessage('Failed to add pet')
}
}

//delete single image from edit page 
const deleteImage = async (image) => {
  
  const { id } = router.query
  
  const data = {id:id,
    image: image}
    try {
   await  fetch('/api/delete',{
      method: 'POST',
      headers: {
        Accept: contentType,
        'Content-Type': contentType,
      },
      body:JSON.stringify(data)
      }
      )

      // for refresh the page
  window.location.reload(false);
  
     }catch (error) {
     setMessage('Failed to add pet')
     }      
}
    const handolSubmit = (e) => {
     e.preventDefault()
    const errs = formValidate()
    if (Object.keys(errs).length === 0) {
      forNewPet ?  postData(product) : putData(product)
    } else {
      setErrors({ errs })
    }
  }
  
  const formValidate = () => {
    let err = {}
    if (!product.name) err.name = 'Name is required'
    if (!product.email) err.email = 'email is required'
    if (!product.phone) err.phone = 'phone is required'
    if (!product.password) err.password = 'password URL is required'
    if (!product.image) err.image = 'image URL is required'
    return err
  }
  
  return (


<div class="flex flex-col justify-center items-center" >
<div  className="w-full max-w-xs mt-20 border-2 border-indigo-600 border-solid">
  <form  id={formId}   onSubmit={handolSubmit} encType="multipart/form-data"  className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md ">
    <div className="mb-4">
      <label className="block mb-2 text-sm font-bold text-gray-700" for="username">
        Username:
      </label>
      <input className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"  id="name" name='name'  onChange={(e) => onValueChange(e)} value={product.name} aria-describedby="emailHelp" placeholder="Enter name"/>
    </div>
    <div className="mb-4">
      <label className="block mb-2 text-sm font-bold text-gray-700" for="username">
       Email:
      </label>
      <input className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" name='email'  onChange={(e) => onValueChange(e)} value={product.email}  id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
    </div>    

{/* <div className="mb-4">
{product.image.name}
</div> */}

    <div className="mb-4">   
    <div class="flex">

  { product.image == "null" || !product.image ? null: <img width='30%' height='20%' className="mr-4" src={'/uploads/'+product.image}/> }
  {
    forNewPet || product.image == 'null' ? null :
    <div>
 {
  product.image ?
  <button   onClick={() => {
                                      deleteImage(
              
                                        // product._id,
                                        product.image
                                      );
     }}  className="px-4 py-2 mt-5 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="button">
     Delete
      </button> : null
 }
 
  </div>
  }
      </div>
      <label className="block mb-2 text-sm font-bold text-gray-700" for="username">
      image
      </label>
      <input className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="phone"  name="myFile"   type="file"  onChange={(e) => handlePhoto(e)}   aria-describedby="emailHelp" placeholder="Enter phone"/>
    </div>
    <div className="mb-4">
      <label className="block mb-2 text-sm font-bold text-gray-700" for="username">
 Phone No:
      </label>
      <input className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline" id="phone" name='phone'  onChange={(e) => onValueChange(e)} value={product.phone}    aria-describedby="emailHelp" placeholder="Enter phone"/>
    </div>
    <div className="mb-4">
      <label className="block mb-2 text-sm font-bold text-gray-700" for="username">
      Password:
      </label>
      <input className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"  type="password"   onChange={(e) => onValueChange(e)} value={product.password}    name="password" id="password" placeholder="Password"/>
    </div>
    <b></b>
    <div className="flex items-center justify-between">
      <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline" type="submit">
     Submit
      </button>
    </div>
  </form>
</div>
</div>
  )
}

export default withAuth (ContectForm)


