import React, { useState, useEffect } from 'react';

const projects = [
  { 
    id: 1, 
    title: 'Personal Portfolio', 
    description: 'A responsive React-based portfolio showcasing my projects and skills.',
    github: 'https://github.com/kabeer/portfolio'
  },
  { 
    id: 2, 
    title: 'Bug Tracker', 
    description: 'A Node.js and Express app for the community to report and solve bugs.',
    github: 'https://github.com/kabeer/bug-tracker'
  },
  { 
    id: 3, 
    title: 'Community Forum', 
    description: 'A MongoDB-powered forum application for developer discussions.',
    github: 'https://github.com/kabeer/community-forum'
  },
];

const skills = ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind CSS', 'JavaScript', 'Git'];

const CubicleAnimation = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-64 h-64 border-8 border-indigo-500 rounded-lg animate-rotate-y">
          <div className="w-full h-full border-4 border-indigo-300 rounded-lg transform rotate-45 animate-rotate-x"></div>
        </div>
      </div>
    </div>
  );
};

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        } 
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="bg-gray-100 min-h-screen font-sans relative overflow-hidden">
      <CubicleAnimation />
      {/* Navigation */}
      <nav className="bg-white bg-opacity-90 shadow-md fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className="text-2xl font-bold text-indigo-600">Kabeer</span>
              </div>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <NavLink href="#home" active={activeSection === 'home'}>Home</NavLink>
              <NavLink href="#about" active={activeSection === 'about'}>About</NavLink>
              <NavLink href="#projects" active={activeSection === 'projects'}>Projects</NavLink>
              <NavLink href="#contact" active={activeSection === 'contact'}>Contact</NavLink>
            </div>
            <div className="-mr-2 flex items-center sm:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
              >
                {isMenuOpen ? <X /> : <Menu />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`sm:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
          <div className="pt-2 pb-3 space-y-1">
            <MobileNavLink href="#home" active={activeSection === 'home'}>Home</MobileNavLink>
            <MobileNavLink href="#about" active={activeSection === 'about'}>About</MobileNavLink>
            <MobileNavLink href="#projects" active={activeSection === 'projects'}>Projects</MobileNavLink>
            <MobileNavLink href="#contact" active={activeSection === 'contact'}>Contact</MobileNavLink>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 bg-gradient-to-r from-indigo-500 to-purple-600 text-white min-h-screen flex items-center relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center relative z-10">
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight animate-fade-in-down">
            Hi, I'm Kabeer
          </h1>
          <p className="mt-6 text-xl sm:text-2xl max-w-3xl mx-auto animate-fade-in-up">
            A passionate MERN stack developer with 1.5+ years of experience building modern web applications.
          </p>
          <div className="mt-10 animate-fade-in">
            <a href="#projects" className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 md:py-4 md:text-lg md:px-10">
              View My Work
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">About Me</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="prose prose-lg">
              <p>
                As a MERN stack developer with over 1.5 years of experience, I'm passionate about creating efficient and scalable web applications. My journey in web development started with a curiosity for building interactive user interfaces, which led me to specialize in the MERN (MongoDB, Express.js, React.js, Node.js) stack.
              </p>
              <p>
                I enjoy tackling complex problems and turning ideas into reality through clean and maintainable code. My goal is to contribute to innovative projects that make a positive impact on users' lives and help the developer community grow.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {skills.map((skill, index) => (
                <div key={index} className="bg-indigo-100 rounded-lg p-4 text-center animate-fade-in-up" style={{animationDelay: `${index * 100}ms`}}>
                  <span className="font-semibold text-indigo-700">{skill}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-100 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-8">My Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 animate-fade-in-up">
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{project.title}</h3>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-indigo-600 hover:text-indigo-500">
                    <GitHub className="w-5 h-5 mr-2" />
                    View on GitHub
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-indigo-700 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl font-extrabold mb-8">Get In Touch</h2>
          <p className="text-xl mb-8">I'm always open to new opportunities and collaborations. Feel free to reach out!</p>
          <div className="flex justify-center space-x-6">
            <SocialLink href="https://github.com/Kabirunbeing" icon={<GitHub />} label="GitHub" />
            <SocialLink href="mailto:kabeer@example.com" icon={<Mail />} label="Email" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <p>© 2024 Kabeer. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const NavLink = ({ href, children, active }) => (
  <a
    href={href}
    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
      active
        ? 'border-indigo-500 text-gray-900'
        : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
    }`}
  >
    {children}
  </a>
);

const MobileNavLink = ({ href, children, active }) => (
  <a
    href={href}
    className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
      active
        ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
        : 'border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700'
    }`}
  >
    {children}
  </a>
);

const SocialLink = ({ href, icon, label }) => (
  <a
    href={href}
    className="text-white hover:text-indigo-200 transition-colors duration-300"
    target="_blank"
    rel="noopener noreferrer"
  >
    {icon}
    <span className="sr-only">{label}</span>
  </a>
);

export default Portfolio;