import React from 'react';
import { Users, Send, Shield, FileText } from 'lucide-react';

interface Beneficio {
  id: number;
  icono: React.ReactNode;
  titulo: string;
  descripcion: string;
}

export default function BeneficiosArrendadores() {
  const beneficios: Beneficio[] = [
    {
      id: 1,
      icono: <Users className="w-6 h-6" />,
      titulo: "Llega a miles de interesados",
      descripcion: "Tu anuncio será visto por estudiantes y profesionales buscando espacio"
    },
    {
      id: 2,
      icono: <Send className="w-6 h-6" />,
      titulo: "Publicación fácil y rápida",
      descripcion: "Publica tu espacio en minutos con nuestro formulario intuitivo"
    },
    {
      id: 3,
      icono: <Shield className="w-6 h-6" />,
      titulo: "Gestión segura de pagos",
      descripcion: "Procesamos los pagos de forma segura y transparente"
    },
    {
      id: 4,
      icono: <FileText className="w-6 h-6" />,
      titulo: "Sin contratos complicados",
      descripcion: "Proceso simple sin papeleo innecesario o trámites complejos"
    }
  ];

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Beneficios para arrendadores
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {beneficios.map((beneficio) => (
            <div 
              key={beneficio.id}
              className="text-center p-6"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 text-white rounded-full mb-6">
                {beneficio.icono}
              </div>
              
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {beneficio.titulo}
              </h3>
              
              <p className="text-gray-600 text-sm leading-relaxed">
                {beneficio.descripcion}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}