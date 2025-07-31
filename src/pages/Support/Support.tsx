import React, { useState } from 'react';
import { Search, MessageCircle, Mail, Phone, FileText, ChevronRight } from 'lucide-react';
import SupportInfo from "../../mocks/supportInfo.json"

interface FAQItem {
  question: string;
  answer: string;
}

interface ContactMethod {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: string;
}

const SupportPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

  const faqs: FAQItem[] = SupportInfo;

  const contactMethods: ContactMethod[] = [
    {
      icon: <MessageCircle className="w-6 h-6" />,
      title: "Chat en vivo",
      description: "Respuesta inmediata",
      action: "Iniciar chat"
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Correo electrónico",
      description: "Roomly@support.com",
      action: "Enviar email"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Teléfono",
      description: "+52 961 107 75 41",
      action: "Llamar ahora"
    }
  ];

  const filteredFAQs = faqs.filter(faq =>
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-light text-gray-900 mb-2">Centro de Ayuda</h1>
          <p className="text-gray-600">¿En qué podemos ayudarte hoy?</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Search Bar */}
        <div className="relative mb-12">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar en la ayuda..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* FAQ Section */}
          <div className="md:col-span-2">
            <h2 className="text-xl font-medium text-gray-900 mb-6">Preguntas Frecuentes</h2>
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg">
                  <button
                    onClick={() => setOpenFAQ(openFAQ === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    <ChevronRight 
                      className={`w-5 h-5 text-gray-400 transition-transform ${
                        openFAQ === index ? 'rotate-90' : ''
                      }`}
                    />
                  </button>
                  {openFAQ === index && (
                    <div className="px-6 pb-4 text-gray-600 border-t border-gray-100">
                      <p className="pt-4">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {filteredFAQs.length === 0 && searchQuery && (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">No se encontraron resultados para "{searchQuery}"</p>
              </div>
            )}
          </div>

          {/* Contact Section */}
          <div>
            <h2 className="text-xl font-medium text-gray-900 mb-6">Contactar Soporte</h2>
            <div className="space-y-4">
              {contactMethods.map((method, index) => (
                <div key={index} className="bg-white border border-gray-200 rounded-lg p-6 hover:border-blue-300 transition-colors cursor-pointer">
                  <div className="flex items-start space-x-4">
                    <div className="text-blue-600 mt-1">
                      {method.icon}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">{method.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{method.description}</p>
                      <button className="text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">
                        {method.action}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Help */}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="font-medium text-blue-900 mb-2">¿Necesitas más ayuda?</h3>
              <p className="text-blue-700 text-sm mb-4">
                Consulta nuestra documentación completa o programa una llamada con nuestro equipo.
              </p>
              <div className="space-y-2">
                <button className="block w-full text-left text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">
                  Ver documentación →
                </button>
                <button className="block w-full text-left text-blue-600 text-sm font-medium hover:text-blue-700 transition-colors">
                  Programar llamada →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportPage;