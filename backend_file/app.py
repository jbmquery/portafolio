# backend_file/app.py
from flask import Flask
from flask_jwt_extended import JWTManager
from config import Config
from conexion import db, crear_app_con_db
from models import AdminUser  # Asegúrate de importar los modelos
from controllers.auth_controller import login
from controllers.portfolio_controller import (
    crear_proyecto, obtener_proyectos, obtener_proyecto, actualizar_proyecto
)

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    JWTManager(app)

    # Registrar rutas
    app.add_url_rule('/api/login', 'login', login, methods=['POST'])
    app.add_url_rule('/api/proyectos', 'crear_proyecto', crear_proyecto, methods=['POST'])
    app.add_url_rule('/api/proyectos', 'obtener_proyectos', obtener_proyectos, methods=['GET'])
    app.add_url_rule('/api/proyectos/<int:id>', 'obtener_proyecto', obtener_proyecto, methods=['GET'])
    app.add_url_rule('/api/proyectos/<int:id>', 'actualizar_proyecto', actualizar_proyecto, methods=['PUT'])

    return app

if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        # Solo crea el usuario admin si no existe (no crea tablas, ya las tienes)
        if not AdminUser.query.first():
            admin = AdminUser(email='admin@portafolio.com')
            admin.set_password('securepassword123')
            db.session.add(admin)
            db.session.commit()
            print("✅ Usuario admin creado: admin@portafolio.com / securepassword123")

    app.run(debug=True)