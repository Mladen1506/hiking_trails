import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { actionAuthRegister } from '../redux/actions';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const FormRegister = () => {

  const dispatch = useDispatch();
  const theme = createTheme();

  const preset = {
    username: '',
    password: '',
    password2: ''
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

  const validator = () => {
    let test = true;

    if (formState.username === '' || formState.username.length < 3) {
      test = false;
    }
    if (formState.password === '') {
      test = false;
    }
    if (formState.password2 === '') {
      test = false;
    }
    if (formState.password !== formState.password2) {
      test = false;
    }

    return test;
  }

  const handleClickSubmit = (e) => {
    // ovo je handle za obican click event na taster submit
    e.preventDefault(); // ovo sprecava da browser automatski submituje
    if (validator(formState)) {
      // ukoliko je prosla validacija
      console.log('click submit...')
      console.log(formState);
      dispatch(actionAuthRegister(formState));
    } else {
  // ukoliko ne prodje validaciju
  window.alert('Form validation Error :(')
}
  };

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
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box
          component="form"
          onSubmit={() => { }}
          noValidate sx={{ mt: 1 }}
        >
          <TextField
            label="Username"
            name="username"
            value={formState.username}
            onChange={handleChange}
            margin="normal"
            required
            fullWidth
            id="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            label="Password"
            name="password"
            value={formState.password}
            onChange={handleChange}
            type="password"
            margin="normal"
            required
            fullWidth
            id="password"
            autoComplete="current-password"
          />
          <TextField
            label="Confirm Password"
            name="password2"
            value={formState.password2}
            onChange={handleChange}
            type="password"
            margin="normal"
            required
            fullWidth
            id="password2"
          />
          <Button
            type="button"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={handleClickSubmit}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  </ThemeProvider>
)
};

export default FormRegister;