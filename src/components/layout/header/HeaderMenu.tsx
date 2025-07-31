import React, { useState, useRef, useEffect } from 'react';
import { Plus, Search, LogOut, Settings, Menu, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthGuard } from '../../../hooks/useAuthGuard';

interface NavItem {
  name: string;
  path: string;
  active?: boolean;
}

const Navigation: React.FC = () => {
  
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, userData, logout } = useAuthGuard();
  const navigate = useNavigate();

  const navItems: NavItem[] = [
    { name: 'Home', path: '/residents', active: true },
    { name: 'Soporte', path: '/support', active: false },
    { name: 'Contacto', path: '/contact', active: false },
    { name: 'Acerca de', path: '/about', active: false },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsUserMenuOpen(false);
    navigate('/login'); 
  };

  const handleViewProfile = () => {
    setIsUserMenuOpen(false);
    navigate('/profile');
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 relative w-full">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo y navegación principal */}
        <div className="flex items-center space-x-4 sm:space-x-8">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M2 8L8 2L14 8V14H10V10H6V14H2V8Z" fill="white" />
              <rect x="7" y="11" width="2" height="3" fill="#3B82F6" />
              <rect x="4" y="9" width="1.5" height="1.5" fill="#3B82F6" />
              <rect x="10.5" y="9" width="1.5" height="1.5" fill="#3B82F6" />
            </svg>
          </div>

          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium transition-colors duration-200 hover:text-blue-600 ${
                  item.active ? 'text-gray-900 border-b-2 border-blue-600 pb-1' : 'text-gray-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Acciones del header */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <div className="relative hidden sm:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Buscar"
              className="w-48 lg:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button className="sm:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <Search className="h-5 w-5" />
          </button>

          <button
            className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Agregar cuarto</span>
          </button>

          {/* Autenticación */}
          {isAuthenticated && userData ? (
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <img
                  src={userData.image || 'https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png'}
                  alt="Usuario"
                  className="w-8 h-8 rounded-full border-2 border-gray-200 hover:border-blue-400 transition-colors duration-200"
                />
                <span className="hidden sm:block text-sm font-medium text-gray-700">
                  {userData.name.split(' ')[0]}
                </span>
              </button>

              {isUserMenuOpen && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <div className="flex items-center space-x-3">
                      <img
                        src={userData.image || 'https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png'}
                        alt="Usuario"
                        className="w-12 h-12 rounded-full border-2 border-gray-200"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          {userData.name}
                        </p>
                        <p className="text-sm text-gray-500 truncate">
                          {userData.email}
                        </p>
                      </div>
                    </div>

                    <div className="mt-3 space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">Suscripción:</span>
                        <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                          {userData.tipo_suscription}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">Rol:</span>
                        <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                          {userData.rol}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={handleViewProfile}
                      className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-200"
                    >
                      <Settings className="h-4 w-4 mr-3 text-gray-400" />
                      Ver Perfil
                    </button>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-sm text-red-700 hover:bg-red-50 transition-colors duration-200"
                    >
                      <LogOut className="h-4 w-4 mr-3 text-red-500" />
                      Cerrar Sesión
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
            className="px-4 py-2 text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors duration-200"

            >
              Iniciar sesión
            </Link>
          )}
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-40">
          <div className="px-4 py-2 space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  item.active ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2 border-t border-gray-100">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Buscar"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
