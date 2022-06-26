import ContectForm from "./ContectForm";
import withAuth from './WithAuth';

import React from 'react'

const Newcontect = () => {

    const petForm  = {
            
        name:'',
        email:'',
        phone:'',
        password:'',
        image:''
        
      }

  return <ContectForm formId="add-pet-form" petForm={petForm} />
  
}

export default withAuth(Newcontect)
