import { useState } from "react";
import { Edit2, LogOut, User, Mail, Phone, MapPin, Crown, Shield, RefreshCw } from "lucide-react";
import Navigation from "../../components/layout/header/HeaderMenu";

export default function ProfileInterface() {
  const [user] = useState({
    "id": "4311a693-c40d-41fb-9cd1-d254e8e7563f",
    "name": "Kirito",
    "lastName": "Kazuto",
    "phone": "9613456789",
    "rol": "Estudiante",
    "email": "carlos.ramirez@example.net",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTn06STZg493koTKQBmngvHdQq4S9uejNTDrw&s",
    "tipo_suscription": "Basico"
  });

  const handleEdit = () => {
    console.log("Editar perfil");
  };

  const handleLogout = () => {
    console.log("Cerrar sesión");
  };

  const handleChangePlan = () => {
    console.log("Cambio de plan")
  }

  const getSubscriptionIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'premium':
        return <Crown className="w-4 h-4" />;
      case 'pro':
        return <Shield className="w-4 h-4" />;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      <br />
      <div className="max-w-2xl mx-auto">
        {/* Header azul con foto de perfil */}
        <div className="bg-gradient-to-r from-sky-400 to-blue-500 rounded-t-3xl h-48 relative flex items-center justify-center">
          <div className="relative">
            <img
              src={user.image}
              alt={`${user.name} ${user.lastName}`}
              className="w-24 h-24 rounded-full border-4 border-white shadow-lg object-cover"
            />
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="bg-white rounded-b-3xl shadow-lg px-6 pb-6">
          {/* Información básica */}
          <div className="text-center pt-6 pb-4">
            <h1 className="text-2xl font-bold text-gray-800 mb-1">
              {user.name} {user.lastName}
            </h1>
            <p className="text-gray-600 mb-2">{user.email}</p>
            <p className="text-sm text-gray-500">Miembro desde Enero 2023</p>
          </div>

          {/* Botones de acción */}
          <div className="flex gap-3 justify-center mb-8">
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
            >
              <Edit2 className="w-4 h-4" />
              Editar Perfil
            </button>
            <button
              onClick={handleChangePlan}
              className="flex items-center gap-2 px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors duration-200 text-sm font-medium border border-gray-300 hover:border-gray-400"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm5 3a1 1 0 011-1h5a1 1 0 011 1v2a1 1 0 01-1 1H9a1 1 0 01-1-1V7z" clipRule="evenodd" />
              </svg>
              Cambiar Plan
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-6 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 text-sm font-medium"
            >
              <LogOut className="w-4 h-4" />
              Cerrar Sesión
            </button>
          </div>

          {/* Grid de información */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Información Personal */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Información Personal</h3>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Phone className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Teléfono</p>
                    <p className="font-medium text-gray-800">{user.phone}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Ubicación</p>
                    <p className="font-medium text-gray-800">Tuxtla, Chiapas</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium text-gray-800">{user.email}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Estadísticas */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Estadísticas</h3>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <User className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Rol</p>
                    <p className="font-medium text-gray-800">{user.rol}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    {getSubscriptionIcon(user.tipo_suscription)}
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Tipo de Suscripción</p>
                    <p className="font-medium text-gray-800">{user.tipo_suscription}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}