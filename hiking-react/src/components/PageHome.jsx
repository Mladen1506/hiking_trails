
import { Container, CssBaseline, dividerClasses, FormControlLabel, FormLabel, Grid, Radio, RadioGroup, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionReviewsNeeded, actionToursNeeded } from "../redux/actions";
import Spinner from "./Spinner";
import TourItem from "./TourItem";



const PageHome = (props) => {
  const dispatch = useDispatch();
  const routeFreshness = useSelector((state) => state.routeFreshness);

  useEffect(() => {

    dispatch(actionToursNeeded());
    dispatch(actionReviewsNeeded());

  }, [routeFreshness]);

  const preset = {
    search: '',
    difficulty: 'ALL',
    trail_length_min: 1,
    trail_length_max: 99,
  };

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

  const filteredTours = tours.data.filter((tour) => {
    let test = true;

    // filtering po searchu
    if (formState.search !== '') {
      if (tour.name.toUpperCase().includes(formState.search.toUpperCase()) || tour.description.includes(formState.search.toUpperCase())) {
      } else {
        test = false;
      }
    }

    if (tour.difficulty === formState.difficulty || formState.difficulty === 'ALL') {

    } else {
      test = false;
    }
    if (tour.trail_length >= formState.trail_length_min && tour.trail_length <= formState.trail_length_max) {

    } else {
      test = false;
    }
    return test;
  });

  let jsxSpinner = null;
  if (tours.fetching) {
    jsxSpinner = (
      <Spinner />
    );
  }
  let jsx = filteredTours.map((tour, index) => {
    return (
      <TourItem key={tour._id} tour={tour} />
    );
  });

  return (
    <>
      <h1>Home Page</h1>

      <h3>Filter Tours</h3>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <TextField
            id="search"
            label="Filter by keywords"
            name="search"
            value={formState.search}
            onChange={handleChange}
            margin="normal"
            required
            fullWidth
            autoFocus
          />

          <Grid container>
            <Grid item xs>
              <TextField
                id="trail_length_min"
                label="Trail Length MIN."
                name="trail_length_min"
                value={formState.trail_length_min}
                onChange={handleChange}
                type="number"
                margin="normal"
                required
                fullWidth
                autoFocus
              />

            </Grid>
            <Grid item>
              <TextField
                id="trail_length_max"
                label="Trail Length Max."
                name="trail_length_max"
                value={formState.trail_length_max}
                onChange={handleChange}
                type="number"
                margin="normal"
                required
                fullWidth
                autoFocus
              />
            </Grid>
          </Grid>


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
        </Box>
      </Container>

      <h4>Tours</h4>
      {jsxSpinner}
      {jsx}
    </>
  );
}

export default PageHome;