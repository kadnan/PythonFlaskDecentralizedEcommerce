import json

from flask import Flask, render_template, request, url_for, redirect, flash, session
from werkzeug.security import check_password_hash
from db import check_login, get_products, add_order_data, get_orders

app = Flask(__name__)
app.config['SECRET_KEY'] = 'not_s0_secr3t'


@app.route('/')
def index():
    products = get_products()
    return render_template('home.html', products=products)


@app.route('/login')
def login():
    return render_template('login.html')


@app.post('/logged_in')
def logged_in():
    email = request.form.get('email')
    password = request.form.get('password')
    if not check_login(email, password):
        flash('Incorrect User/Password')
        return redirect('/login')
    else:
        session['user_name'] = email
        return redirect('/')


@app.get('/wallet')
def set_wallet():
    return render_template('wallet.html')


@app.get('/set_wallet/<wallet_address>')
def set_wallet_session(wallet_address):
    session['wallet_address'] = wallet_address
    return 'OK'


@app.post('/add_order/')
def add_order():
    result = 'OK'
    try:
        wallet_address = request.form.get('wallet_address')
        tx = request.form.get('tx')
        name = request.form.get('name')
        invoice_id = request.form.get('invoice_id')

        print(wallet_address, tx, name, invoice_id)

        o = add_order_data(wallet_address, tx, name, invoice_id)
        if not o:
            result = 'FAIL'
    except Exception as ex:
        print('Exception while adding order ' + ex)
        result = 'FAIL'
    finally:
        return result


@app.get('/orders/')
def orders():
    user_orders = get_orders(session['wallet_address'])
    return render_template('orders.html', orders=user_orders)


if __name__ == '__main__':
    app.run(debug=True)
