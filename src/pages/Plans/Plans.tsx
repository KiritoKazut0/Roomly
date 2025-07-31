import React from 'react';
import { Check, X, Star, Headphones, Shield, Zap, MessageCircle } from 'lucide-react';

interface PlanFeature {
  name: string;
  basic: boolean | string;
  premium: boolean | string;
  tooltip?: string;
}

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  description: string;
  popular?: boolean;
  features: string[];
  buttonText: string;
  buttonVariant: 'primary' | 'secondary';
}

const PlansPage: React.FC = () => {
  const plans: Plan[] = [
    {
      id: 'basic',
      name: 'Plan Básico',
      price: '$0',
      period: '/mes',
      description: 'Con el Plan Básico puedes empezar a usar Roomly sin costo. Ideal para quienes desean explorar la plataforma, buscar cuartos o hacer su primera publicación.',
      features: [
        'Hasta 1 usuario',
        'Soporte por email',
        'Almacenamiento gratis',
        'Contacto directo a través del sistema de mensajería',
        'Actualizaciones estándar'
      ],
      buttonText: 'Comenzar con Básico',
      buttonVariant: 'secondary'
    },
    {
      id: 'premium',
      name: 'Plan Premium',
      price: '$120',
      period: '/mes',
      description: 'El Plan Premium está diseñado para quienes quieren destacar sus publicaciones y tener acceso a herramientas avanzadas. Ideal para arrendadores con varios cuartos o quienes buscan mayor visibilidad y control.',
      popular: true,
      features: [
        'Publicaciones ilimitadas de cuartos',
        'Soporte prioritario 24/7',
        'Almacenamiento ilimitado',
        'Mayor visibilidad en los resultados de búsqueda.',
        'Integraciones ilimitadas',
        'Actualizaciones prioritarias',
        'Consultoría personalizada',
        'Soporte prioritario',
        'Navegación sin anuncios'
      ],
      buttonText: 'Comenzar con Premium',
      buttonVariant: 'primary'
    }
  ];

  const detailedFeatures: PlanFeature[] = [
    { name: 'Número de usuarios', basic: '1 usuarios', premium: 'Ilimitados' },
    { name: 'Almacenamiento', basic: 'gratis', premium: 'Ilimitado' },
    { name: 'Soporte técnico', basic: 'Email (48h)', premium: '24/7 Prioritario' },
    { name: 'API personalizada', basic: false, premium: true },
    { name: 'Consultoría incluida', basic: false, premium: true },
    { name: 'Gestión de permisos', basic: 'Simple', premium: 'Avanzada' },
    { name: 'Backup automático', basic: 'Semanal', premium: 'Diario' },
    { name: 'Personalización UI', basic: false, premium: true },
    { name: 'Capacitación del equipo', basic: false, premium: 'Incluida' },
    { name: 'SLA garantizado', basic: false, premium: '99.9%' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-light text-gray-900 mb-2">Planes y Precios</h1>
          <p className="text-gray-600">Elige el plan que mejor se adapte a las necesidades de ti.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Plans Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`bg-white rounded-lg shadow-lg border-2 transition-all hover:shadow-xl ${
                plan.popular 
                  ? 'border-blue-500 relative' 
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                    <Star className="w-4 h-4 mr-1" />
                    Más Popular
                  </div>
                </div>
              )}
              
              <div className="p-8">
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-medium text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-light text-gray-900">{plan.price}</span>
                    <span className="text-gray-600 ml-1">{plan.period}</span>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                    plan.buttonVariant === 'primary'
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
                  }`}
                >
                  {plan.buttonText}
                </button>

                {plan.id === 'premium' && (
                  <div className="mt-4 text-center">
                    <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">
                      Solicitar demo gratuita →
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Detailed Comparison */}
        <div className="bg-white rounded-lg border border-gray-200 overflow-hidden mb-12">
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <h3 className="text-lg font-medium text-gray-900">Comparación Detallada</h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-6 font-medium text-gray-900">Características</th>
                  <th className="text-center py-4 px-6 font-medium text-gray-900">Plan Básico</th>
                  <th className="text-center py-4 px-6 font-medium text-gray-900 bg-blue-50">
                    Plan Premium
                    <div className="inline-flex items-center ml-2">
                      <Star className="w-4 h-4 text-blue-600" />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {detailedFeatures.map((feature, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6 text-gray-900">{feature.name}</td>
                    <td className="py-4 px-6 text-center">
                      {feature.basic === true ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : feature.basic === false ? (
                        <X className="w-5 h-5 text-gray-400 mx-auto" />
                      ) : (
                        <span className="text-gray-700">{feature.basic}</span>
                      )}
                    </td>
                    <td className="py-4 px-6 text-center bg-blue-50">
                      {feature.premium === true ? (
                        <Check className="w-5 h-5 text-green-500 mx-auto" />
                      ) : feature.premium === false ? (
                        <X className="w-5 h-5 text-gray-400 mx-auto" />
                      ) : (
                        <span className="text-gray-900 font-medium">{feature.premium}</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Seguridad Garantizada</h4>
            <p className="text-gray-600 text-sm">Protección de datos nivel empresarial con cifrado end-to-end</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-green-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Implementación Rápida</h4>
            <p className="text-gray-600 text-sm">Tu equipo estará operativo en menos de 24 horas</p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Headphones className="w-8 h-8 text-purple-600" />
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Soporte Excepcional</h4>
            <p className="text-gray-600 text-sm">Nuestro equipo está disponible cuando lo necesites</p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-8 mb-12">
          <h3 className="text-xl font-medium text-gray-900 mb-6">Preguntas Frecuentes</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">¿Puedo cambiar de plan en cualquier momento?</h4>
              <p className="text-gray-600 text-sm">Sí, puedes actualizar o cambiar tu plan en cualquier momento. Los cambios se aplicarán en tu próximo ciclo de facturación.</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">¿Ofrecen período de prueba gratuito?</h4>
              <p className="text-gray-600 text-sm">Ofrecemos una demo gratuita de 30 minutos para el Plan Premium y una prueba gratuita de 14 días para ambos planes.</p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">¿Qué métodos de pago aceptan?</h4>
              <p className="text-gray-600 text-sm">Aceptamos tarjetas de crédito/débito, transferencias bancarias y pagos mensuales recurrentes.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-8 text-center text-white">
          <h3 className="text-2xl font-medium mb-4">¿Necesitas ayuda para elegir?</h3>
          <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
            Nuestro equipo de especialistas puede ayudarte a encontrar la solución perfecta para tu empresa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
              <MessageCircle className="w-5 h-5 inline mr-2" />
              Hablar con un experto
            </button>
            <button className="border border-blue-400 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-600 transition-colors">
              Ver demo en vivo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlansPage;