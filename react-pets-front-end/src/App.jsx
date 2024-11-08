import { useState, useEffect } from 'react'


import * as petService from './services/petService' // The star imports EVERYTHING from the petService file, think ahead of time

import PetList from './components/PetList';
import PetDetail from './components/PetDetail';
import PetForm from './components/PetForm';


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
          throw new Error(pets.error);
        }

        // Set petList state to the returned pets data
        setPetList(pets)

      } catch (error) {
        // Log the error object
        console.log(error)
      }
    }
    // invoke the function
    fetchPets();

    // add an empty dependency array to the `useEffect` hook.
  }, [])

  function updateSelectedPet(pet) {
    setSelected(pet)
  }

  function handleFormView() {
    setIsFormOpen(!isFormOpen)
  }

  async function handleAddPet(formData) {
    try {
      const newPet = await petService.create(formData);
  
      if (newPet.error) {
        throw new Error(newPet.error);
      }
  
      setPetList([newPet, ...petList]);
      setIsFormOpen(false);
    } catch (error) {
      // Log the error to the console
      console.log(error);
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
      <PetForm handleAddPet={handleAddPet} />
    ) : (
      <PetDetail selectedPet={selected} />
    )}
  </>

  )
}


export default App

