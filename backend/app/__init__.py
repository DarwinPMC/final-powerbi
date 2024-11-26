from flask import Flask
from flask_cors import CORS
from app.utils.database import init_db

def create_app():
    app = Flask(__name__)

    # Configuración
    app.config.from_object('app.config.Config')

    # Inicializar CORS
    CORS(app)

    # Inicializar la base de datos
    init_db(app)

    # Registrar rutas
    from app.routes import register_routes
    register_routes(app)

    return app
