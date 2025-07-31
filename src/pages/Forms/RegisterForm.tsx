import * as React from 'react';
import { CssVarsProvider } from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import IconButton from '@mui/joy/IconButton';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import GoogleIcon from '../../components/icons/GoogleIcon';
import BedIcon from '@mui/icons-material/Bed';
import ImageLoginForm from '../../assets/ImageLoginForm.jpg';
import type { JSX } from '@emotion/react/jsx-runtime';

// Types
interface RegisterData {
  name: string;
  lastName: string;
  phone: string;
  rol: string;
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

export default function RegisterForm(): JSX.Element {
  const [selectedRole, setSelectedRole] = React.useState<string>('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    
    const data: RegisterData = {
      name: formData.get('name') as string,
      lastName: formData.get('lastName') as string,
      phone: formData.get('phone') as string,
      rol: selectedRole,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
      confirmPassword: formData.get('confirmPassword') as string,
      acceptTerms: formData.get('acceptTerms') === 'on',
    };

    // Validación básica
    if (data.password !== data.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    if (!selectedRole) {
      alert('Por favor selecciona un rol');
      return;
    }

    if (!data.acceptTerms) {
      alert('Debes aceptar los términos y condiciones');
      return;
    }

    // Crear objeto final sin confirmPassword para envío
    const finalData = {
      name: data.name,
      lastName: data.lastName,
      phone: data.phone,
      rol: data.rol,
      email: data.email,
      password: data.password
    };

    alert(JSON.stringify(finalData, null, 2));
  };

  const handleRoleChange = (
    _event: React.SyntheticEvent | null,
    newValue: string | null
  ): void => {
    setSelectedRole(newValue || '');
  };

  return (
    <CssVarsProvider disableTransitionOnChange>
      <CssBaseline />
      <GlobalStyles
        styles={{
          ':root': {
            '--Form-maxWidth': '800px',
            '--Transition-duration': '0.4s',
          },
        }}
      />
      <Box
        sx={{
          width: { xs: '100%', md: '50vw' },
          transition: 'width var(--Transition-duration)',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          backdropFilter: 'blur(12px)',
          backgroundColor: 'rgba(255 255 255 / 0.2)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            minHeight: '100dvh',
            width: '100%',
            px: 2,
          }}
        >
          <Box
            component="header"
            sx={{ py: 3, display: 'flex', justifyContent: 'space-between' }}
          >
            <Box sx={{ gap: 2, display: 'flex', alignItems: 'center' }}>
              <IconButton variant="soft" color="primary" size="sm">
                <BedIcon />
              </IconButton>
              <Typography level="title-lg">Roomly</Typography>
            </Box>
          </Box>
          <Box
            component="main"
            sx={{
              my: 'auto',
              py: 2,
              pb: 5,
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              width: 450,
              maxWidth: '100%',
              mx: 'auto',
              borderRadius: 'sm',
              '& form': {
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              },
              [`& .MuiFormLabel-asterisk`]: {
                visibility: 'hidden',
              },
            }}
          >
            <Stack sx={{ gap: 4, mb: 2 }}>
              <Stack sx={{ gap: 1 }}>
                <Typography component="h1" level="h3">
                  Sign up
                </Typography>
                <Typography level="body-sm">
                  Already have an account?{' '}
                  <Link href="#replace-with-a-link" level="title-sm">
                    Sign in!
                  </Link>
                </Typography>
              </Stack>
              <Button
                variant="soft"
                color="neutral"
                fullWidth
                startDecorator={<GoogleIcon />}
              >
                Continue with Google
              </Button>
            </Stack>
            <Divider
              sx={{
                color: { xs: '#FFF', md: 'text.tertiary' },
              }}
            >
              or
            </Divider>
            <Stack sx={{ gap: 4, mt: 2 }}>
              <form onSubmit={handleSubmit}>
                <Stack sx={{ gap: 2 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      gap: 2,
                      flexDirection: { xs: 'column', sm: 'row' },
                    }}
                  >
                    <FormControl required sx={{ flex: 1 }}>
                      <FormLabel>Nombre</FormLabel>
                      <Input 
                        type="text" 
                        name="name" 
                        placeholder="Ingresa tu nombre"
                      />
                    </FormControl>
                    <FormControl required sx={{ flex: 1 }}>
                      <FormLabel>Apellidos</FormLabel>
                      <Input 
                        type="text" 
                        name="lastName" 
                        placeholder="Ingresa tus apellidos"
                      />
                    </FormControl>
                  </Box>

                  <FormControl required>
                    <FormLabel>Teléfono</FormLabel>
                    <Input 
                      type="tel" 
                      name="phone" 
                      placeholder="+52 961 123 4567"
                    />
                  </FormControl>

                  <FormControl required>
                    <FormLabel>Rol</FormLabel>
                    <Select
                      placeholder="Selecciona tu rol"
                      value={selectedRole}
                      onChange={handleRoleChange}
                    >
                      <Option value="Estudiante">Estudiante</Option>
                      <Option value="Propietario">Propietario</Option>
                    </Select>
                  </FormControl>

                  <FormControl required>
                    <FormLabel>Email</FormLabel>
                    <Input 
                      type="email" 
                      name="email" 
                      placeholder="ejemplo@correo.com"
                    />
                  </FormControl>

                  <FormControl required>
                    <FormLabel>Contraseña</FormLabel>
                    <Input 
                      type="password" 
                      name="password" 
                      placeholder="Ingresa tu contraseña"
                    />
                  </FormControl>

                  <FormControl required>
                    <FormLabel>Confirmar contraseña</FormLabel>
                    <Input 
                      type="password" 
                      name="confirmPassword" 
                      placeholder="Confirma tu contraseña"
                    />
                  </FormControl>
                </Stack>

                <Stack sx={{ gap: 4, mt: 3 }}>
                  <FormControl required>
                    <Checkbox 
                      size="sm" 
                      name="acceptTerms"
                      label={
                        <Typography level="body-sm">
                          Acepto los{' '}
                          <Link level="title-sm" href="#terms">
                            términos y condiciones
                          </Link>
                          {' '}y la{' '}
                          <Link level="title-sm" href="#privacy">
                            política de privacidad
                          </Link>
                        </Typography>
                      }
                    />
                  </FormControl>
                  <Button type="submit" fullWidth>
                    Crear cuenta
                  </Button>
                </Stack>
              </form>
            </Stack>
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          height: '100%',
          position: 'fixed',
          right: 0,
          top: 0,
          bottom: 0,
          left: { xs: 0, md: '50vw' },
          transition:
            'background-image var(--Transition-duration), left var(--Transition-duration) !important',
          transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
          backgroundColor: 'background.level1',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundImage:
            'url(' + ImageLoginForm + ')',
        }}
      />
    </CssVarsProvider>
  );
}