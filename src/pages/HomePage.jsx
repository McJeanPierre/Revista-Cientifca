import { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, BookOpen, Users, Award } from 'lucide-react';
import { Button } from '../components/ui/button';
import PublishedJournals from '../components/PublishedJournals';
import './HomePage.css';
import { Link } from 'react-router-dom';

function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featuredJournals, setFeaturedJournals] = useState([]);
  const [stats, setStats] = useState({ journals: 0, articles: 0, citations: 0 });
  const [news, setNews] = useState([]);

  useEffect(() => {

    setStats({ journals: 50, articles: 1000, citations: 5000 });
    setNews([
      { id: 1, title: 'Convocatoria para nuevos artículos', date: '2023-05-15' },
      { id: 2, title: 'Conferencia anual de investigación', date: '2023-06-01' },
      { id: 3, title: 'Nuevo sistema de revisión por pares', date: '2023-05-20' }
    ]);

    const interval = setInterval(() => {
      setStats(prev => ({
        journals: Math.min(prev.journals + 1, 50),
        articles: Math.min(prev.articles + 10, 1000),
        citations: Math.min(prev.citations + 50, 5000)
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredJournals.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredJournals.length) % featuredJournals.length);
  };

  return (

    
    <div className="home-container">

      <PublishedJournals />

        <section className="hero-section">
          <div className="hero-content">
            <h1>Bienvenidos a las Revistas Científicas ULEAM</h1>
            <p>Tu fuente confiable para la publicación y consulta de los mejores artículos científicos.</p>
            <Link to="/search">
              <Button className="explore-button">
                Ver Ediciones Recientes <ArrowRight className="arrow-icon" />
              </Button>
            </Link>
          </div>
        </section>


      <section className="impact-section">
        <h2>Nuestro Impacto</h2>
        <div className="stats-container">
          <div className="stat-item">
            <BookOpen className="stat-icon" />
            <div className="stat-number">{stats.journals}</div>
            <p>Revistas</p>
          </div>
          <div className="stat-item">
            <Users className="stat-icon" />
            <div className="stat-number">{stats.articles}</div>
            <p>Artículos</p>
          </div>
          <div className="stat-item">
            <Award className="stat-icon" />
            <div className="stat-number">{stats.citations}</div>
            <p>Citaciones</p>
          </div>
        </div>
      </section>

      <section className="news-section">
        <h2>Noticias Destacadas</h2>
        <div className="news-container">
          {news.map((item) => (
            <div key={item.id} className="news-item">
              <div className="news-date">
                {new Date(item.date).toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'short'
                })}
              </div>
              <h3>{item.title}</h3>
              <Button variant="outline" className="news-button">
                Leer más
              </Button>
            </div>
          ))}
        </div>
        <Button variant="outline" className="view-all-button">
          Ver todas las noticias
        </Button>
      </section>

      <footer>
        <div class="footer-info">
          <p>© 2024 Revista Científica ULEAM. Todos los derechos reservados.</p>
          <div class="social-links">
            <a href="#" class="social-icon" aria-label="Enlace a Facebook"><i class="fab fa-facebook"></i> Facebook</a>
            <a href="#" class="social-icon" aria-label="Enlace a Twitter"><i class="fab fa-twitter"></i> Twitter</a>
            <a href="#" class="social-icon" aria-label="Enlace a LinkedIn"><i class="fab fa-linkedin"></i> LinkedIn</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default HomePage;

