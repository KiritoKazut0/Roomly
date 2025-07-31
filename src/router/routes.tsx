import { Route, BrowserRouter, Routes } from "react-router-dom"
import ProtectedRoute from "../components/protectedRoute/ProtectedRoute"
import { AuthGuardContext } from "../context/AuthGuardContex"
import { useContext } from "react"
import LoginForm from "../pages/Forms/LoginForm"
import Home from "../pages/Home/Home"
import RegisterForm from "../pages/Forms/RegisterForm"
import ResidentsPages from "../pages/Residents/Residents"
import { RoomDetailsPage } from "../pages/Residents/DetailsRoom"
import PaymentSuccess from "../pages/payment/PaymentSuccess"
import ProfileInterface from "../pages/Profile/Profile"
import SupportPage from "../pages/Support/Support"
import ContactPage from "../pages/Contact/Contact"
import AboutPage from "../pages/AboutMe/AboutMe"
import PlansPage from "../pages/Plans/Plans"


export default function RouterProvider() {
    // const { isAuthenticated } = useContext(AuthGuardContext)

    return (
        <BrowserRouter>
            <Routes>
                {/* <Route path="*" element={<NotFound />} /> */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/signIn" element={<RegisterForm />} />
                <Route path="/residents" element={<ResidentsPages />} />
                <Route path="/residents/room/:roomId" element={<RoomDetailsPage />} />
                <Route path="/payment/success" element={<PaymentSuccess />} />
                <Route path="/profile" element={<ProfileInterface />} />
                <Route path="/support" element={<SupportPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/plans" element={<PlansPage />} />

            </Routes>
        </BrowserRouter>
    );
}