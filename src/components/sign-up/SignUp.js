import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import getSignUpTheme from './theme/getSignUpTheme';
import { SosIcon2 } from '../sign-in/CustomIcons';
import TemplateFrame from './TemplateFrame';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
      'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
        'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: '100%',
  padding: 4,
  backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
  backgroundRepeat: 'no-repeat',
  ...theme.applyStyles('dark', {
    backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
  }),
}));

export default function SignUp() {
  const [mode, setMode] = React.useState('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const defaultTheme = createTheme({ palette: { mode } });
  const SignUpTheme = createTheme(getSignUpTheme(mode));
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState('');
  const navigate = useNavigate();

  // Verificação do token ao carregar a página
  useEffect(() => {
    const validateToken = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const response = await fetch('http://localhost:8080/user/validate_access_token', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (response.ok) {
            // Se o token for válido, redirecionar para a página desejada
            navigate('/pagina-desejada');
          }
        } catch (error) {
          console.error('Erro na validação do token:', error);
        }
      }
    };

    // Use await para resolver a Promise retornada
    validateToken();
  }, [navigate]);

  const toggleColorMode = () => {
    const newMode = mode === 'dark' ? 'light' : 'dark';
    setMode(newMode);
    localStorage.setItem('themeMode', newMode); // Save the selected mode to localStorage
  };

  const toggleCustomTheme = () => {
    setShowCustomTheme((prev) => !prev);
  };

  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const name = document.getElementById('name');

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 6 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage('Name is required.');
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage('');
    }

    return isValid;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const jsonData = {
      name: data.get('name'),
      email: data.get('email'),
      password: data.get('password'),
    };

    try {
      const response = await fetch('http://localhost:8080/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
      <TemplateFrame
          toggleCustomTheme={toggleCustomTheme}
          showCustomTheme={showCustomTheme}
          mode={mode}
          toggleColorMode={toggleColorMode}
      >
        <ThemeProvider theme={showCustomTheme ? SignUpTheme : defaultTheme}>
          <CssBaseline enableColorScheme />
          <SignUpContainer direction="column" justifyContent="space-between">
            <Stack
                sx={{
                  justifyContent: 'center',
                  height: '100dvh',
                  p: 2,
                }}
            >
              <Card variant="outlined">
                <SosIcon2 />
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{
                      width: '100%',
                      fontSize: 'clamp(2rem, 10vw, 2.15rem)',
                      fontFamily: 'Poppins, sans-serif',
                    }}
                >
                  Registro
                </Typography>
                <Box
                    component="form"
                    onSubmit={handleSubmit}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                >
                  <FormControl>
                    <FormLabel
                        htmlFor="name"
                        sx={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      Nome de usuário
                    </FormLabel>
                    <TextField
                        autoComplete="name"
                        name="name"
                        required
                        fullWidth
                        id="name"
                        placeholder="Jon Snow"
                        error={nameError}
                        helperText={nameErrorMessage}
                        color={nameError ? 'error' : 'primary'}
                        sx={{ fontFamily: 'Poppins, sans-serif' }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel
                        htmlFor="email"
                        sx={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      Email
                    </FormLabel>
                    <TextField
                        required
                        fullWidth
                        id="email"
                        placeholder="seu@email.com"
                        name="email"
                        autoComplete="email"
                        variant="outlined"
                        error={emailError}
                        helperText={emailErrorMessage}
                        color={emailError ? 'error' : 'primary'}
                        sx={{ fontFamily: 'Poppins, sans-serif' }}
                    />
                  </FormControl>
                  <FormControl>
                    <FormLabel
                        htmlFor="password"
                        sx={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      Senha
                    </FormLabel>
                    <TextField
                        required
                        fullWidth
                        name="password"
                        placeholder="••••••"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        variant="outlined"
                        error={passwordError}
                        helperText={passwordErrorMessage}
                        color={passwordError ? 'error' : 'primary'}
                        sx={{ fontFamily: 'Poppins, sans-serif' }}
                    />
                  </FormControl>
                  <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      onClick={validateInputs}
                      sx={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Registre-se
                  </Button>
                  <Typography
                      sx={{
                        textAlign: 'center',
                        fontFamily: 'Poppins, sans-serif',
                      }}
                  >
                    Possui uma conta?{' '}
                    <span>
                    <Link
                        href="/signin"
                        variant="body2"
                        sx={{
                          alignSelf: 'center',
                          fontFamily: 'Poppins, sans-serif',
                        }}
                    >
                      Acesse já
                    </Link>
                  </span>
                  </Typography>
                </Box>
              </Card>
            </Stack>
          </SignUpContainer>
        </ThemeProvider>
      </TemplateFrame>
  );
}
