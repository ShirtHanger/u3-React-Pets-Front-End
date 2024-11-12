import axios from "axios"

/* The attached VITE URL is pulled from the .env file */
/* This format is good because it is interchangeable! */
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/pets`
// src/services/petService.js

/* Functions to make API pulls */

// Read - Index
/* populates the REACT website with a list of pets */

async function indexPets() {
  try {
      const response = await axios.get(BASE_URL)
      return response.data // Sends data back in JSON format, axios does this automatically, so .json() is not required
  } catch (error) {
      console.log(error)
  }
}

// CREATE, make a new pet object!

async function createPet(formData) {
  try { /* axios.post takes the target URL and the new object as arguements */
    const response = await axios.post(BASE_URL, formData)
    console.log(response)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

// UPDATE, update an existing pet object
  
async function updatePet(formData, petId) {
  try { /* axios.put takes the target object's URL and the updated object as arguements */
    const response = await axios.put(`${BASE_URL}/${petId}`, formData) 
    console.log(response)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

// DELETE - Deletes a pet from the database!
  /* It told me 'delete' was a reserved word */

async function deletePet(petId) {
  try { /* axios.delete only takes the target object's URL as an arguement */
    const response = await axios.delete(`${BASE_URL}/${petId}`) 
    console.log(response)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

// Can only export one thing
// Get around it by nesting them all in objects
export { indexPets, createPet, updatePet, deletePet }

