import React, { useState } from 'react';

function PortafolioPage() {
  // Define tus slides: imágenes y videos
  const slides = [
    { type: 'image', src: 'https://picsum.photos/800/400?image=1' },
    { type: 'image', src: 'https://picsum.photos/800/400?image=2' },
    { 
      type: 'video', 
      src: 'https://www.youtube.com/embed/dQw4w9WgXcQ' // 👈 Ejemplo de video
    },
    { type: 'image', src: 'https://picsum.photos/800/400?image=4' },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div>
      {/* BOTON FLOTANTE */}
      <div className="fab">
        <button className="btn btn-xl btn-circle btn-primary bg-green-500">
          <svg width={40} height={40} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M19.44 4.552A10.413 10.413 0 0 0 12.044 1.5C6.281 1.5 1.59 6.168 1.588 11.906a10.341 10.341 0 0 0 1.396 5.203L1.5 22.5l5.543-1.447a10.483 10.483 0 0 0 4.997 1.266h.004c5.762 0 10.453-4.669 10.456-10.407a10.32 10.32 0 0 0-3.06-7.36Zm-7.396 16.01h-.004a8.706 8.706 0 0 1-4.423-1.205l-.317-.188-3.29.859.879-3.192-.207-.328a8.6 8.6 0 0 1-1.329-4.602c0-4.768 3.9-8.648 8.694-8.648a8.672 8.672 0 0 1 8.688 8.655c-.002 4.769-3.9 8.65-8.69 8.65Zm4.767-6.477c-.261-.13-1.547-.76-1.785-.847-.238-.086-.414-.13-.588.13-.174.261-.675.845-.827 1.02-.153.176-.305.195-.566.065-.261-.13-1.104-.404-2.102-1.29-.776-.69-1.3-1.541-1.453-1.801-.152-.26-.016-.402.115-.531.117-.117.26-.304.392-.456.13-.152.174-.26.26-.434.087-.173.044-.325-.02-.455-.066-.13-.589-1.41-.806-1.93-.213-.508-.428-.439-.588-.447-.152-.007-.328-.01-.501-.01a.962.962 0 0 0-.697.326c-.24.26-.914.89-.914 2.17 0 1.278.937 2.516 1.067 2.69.129.173 1.842 2.799 4.463 3.925.486.209.984.392 1.49.548.625.198 1.195.17 1.645.103.502-.075 1.546-.63 1.764-1.237.217-.607.217-1.127.152-1.236-.065-.108-.24-.174-.501-.303Z" clipRule="evenodd" />
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
            <li><a>Inicio</a></li>
          </ul>
        </div>
      </div>

      <div className="bg-primary-content min-h-[100vh] flex flex-col justify-center md:justify-start">
        <div className='text-center text-black mb-10 mt-10'>
          <h1 className="text-3xl mb-3 font-bold">Empresa Santa Fe</h1>
          <p className="italic mx-3">"Creation of a dashboard to explore the database of a private company."</p>
          <p>_______</p>

          <div className="flex flex-col md:flex-row md:space-x-6 mt-6 justify-center mb-10">
            {/* Multimedia - Carrusel controlado */}
             {/* Multimedia - Carrusel */}
      <div className="w-full max-w-2xl px-4">
        <div className="carousel w-full rounded-box shadow-lg relative">
          <div className="carousel-item w-full">
            {slides[currentSlide].type === 'image' ? (
              <img
                src={slides[currentSlide].src}
                className="w-full h-64 md:h-96 object-cover"
                alt={`Slide ${currentSlide + 1}`}
              />
            ) : (
              <div className="w-full h-64 md:h-96 bg-black rounded-box overflow-hidden">
                <iframe
                  src={slides[currentSlide].src}
                  title={`Video ${currentSlide + 1}`}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
            )}
          </div>

          {/* Botones */}
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 btn btn-circle btn-sm md:btn-md bg-black/30 text-white hover:bg-black/50"
            aria-label="Previous"
          >
            ❮
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 btn btn-circle btn-sm md:btn-md bg-black/30 text-white hover:bg-black/50"
            aria-label="Next"
          >
            ❯
          </button>
        </div>

        {/* Indicadores */}
        <div className="flex justify-center space-x-2 mt-4">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`btn btn-xs ${index === currentSlide ? 'btn-primary' : 'btn-ghost'}`}
              aria-label={`Go to slide ${index + 1}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>

            {/* Descripción */}
            <div className="w-full md:w-1/3 p-4 text-left">
              <h1 className="text-secondary mb-3 text-lg font-bold">Descripción</h1>
              <p>
                Comorbidity is defined as the presence of 1 or more disorders in relation to an index disorder...
              </p>
              <h1 className="text-secondary mb-3 text-lg font-bold mt-10">Recursos</h1>
              <div className='flex flex-row space-x-2'>
                <button className="btn btn-outline text-xs md:text-base">DOCUMENTOS</button>
                <button className="btn btn-outline text-xs md:text-base">TABLEAU</button>
                <button className="btn btn-outline text-xs md:text-base">GITHUB</button>
              </div>
              <div className="space-y-2 mt-3">
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs md:text-sm font-semibold text-gray-700 mr-2 mb-2">#PowerBI</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs md:text-sm font-semibold text-gray-700 mr-2 mb-2">#SQL</span>
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs md:text-sm font-semibold text-gray-700 mr-2 mb-2">#Python</span>
                </div>
            </div>
          </div>

          {/* Análisis */}
          <div className='w-full md:w-2/3 p-4 text-left mx-auto mb-10'>
            <h1 className="text-secondary mb-5 text-lg font-bold text-center">Análisis</h1>
            <p>
              Comorbidity is defined as the presence of 1 or more disorders...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PortafolioPage;