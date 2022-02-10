import { useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { FormLabel, Radio, RadioGroup, TextareaAutosize } from '@mui/material';

const FormTour = () => {

  const theme = createTheme();

  const preset = {
    name: '',
    description: '',
    date: '02/09/2022',
    trail_length:'1',
    difficulty: '',
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
  }

  return (
    <ThemeProvider theme={theme}>
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
          <Typography component="h1" variant="h3">
            Create Tour
          </Typography>
          <Box
            component="form"
            onSubmit={() => { }}
            noValidate sx={{ mt: 1 }}
          >
            <TextField
              id="tourname"
              label="Tour Name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              autoFocus
            />
            <TextField
              label="Description"
              name="description"
              value={formState.description}
              onChange={handleChange}
              variant="outlined"
              multiline
              rows={4}
              margin="normal"
              fullWidth
            />
            <TextField
              id="date"
              label="Date"
              name="date"
              value={formState.date}
              onChange={handleChange}
              margin="normal"
              required
              fullWidth
              autoFocus
            />
            <FormLabel id="demo-row-radio-buttons-group-label">Difficulty:</FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="difficulty"
              value={formState.difficulty}
              onChange={handleChange}
            >
              <FormControlLabel value="EASY" control={<Radio />} label="Easy" />
              <FormControlLabel value="MEDIUM" control={<Radio />} label="Medium" />
              <FormControlLabel value="HARD" control={<Radio />} label="Hard" />
            </RadioGroup>
            <TextField
              id="trail_length"
              label="Trail Length"
              name="trail_length"
              value={formState.trail_length}
              onChange={handleChange}
              type="number"
              margin="normal"
              required
              fullWidth
              autoFocus
            />
            <TextField
              id="max_participants"
              label="Max Number Of Participants"
              name="max_participants"
              value={formState.max_participants}
              onChange={handleChange}
              type="number"
              margin="normal"
              required
              fullWidth
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
};

export default FormTour;