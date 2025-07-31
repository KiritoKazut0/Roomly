import React, { useState, useRef, useEffect } from 'react';
import { Plus, Search, LogOut, Settings, Menu, X } from 'lucide-react';


interface NavItem {
  name: string;
  href: string;
  active?: boolean;
}

interface UserData {
  name: string;
  email: string;
  subscription: string;
  role: string;
  avatar: string;
}

const Navigation: React.FC = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const navItems: NavItem[] = [
    { name: 'Home', href: '#', active: true },
    { name: 'Soporte', href: '#' },
    { name: 'Contacto', href: '#' },
    { name: 'Acerca de', href: '#' },
  ];

  const userData: UserData = {
    name: 'Carlos Mendoza',
    email: 'carlos@example.com',
    subscription: 'Pro Plan',
    role: 'Admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
  };

  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Aquí iría la lógica de logout
    console.log('Cerrando sesión...');
    setIsUserMenuOpen(false);
  };

  const handleViewProfile = () => {
    // Aquí iría la lógica para ver perfil
    console.log('Ver perfil...');
    setIsUserMenuOpen(false);
  };

  return (
    <nav className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 relative w-full">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* Logo y navegación principal */}
        <div className="flex items-center space-x-4 sm:space-x-8">
          {/* Logo */}
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M2 8L8 2L14 8V14H10V10H6V14H2V8Z" fill="white" />
                <rect x="7" y="11" width="2" height="3" fill="#3B82F6" />
                <rect x="4" y="9" width="1.5" height="1.5" fill="#3B82F6" />
                <rect x="10.5" y="9" width="1.5" height="1.5" fill="#3B82F6" />
              </svg>
            </div>
          </div>

          {/* Navegación Desktop */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors duration-200 hover:text-blue-600 ${item.active
                  ? 'text-gray-900 border-b-2 border-blue-600 pb-1'
                  : 'text-gray-600'
                  }`}
              >
                {item.name}
              </a>
            ))}
          </div>

          {/* Botón menú móvil */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Búsqueda y perfil */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Barra de búsqueda */}
          <div className="relative hidden sm:block">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search"
              className="w-48 lg:w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Botón búsqueda móvil */}
          <button className="sm:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors duration-200">
            <Search className="h-5 w-5" />
          </button>

          <button
            className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors duration-200"
          >
            <Plus className="w-4 h-4" />
            <span>Agregar cuarto</span>
          </button>

          {/* Avatar de usuario con dropdown */}
          <div className="relative" ref={userMenuRef}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <img
                src={userData.avatar}
                alt="Usuario"
                className="w-8 h-8 rounded-full border-2 border-gray-200 hover:border-blue-400 transition-colors duration-200"
              />
              <span className="hidden sm:block text-sm font-medium text-gray-700">
                {userData.name.split(' ')[0]}
              </span>
            </button>

            {/* Dropdown del usuario */}
            {isUserMenuOpen && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                {/* Información del usuario */}
                <div className="px-4 py-3 border-b border-gray-100">
                  <div className="flex items-center space-x-3">
                    <img
                      src={userData.avatar}
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

                  {/* Info adicional */}
                  <div className="mt-3 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Suscripción:</span>
                      <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                        {userData.subscription}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">Rol:</span>
                      <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                        {userData.role}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Opciones del menú */}
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
        </div>
      </div>

      {/* Menú móvil */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-40">
          <div className="px-4 py-2 space-y-2">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${item.active
                  ? 'text-blue-600 bg-blue-50'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}

            {/* Búsqueda en móvil */}
            <div className="pt-2 border-t border-gray-100">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search"
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