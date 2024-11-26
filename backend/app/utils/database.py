import mysql.connector
from flask import g

def get_db():
    if 'db' not in g:
        g.db = mysql.connector.connect(
            host='127.0.0.1',
            user='root',
            password='root',
            database='chinookdw'
        )
    return g.db

def close_db(e=None):
    db = g.pop('db', None)

    if db is not None:
        db.close()

def init_db(app):
    app.teardown_appcontext(close_db)
