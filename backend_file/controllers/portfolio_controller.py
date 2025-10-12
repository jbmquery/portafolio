# backend_file/controllers/portfolio_controller.py
from flask import request, jsonify
from flask_jwt_extended import jwt_required  # ← ¡Esta línea faltaba!
from models import db, Proyecto, Hashtag, Medio

@jwt_required()
def actualizar_proyecto(id):
    p = Proyecto.query.get_or_404(id)
    data = request.get_json()

    # Actualizar campos básicos si están presentes en la solicitud
    campos_permitidos = ['titulo', 'breve_descripcion', 'descripcion', 'analisis', 'categoria']
    for campo in campos_permitidos:
        if campo in data:
            setattr(p, campo, data[campo])

    # Actualizar enlaces opcionales
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
    if 'medios' in data:
        Medio.query.filter_by(proyecto_id=p.id).delete()
        for i, medio in enumerate(data['medios']):
            if 'url' in medio and 'tipo' in medio:
                m = Medio(url=medio['url'], tipo=medio['tipo'], orden=i, proyecto_id=p.id)
                db.session.add(m)

    db.session.commit()
    return jsonify({"msg": "Proyecto actualizado"}), 200