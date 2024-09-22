import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import ForgotPassword from './ForgotPassword';
import getSignInTheme from './theme/getSignInTheme';
import  { SosIcon2 } from './CustomIcons';
import TemplateFrame from './TemplateFrame';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
      'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
        'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: '100%',
  padding: 20,
  backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
  backgroundRepeat: 'no-repeat',
  ...theme.applyStyles('dark', {
    backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
  }),
}));

export default function SignIn() {
  const [mode, setMode] = React.useState('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const defaultTheme = createTheme({ palette: { mode } });
  const SignInTheme = createTheme(getSignInTheme(mode));
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  // Verificação do token ao carregar a página
  useEffect(() => {
    const validateToken = () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        fetch('http://localhost:8080/user/validate_access_token', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        })
            .then(response => {
              if (response.ok) {
                // Se o token for válido, redirecionar para a página desejada
                navigate('/pagina-desejada');
              }
            })
            .catch(error => {
              console.error('Erro na validação do token:', error);
            });
      }
    };

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    // Adicionar o campo email como username
    formData.append('username', formData.get('email'));
    formData.delete('email'); // Remove o campo original 'email' se não for necessário

    try {
      const response = await fetch('http://localhost:8080/user/login', {
        method: 'POST',
        body: formData, // Enviando o FormData diretamente
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();

      // Salva o token no localStorage
      localStorage.setItem('access_token', result.access_token);

      // Redireciona para a página desejada
      window.location.href = '/pagina-desejada';

    } catch (error) {
      console.error('Error:', error);
    }
  };


  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');

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

    return isValid;
  };

  return (
      <TemplateFrame
          toggleCustomTheme={toggleCustomTheme}
          showCustomTheme={showCustomTheme}
          mode={mode}
          toggleColorMode={toggleColorMode}
      >
        <ThemeProvider theme={showCustomTheme ? SignInTheme : defaultTheme}>
          <CssBaseline enableColorScheme />
          <SignInContainer direction="column" justifyContent="space-between">
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
                Login
              </Typography>
              <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: 2,
                  }}
              >
                <FormControl>
                  <FormLabel
                      htmlFor="email"
                      sx={{ fontFamily: 'Poppins, sans-serif' }}
                  >
                    Email
                  </FormLabel>
                  <TextField
                      error={emailError}
                      helperText={emailErrorMessage}
                      id="email"
                      type="email"
                      name="email"
                      placeholder="seuemail@dominio.com"
                      autoComplete="email"
                      autoFocus
                      required
                      fullWidth
                      variant="outlined"
                      color={emailError ? 'error' : 'primary'}
                      sx={{ ariaLabel: 'email', fontFamily: 'Poppins, sans-serif' }}
                  />
                </FormControl>
                <FormControl>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <FormLabel
                        htmlFor="password"
                        sx={{ fontFamily: 'Poppins, sans-serif' }}
                    >
                      Senha
                    </FormLabel>
                    <Link
                        component="button"
                        onClick={handleClickOpen}
                        variant="body2"
                        sx={{
                          alignSelf: 'baseline',
                          fontFamily: 'Poppins, sans-serif',
                        }}
                    >
                      Esqueceu-se da sua senha?
                    </Link>
                  </Box>
                  <TextField
                      error={passwordError}
                      helperText={passwordErrorMessage}
                      name="password"
                      placeholder="••••••"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      autoFocus
                      required
                      fullWidth
                      variant="outlined"
                      color={passwordError ? 'error' : 'primary'}
                      sx={{ fontFamily: 'Poppins, sans-serif' }}
                  />
                </FormControl>
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Lembrar minha senha"
                    sx={{ fontFamily: 'Poppins, sans-serif' }}
                />
                <ForgotPassword open={open} handleClose={handleClose} />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={validateInputs}
                    sx={{ fontFamily: 'Poppins, sans-serif' }}
                >
                  Acessar
                </Button>
                <Typography
                    sx={{
                      textAlign: 'center',
                      fontFamily: 'Poppins, sans-serif',
                    }}
                >
                  Nao tem uma conta?{' '}
                  <span>
                  <Link
                      href="/material-ui/getting-started/templates/sign-in/"
                      variant="body2"
                      sx={{
                        alignSelf: 'center',
                        fontFamily: 'Poppins, sans-serif',
                      }}
                  >
                    Registre-se agora mesmo
                  </Link>
                </span>
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }} />
            </Card>
          </SignInContainer>
        </ThemeProvider>
      </TemplateFrame>
  );
}
