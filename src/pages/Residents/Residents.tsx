import { Box } from "@mui/joy";
import CardHome from "../../components/ui/card/Card";
import rentsMocks from "../../mocks/homes.json";
import Navigation from "../../components/layout/header/HeaderMenu";
import { useNavigate } from "react-router-dom";

export default function ResidentsPages() {

    const navigate = useNavigate();

    const handleRoomClick = (roomId: string) => {
        navigate(`room/${roomId}`);
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Navigation />
            <br />
            <Box sx={{
                width: "100%",
                display: 'flex',
                flexWrap: 'wrap',
                gap: 2,
                justifyContent: 'center'
            }}>
                {
                    rentsMocks.map((rent) => {
                        const direccion = `${rent.calle} #${rent.numero_casa}, ${rent.colonia}, ${rent.ciudad}`;
                        const precio = rent.precio_mensual.toFixed(2);
                        const imagen_main = rent.photo_album?.[0] || 'https://via.placeholder.com/320x200?text=No+Image';

                        return (
                            <CardHome
                                key={rent.id}
                                estado={rent.estado}
                                direccion={direccion}
                                precio={precio}
                                imagen_main={imagen_main}
                                onClick={() => handleRoomClick(rent.id)}
                            />
                        );
                    })
                }
            </Box>
        </Box>
    );
}