import Welcome from './Welcome';
import Section2 from './Section2';
import ResidentsPopulars from './ResidentsPopulars';
import { Box } from '@mui/joy';
import FooterSection from "../../components/layout/footer/Footer.tsx"

export default function Home() {
    return (
       <Box>
        <Welcome/>
         <Section2 />
        <ResidentsPopulars />
        <FooterSection/>
       </Box>

    );
}