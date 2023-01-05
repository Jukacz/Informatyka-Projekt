# Tomasz Ogrodnik - Napisz program, który tworzy klucze dowolnym sposobem asymetrycznie oraz ma możliwość zaimportowania kluczy publicznych. Program również ma możliwość podpisania oraz sprawdzenia podpisu
from Crypto.PublicKey import RSA
from configuration import *
from flask import Flask, request, jsonify


@app.route('/generate-keys', methods=['GET', 'POST'])
def my_profile():
    key = RSA.generate(2048)
    private_key = key.export_key('PEM').decode('utf-8')
    public_key = key.publickey().export_key('PEM').decode('utf-8')
    response_body = {
        'private_key': private_key,
        'public_key': public_key
    }
    return response_body


@app.route("/sign", methods=['POST'])
def sign():
    message = request.args.get('message')
    private_key = request.args.get('private_key')
    key = RSA.import_key(private_key)
    signature = key.sign(message.encode('utf-8'), '')
    response_body = {
        'signature': signature
    }
    return jsonify(response_body, 200)


@app.route("/verify", methods=['GET', 'POST'])
def verify():
    message = request.args.get('message')
    signature = request.args.get('signature')
    public_key = request.args.get('public_key')
    key = RSA.import_key(public_key)
    verified = key.verify(message.encode('utf-8'), signature)
    response_body = {
        'verified': verified
    }
    return jsonify(response_body, 200)


@app.route("/import-keys", methods=['GET', 'POST'])
def import_keys():
    public_key = request.args.get('public_key')
    key = RSA.import_key(public_key)
    response_body = {
        'public_key': key
    }
    return jsonify(response_body, 200)
