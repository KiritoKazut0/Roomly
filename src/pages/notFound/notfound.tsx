import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  useTheme,
  useMediaQuery,
  Stack,
  Fade
} from '@mui/material';
import { 
  ArrowForward, 
  Home, 
  Search
} from '@mui/icons-material';
import robotImage from '../../img/nps-removebg-preview.png';

interface FallingHouseProps {
  delay: number;
  left: string;
  color: string;
  size: number;
  duration: number;
}

const FallingHouse: React.FC<FallingHouseProps> = ({ delay, left, color, size, duration }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        left,
        top: '-20px',
        width: `${size}px`,
        height: `${size}px`,
        opacity: 0.6,
        animation: `fallDown ${duration}s linear infinite`,
        animationDelay: `${delay}s`,
        zIndex: 0,
        '@keyframes fallDown': {
          '0%': {
            transform: 'translateY(-20px) rotate(0deg)',
            opacity: 0
          },
          '10%': {
            opacity: 0.6
          },
          '90%': {
            opacity: 0.6
          },
          '100%': {
            transform: 'translateY(100vh) rotate(360deg)',
            opacity: 0
          }
        }
      }}
    >
      {/* Casa minimalista */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Techo */}
        <path
          d="M12 3L4 9V21H20V9L12 3Z"
          fill={color}
          fillOpacity="0.8"
        />
        {/* Puerta */}
        <rect
          x="10"
          y="16"
          width="4"
          height="5"
          fill="rgba(255,255,255,0.9)"
          rx="0.5"
        />
        {/* Ventana */}
        <rect
          x="7"
          y="12"
          width="3"
          height="3"
          fill="rgba(255,255,255,0.7)"
          rx="0.3"
        />
        <rect
          x="14"
          y="12"
          width="3"
          height="3"
          fill="rgba(255,255,255,0.7)"
          rx="0.3"
        />
      </svg>
    </Box>
  );
};

