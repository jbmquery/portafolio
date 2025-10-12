# backend/controllers/portfolio_controller.py
from flask import request, jsonify
from flask_jwt_extended import jwt_required
from models import db, Proyecto, Hashtag, Medio

@jwt_required()
def crear_proyecto():
    data = request.get_json()

    # Validación básica
    campos_requeridos = ['titulo', 'breve_descripcion', 'descripcion', 'analisis', 'categoria']
    for campo in campos_requeridos:
        if not data.get(campo):
            return jsonify({"msg": f"Campo '{campo}' es requerido"}), 400

    # Crear proyecto
    proyecto = Proyecto(
        titulo=data['titulo'],
        breve_descripcion=data['breve_descripcion'],
        descripcion=data['descripcion'],  # HTML
        analisis=data['analisis'],        # HTML
        categoria=data['categoria'],
        enlace_documentos=data.get('enlace_documentos'),
        enlace_herramienta=data.get('enlace_herramienta'),
        enlace_github=data.get('enlace_github')
    )
    db.session.add(proyecto)
    db.session.flush()  # Para obtener el ID antes del commit

    # Hashtags
    hashtags_nombres = data.get('hashtags', [])
    for nombre in hashtags_nombres:
        hashtag = Hashtag.query.filter_by(nombre=nombre).first()
        if not hashtag:
            hashtag = Hashtag(nombre=nombre)
            db.session.add(hashtag)
        proyecto.hashtags.append(hashtag)

    # Medios
    medios = data.get('medios', [])
    for i, medio in enumerate(medios):
        if 'url' in medio and 'tipo' in medio:
            m = Medio(
                url=medio['url'],
                tipo=medio['tipo'],  # "imagen" o "video"
                orden=i,
                proyecto_id=proyecto.id
            )
            db.session.add(m)

    db.session.commit()
    return jsonify({"msg": "Proyecto creado", "id": proyecto.id}), 201

def obtener_proyectos():
    categoria = request.args.get('categoria')
    query = Proyecto.query
    if categoria:
        query = query.filter_by(categoria=categoria)
    proyectos = query.order_by(Proyecto.created_at.desc()).all()

    resultado = []
    for p in proyectos:
        # Primera imagen para miniatura
        miniatura = None
        for medio in sorted(p.medios, key=lambda x: x.orden):
            if medio.tipo == 'imagen':
                miniatura = medio.url
                break

        resultado.append({
            "id": p.id,
            "titulo": p.titulo,
            "breve_descripcion": p.breve_descripcion,
            "categoria": p.categoria,
            "miniatura": miniatura,
            "hashtags": [h.nombre for h in p.hashtags]
        })
    return jsonify(resultado), 200

def obtener_proyecto(id):
    p = Proyecto.query.get_or_404(id)
    medios = [{"url": m.url, "tipo": m.tipo, "orden": m.orden} for m in p.medios]
    medios.sort(key=lambda x: x['orden'])

    return jsonify({
        "id": p.id,
        "titulo": p.titulo,
        "breve_descripcion": p.breve_descripcion,
        "descripcion": p.descripcion,
        "analisis": p.analisis,
        "categoria": p.categoria,
        "enlace_documentos": p.enlace_documentos,
        "enlace_herramienta": p.enlace_herramienta,
        "enlace_github": p.enlace_github,
        "hashtags": [h.nombre for h in p.hashtags],
        "medios": medios
    }), 200

@jwt_required()
def actualizar_proyecto(id):
    p = Proyecto.query.get_or_404(id)
    data = request.get_json()

    for campo in ['titulo', 'breve_descripcion', 'descripcion', 'analisis', 'categoria']:
        if campo in 
            setattr(p, campo, data[campo])

    p.enlace_documentos = data.get('enlace_documentos')
    p.enlace_herramienta = data.get('enlace_herramienta')
    p.enlace_github = data.get('enlace_github')

    # Actualizar hashtags
    if 'hashtags' in data:
        p.hashtags.clear()
        for nombre in data['hashtags']:
            hashtag = Hashtag.query.filter_by(nombre=nombre).first()
            if not hashtag:
                hashtag = Hashtag(nombre=nombre)
                db.session.add(hashtag)
            p.hashtags.append(hashtag)

    # Actualizar medios
    if 'medios' in 
        Medio.query.filter_by(proyecto_id=p.id).delete()
        for i, medio in enumerate(data['medios']):
            if 'url' in medio and 'tipo' in medio:
                m = Medio(url=medio['url'], tipo=medio['tipo'], orden=i, proyecto_id=p.id)
                db.session.add(m)

    db.session.commit()
    return jsonify({"msg": "Proyecto actualizado"}), 200