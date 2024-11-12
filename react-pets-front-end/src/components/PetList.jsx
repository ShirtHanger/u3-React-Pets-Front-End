const PetList = (props) => {

    /* Creates a list of pet elements for the web page. Each individual pet will look like this */

    const pets = props.petList.map((pet) => (
        // Using setState variable/function from app.jsx to
        <a key={pet._id} onClick={() => props.updateSelectedPet(pet)}>
            <li>{pet.name}</li>
        </a>
    ))
  
    return (
        <div>
          <h2>Plant List</h2>

            {/* Renders pet list, but if there are no pets, shows message indicating such */}

          {!props.petList.length ? 
            <h3>No Pets Yet!</h3> 
            : 
            <ul>{pets}</ul>}

            {/* Submit/Update/Delete button */}
          <button onClick={props.handleFormView}>
                {props.isFormOpen ? 'Close Form' : 'New Pet'}
            </button>
        </div>
      )

}
  

export default PetList