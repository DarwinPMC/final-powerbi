from flask import Blueprint, jsonify
from app.utils.database import get_db

sales_blueprint = Blueprint('sales', __name__)

# Endpoint: Obtener todas las ventas con todas las dimensiones relacionadas
@sales_blueprint.route('/', methods=['GET'])
def get_all_sales():
    try:
        db = get_db()
        cursor = db.cursor(dictionary=True)

        # Query que une la tabla de hechos con las dimensiones
        query = """
      SELECT 
    f.id_venta,
    f.cantidad,
    f.total,
    f.precio_unitario,
    p.genero AS genero,
    c.ciudad_casa AS ciudad_casa,
    m.nombre AS nombre_medio,
    t.mes AS mes,
    t.anio AS anio
FROM fact_ventas f
JOIN dim_producto p ON f.id_producto = p.id_producto
JOIN dim_cliente c ON f.id_cliente = c.id_cliente
JOIN dim_medio m ON f.id_medio = m.id_medio
JOIN dim_tiempo t ON f.id_tiempo = t.id_tiempo;
        """
        cursor.execute(query)
        sales = cursor.fetchall()
        cursor.close()

        return jsonify(sales)
    except Exception as e:
        return jsonify({'error': str(e)})


@sales_blueprint.route('/client/<int:client_id>', methods=['GET'])
def get_sales_by_client(client_id):
    try:
        db = get_db()
        cursor = db.cursor(dictionary=True)
        
        query = """
        SELECT 
            f.id_venta,
            f.cantidad,
            f.total,
            f.precio_unitario,
            c.nombre_completo AS cliente,
            p.nombre AS producto,
            v.nombre_completo AS vendedor,
            t.fecha AS fecha_venta
        FROM fact_ventas f
        JOIN dim_cliente c ON f.id_cliente = c.id_cliente
        JOIN dim_producto p ON f.id_producto = p.id_producto
        JOIN dim_vendedor v ON f.id_vendedor = v.id_vendedor
        JOIN dim_tiempo t ON f.id_tiempo = t.id_tiempo
        WHERE f.id_cliente = %s
        """
        cursor.execute(query, (client_id,))
        sales = cursor.fetchall()
        cursor.close()
        return jsonify(sales)
    except Exception as e:
        return jsonify({'error': str(e)})


@sales_blueprint.route('/product/<int:product_id>', methods=['GET'])
def get_sales_by_product(product_id):
    try:
        db = get_db()
        cursor = db.cursor(dictionary=True)

        query = """
        SELECT 
            f.id_venta,
            f.cantidad,
            f.total,
            f.precio_unitario,
            c.nombre_completo AS cliente,
            p.nombre AS producto,
            v.nombre_completo AS vendedor,
            t.fecha AS fecha_venta
        FROM fact_ventas f
        JOIN dim_cliente c ON f.id_cliente = c.id_cliente
        JOIN dim_producto p ON f.id_producto = p.id_producto
        JOIN dim_vendedor v ON f.id_vendedor = v.id_vendedor
        JOIN dim_tiempo t ON f.id_tiempo = t.id_tiempo
        WHERE f.id_producto = %s
        """
        cursor.execute(query, (product_id,))
        sales = cursor.fetchall()
        cursor.close()
        return jsonify(sales)
    except Exception as e:
        return jsonify({'error': str(e)})


