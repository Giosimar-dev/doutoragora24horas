import React, { useState, useEffect } from 'react';
import { FaUserMd, FaFileMedical, FaClock, FaPrescriptionBottleAlt, FaFlask, FaFileAlt, FaWhatsapp, FaArrowRight } from 'react-icons/fa';
import AOS from 'aos';
import 'aos/dist/aos.css';
import './App.css';

// Declare gtag_report_conversion function
declare global {
  interface Window {
    gtag_report_conversion?: (url?: string) => boolean;
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

function App() {
  const [formData, setFormData] = useState({
    name: '',
    birthdate: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    if (name === 'birthdate') {
      // Format birthdate as dd/mm/yyyy
      const numericValue = value.replace(/\D/g, '');
      let formattedValue = numericValue;
      
      if (numericValue.length >= 2) {
        formattedValue = numericValue.slice(0, 2) + '/' + numericValue.slice(2);
      }
      if (numericValue.length >= 4) {
        formattedValue = numericValue.slice(0, 2) + '/' + numericValue.slice(2, 4) + '/' + numericValue.slice(4, 8);
      }
      
      setFormData(prev => ({
        ...prev,
        [name]: formattedValue
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const trackConversion = (eventName: string) => {
    // 1. Send conversion directly via gtag (Google Ads)
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'conversion', {
        'send_to': 'AW-17503064450/nx2lCOajIWbEIKjppB',
        'event_callback': function() {
          console.log('Conversão enviada para Google Ads');
        }
      });
    }

    // 2. Also try the gtag_report_conversion function
    if (typeof window.gtag_report_conversion === 'function') {
      window.gtag_report_conversion();
    }

    // 3. Send event to dataLayer for GTM
    if (window.dataLayer) {
      if (eventName === 'form_submit') {
        window.dataLayer.push({
          'event': 'form_submit',
          'form_name': 'appointment_form',
          'event_category': 'form',
          'event_action': 'submit',
          'event_label': 'appointment_booking',
          'conversion_id': 'AW-17503064450',
          'conversion_label': 'nx2lCOajIWbEIKjppB'
        });
      } else {
        window.dataLayer.push({
          'event': 'whatsapp_click',
          'button_name': eventName,
          'event_category': 'engagement',
          'event_action': 'click',
          'event_label': eventName,
          'conversion_id': 'AW-17503064450',
          'conversion_label': 'nx2lCOajIWbEIKjppB'
        });
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Track conversion
      trackConversion('form_submit');
      
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitMessage('Formulário enviado com sucesso! Entraremos em contato em breve.');
      setFormData({ name: '', birthdate: '', email: '' });
      
      // Redirect to WhatsApp after successful submission
      setTimeout(() => {
        redirectToWhatsApp("FORMULÁRIO ENVIADO");
      }, 2000);
      
    } catch (error) {
      setSubmitMessage('Erro ao enviar formulário. Tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const redirectToWhatsApp = (buttonName: string) => {
    // Track conversion before redirect
    trackConversion(buttonName);
    
    const phoneNumber = "5547999224685"; // Replace with actual phone number
    const message = encodeURIComponent(`Olá! Gostaria de agendar uma consulta médica online por R$39,50. Vim através do site.`);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
    
    // Small delay to ensure tracking is sent before redirect
    setTimeout(() => {
      window.open(whatsappUrl, '_blank');
    }, 100);
  };

  return (
    <div className="App">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="logo-container" data-aos="fade-down">
            <img src="/logo.e6f154a1d1bcd1bcbfd4.png" alt="Doutor Agora 24 Horas" className="logo" />
          </div>
          
          <div className="hero-content">
            <div className="doctor-section" data-aos="fade-right" data-aos-delay="200">
              <div className="photo-frame">
                <img src="/foto.5070996fbf26593d414d.png" alt="Dra. Ana Luisa Simões" className="doctor-photo" />
              </div>
              <div className="doctor-badge">
                <h3>Dra. Ana Luisa Simões</h3>
                <p>CRM-SC 37265</p>
              </div>
            </div>

            <div className="form-section" data-aos="fade-left" data-aos-delay="400">
              <h1>
                <span className="title-line">AGENDE CONSULTA</span>
                <span className="title-line">MÉDICA ONLINE</span>
                <span className="price-highlight">POR APENAS R$39,50</span>
              </h1>
              <p className="hero-subtitle">
                Consulta rápida e eficiente com médicos especializados, sem sair de casa
              </p>

              <form className="appointment-form" onSubmit={handleSubmit} data-aos="fade-up" data-aos-delay="600">
                <div className="form-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Nome completo"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <input
                    type="text"
                    name="birthdate"
                    placeholder="Data de nascimento (dd/mm/aaaa)"
                    value={formData.birthdate}
                    onChange={handleInputChange}
                    maxLength={10}
                    required
                    className="form-input"
                  />
                </div>
                
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="form-input"
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="cta-button primary-button"
                >
                  {isSubmitting ? (
                    "ENVIANDO..."
                  ) : (
                    <>
                      <span>AGENDAR CONSULTA AGORA</span>
                      <FaArrowRight />
                    </>
                  )}
                </button>
                
                {submitMessage && (
                  <div className={`submit-message ${submitMessage.includes('sucesso') ? 'success' : 'error'}`}>
                    {submitMessage}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services" data-aos="fade-up">
        <div className="container">
          <div className="section-header">
            <h2>Nossos Serviços Médicos</h2>
            <p>Atendimento humanizado e profissional através da telemedicina</p>
          </div>
          
          <div className="services-grid">
            <div className="service-card white-card" data-aos="fade-up" data-aos-delay="200">
              <div className="card-top-border blue-border"></div>
              <div className="service-icon blue-icon">
                <FaUserMd />
              </div>
              <h3>Consulta Online</h3>
              <p>Atendimento rápido e eficiente por videoconferência</p>
              <button
                onClick={() => redirectToWhatsApp("CONSULTA ONLINE")}
                className="service-button blue-button"
              >
                <span>AGENDAR</span>
                <FaArrowRight />
              </button>
            </div>
            
            <div className="service-card blue-card" data-aos="fade-up" data-aos-delay="400">
              <div className="card-top-border yellow-border"></div>
              <div className="service-icon white-icon">
                <FaFileMedical />
              </div>
              <h3>Consulta com Atestado</h3>
              <p>Receba seu atestado médico com validade em todo país</p>
              <button
                onClick={() => redirectToWhatsApp("CONSULTA COM ATESTADO")}
                className="service-button yellow-button"
              >
                <span>AGENDAR</span>
                <FaArrowRight />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about" data-aos="fade-up">
        <div className="container">
          <div className="about-content">
            <div className="about-text" data-aos="fade-right">
              <h2>
                Atendimento Clínico Geral Online
                por{' '}
                <span className="price-highlight">R$39,50</span>
              </h2>
              <p>
                Com agilidade e comodidade direto na sua casa. Cuide da sua saúde onde estiver.
              </p>
              <p>
                Nossa equipe médica, liderada pela Dra. Ana Luisa Simões, oferece atendimento 
                humanizado e profissional através da telemedicina.
              </p>
              
              <button
                onClick={() => redirectToWhatsApp("SOBRE A DOUTORA")}
                className="about-cta-button"
              >
                <FaWhatsapp />
                <span>CONHEÇA NOSSA EQUIPE</span>
              </button>
            </div>
            
            <div className="features-grid" data-aos="fade-left" data-aos-delay="200">
              <div className="feature-card">
                <FaUserMd className="feature-icon" />
                <h3>Atendimento médico</h3>
                <p>Profissionais qualificados para cuidar da sua saúde</p>
              </div>
              
              <div className="feature-card">
                <FaClock className="feature-icon" />
                <h3>Ilimitado 24hrs por dia</h3>
                <p>Atendimento quando você precisar, a qualquer hora</p>
              </div>
              
              <div className="feature-card">
                <FaFileMedical className="feature-icon" />
                <h3>Atestado médico online</h3>
                <p>Receba seu atestado digital com validade nacional</p>
              </div>
              
              <div className="feature-card">
                <FaPrescriptionBottleAlt className="feature-icon" />
                <h3>Renovação de receita</h3>
                <p>Renove suas receitas médicas sem sair de casa</p>
              </div>
              
              <div className="feature-card">
                <FaFlask className="feature-icon" />
                <h3>Pedidos de Exames</h3>
                <p>Solicitação de exames quando necessário</p>
              </div>
              
              <div className="feature-card">
                <FaFileAlt className="feature-icon" />
                <h3>Laudos</h3>
                <p>Análise e interpretação de exames</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section" data-aos="fade-up">
        <div className="container">
          <div className="cta-content">
            <div className="cta-text" data-aos="fade-right">
              <h2>Atendimento 24 horas com abrangência em todo país</h2>
              <p>
                Telemedicina com Consulta Online, Atestado com validade em todo país, Renovação de receita, Pedidos de Exames, entre outros.
              </p>
              
              <button
                onClick={() => redirectToWhatsApp("AGENDAR CONSULTA AGORA")}
                className="cta-yellow-button"
              >
                <FaWhatsapp />
                <span>AGENDAR CONSULTA AGORA</span>
              </button>
            </div>
            
            <div className="cta-image" data-aos="fade-left">
              <div className="cta-photo-container">
                <img src="/foto.5070996fbf26593d414d.png" alt="Dra. Ana Luisa Simões" className="cta-doctor-photo" />
                <div className="doctor-quote-card">
                  <p>"Sua saúde não pode esperar. Estamos aqui para você 24 horas por dia."</p>
                  <span>- Dra. Ana Luisa Simões</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer-new">
        <div className="container">
          <div className="footer-logo-new">
            <img src="/logo2.a96c983d4d3b29975f28.png" alt="Doutor Agora 24 Horas" className="logo" />
          </div>
          <h3 className="footer-title">Doutor Agora 24 Horas</h3>
          <p className="footer-description">Telemedicina com qualidade e conveniência para você</p>
          
          <button
            onClick={() => redirectToWhatsApp("FOOTER WHATSAPP")}
            className="footer-whatsapp-button"
          >
            <FaWhatsapp />
            <span>Fale conosco</span>
          </button>
          
          <div className="footer-bottom-new">
            <p>
              © {new Date().getFullYear()} Doutor Agora 24 Horas. Todos os direitos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
