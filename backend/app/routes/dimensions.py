from flask import Blueprint, jsonify
from app.utils.database import get_db

dimensions_blueprint = Blueprint('dimensions', __name__)

# Ruta para obtener clientes
@dimensions_blueprint.route('/clients', methods=['GET'])
def get_clients():
    try:
        db = get_db()
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT * FROM dim_cliente")
        clients = cursor.fetchall()
        cursor.close()
        return jsonify(clients)
    except Exception as e:
        return jsonify({'error': str(e)})

# Ruta para obtener productos
@dimensions_blueprint.route('/products', methods=['GET'])
def get_products():
    try:
        db = get_db()
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT * FROM dim_producto")
        products = cursor.fetchall()
        cursor.close()
        return jsonify(products)
    except Exception as e:
        return jsonify({'error': str(e)})

# Ruta para obtener vendedores
@dimensions_blueprint.route('/sellers', methods=['GET'])
def get_sellers():
    try:
        db = get_db()
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT * FROM dim_vendedor")
        sellers = cursor.fetchall()
        cursor.close()
        return jsonify(sellers)
    except Exception as e:
        return jsonify({'error': str(e)})

# Ruta para obtener tiempos
@dimensions_blueprint.route('/time', methods=['GET'])
def get_time():
    try:
        db = get_db()
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT * FROM dim_tiempo")
        time = cursor.fetchall()
        cursor.close()
        return jsonify(time)
    except Exception as e:
        return jsonify({'error': str(e)})

# Ruta para obtener medios de venta
@dimensions_blueprint.route('/channels', methods=['GET'])
def get_channels():
    try:
        db = get_db()
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT * FROM dim_medio")
        channels = cursor.fetchall()
        cursor.close()
        return jsonify(channels)
    except Exception as e:
        return jsonify({'error': str(e)})
