// frontend-file/src/pages/EditPortafolioPage.jsx
import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import TextAlign from '@tiptap/extension-text-align';
import { Color } from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';

function EditPortafolioPage() {
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState('');
  const [formData, setFormData] = useState({
    titulo: '',
    breve_descripcion: '',
    categoria: 'Finanzas',
    enlace_documentos: '',
    enlace_herramienta: '',
    enlace_github: '',
    hashtags: [],
    medios: [{ url: '', tipo: 'imagen' }],
  });
  const [newHashtag, setNewHashtag] = useState('');
  const [message, setMessage] = useState('');

  // Configuración común de extensiones
  const commonExtensions = [
    StarterKit.configure({
      heading: false, // desactivamos headings si no los usas
      bulletList: true,
      orderedList: true,
      listItem: true,
    }),
    TextAlign.configure({
      types: ['paragraph', 'heading'],
      alignments: ['left', 'center', 'right', 'justify'],
    }),
    TextStyle,
    Color.configure({ types: [TextStyle.name] }),
  ];

  // Editor para descripción
  const descripcionEditor = useEditor({
    extensions: commonExtensions,
    content: '',
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({ ...prev, descripcion: editor.getHTML() }));
    },
  });

  // Editor para análisis
  const analisisEditor = useEditor({
    extensions: commonExtensions,
    content: '',
    onUpdate: ({ editor }) => {
      setFormData((prev) => ({ ...prev, analisis: editor.getHTML() }));
    },
  });

  // Cargar proyectos al inicio
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/proyectos');
        if (res.ok) {
          const data = await res.json();
          setProjects(data);
        }
      } catch (err) {
        console.error('Error al cargar proyectos:', err);
      }
    };
    fetchProjects();
  }, []);

  // Cargar datos si se selecciona un proyecto
  useEffect(() => {
    if (!selectedProjectId) {
      resetForm();
      return;
    }

    const loadProject = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/proyectos/${selectedProjectId}`);
        if (res.ok) {
          const data = await res.json();
          setFormData({
            titulo: data.titulo,
            breve_descripcion: data.breve_descripcion,
            categoria: data.categoria,
            enlace_documentos: data.enlace_documentos || '',
            enlace_herramienta: data.enlace_herramienta || '',
            enlace_github: data.enlace_github || '',
            hashtags: data.hashtags,
            medios: data.medios.map((m) => ({ url: m.url, tipo: m.tipo })),
          });
          if (descripcionEditor) descripcionEditor.commands.setContent(data.descripcion || '');
          if (analisisEditor) analisisEditor.commands.setContent(data.analisis || '');
        }
      } catch (err) {
        console.error('Error al cargar el proyecto:', err);
      }
    };
    loadProject();
  }, [selectedProjectId]);

  const resetForm = () => {
    setFormData({
      titulo: '',
      breve_descripcion: '',
      categoria: 'Finanzas',
      enlace_documentos: '',
      enlace_herramienta: '',
      enlace_github: '',
      hashtags: [],
      medios: [{ url: '', tipo: 'imagen' }],
    });
    if (descripcionEditor) descripcionEditor.commands.clearContent();
    if (analisisEditor) analisisEditor.commands.clearContent();
    setSelectedProjectId('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addHashtag = () => {
    if (newHashtag.trim() && !formData.hashtags.includes(newHashtag.trim())) {
      setFormData({ ...formData, hashtags: [...formData.hashtags, newHashtag.trim()] });
      setNewHashtag('');
    }
  };

  const removeHashtag = (tag) => {
    setFormData({ ...formData, hashtags: formData.hashtags.filter((h) => h !== tag) });
  };

  const addMedia = () => {
    setFormData({ ...formData, medios: [...formData.medios, { url: '', tipo: 'imagen' }] });
  };

  const updateMedia = (index, field, value) => {
    const newMedios = [...formData.medios];
    newMedios[index][field] = value;
    setFormData({ ...formData, medios: newMedios });
  };

  const removeMedia = (index) => {
    const newMedios = formData.medios.filter((_, i) => i !== index);
    setFormData({ ...formData, medios: newMedios });
  };

  const handleDelete = async () => {
    if (!selectedProjectId) return;
    if (!window.confirm('¿Estás seguro de que deseas eliminar este proyecto? Esta acción no se puede deshacer.')) {
      return;
    }

    const token = localStorage.getItem('auth_token');
    if (!token) {
      setMessage('❌ No estás autenticado.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/proyectos/${selectedProjectId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('✅ Proyecto eliminado con éxito.');
        resetForm();
        // Recargar lista de proyectos
        const res = await fetch('http://localhost:5000/api/proyectos');
        if (res.ok) setProjects(await res.json());
      } else {
        setMessage(`❌ Error: ${result.msg || 'No se pudo eliminar'}`);
      }
    } catch (error) {
      setMessage('❌ Error de conexión al eliminar el proyecto');
      console.error(error);
    }
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    const token = localStorage.getItem('auth_token');
    if (!token) {
      setMessage('❌ No estás autenticado. Inicia sesión primero.');
      return;
    }

    const url = selectedProjectId
      ? `http://localhost:5000/api/proyectos/${selectedProjectId}`
      : 'http://localhost:5000/api/proyectos';
    const method = selectedProjectId ? 'PUT' : 'POST';

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setMessage(`✅ ${selectedProjectId ? 'Proyecto actualizado' : 'Proyecto creado'} con éxito.`);
        resetForm();
        const res = await fetch('http://localhost:5000/api/proyectos');
        if (res.ok) setProjects(await res.json());
      } else {
        setMessage(`❌❌ Error: ${result.msg || 'Falló la operación'}`);
      }
    } catch (error) {
      setMessage('❌ Error de conexión con el servidor');
      console.error(error);
    }
  };

  // Función para renderizar la barra de herramientas
  const renderToolbar = (editor) => {
    if (!editor) return null;

    return (
      <div className="flex flex-wrap gap-1 p-2 border rounded-t bg-base-200">
        {/* Negrita, Cursiva */}
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'btn btn-xs btn-primary' : 'btn btn-xs'}
          title="Negrita"
        >
          <strong>B</strong>
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'btn btn-xs btn-primary' : 'btn btn-xs'}
          title="Cursiva"
        >
          <em>I</em>
        </button>

        {/* Alineación */}
        <div className="divider divider-horizontal mx-1"></div>
        <button
          onClick={() => editor.chain().focus().setTextAlign('left').run()}
          className={editor.isActive({ textAlign: 'left' }) ? 'btn btn-xs btn-primary' : 'btn btn-xs'}
          title="Alinear izquierda"
        >
          ⇦
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('center').run()}
          className={editor.isActive({ textAlign: 'center' }) ? 'btn btn-xs btn-primary' : 'btn btn-xs'}
          title="Centrar"
        >
          ⇵
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('right').run()}
          className={editor.isActive({ textAlign: 'right' }) ? 'btn btn-xs btn-primary' : 'btn btn-xs'}
          title="Alinear derecha"
        >
          ⇨
        </button>
        <button
          onClick={() => editor.chain().focus().setTextAlign('justify').run()}
          className={editor.isActive({ textAlign: 'justify' }) ? 'btn btn-xs btn-primary' : 'btn btn-xs'}
          title="Justificar"
        >
          ⇳
        </button>

        {/* Listas */}
        <div className="divider divider-horizontal mx-1"></div>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'btn btn-xs btn-primary' : 'btn btn-xs'}
          title="Viñetas"
        >
          •
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={editor.isActive('orderedList') ? 'btn btn-xs btn-primary' : 'btn btn-xs'}
          title="Numeración"
        >
          1.
        </button>

        {/* Sangría */}
        <div className="divider divider-horizontal mx-1"></div>
        <button
          onClick={() => editor.chain().focus().sinkListItem('listItem').run()}
          disabled={!editor.can().sinkListItem('listItem')}
          className="btn btn-xs"
          title="Aumentar sangría"
        >
          ▸
        </button>
        <button
          onClick={() => editor.chain().focus().liftListItem('listItem').run()}
          disabled={!editor.can().liftListItem('listItem')}
          className="btn btn-xs"
          title="Disminuir sangría"
        >
          ◂
        </button>

        {/* Color de texto */}
        <div className="divider divider-horizontal mx-1"></div>
        <select
          value=""
          onChange={(e) => {
            const color = e.target.value;
            if (color === 'default') {
              editor.chain().focus().unsetColor().run();
            } else {
              editor.chain().focus().setColor(color).run();
            }
          }}
          className="select select-xs w-auto"
        >
          <option value="" disabled>
            Color
          </option>
          <option value="default">Predeterminado</option>
          <option value="black">Negro</option>
          <option value="#1d4ed8">Primario (blue-700)</option>
          <option value="#0d9488">Secundario (teal-600)</option>
        </select>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Editar Portafolio</h1>

      {message && <div className="alert alert-info mb-4">{message}</div>}

      {/* Selector de proyecto */}
      <div className="mb-6">
        <label className="block mb-2">Editar proyecto existente:</label>
        <select
          value={selectedProjectId}
          onChange={(e) => setSelectedProjectId(e.target.value)}
          className="select select-bordered w-full"
        >
          <option value="">-- Crear nuevo --</option>
          {projects.map((p) => (
            <option key={p.id} value={p.id}>
              {p.titulo} ({p.categoria})
            </option>
          ))}
        </select>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Título y breve descripción */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="titulo"
            value={formData.titulo}
            onChange={handleInputChange}
            placeholder="Título del proyecto"
            className="input input-bordered"
            required
          />
          <input
            name="breve_descripcion"
            value={formData.breve_descripcion}
            onChange={handleInputChange}
            placeholder="Breve descripción"
            className="input input-bordered"
            required
          />
        </div>

        {/* Categoría */}
        <select
          name="categoria"
          value={formData.categoria}
          onChange={handleInputChange}
          className="select select-bordered w-full"
        >
          <option value="Finanzas">Finanzas</option>
          <option value="Retail">Retail</option>
          <option value="Minería">Minería</option>
        </select>

        {/* Descripción */}
        <div>
          <label className="block mb-2">Descripción</label>
          {renderToolbar(descripcionEditor)}
          <EditorContent
            editor={descripcionEditor}
            className="border p-4 min-h-32 rounded-b"
          />
        </div>

        {/* Análisis */}
        <div>
          <label className="block mb-2">Análisis</label>
          {renderToolbar(analisisEditor)}
          <EditorContent
            editor={analisisEditor}
            className="border p-4 min-h-32 rounded-b"
          />
        </div>

        {/* Hashtags */}
        <div>
          <label className="block mb-2">Hashtags</label>
          <div className="flex gap-2 mb-2">
            <input
              value={newHashtag}
              onChange={(e) => setNewHashtag(e.target.value)}
              placeholder="#PowerBI"
              className="input input-bordered flex-1"
            />
            <button type="button" onClick={addHashtag} className="btn btn-outline">
              Añadir
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {formData.hashtags.map((tag, i) => (
              <div key={i} className="badge badge-primary gap-2">
                {tag}
                <button type="button" onClick={() => removeHashtag(tag)} className="text-white">
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Medios */}
        <div>
          <label className="block mb-2">Medios (URLs)</label>
          {formData.medios.map((media, i) => (
            <div key={i} className="flex gap-2 mb-2">
              <input
                value={media.url}
                onChange={(e) => updateMedia(i, 'url', e.target.value)}
                placeholder="https://ejemplo.com/imagen.jpg"
                className="input input-bordered flex-1"
                required
              />
              <select
                value={media.tipo}
                onChange={(e) => updateMedia(i, 'tipo', e.target.value)}
                className="select select-bordered"
              >
                <option value="imagen">Imagen</option>
                <option value="video">Video</option>
              </select>
              <button type="button" onClick={() => removeMedia(i)} className="btn btn-error btn-sm">
                Eliminar
              </button>
            </div>
          ))}
          <button type="button" onClick={addMedia} className="btn btn-secondary btn-sm mt-2">
            + Añadir medio
          </button>
        </div>

        {/* Enlaces */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            name="enlace_documentos"
            value={formData.enlace_documentos}
            onChange={handleInputChange}
            placeholder="Enlace a documentos"
            className="input input-bordered"
          />
          <input
            name="enlace_herramienta"
            value={formData.enlace_herramienta}
            onChange={handleInputChange}
            placeholder="Enlace a Power BI / Tableau"
            className="input input-bordered"
          />
          <input
            name="enlace_github"
            value={formData.enlace_github}
            onChange={handleInputChange}
            placeholder="Enlace a GitHub"
            className="input input-bordered"
          />
        </div>

        {selectedProjectId && (
          <button
            type="button"
            onClick={handleDelete}
            className="btn btn-error align-middle mr-2"
          >
            ❌ Eliminar
          </button>
        )}

        <button type="submit" className="btn btn-primary align-middle">
          {selectedProjectId ? 'Actualizar Proyecto' : 'Crear Proyecto'}
        </button>
      </form>
    </div>
  );
}

export default EditPortafolioPage;