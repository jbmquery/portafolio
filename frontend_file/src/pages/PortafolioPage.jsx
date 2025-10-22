// frontend-file/src/pages/PortafolioPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function PortafolioPage() {
  const { id } = useParams(); // ← obtiene el :id de la URL
  const navigate = useNavigate();

  const [proyecto, setProyecto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Cargar proyecto al montar
  useEffect(() => {
    const fetchProyecto = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/proyectos/${id}`);
        if (!res.ok) throw new Error('Proyecto no encontrado');
        const data = await res.json();
        setProyecto(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProyecto();
  }, [id]);

  // Navegación de carrusel
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === (proyecto?.medios?.length || 1) - 1 ? 0 : prev + 1));
  };
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? (proyecto?.medios?.length || 1) - 1 : prev - 1));
  };
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center">Cargando...</div>;
  if (error) return <div className="min-h-screen flex items-center justify-center text-red-500">❌ {error}</div>;
  if (!proyecto) return null;

  const medios = proyecto.medios || [];
  const currentMedia = medios[currentSlide];

  return (
    <div>
      {/* BOTON FLOTANTE */}
      <div className="fab">
        <button
          onClick={() => navigate(-1)} // ← volver atrás
          className="btn btn-xl btn-circle btn-primary bg-green-500"
          aria-label="Volver"
        >
          <svg width={24} height={24} fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
          </svg>
        </button>
      </div>

      {/* NavBar */}
      <div className="navbar bg-base-100 shadow-sm sticky top-0 z-10">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">
            <img className='h-10 w-10 md:h-13 md:w-13' src="https://i.ibb.co/1fKyz9g0/logo-jbm.webp" alt="Logo" />
          </a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li><a onClick={() => navigate('/')}>Inicio</a></li>
          </ul>
        </div>
      </div>

      <div className="bg-primary-content min-h-[100vh] py-10">
        <div className='text-center text-black mb-8 px-4'>
          <h1 className="text-2xl md:text-3xl font-bold">{proyecto.titulo}</h1>
          <p className="italic mx-3">{proyecto.breve_descripcion}</p>
          <p>_______</p>
        </div>

        <div className="flex flex-col md:flex-row md:space-x-6 max-w-6xl mx-auto px-4">
          {/* Carrusel de medios */}
          <div className="w-full md:w-2/3">
            {medios.length > 0 ? (
              <div className="relative">
                {currentMedia.tipo === 'imagen' ? (
                  <img
                    src={currentMedia.url}
                    alt={`Media ${currentSlide + 1}`}
                    className="w-full h-64 md:h-96 object-cover rounded-lg shadow"
                  />
                ) : (
                  <div className="w-full h-64 md:h-96 bg-black rounded-lg overflow-hidden shadow">
                    <iframe
                      src={currentMedia.url}
                      title={`Video ${currentSlide + 1}`}
                      className="w-full h-full"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}

                {/* Botones de navegación */}
                {medios.length > 1 && (
                  <>
                    <button
                      onClick={prevSlide}
                      className="absolute left-2 top-1/2 transform -translate-y-1/2 btn btn-circle btn-sm md:btn-md bg-black/30 text-white hover:bg-black/50"
                      aria-label="Anterior"
                    >
                      ❮
                    </button>
                    <button
                      onClick={nextSlide}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 btn btn-circle btn-sm md:btn-md bg-black/30 text-white hover:bg-black/50"
                      aria-label="Siguiente"
                    >
                      ❯
                    </button>
                  </>
                )}
              </div>
            ) : (
              <div className="w-full h-64 md:h-96 bg-gray-200 flex items-center justify-center rounded-lg">
                <span>Sin medios disponibles</span>
              </div>
            )}

            {/* Indicadores */}
            {medios.length > 1 && (
              <div className="flex justify-center space-x-2 mt-4">
                {medios.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`btn btn-xs ${index === currentSlide ? 'btn-primary' : 'btn-outline btn-primary'}`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Descripción y recursos */}
          <div className="w-full md:w-1/3 mt-6 md:mt-0">
            <h2 className="text-secondary mb-3 text-lg font-bold">Descripción</h2>
            <div
              className="text-left text-black max-w-none"
              dangerouslySetInnerHTML={{ __html: proyecto.descripcion || '' }}
            />
            {/* Enlaces */}
            <h2 className="text-secondary mb-3 text-lg font-bold mt-6">Recursos</h2>
            <div className="flex flex-wrap gap-2">
              {proyecto.enlace_documentos && (
                <a
                  href={proyecto.enlace_documentos}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-primary btn-xs md:btn-sm"
                >
                  Documentos
                </a>
              )}
              {proyecto.enlace_herramienta && (
                <a
                  href={proyecto.enlace_herramienta}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-primary btn-xs md:btn-sm"
                >
                  DashBoards
                </a>
              )}
              {proyecto.enlace_github && (
                <a
                  href={proyecto.enlace_github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline btn-primary btn-xs md:btn-sm"
                >
                  GitHub
                </a>
              )}
            </div>

            {/* Hashtags */}
            <div className="mt-4">
              {proyecto.hashtags.map((tag, i) => (
                <span
                  key={i}
                  className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs md:text-sm font-semibold text-gray-700 mr-2 mb-2"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        //
        {/* Analisis */}
        <div className="max-w-6xl mx-auto px-4 mt-10 text-center">
          <h2 className="text-secondary  mb-3 text-lg font-bold mt-6">Análisis</h2>
          <div
            className="text-left text-black max-w-none"
            dangerouslySetInnerHTML={{ __html: proyecto.analisis || '' }}
          />
        </div>
      </div>
    </div>
  );
}

export default PortafolioPage;