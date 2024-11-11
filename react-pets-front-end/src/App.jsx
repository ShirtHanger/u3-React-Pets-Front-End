import { useState, useEffect } from 'react'


import * as petService from './services/petService' // The star imports EVERYTHING from the petService file, think ahead of time

import PetList from './components/PetList'
import PetDetail from './components/PetDetail'
import PetForm from './components/PetForm'


import './App.css'

// src/App.jsx

const App = () => {

  /* Pet list states */
  const [petList, setPetList] = useState([]) // Initially empty


  /* Variable for a selected pet and form */
  const [selected, setSelected] = useState(null) // Initially null 
  const [isFormOpen, setIsFormOpen] = useState(false)
  /* useState is being used as a workaround since this specific app isn't using ROUTES */


  useEffect(() => {

    // create a new async function
    async function fetchPets() {

      try {
        // call on the index function for an API call
        const pets = await petService.index()
        if (pets.error) {
          throw new Error(pets.error)
        }

        // Set petList state to the returned pets data
        setPetList(pets)

      } catch (error) {
        // Log the error object
        console.log(error)
      }
    }
    // invoke the function
    fetchPets()

    // add an empty dependency array to the `useEffect` hook.
  }, [])

  function updateSelectedPet(pet) {
    setSelected(pet)
  }

  /* If there is no pet being shown in detail, assumes you want new pet. Otherwise, update the shown pet */

  function handleFormView(pet) {
    if (!pet.name) setSelected(null)
    setIsFormOpen(!isFormOpen)
  }

  async function handleAddPet(formData) {
    try {
      const newPet = await petService.create(formData)
  
      if (newPet.error) {
        throw new Error(newPet.error)
      }
  
      setPetList([newPet, ...petList])
      setIsFormOpen(false)
    } catch (error) {
      // Log the error to the console
      console.log(error)
    }
  }

  async function handleUpdatePet(formData, petId) {
    try {
      const updatedPet = await petService.update(formData, petId)
  
      if (updatedPet.error) {
        throw new Error(updatedPet.error)
      }
  
      setPetList([updatedPet, ...petList])
      setIsFormOpen(false)
      setSelected(updatedPet)
    } catch (error) {
      // Log the error to the console
      console.log(error)
    }
  }

  async function handleDeletePet(petId) {
    try {
      const deletedPet = await petService.deletePet(petId)
  
      if (deletedPet.error) {
        throw new Error(deletedPet.error)
      }

      /* Using filter to create new pet array that EXCLUDES the pet that was targetted for deletion, 
      by excluding any object with the Id of the target's ID */
  
      setPetList(petList.filter(pet => 
        pet._id !== deletedPet._id
      ))

      setSelected(null)
      setIsFormOpen(false)
    } catch (error) {
      // Log the error to the console
      console.log(error)
    }
  }

  

  return (

  <>
  <h1>Crazy Dave's plant shop</h1>
  <PetList 
  petList={petList}
  updateSelectedPet={updateSelectedPet}
  handleFormView={handleFormView}/>
  {/* IF/ELSE to determine if form view will be shown or not */}
  {isFormOpen ? (
      <PetForm handleAddPet={handleAddPet} handleUpdatePet={handleUpdatePet} selectedPet={selected}/>
    ) : (
      <PetDetail selectedPet={selected} handleFormView={handleFormView} handleDeletePet={handleDeletePet} />
    )}
  </>

  )
}


export default App

