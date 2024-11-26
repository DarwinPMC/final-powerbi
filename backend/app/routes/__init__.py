def register_routes(app):
    """
    Registra todas las rutas (blueprints) de la aplicación Flask.
    """
    from app.routes.sales import sales_blueprint
    from app.routes.dimensions import dimensions_blueprint

    # Registrar blueprints
    app.register_blueprint(sales_blueprint, url_prefix='/sales')        # Rutas relacionadas con fact_ventas
    app.register_blueprint(dimensions_blueprint, url_prefix='/dimensions')  # Rutas relacionadas con dimensiones
