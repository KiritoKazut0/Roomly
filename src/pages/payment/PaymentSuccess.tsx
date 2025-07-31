import { useState, useEffect } from "react";
import { CheckCircle, ArrowRight, Sparkles, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function PaymentSuccess() {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);



  useEffect(() => {
    // Animación de entrada
    setTimeout(() => setIsVisible(true), 100);
    // Efecto confetti
    setTimeout(() => setShowConfetti(true), 800);
  }, []);

  return (
      <div>
        <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Elementos decorativos de fondo */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-200/20 to-teal-200/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tr from-cyan-200/20 to-emerald-200/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        
        {/* Partículas flotantes */}
        {showConfetti && (
          <>
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-emerald-400 rounded-full animate-bounce delay-100"></div>
            <div className="absolute top-1/3 right-1/3 w-3 h-3 bg-teal-400 rounded-full animate-bounce delay-300"></div>
            <div className="absolute bottom-1/3 left-1/3 w-2 h-2 bg-cyan-400 rounded-full animate-bounce delay-500"></div>
            <div className="absolute bottom-1/4 right-1/4 w-2 h-2 bg-emerald-500 rounded-full animate-bounce delay-700"></div>
          </>
        )}
      </div>

      <div className={`max-w-md w-full transform transition-all duration-1000 ${
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
      }`}>
        {/* Tarjeta principal */}
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 text-center relative overflow-hidden">
          {/* Gradiente superior */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400"></div>
          
          {/* Icono de éxito animado */}
          <div className="relative mb-6">
            <div className="w-24 h-24 mx-auto relative">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                <CheckCircle className={`w-12 h-12 text-emerald-500 transform transition-all duration-700 delay-300 ${
                  isVisible ? 'scale-100 rotate-0' : 'scale-0 rotate-180'
                }`} />
              </div>
            </div>
            
            {/* Anillos animados */}
            <div className="absolute inset-0 w-24 h-24 mx-auto">
              <div className="absolute inset-0 border-2 border-emerald-200 rounded-full animate-ping delay-500"></div>
              <div className="absolute inset-0 border-2 border-teal-200 rounded-full animate-ping delay-700"></div>
            </div>
          </div>

          {/* Título principal */}
          <h1 className="text-3xl font-bold text-gray-800 mb-3 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            ¡Pago Exitoso!
          </h1>
          
          <div className="flex items-center justify-center gap-1 mb-4">
            <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse" />
            <p className="text-gray-600 font-medium">Tu transacción se completó correctamente</p>
            <Sparkles className="w-4 h-4 text-yellow-400 animate-pulse delay-300" />
          </div>

          {/* Detalles del pago */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-2xl p-4 mb-6 border border-emerald-100">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-600">Monto:</span>
              <span className="text-lg font-bold text-emerald-600">$120.00 MXN</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Fecha:</span>
              <span className="text-sm text-gray-800">{new Date().toLocaleDateString('es-MX')}</span>
            </div>
          </div>

          {/* Beneficios del plan */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-4 mb-6 border border-blue-100">
            <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Star className="w-5 h-5 text-yellow-500" />
              Tu Plan Premium
            </h3>
            <div className="space-y-2 text-left">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span className="text-sm text-gray-700">Acceso ilimitado a todas las funciones</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span className="text-sm text-gray-700">Soporte prioritario 24/7</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span className="text-sm text-gray-700">Publicaciones ilimitadas</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span className="text-sm text-gray-700">Primero en los resultados de búsqueda</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                <span className="text-sm text-gray-700">Sin anuncios</span>
              </div>
            </div>
          </div>

          {/* Botón de acción */}
          <div className="mb-6">
            <button 
            onClick={() => navigate('/residents')}
            className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-semibold py-3 px-6 rounded-xl transform transition-all duration-200 hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 group">
              Continuar
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Mensaje adicional */}
          <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
            <div className="flex items-start gap-2">
              <Star className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <div className="text-left">
                <p className="text-sm font-medium text-blue-800 mb-1">¡Gracias por tu compra!</p>
                <p className="text-xs text-blue-600">
                  Roomly te agradece, en breve recibirás un correo de confirmación en los próximos minutos con todos los detalles de tu pedido.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Texto adicional debajo */}
        <p className="text-center text-sm text-gray-500 mt-4">
          ¿Necesitas ayuda? <a href="#" className="text-teal-600 hover:text-teal-700 font-medium underline">Contáctanos</a>
        </p>
      </div>
    </div>
      </div>
  );
}