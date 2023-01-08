# Tomasz Ogrodnik - Napisz program, który tworzy klucze dowolnym sposobem asymetrycznie oraz ma możliwość zaimportowania kluczy publicznych. Program również ma możliwość podpisania oraz sprawdzenia podpisu
from Crypto.PublicKey import RSA
from Crypto.Signature import pkcs1_15
from hashlib import sha256
from configuration import *
from flask import Flask, request, jsonify, send_file
import os


@app.route("/", methods=["GET"])
def ok():
    response = jsonify("server is running")
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


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
    # sign a sended file
    message = request.files['file']
    private_key = request.form['private_key']
    nameOfFile = message.filename
    message.save(os.path.join(app.config["UPLOAD_FOLDER"], nameOfFile))
    message = open(os.path.join(
        app.config["UPLOAD_FOLDER"], nameOfFile), 'r').read()
    key = RSA.import_key(private_key)
    digest = sha256(message.encode('utf-8'))
    signature = pkcs1_15.new(key).sign(digest).hex()
    file = open(os.path.join(app.config["UPLOAD_FOLDER"], nameOfFile), 'w')
    file.write(signature)
    file.close()
    file = open(os.path.join(app.config["UPLOAD_FOLDER"], nameOfFile), 'rb')
    return send_file(file, attachment_filename='signedFile.sig')


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


@app.route("/import-keys", methods=['POST'])
def import_keys():
    public_key = request.json["public_key"]
    key = RSA.import_key(public_key)
    response_body = {
        "status": "success"
    }
    return jsonify(response_body)


if __name__ == "__main__":
    app.run(debug=True)
