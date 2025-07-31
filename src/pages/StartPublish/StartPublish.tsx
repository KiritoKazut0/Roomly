import { Box } from '@mui/joy';
import RentSpaceBanner from '../../components/ui/rentSpaceBanner/PresentationForm';
import Navigation from '../../components/layout/header/HeaderMenu';
import BeneficiosArrendadores from '../../components/ui/beneficies/Beneficies';
import PreguntasFrecuentes from '../../components/ui/answers/Answers';
import RentalForm from '../Forms/RegisterRoom';

export default function StartPublish(){
    return (
        <Box>
            <Navigation/>
            <RentSpaceBanner/>
            <RentalForm/>
            <BeneficiosArrendadores/>
            <PreguntasFrecuentes/>
        </Box>
    );
}