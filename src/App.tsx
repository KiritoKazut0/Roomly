import LoginForm from "./pages/Forms/LoginForm"
import Home from "./pages/Home/Home"
import ResidentsPages from "./pages/Residents/Residents"

import RouterProvider from "./router/routes"
import { AuthGuardProvider } from "./context/AuthGuardContex"


function App() {

  return (
    <>
      <AuthGuardProvider>
        <RouterProvider />
      </AuthGuardProvider>
    </>
  )
}

export default App
