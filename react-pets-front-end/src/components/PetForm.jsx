// src/components/PetForm.jsx

import { useState } from 'react'

const PetForm = (props) => {

  const initialState = {
    name: '',
    age: '',
    breed: '',
  }

  // formData state to control the form
  // If pet data has been passed as props, we set formData as that pet object.
  // Otherwise, we can assume this is a new pet form, and use the empty initialState object.
  const [formData, setFormData] = useState(props.selectedPet ? props.selectedPet : initialState)

  // handleChange function to update formData state
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
  }

  const handleSubmitForm = (event) => {
    event.preventDefault()
    if (props.selectedPet) { /* If a specific pet was selected, update that pet with form data */
      props.handleUpdatePet(formData, props.selectedPet._id)
    } else { /* Otherwise, add a new pet to the database */
      props.handleAddPet(formData) 
    }
    // initialState makes this no longer needed... i guess
    // setFormData({ name: '', age: '', breed: '' })
  }

  return (
    <div>
      <form>
        <label htmlFor="name"> Name </label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <label htmlFor="age"> Age </label>
        <input
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
        />
        <label htmlFor="breed"> Breed </label>
        <input
          id="breed"
          name="breed"
          value={formData.breed}
          onChange={handleChange}
        />
        <button type="submit" onClick={handleSubmitForm}> {props.selectedPet ? 'Update Pet' : 'Add New Pet'} </button> {/* UI feedback */}
        {/* Lets user know, update or new pet. Based on if a pet is being shown in detail alreay */}
      </form>
    </div>
  )
}

export default PetForm
