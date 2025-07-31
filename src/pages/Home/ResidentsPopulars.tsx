import { Box, Button, Typography } from "@mui/joy";
import CardHome from "../../components/ui/card/Card";
import { Container } from "@mui/material";
import HomsPopulars from "../../mocks/homes.json";
import { useNavigate } from "react-router-dom";

export default function ResidentsPopulars() {

    const navigate = useNavigate();

    const handleRoomClick = (roomId: string) => {
        navigate(`residents/room/${roomId}`);
    };

    return (
        <Box textAlign='center'>
            <Typography
                level="h3"
                sx={{
                    fontWeight: 'bold',
                    color: '#2c3e50',
                    fontSize: { xs: '2rem', md: '2rem' },
                    lineHeight: 1.2,
                    marginBottom: 6,
                }}
            >
                Nuestras Residencias Populares
            </Typography>

            <Container
                maxWidth="lg"
                sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 5,
                    mt: 2,
                    mb: 4,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                {HomsPopulars.map((home) => {
                    const direccion = `${home.calle} #${home.numero_casa}, ${home.colonia}, ${home.ciudad}`;
                    const precio = home.precio_mensual.toFixed(2);
                    const imagen_main = home.photo_album?.[0] || '';

                    return (
                        <CardHome
                            key={home.id}
                            direccion={direccion}
                            estado={home.estado}
                            precio={precio}
                            imagen_main={imagen_main}
                            onClick={() => handleRoomClick(home.id)}
                        />
                    );
                })}
            </Container>
            

            <Button
                variant="outlined"
                size="md"
                onClick={() => navigate('/residents')}
            >Ver más</Button>
            <br /><br /><br />
        </Box>
    );
}
