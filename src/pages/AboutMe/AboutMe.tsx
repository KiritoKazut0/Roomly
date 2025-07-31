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
      name: "Norberto Lopez",
      position: "CEO & Fundador",
      image: "https://i.pinimg.com/736x/07/d7/66/07d7661566df51a8bcdb073885cb3fc0.jpg",
       description: "Experto en desarrollo de software con pasión por la innovación tecnológica."
      
    },
    {
      name: "Margarita Olivera",
      position: "Directora de Producto & Fundadora",
      image: "https://i.imgur.com/xO7dsiy.jpeg",
     description: "Especialista en UX/UI con enfoque en crear experiencias excepcionales para usuarios."
    },
    {
      name: "Isai Lopez",
      position: "CEO & Fundador",
      image: "https://i.imgur.com/jQ6zx1o.jpeg",
      description: "Líder visionario con más de 3 años de experiencia en tecnología y negocios."
      
    },
    {
      name: "Didier Mendoza",
      position: "Desarrollador & Co-Fundador",
      image: "https://i.imgur.com/nBjlUJs.jpeg",
      description: "Desarrollador apasionado por la creación de soluciones innovadoras."
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
      number: "1+",
      label: "Años de experiencia",
      description: "Creciendo y aprendiendo en el mercado"
    },
    {
      number: "25+",
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
            Desde 2025, en Softvana nos dedicamos a desarrollar soluciones tecnológicas que transforman la forma en que las personas viven, estudian y trabajan. Creamos plataformas digitales innovadoras como Roomly, con el objetivo de facilitar la vida cotidiana y resolver problemas reales a través de la tecnología.
            Nuestro enfoque se basa en comprender a fondo las necesidades de cada cliente y usuario para construir herramientas funcionales, accesibles y con impacto tangible. En Softvana, no solo desarrollamos software: creamos experiencias que conectan.
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
              Desarrollar soluciones tecnológicas innovadoras, accesibles y 
              centradas en el usuario, que resuelvan problemas reales y aporten
              valor a personas, empresas y comunidades. En Softvana, trabajamos 
              para transformar ideas en productos digitales con impacto.
            </p>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-8">
            <div className="flex items-center mb-6">
              <Globe className="w-8 h-8 text-blue-600 mr-3" />
              <h3 className="text-xl font-medium text-gray-900">Nuestra Visión</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
             Ser una empresa líder en el desarrollo de software en América Latina,
            reconocida por su enfoque humano, su capacidad de innovación y su compromiso
              con la calidad. Aspiramos a mejorar la vida de millones de personas mediante
             herramientas tecnológicas útiles, confiables y sostenibles.
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