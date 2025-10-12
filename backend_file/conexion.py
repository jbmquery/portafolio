# backend_file/conexion.py
from flask_sqlalchemy import SQLAlchemy
from flask import Flask
from config import Config
import os

# Crear una instancia de SQLAlchemy (sin app aún)
db = SQLAlchemy()

def crear_app_con_db():
    """Crea una app de Flask solo para inicializar la DB (útil para scripts o migraciones)."""
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    return app, db