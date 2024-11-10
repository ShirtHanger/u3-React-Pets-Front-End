import axios from "axios"

/* The attached VITE URL is pulled from the .env file */
/* This format is good because it is interchangeable! */
const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/pets`
// src/services/petService.js

/* Functions to make API pulls */

// Read - Index
/* populates the REACT website with a list of pets */

async function index() {
    try {
        const response = await axios.get(BASE_URL)
        return response.data // Sends data back in JSON format, axios does this automatically, so .json() is not required
    } catch (error) {
        console.log(error)
    }
}

// CREATE, make a new pet object!

const create = async (formData) => {
    try {
        const response = await axios.post(BASE_URL, formData)
      console.log(response)
      return response.data
    } catch (error) {
      console.log(error)
    }
  }

// UPDATE
  
const update = async (formData, petId) => {
  try {
    const response = await axios.put(`${BASE_URL}/${petId}`, formData) 
    console.log(response)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
// Can only export one thing
// Get around it by nesting them all in objects
export { index, create, update }

