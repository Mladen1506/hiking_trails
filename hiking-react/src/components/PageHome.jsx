import { FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";



const PageHome = (props) => {

  const preset = {
    search: '',
    difficulty: 'ALL',
    trail_length:'1',
    max_participants: '10'
  }

  const [formState, setFormState] = useState(preset);

  const handleChange = (e) => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    setFormState({
      ...formState,
      [name]: value
    });
  };


  const tours = useSelector((state) => state.tours);

  const filteredTours = tours.filter((tour) => {
    if (tour.difficulty === formState.difficulty || formState.difficulty === 'ALL'){
      return true;
    } else {
      return false;
    }
  });

  let jsx = filteredTours.map((tour, index) => {
    return (
      <div key = {tour._id}>
        <h4>{tour.name}</h4>
        <div>{tour.description}</div>
        <div>{tour.date}</div>
        <div>{tour.trail_length}</div>
        <div>{tour.difficulty}</div>
        <div>{tour.max_participants}</div>
      </div>
    );
  });

  return (
    <>
    <h1>Home Page</h1>

    <h3>Filter Tours</h3>
    <FormLabel id="demo-row-radio-buttons-group-label">Difficulty:</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="difficulty"
              value={formState.difficulty}
              onChange={handleChange}
            >
              <FormControlLabel value="ALL" control={<Radio />} label="All" />
              <FormControlLabel value="EASY" control={<Radio />} label="Easy" />
              <FormControlLabel value="MEDIUM" control={<Radio />} label="Medium" />
              <FormControlLabel value="HARD" control={<Radio />} label="Hard" />
            </RadioGroup>
    <h4>Tours</h4>
    {jsx}
    </>
  );
}

export default PageHome;