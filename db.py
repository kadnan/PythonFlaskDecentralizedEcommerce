import sqlite3
from werkzeug.security import generate_password_hash, check_password_hash


def get_connection():
    path = '/Users/AdnanAhmad/Data/Development/PetProjects/LearningSolidity/DecentralizedEcommerce/dapp.sqlite3'
    connection = sqlite3.connect(path)
    return connection


def check_login(email, password):
    conn = get_connection()
    sql = "SELECT email,password from users where email = '{}'".format(email, password)
    cursor = conn.cursor()
    cursor.execute(sql)
    record = cursor.fetchone()

    # easy.password
    if record is not None:
        password_hash = record[1]
        if not check_password_hash(password_hash, password):
            return False
        else:
            return True


def get_products():
    products = [
        {
            'name': 'Blendtec Total Classic Original Blender',
            'price': 1,
            'image': "https://images-na.ssl-images-amazon.com/images/I/41AZOLr72bL._AC_SY350_QL15_FMwebp_.jpg"
        },
        {
            'name': 'Cuisinart DFP-14BSKY',
            'price': 0.5,
            'image': "https://images-na.ssl-images-amazon.com/images/I/81zJJyXCoOL._AC_SX679_.jpg"
        }
    ]
    return products


def add_order_data(wallet_address, tx, name, invoice_id):
    result = True
    try:
        conn = get_connection()
        sql = 'INSERT INTO orders(wallet_address,tx,product_name,invoice_id) VALUES (?,?,?,?)'
        cursor = conn.cursor()
        cursor.execute(sql, (wallet_address, tx, name, invoice_id))
        conn.commit()
        conn.close()
    except Exception as ex:
        print('Exception in add_order function in db:- ' + ex)
        result = False
    finally:
        return result


def get_orders(wallet_address):
    records = None
    conn = get_connection()
    sql = 'SELECT * from orders where wallet_address = ?'
    cursor = conn.cursor()
    cursor.execute(sql, (wallet_address,))
    records = cursor.fetchall()
    return records
