# backend/app.py
from flask import Flask
from flask_jwt_extended import JWTManager
from config import Config
from models import db
from controllers.auth_controller import login
from controllers.portfolio_controller import (
    crear_proyecto, obtener_proyectos, obtener_proyecto, actualizar_proyecto
)

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    JWTManager(app)

    # Rutas
    app.add_url_rule('/api/login', 'login', login, methods=['POST'])
    app.add_url_rule('/api/proyectos', 'crear_proyecto', crear_proyecto, methods=['POST'])
    app.add_url_rule('/api/proyectos', 'obtener_proyectos', obtener_proyectos, methods=['GET'])
    app.add_url_rule('/api/proyectos/<int:id>', 'obtener_proyecto', obtener_proyecto, methods=['GET'])
    app.add_url_rule('/api/proyectos/<int:id>', 'actualizar_proyecto', actualizar_proyecto, methods=['PUT'])

    return app

if __name__ == '__main__':
    app = create_app()
    with app.app_context():
        db.create_all()

        # Crear usuario admin si no existe
        from models import AdminUser
        if not AdminUser.query.first():
            admin = AdminUser(email='admin@portafolio.com')
            admin.set_password('securepassword123')  # ¡Cámbialo!
            db.session.add(admin)
            db.session.commit()
            print("✅ Usuario admin creado: admin@portafolio.com / securepassword123")

    app.run(debug=True)