import React from 'react';

interface Pregunta {
  id: number;
  pregunta: string;
  respuesta: string;
}

export default function PreguntasFrecuentes() {
  const preguntas: Pregunta[] = [
    {
      id: 1,
      pregunta: "¿Cuánto tarda en aprobarse mi publicación?",
      respuesta: "Tu publicación se revisa en un máximo de 24 horas y estará visible inmediatamente después de la aprobación."
    },
    {
      id: 2,
      pregunta: "¿Cómo protegen mi información?",
      respuesta: "Utilizamos encriptación de datos y solo compartimos tu información de contacto con inquilinos verificados e interesados."
    },
    {
      id: 3,
      pregunta: "¿Puedo editar o eliminar mi anuncio después?",
      respuesta: "Sí, puedes editar, pausar o eliminar tu anuncio en cualquier momento desde tu panel de control."
    }
  ];

  return (
    <section className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-gray-900 mb-12">
          Preguntas frecuentes
        </h2>
        
        <div className="space-y-8">
          {preguntas.map((item) => (
            <div key={item.id} className="bg-white p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                {item.pregunta}
              </h3>
              
              <p className="text-gray-600 leading-relaxed">
                {item.respuesta}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}