// src/components/PetDetail.jsx

const PetDetail = (props) => {

    /* useState is being used as a workaround since this specific app isn't using ROUTES */

    if (!props.selectedPet)
        return (
          <div>
            <h1>No pet selected</h1>
          </div>
        )
  
    return (
        <div>
          <h2>Name: {props.selectedPet.name}</h2>
          <h4>Age: {props.selectedPet.age}</h4>
          <h4>Breed: {props.selectedPet.breed}</h4>
          <p>{props.selectedPet.name} is a {props.selectedPet.age} year old {props.selectedPet.breed}!</p>
          <button onClick={() => props.handleFormView(props.selectedPet)}>Edit {props.selectedPet.name}'s info</button>
          <button onClick={() => props.handleDeletePet(props.selectedPet._id)}>Adopt {props.selectedPet.name}</button>
        </div>
      )

}
  

export default PetDetail