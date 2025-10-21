import React, { useState, useEffect } from 'react';

function InicioPage() {
  
  const [proyectos, setProyectos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
  const fetchProyectos = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/proyectos');
      if (!res.ok) throw new Error('Error al cargar los proyectos');
      const data = await res.json();
      setProyectos(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  fetchProyectos();
}, []);  

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
      {/* NavBar fija en la parte superior */}
      <div className="navbar bg-base-100 shadow-sm sticky top-0 z-10">
        <div className="flex-1">
          <a className="btn btn-ghost text-xl"><img className='h-10 w-10 md:h-13 md:w-13' src="https://i.ibb.co/1fKyz9g0/logo-jbm.webp" alt="" /></a>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <details>
                <summary>Sobre mí</summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                  <li><a href='#presentacion'>Presentación</a></li>
                  <li><a href='#herramientas'>Herramientas</a></li>
                  <li><a href='#portafolio'>Portafolio</a></li>
                </ul>
              </details>
            </li>
            <li><a href='#contacto'>Contacto</a></li>
            
          </ul>
        </div>
      </div>

      {/* Hero con fondo */}
      <div
        className="hero min-h-screen bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ...">
        <div className="hero-content text-neutral-content text-center">
          <div className="md:max-w-4xl">
            <img className="h-36 w-36 md:h-56 md:w-56 mx-auto mb-6" 
                src="https://i.ibb.co/1fKyz9g0/logo-jbm.webp" alt="" />
            <p>___________</p>
            <br />
            <p className="mb-5 text-md md:text-3xl italic">
              “<b>Analista de Datos con formación en Ingeniería de Sistemas</b> y certificaciones en análisis de datos y herramientas como SQL, Python y Power BI. Experiencia en optimización de procesos y generación de insights para la toma de decisiones”
            </p>
          </div>
        </div>
      </div>

      {/* Perfil */}
        <div id="presentacion" className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row md:w-2/3">
                <br /><br />
                <img className="max-w-sm rounded-lg shadow-2xl w-3/5 h-auto"
                src="https://i.ibb.co/1t0DX457/fotoperfil.jpg"
                />
                <div className="text-center lg:text-left md:ml-10">
                    <h1 className="text-2xl font-bold">Hola, soy Jheferson Blanco 👋</h1>
                    <p className="py-6 text-left">
                    Ingeniero de Sistemas especializado en Data Analytics, con experiencia aplicando técnicas avanzadas de análisis de datos para la optimización de procesos, reducción de costos y mejora de la eficiencia empresarial.
                    </p>
                    <ul className="space-y-2 text-left">
                        <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <p>Analista de Datos certificado en Data Analytics por <b className="text-secondary"> <a href="https://www.datuxonline.com/">Datux Perú</a> </b> partner de Microsoft.</p>
                        </li>
                        <li className="flex items-start">
                        <span className="mr-2">•</span>
                        Experiencia en SQL, Python, Power BI, Tableau, Excel Avanzado, Git y MS Project.
                        </li>
                        <li className="flex items-start">
                        <span className="mr-2">•</span>
                        Generación de insights accionables para apoyar la toma de decisiones estratégicas.
                        </li>
                        <br />
                    </ul>
                </div>
            </div>
        </div>
        {/* Herramientas que manejo */}
        <div id="herramientas" className="bg-base-900 min-h-[100vh] flex flex-col justify-center md:justify-end">
            <div className='text-center text-white mb-10 mt-10'>
                <h1 className="text-3xl mb-3 font-bold mt-15 md:mt-0">Herramientas y Tecnologías</h1>
                <p className="italic mx-3">"Desde bases de datos hasta dashboards: todo lo que uso para hacer data útil".</p>
                <p>_______</p>
            </div>
            <div className='flex flex-row flex-wrap justify-center w-max-screen gap-2 md:gap-5 py-2'>
                {/* SQL - Server */}
                <div className="card bg-base-100 w-25 md:w-45 h-36 md:h-48 shadow-sm">
                    <figure className="px-2 md:px-10 pt-3 md:pt-5">
                        <img
                        src="https://i.ibb.co/39NdTSs1/servidor-sql.webp"
                        alt="Sql-Server"
                        className="w-15 md:w-30 h-auto rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-xs md:text-lg">SQL-Server</h2>

                    </div>
                </div>
                {/* Python */}
                <div className="card bg-base-100 w-25 md:w-45 h-36 md:h-48 shadow-sm">
                    <figure className="px-2 md:px-10 pt-3 md:pt-5">
                        <img
                        src="https://i.ibb.co/qYB25y6K/python.webp"
                        alt="python"
                        className="w-15 md:w-30 h-auto rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-xs md:text-lg">Python</h2>

                    </div>
                </div>
                {/* Excel */}
                <div className="card bg-base-100 w-25 md:w-45 h-36 md:h-48 shadow-sm">
                    <figure className="px-2 md:px-10 pt-3 md:pt-5">
                        <img
                        src="https://i.ibb.co/7dV0gXWD/excel.webp"
                        alt="excel"
                        className="w-15 md:w-30 h-auto rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-xs md:text-lg">Excel</h2>

                    </div>
                </div>
                {/* PowerBi */}
                <div className="card bg-base-100 w-25 md:w-45 h-36 md:h-48 shadow-sm">
                    <figure className="px-2 md:px-10 pt-3 md:pt-5">
                        <img
                        src="https://i.ibb.co/dJ1zXw0J/powerbi2.webp"
                        alt="powerbi"
                        className="w-15 md:w-30 h-auto rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-xs md:text-lg">Power BI</h2>

                    </div>
                </div>
                {/* Tableau */}
                <div className="card bg-base-100 w-25 md:w-45 h-36 md:h-48 shadow-sm">
                    <figure className="px-2 md:px-10 pt-3 md:pt-5">
                        <img
                        src="https://i.ibb.co/QvRK3Zxf/Tableau.webp"
                        alt="tabeau"
                        className="w-15 md:w-30 h-auto rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-xs md:text-lg">Tableau</h2>

                    </div>
                </div>
            </div>
            <div className='flex justify-center flex-wrap gap-2 md:gap-5 py-2 mb-10'>
                {/* Oracle */}
                <div className="card bg-base-100 w-25 md:w-45 h-36 md:h-48 shadow-sm">
                    <figure className="px-2 md:px-10 pt-3 md:pt-5">
                        <img
                        src="https://i.ibb.co/KxN09nMy/oracle.webp"
                        alt="oracle"
                        className="w-15 md:w-30 h-auto rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-xs md:text-lg">Oracle</h2>

                    </div>
                </div>
                {/* Bisagi */}
                <div className="card bg-base-100 w-25 md:w-45 h-36 md:h-48 shadow-sm">
                    <figure className="px-2 md:px-10 pt-3 md:pt-5">
                        <img
                        src="https://i.ibb.co/8DZjRrd8/Bisagi.webp"
                        alt="bisagi"
                        className="w-15 md:w-30 h-auto rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-xs md:text-lg">Bisagi</h2>

                    </div>
                </div>
                {/* Ms-project */}
                <div className="card bg-base-100 w-25 md:w-45 h-36 md:h-48 shadow-sm">
                    <figure className="px-2 md:px-10 pt-3 md:pt-5">
                        <img
                        src="https://i.ibb.co/Q7BcM50z/ms-project.webp"
                        alt="ms-project"
                        className="w-15 md:w-30 h-auto rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-xs md:text-lg">MS-Project</h2>

                    </div>
                </div>
                {/* PowerApps */}
                <div className="card bg-base-100 w-25 md:w-45 h-36 md:h-48 shadow-sm">
                    <figure className="px-2 md:px-10 pt-3 md:pt-5">
                        <img
                        src="https://i.ibb.co/6JBTPzTb/powerapps.webp"
                        alt="powerapps"
                        className="w-15 md:w-30 h-auto rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-xs md:text-lg">Power Apps</h2>

                    </div>
                </div>
                {/* PowerAutomate */}
                <div className="card bg-base-100 w-25 md:w-45 h-36 md:h-48 shadow-sm">
                    <figure className="px-2 md:px-10 pt-3 md:pt-5">
                        <img
                        src="https://i.ibb.co/Xf0RDQsH/powerautomate.webp"
                        alt="powerautomate"
                        className="w-15 md:w-30 h-auto rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title text-xs md:text-lg">Power Automate</h2>

                    </div>
                </div>
            </div>
        </div>
        {/* Portafolio */}
        <div id="portafolio" className="bg-primary min-h-[100vh] flex flex-col justify-center md:justify-end">
            <div className='text-center text-white mb-10 mt-10'>
                <h1 className="text-3xl mb-3 font-bold mt-15">Portafolio</h1>
                <p className="italic mx-3">"Mi espacio para compartir cómo transformo datos en decisiones".</p>
                <p>_______</p>
            </div>
            {/* Categorias */}
            <div className='flex flex-row flex-wrap justify-center gap-2'>
                <button className="btn btn-outline text-xs md:text-base">Todos</button>
                <button className="btn btn-outline text-xs md:text-base">Finanzas</button>
                <button className="btn btn-outline text-xs md:text-base">Retail</button>
                <button className="btn btn-outline text-xs md:text-base">Minería</button>
            </div>
            {/* Proyectos*/}
            {/* Proyectos dinámicos */}
<div className='flex flex-row flex-wrap justify-center gap-2 md:gap-5 py-10 px-3 mb-10'>
  {loading ? (
    <p className="text-white">Cargando proyectos...</p>
  ) : error ? (
    <p className="text-red-400">❌ {error}</p>
  ) : proyectos.length === 0 ? (
    <p className="text-white">No hay proyectos disponibles.</p>
  ) : (
    proyectos.map((proyecto) => (
      <div
        key={proyecto.id}
        className="max-w-3xs md:max-w-xs rounded overflow-hidden shadow-lg bg-primary-content rounded-lg shadow-lg"
      >
        {proyecto.miniatura ? (
          <img
            src={proyecto.miniatura}
            alt={proyecto.titulo}
            className="w-full h-48 object-cover"
          />
        ) : (
          <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500">Sin imagen</span>
          </div>
        )}
        <div className="px-2 py-2 md:px-5 md:py-3">
          <div className="font-bold text-xl mb-2 text-secondary text-sm md:text-xl">
            {proyecto.titulo}
          </div>
          <p className="text-gray-700 text-xs md:text-base">
            {proyecto.breve_descripcion}
          </p>
        </div>
        <div className="px-2 py-2 md:px-5 md:py-3">
          {proyecto.hashtags.map((tag, i) => (
            <span
              key={i}
              className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs md:text-sm font-semibold text-gray-700 mr-2 mb-2"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    ))
  )}
</div>
        </div>
        {/* Contacto */}
        <footer id="contacto" className="footer footer-horizontal footer-center bg-base text-primary-content p-10">
        <div className='text-center text-white mb-1 mt-10'>
                <h1 className="text-3xl mb-3 font-bold">Contacto</h1>
                <p className="italic mx-3">"Me encantaría saber de ti. No dudes en escribirme."</p>
                <p>_______</p>
            </div>
        <nav>
            <div className="grid grid-flow-col gap-4">
                <a href="https://www.linkedin.com/in/jheferson-blanco/" target="_blank">
                    <svg width={48} height={48} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.82 1.5H3.294c-.957 0-1.794.69-1.794 1.635v17.566c0 .951.837 1.799 1.794 1.799h17.521c.963 0 1.685-.854 1.685-1.8V3.136c.006-.946-.722-1.635-1.68-1.635ZM8.01 19.005H5V9.65h3.01v9.354ZM6.61 8.228h-.022c-.963 0-1.586-.716-1.586-1.613C5.002 5.7 5.642 5 6.626 5c.984 0 1.587.695 1.608 1.614 0 .897-.624 1.613-1.625 1.613Zm12.395 10.777h-3.009V13.89c0-1.225-.438-2.063-1.526-2.063-.832 0-1.324.563-1.543 1.111-.082.197-.104.465-.104.739v5.328H9.815V9.65h3.008v1.301c.438-.623 1.122-1.52 2.713-1.52 1.975 0 3.469 1.301 3.469 4.108v5.465Z" />
                    </svg>
                </a>
                <a href="https://github.com/jbmquery" target="_blank">
                    <svg width={48} height={48} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 1.5C6.202 1.5 1.5 6.323 1.5 12.267c0 4.758 3.01 8.79 7.181 10.214a.82.82 0 0 0 .178.019c.39 0 .54-.286.54-.534 0-.258-.01-.933-.015-1.833a4.802 4.802 0 0 1-1.059.126c-2.02 0-2.48-1.57-2.48-1.57-.478-1.242-1.167-1.575-1.167-1.575-.914-.642-.005-.66.066-.66h.004c1.055.093 1.608 1.115 1.608 1.115.525.919 1.228 1.176 1.857 1.176a2.953 2.953 0 0 0 1.2-.28c.093-.695.365-1.168.665-1.44-2.33-.272-4.781-1.195-4.781-5.32 0-1.177.408-2.138 1.078-2.888-.108-.272-.469-1.369.103-2.85a.874.874 0 0 1 .235-.023c.38 0 1.237.145 2.653 1.13a9.76 9.76 0 0 1 5.259 0c1.416-.985 2.273-1.13 2.653-1.13a.873.873 0 0 1 .235.023c.571 1.481.21 2.578.103 2.85.67.755 1.078 1.716 1.078 2.888 0 4.134-2.456 5.043-4.796 5.31.375.333.713.99.713 1.993 0 1.439-.014 2.601-.014 2.953 0 .253.145.539.534.539a.9.9 0 0 0 .188-.019c4.176-1.425 7.181-5.46 7.181-10.214C22.5 6.323 17.798 1.5 12 1.5Z" />
                    </svg>
                </a>
                <a href="https://wa.me/51931530445?text=Hola%20Jheferson,%20vi%20tu%20portafolio%20y%20me%20gustaría%20conversar%20contigo." target="_blank">
                    <svg width={48} height={48} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M19.44 4.552A10.413 10.413 0 0 0 12.044 1.5C6.281 1.5 1.59 6.168 1.588 11.906a10.341 10.341 0 0 0 1.396 5.203L1.5 22.5l5.543-1.447a10.483 10.483 0 0 0 4.997 1.266h.004c5.762 0 10.453-4.669 10.456-10.407a10.32 10.32 0 0 0-3.06-7.36Zm-7.396 16.01h-.004a8.706 8.706 0 0 1-4.423-1.205l-.317-.188-3.29.859.879-3.192-.207-.328a8.6 8.6 0 0 1-1.329-4.602c0-4.768 3.9-8.648 8.694-8.648a8.672 8.672 0 0 1 8.688 8.655c-.002 4.769-3.9 8.65-8.69 8.65Zm4.767-6.477c-.261-.13-1.547-.76-1.785-.847-.238-.086-.414-.13-.588.13-.174.261-.675.845-.827 1.02-.153.176-.305.195-.566.065-.261-.13-1.104-.404-2.102-1.29-.776-.69-1.3-1.541-1.453-1.801-.152-.26-.016-.402.115-.531.117-.117.26-.304.392-.456.13-.152.174-.26.26-.434.087-.173.044-.325-.02-.455-.066-.13-.589-1.41-.806-1.93-.213-.508-.428-.439-.588-.447-.152-.007-.328-.01-.501-.01a.962.962 0 0 0-.697.326c-.24.26-.914.89-.914 2.17 0 1.278.937 2.516 1.067 2.69.129.173 1.842 2.799 4.463 3.925.486.209.984.392 1.49.548.625.198 1.195.17 1.645.103.502-.075 1.546-.63 1.764-1.237.217-.607.217-1.127.152-1.236-.065-.108-.24-.174-.501-.303Z" clipRule="evenodd" />
                    </svg>
                </a>
                <a   href="https://mail.google.com/mail/?view=cm&fs=1&to=jhefersonbm.query@gmail.com&tf=1" 
                    target="_blank" 
                    rel="noopener noreferrer">
                    <svg width={48} height={48} fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="m21.031 7.24-8.183-4.043a1.926 1.926 0 0 0-1.696 0L2.969 7.24A2.606 2.606 0 0 0 1.5 9.587v8.654c0 1.447 1.192 2.625 2.656 2.625h15.688c1.464 0 2.656-1.178 2.656-2.625V9.587a2.607 2.607 0 0 0-1.469-2.347Zm-9.2-2.702a.385.385 0 0 1 .339 0l7.94 3.922-8.063 3.984a.385.385 0 0 1-.34 0l-7.94-3.922 8.063-3.984Z" />
                    </svg>
                </a>
            </div>
        </nav>
        <aside>
            <img className='h-15 w-15 md:h-20 md:w-20' src="https://i.ibb.co/1fKyz9g0/logo-jbm.webp" alt="" />
            <p className="font-bold">
            JBM Corporation
            </p>
            <p>Copyright © Jheferson Blanco {new Date().getFullYear()} - All right reserved</p>
        </aside>
        </footer>
    </div>
  );
}

export default InicioPage;