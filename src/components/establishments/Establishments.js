import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import Grid from '@mui/material/Grid2';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import getEstablishmentsTheme from './theme/getEstablishmentsTheme';
import TemplateFrame from './TemplateFrame';
import { estadosBrasileiros } from './arrayDados';
import { tiposEstabelecimentos } from './arrayDados';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import  { PostoIcon } from './CustomIcons';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  height: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
      'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '100%',
  },
  ...theme.applyStyles('dark', {
    boxShadow:
        'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
  }),
}));

const EstablishmentsContainer = styled(Stack)(({ theme }) => ({
  height: '100%',
  width: '100%',
  padding: 4,
  backgroundImage: 'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
  backgroundRepeat: 'no-repeat',
  ...theme.applyStyles('dark', {
    backgroundImage: 'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
  }),
}));

export default function Establishments() {
  const [mode, setMode] = React.useState('light');
  const [showCustomTheme, setShowCustomTheme] = React.useState(true);
  const defaultTheme = createTheme({ palette: { mode } });
  const EstablishmentsTheme = createTheme(getEstablishmentsTheme(mode));
  const [tipoPesquisa, setTipoPesquisa] = React.useState('cep');
  const [estabelecimento, setEstabelecimento] = React.useState('Todos');
  const [inputPesquisa, setInputPesquisa] = React.useState('');
  const navigate = useNavigate();
  const [result, setResult] = React.useState([]); 
  const [loading, setLoading] = React.useState(false); 

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
            navigate('/establishments');
          } else {
            navigate('/signin');
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

  const handleSearch = async (event) => {
    event.preventDefault();
  
    try {

      setLoading(true);
      setResult([]);

      const data = {
        codigo_tipo_unidade: estabelecimento,
        inputPesquisa: inputPesquisa,
        tipoPesquisa: tipoPesquisa
      };
      
      const response = await fetch('http://localhost:8080/establishments/get_establishments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const resultData = await response.json();
      console.log('Success:', result);
      setResult(resultData);
      
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false); 
    }
  };

  const handleInput = (event) => {
    setInputPesquisa(event.target.value);
  };

  return (
    <TemplateFrame toggleCustomTheme={toggleCustomTheme} showCustomTheme={showCustomTheme} mode={mode} toggleColorMode={toggleColorMode}>
      <ThemeProvider theme={showCustomTheme ? EstablishmentsTheme : defaultTheme}>
        <CssBaseline enableColorScheme />
        <EstablishmentsContainer direction="row" justifyContent="space-between" alignItems="center">
          <Card>
            <Grid container spacing={3}>
            <Grid size={1.5}> </Grid>

              <Grid size={2}>
                {/* <FormControl fullWidth>
                  <InputLabel id="estado-label">Estado</InputLabel>
                    <Select
                      labelId="estado-label"
                      id="estado"
                      value={estado}
                      label="Estado"
                      onChange={(e) => setEstado(e.target.value)}
                    >
                    <MenuItem key={'Todos'} value={'Todos'}>
                          Todos
                    </MenuItem>
                    {estadosBrasileiros.map((estado) => (
                      <MenuItem key={estado.value} value={estado.value}>
                        {estado.label}
                      </MenuItem>
                    ))}
                    </Select>
                </FormControl> */}
                <FormControl fullWidth>
                  <InputLabel id="tipoPesquisa-label">Tipo Pesquisa</InputLabel>
                    <Select
                      labelId="tipoPesquisa-label"
                      id="tipoPesquisa-label"
                      value={tipoPesquisa}
                      label="tipoPesquisa"
                      onChange={(e) => setTipoPesquisa(e.target.value)}
                    >
                    <MenuItem key={'cep'} value={'cep'}>
                          CEP
                    </MenuItem>

                    <MenuItem key={'municipio'} value={'municipio'}>
                          Município
                    </MenuItem>

                    <MenuItem key={'nome_estabelecimento'} value={'nome_estabelecimento'}>
                          Nome do Estabelecimento
                    </MenuItem>
                 
                    </Select>
                </FormControl>
              </Grid>

              <Grid size={3}>
               <TextField
                  id="inputPesquisa"
                  type="text"
                  name="inputPesquisa"
                  placeholder={`Filtrar por ${tipoPesquisa}`}
                  fullWidth
                  variant="outlined"
                  value={inputPesquisa}
                  onChange={handleInput}
                  sx={{ ariaLabel: 'inputPesquisa', fontFamily: 'Poppins, sans-serif' }}
                />
              </Grid>

              <Grid size={3}>
                <FormControl fullWidth>
                  <InputLabel id="estabelecimento-label">Tipo Estabelecimento</InputLabel>
                    <Select
                      labelId="estabelecimento-label"
                      id="estabelecimento"
                      value={estabelecimento}
                      label="Tipo Estabelecimento"
                      onChange={(e) => setEstabelecimento(e.target.value)}
                    >
                      <MenuItem key={'Todos'} value={'Todos'}>
                          Todos
                      </MenuItem>

                      {tiposEstabelecimentos.map((estabelecimento) => (
                        <MenuItem key={estabelecimento.value} value={estabelecimento.value}>
                          {estabelecimento.label}
                        </MenuItem>
                      ))}
                    </Select>
                </FormControl>
              </Grid>

              <Grid size={1}>
              <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={handleSearch}
                    sx={{ fontFamily: 'Poppins, sans-serif' }}
                    disabled={loading}
                >
                  Pesquisar
                </Button>
              </Grid>

              {result.map((estabelecimento) => (
                <Grid size={2}>
                  <MuiCard sx={{ maxWidth: 345, minHeight: 200, border: '2px solid blue' }}>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {estabelecimento.nome_fantasia}
                      </Typography>

                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Logradouro: {estabelecimento.endereco_estabelecimento}, {estabelecimento.numero_estabelecimento}                
                      </Typography>

                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Bairro: {estabelecimento.bairro_estabelecimento}
                      </Typography>

                      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Contato: {estabelecimento.numero_telefone_estabelecimento}
                      </Typography>

                    </CardContent>
        
                  </MuiCard>
                  </Grid>
                 ))}

            </Grid>
            
          </Card>
        </EstablishmentsContainer>
      </ThemeProvider>
    </TemplateFrame>
  );
}
  