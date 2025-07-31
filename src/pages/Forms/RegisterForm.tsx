import React, { useState } from 'react';
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
import useField from '../../hooks/useFields';
import { useNavigate } from 'react-router-dom';
import { RegisterService } from '../../service/auth/RegisterService';
import { useAuthGuard } from '../../hooks/useAuthGuard';
import ErrorMessage from '../../components/ui/Errors/ErrorMessage';


export default function RegisterForm() {

  const { login: savedDataUser } = useAuthGuard();

  const name = useField({ type: 'text' })
  const lastName = useField({ type: 'text' })
  const phone = useField({ type: 'phone' })
  const email = useField({ type: 'email' })
  const password = useField({ type: 'password' })
  const [selectedRole, setSelectedRole] = useState<'' | 'Estudiante' | 'Propietario'>('');
  const [errorMessage, setErrorMessage] = useState<string>('')
  const [roleError, setRoleError] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [termsError, setTermsError] = useState(false);

  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()
      setIsLoading(true)
      setErrorMessage('')
      setRoleError(false)
      setTermsError(false)

      if (selectedRole === '') { 
        setRoleError(true);
        setIsLoading(false)
        return;
      }

      if (!acceptTerms) {
        setTermsError(true);
        setIsLoading(false)
        return;
      }

      const result = await RegisterService({
        name: name.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value,
        phone: phone.value,
        rol: selectedRole
      });

      if (result) {
        savedDataUser(result)
        setTimeout(() => {
          navigate('/residents')
        }, 500)
      } else {
        setIsLoading(false)
        setErrorMessage('Error desconocido al crear la cuenta.')
      }
    } catch (error) {
      setIsLoading(false)
      if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage('Error desconocido al crear la cuenta.')
      }
    }
  }

  const handleRoleChange = (
    _event: React.SyntheticEvent | null,
    newValue: string | null
  ): void => {
    if (newValue === 'Estudiante' || newValue === 'Propietario') {
      setSelectedRole(newValue);
      setRoleError(false);
    } else {
      setSelectedRole('');
    }
  };

  const handleTermsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAcceptTerms(event.target.checked);
    if (event.target.checked) {
      setTermsError(false);
    }
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
                  <Link onClick = {() => navigate('/login')} level="title-sm">
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
                        value={name.value}
                        onChange={name.onChange}
                        onBlur={name.onBlur}
                      />
                    </FormControl>
                    <FormControl required sx={{ flex: 1 }}>
                      <FormLabel>Apellidos</FormLabel>
                      <Input
                        type="text"
                        name="lastName"
                        placeholder="Ingresa tus apellidos"
                        value={lastName.value}
                        onChange={lastName.onChange}
                        onBlur={lastName.onBlur}
                      />
                    </FormControl>
                  </Box>

                  {name.messageError && (
                    <ErrorMessage
                      message={name.messageError}
                      type='error'
                      variant='outlined'
                      sx={{mt: 0.5}}
                    />
                  )}

                  {lastName.messageError && (
                    <ErrorMessage
                      message={lastName.messageError}
                      type='error'
                      variant='outlined'
                      sx={{mt: 0.5}}
                    />
                  )}

                  <FormControl required>
                    <FormLabel>Teléfono</FormLabel>
                    <Input
                      type="tel"
                      name="phone"
                      placeholder="+52 961 123 4567"
                      value={phone.value}
                      onChange={phone.onChange}
                      onBlur={phone.onBlur}
                    />
                  </FormControl>

                  {phone.messageError && (
                    <ErrorMessage
                      message={phone.messageError}
                      type='error'
                      variant='outlined'
                      sx={{mt: 0.5}}
                    />
                  )}

                  <FormControl required>
                    <FormLabel>Rol</FormLabel>
                    <Select
                      placeholder="Selecciona tu rol"
                      value={selectedRole}
                      onChange={handleRoleChange}
                      color={roleError ? 'danger' : 'neutral'}
                    >
                      <Option value="Estudiante">Estudiante</Option>
                      <Option value="Propietario">Propietario</Option>
                    </Select>
                  </FormControl>

                  {roleError && (
                    <ErrorMessage
                      message="Por favor selecciona un rol"
                      type='error'
                      variant='outlined'
                      sx={{mt: 0.5}}
                    />
                  )}

                  <FormControl required>
                    <FormLabel>Email</FormLabel>
                    <Input
                      type="email"
                      name="email"
                      placeholder="ejemplo@correo.com"
                      value={email.value}
                      onChange={email.onChange}
                      onBlur={email.onBlur}
                    />
                  </FormControl>

                  {email.messageError && (
                    <ErrorMessage
                      message={email.messageError}
                      type='error'
                      variant='outlined'
                      sx={{mt: 0.5}}
                    />
                  )}

                  <FormControl required>
                    <FormLabel>Contraseña</FormLabel>
                    <Input
                      type="password"
                      name="password"
                      placeholder="Ingresa tu contraseña"
                      value={password.value}
                      onChange={password.onChange}
                      onBlur={password.onBlur}
                    />
                  </FormControl>
                  
                  {password.messageError && (
                    <ErrorMessage
                      message={password.messageError}
                      type='error'
                      variant='outlined'
                      sx={{mt:0.5}}
                    />
                  )}
                </Stack>

                <Stack sx={{ gap: 4, mt: 3 }}>
                  <FormControl required>
                    <Checkbox
                      size="sm"
                      name="acceptTerms"
                      checked={acceptTerms}
                      onChange={handleTermsChange}
                      color={termsError ? 'danger' : 'primary'}
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

                  {termsError && (
                    <ErrorMessage
                      message="Debes aceptar los términos y condiciones"
                      type='error'
                      variant='outlined'
                      sx={{mt: -2}}
                    />
                  )}

                  {errorMessage && (
                    <ErrorMessage
                      message={errorMessage}
                      type='error'
                      variant='outlined'
                    />
                  )}

                  <Button 
                    type="submit" 
                    fullWidth
                    loading={isLoading}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
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