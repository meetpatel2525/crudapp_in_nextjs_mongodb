import { useRouter } from 'next/router'
import useSWR from 'swr'
import ContectForm from '../ContectForm'

const fetcher = (url) =>
  fetch(url)
    .then((res) => res.json())
    .then((json) => json.data)

const EditPet = () => {
  const router = useRouter()
  const { id } = router.query
  // using useSWR we can fetch over data using id 
  const { data: pet, error } = useSWR(id ? `/api/${id}` : null, fetcher)

  if (error) return <p>Failed to load</p>
  if (!pet) return <p>Loading...</p>


   
const petForm  = {
            
    name:pet.name,
    email:pet.email,
    phone:pet.phone,
    password:pet.password,
    image:pet.image
    
  }

//we use props method hear for not repet a code and det the form from the ContectForm file using form id and hold data in petForm
return <ContectForm formId="edit-pet-form" petForm={petForm} forNewPet={false} />
}

export default EditPet