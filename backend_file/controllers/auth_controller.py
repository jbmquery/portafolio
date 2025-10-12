# backend/controllers/auth_controller.py
from flask import request, jsonify
from models import db, AdminUser
from flask_jwt_extended import create_access_token

def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"msg": "Email y contraseña requeridos"}), 400

    user = AdminUser.query.filter_by(email=email).first()
    if user and user.check_password(password):
        token = create_access_token(identity=user.id)
        return jsonify(access_token=token), 200
    else:
        return jsonify({"msg": "Credenciales inválidas"}), 401