const NotFoundPage: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mounted, setMounted] = useState<boolean>(false);

  // Colores de casitas inspirados en Roomly
  const houseColors = [
    '#6366f1', // Púrpura principal
    '#8b5cf6', // Violeta
    '#06b6d4', // Cyan
    '#10b981', // Emerald
    '#f59e0b', // Amber
    '#ef4444', // Red
    '#ec4899', // Pink
    '#84cc16'  // Lime
  ];

  // Generar casitas con propiedades aleatorias
  const generateHouses = (): FallingHouseProps[] => {
    return Array.from({ length: 15 }, (_, i) => ({
      delay: i * 2,
      left: `${Math.random() * 95}%`,
      color: houseColors[Math.floor(Math.random() * houseColors.length)],
      size: Math.random() * 20 + 16, // Entre 16px y 36px
      duration: Math.random() * 10 + 15 // Entre 15s y 25s
    }));
  };

  const [houses] = useState<FallingHouseProps[]>(generateHouses());

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleGoHome = (): void => {
    console.log('Navegando a la página principal');
  };

  const handleSearchRooms = (): void => {
    console.log('Navegando a la búsqueda de cuartos');
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: '#fafafa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, #e0e0e0, transparent)'
        }
      }}
    >
      {/* Casitas cayendo */}
      {houses.map((house, index) => (
        <FallingHouse
          key={index}
          delay={house.delay}
          left={house.left}
          color={house.color}
          size={house.size}
          duration={house.duration}
        />
      ))}
      <Container maxWidth="lg">
        <Fade in={mounted} timeout={1000}>
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
              gap: { xs: 4, md: 8 },
              alignItems: 'center',
              minHeight: '80vh'
            }}
          >
            {/* Sección Visual */}
            <Box
              sx={{
                order: isMobile ? 2 : 1,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative'
              }}
            >
              {/* Círculo decorativo sutil */}
              <Box
                sx={{
                  position: 'absolute',
                  width: '400px',
                  height: '400px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(99, 102, 241, 0.03) 0%, transparent 70%)',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  zIndex: 0
                }}
              />
              
              <Box
                component="img"
                src={robotImage}
                alt="Página no encontrada"
                sx={{
                  width: '100%',
                  maxWidth: '320px',
                  height: 'auto',
                  borderRadius: '16px',
                  position: 'relative',
                  zIndex: 1,
                  filter: 'grayscale(20%) contrast(1.1)',
                  transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    filter: 'grayscale(0%) contrast(1.2)',
                    boxShadow: '0 32px 64px rgba(0, 0, 0, 0.1)'
                  }
                }}
              />
            </Box>

            {/* Sección de Contenido */}
            <Box
              sx={{
                order: isMobile ? 1 : 2,
                display: 'flex',
                flexDirection: 'column',
                alignItems: isMobile ? 'center' : 'flex-start',
                textAlign: isMobile ? 'center' : 'left',
                maxWidth: '500px',
                mx: isMobile ? 'auto' : 0
              }}
            >
              {/* Logo minimalista con color */}
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 400,
                  background: 'linear-gradient(45deg, #6366f1, #8b5cf6)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  letterSpacing: '0.1em',
                  mb: 6,
                  fontSize: '0.9rem',
                  textTransform: 'uppercase'
                }}
              >
                Roomly
              </Typography>

              {/* 404 elegante */}
              <Typography
                variant="h1"
                sx={{
                  fontSize: { xs: '8rem', md: '12rem' },
                  fontWeight: 100,
                  color: '#1a1a1a',
                  lineHeight: 0.8,
                  mb: 3,
                  letterSpacing: '-0.02em',
                  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, sans-serif'
                }}
              >
                404
              </Typography>

              {/* Título principal */}
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 400,
                  color: '#1a1a1a',
                  mb: 2,
                  fontSize: { xs: '1.5rem', md: '2rem' },
                  lineHeight: 1.3,
                  letterSpacing: '-0.01em'
                }}
              >
                Habitación no encontrada
              </Typography>

              {/* Descripción minimalista */}
              <Typography
                variant="body1"
                sx={{
                  color: '#6b7280',
                  mb: 6,
                  fontSize: '1.1rem',
                  lineHeight: 1.6,
                  fontWeight: 400,
                  maxWidth: '400px'
                }}
              >
                La página que buscas parece haber cambiado de dirección. 
                Te ayudamos a encontrar tu espacio perfecto.
              </Typography>

              {/* Botones minimalistas */}
              <Stack 
                direction={isMobile ? 'column' : 'row'} 
                spacing={2}
                sx={{ width: isMobile ? '100%' : 'auto' }}
              >
                <Button
                  variant="contained"
                  endIcon={<ArrowForward />}
                  onClick={handleSearchRooms}
                  sx={{
                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                    color: 'white',
                    borderRadius: '2px',
                    px: 4,
                    py: 1.5,
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 400,
                    minWidth: '180px',
                    boxShadow: '0 4px 20px rgba(99, 102, 241, 0.3)',
                    letterSpacing: '0.01em',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #5b61eb, #7c3aed)',
                      boxShadow: '0 8px 32px rgba(99, 102, 241, 0.4)',
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  Buscar cuartos
                </Button>

                <Button
                  variant="text"
                  startIcon={<Home />}
                  onClick={handleGoHome}
                  sx={{
                    color: '#6b7280',
                    borderRadius: '2px',
                    px: 4,
                    py: 1.5,
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 400,
                    minWidth: '140px',
                    letterSpacing: '0.01em',
                    '&:hover': {
                      color: '#1a1a1a',
                      background: 'rgba(26, 26, 26, 0.04)',
                      transform: 'translateY(-1px)'
                    },
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  Inicio
                </Button>
              </Stack>

              {/* Línea decorativa con gradiente colorido */}
              <Box
                sx={{
                  width: '80px',
                  height: '2px',
                  background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #06b6d4)',
                  mt: 8,
                  borderRadius: '1px',
                  alignSelf: isMobile ? 'center' : 'flex-start'
                }}
              />
            </Box>
          </Box>
        </Fade>
      </Container>

      {/* Elementos decorativos minimalistas */}
      <Box
        sx={{
          position: 'absolute',
          top: '20%',
          right: '10%',
          width: '2px',
          height: '100px',
          background: 'linear-gradient(180deg, transparent, #e5e7eb, transparent)',
          display: { xs: 'none', md: 'block' }
        }}
      />
      
      <Box
        sx={{
          position: 'absolute',
          bottom: '15%',
          left: '8%',
          width: '80px',
          height: '2px',
          background: 'linear-gradient(90deg, transparent, #e5e7eb, transparent)',
          display: { xs: 'none', md: 'block' }
        }}
      />

      {/* Footer minimalista */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          py: 3,
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <Typography
          variant="caption"
          sx={{
            color: '#9ca3af',
            fontSize: '0.8rem',
            letterSpacing: '0.05em',
            fontWeight: 300
          }}
        >
          © 2025 Roomly — Encuentra tu espacio ideal
        </Typography>
      </Box>
    </Box>
  );
};

export default NotFoundPage;