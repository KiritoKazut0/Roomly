import React from 'react';
import { Target, Heart, Globe, Lightbulb, Shield, Zap } from 'lucide-react';

interface TeamMember {
  name: string;
  position: string;
  image: string;
  description: string;
}

interface Value {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface Stat {
  number: string;
  label: string;
  description: string;
}

const AboutPage: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      name: "María González",
      position: "CEO & Fundadora",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
      description: "Líder visionaria con más de 15 años de experiencia en tecnología y negocios."
    },
    {
      name: "Carlos Hernández",
      position: "CTO",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop&crop=face",
      description: "Experto en desarrollo de software con pasión por la innovación tecnológica."
    },
    {
      name: "Ana Martínez",
      position: "Directora de Producto",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=300&fit=crop&crop=face",
      description: "Especialista en UX/UI con enfoque en crear experiencias excepcionales para usuarios."
    },
    {
      name: "Roberto Silva",
      position: "Director de Ventas",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=face",
      description: "Estratega comercial con amplia experiencia en crecimiento empresarial."
    }
  ];

  const values: Value[] = [
    {
      icon: <Lightbulb className="w-6 h-6" />,
      title: "Innovación",
      description: "Buscamos constantemente nuevas formas de resolver problemas y mejorar la experiencia de nuestros usuarios."
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Compromiso",
      description: "Nos dedicamos completamente a nuestros clientes y sus objetivos, trabajando como una extensión de su equipo."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Confianza",
      description: "Construimos relaciones duraderas basadas en la transparencia, integridad y resultados comprobables."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Agilidad",
      description: "Nos adaptamos rápidamente a los cambios del mercado y las necesidades específicas de cada cliente."
    }
  ];

  const stats: Stat[] = [
    {
      number: "500+",
      label: "Clientes satisfechos",
      description: "Empresas que confían en nuestras soluciones"
    },
    {
      number: "10+",
      label: "Años de experiencia",
      description: "Creciendo y aprendiendo en el mercado"
    },
    {
      number: "50+",
      label: "Proyectos completados",
      description: "Soluciones implementadas con éxito"
    },
    {
      number: "24/7",
      label: "Soporte disponible",
      description: "Asistencia cuando la necesites"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <h1 className="text-3xl font-light text-gray-900 mb-2">Acerca de Nosotros</h1>
          <p className="text-gray-600">Conoce nuestra historia, misión y el equipo que hace posible todo lo que hacemos.</p>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-100 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-light text-gray-900 mb-6">
            Transformando ideas en soluciones tecnológicas
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            Desde 2014, hemos ayudado a empresas de todos los tamaños a digitalizar sus procesos, 
            optimizar sus operaciones y alcanzar sus objetivos a través de la tecnología. 
            Nuestro enfoque se basa en entender profundamente las necesidades de cada cliente 
            para crear soluciones personalizadas que generen un impacto real.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors">
              Conoce nuestros servicios
            </button>
            <button className="border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors">
              Ver casos de éxito
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        {/* Stats Section */}
        <div className="mb-20">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-light text-blue-600 mb-2">{stat.number}</div>
                <div className="font-medium text-gray-900 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-600">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <div className="flex items-center mb-6">
              <Target className="w-8 h-8 text-blue-600 mr-3" />
              <h3 className="text-xl font-medium text-gray-900">Nuestra Misión</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Empoderar a las empresas mediante soluciones tecnológicas innovadoras que simplifiquen 
              sus procesos, mejoren su eficiencia y les permitan enfocarse en lo que realmente importa: 
              hacer crecer su negocio y servir mejor a sus clientes.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <div className="flex items-center mb-6">
              <Globe className="w-8 h-8 text-blue-600 mr-3" />
              <h3 className="text-xl font-medium text-gray-900">Nuestra Visión</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              Ser la empresa líder en transformación digital en México, reconocida por la calidad 
              de nuestras soluciones, la excelencia en el servicio al cliente y nuestro compromiso 
              con la innovación tecnológica sostenible.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-light text-gray-900 mb-4">Nuestros Valores</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Los principios que guían cada decisión que tomamos y cada proyecto que desarrollamos.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 text-center hover:border-blue-300 transition-colors">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <div className="text-blue-600">
                    {value.icon}
                  </div>
                </div>
                <h4 className="font-medium text-gray-900 mb-3">{value.title}</h4>
                <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <h3 className="text-2xl font-light text-gray-900 mb-4">Nuestro Equipo</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Conoce a las personas apasionadas que trabajan todos los días para hacer realidad tu visión.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-lg border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow">
                <div className="w-20 h-20 rounded-full mx-auto mb-4 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="font-medium text-gray-900 mb-1">{member.name}</h4>
                <p className="text-blue-600 text-sm font-medium mb-3">{member.position}</p>
                <p className="text-sm text-gray-600 leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutPage;