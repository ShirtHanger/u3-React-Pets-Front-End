// src/components/PetForm.jsx

import { useState } from 'react';

const PetForm = (props) => {
  // formData state to control the form
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    breed: '',
  });

  // handleChange function to update formData state
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmitForm = (event) => {
    event.preventDefault();
    props.handleAddPet(formData);
    setFormData({ name: '', age: '', breed: '' });
  };

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
        <button type="submit" onClick={handleSubmitForm}>Add New Pet</button>
      </form>
    </div>
  );
};

export default PetForm;
