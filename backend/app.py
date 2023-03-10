# Tomasz Ogrodnik - Napisz program, który tworzy klucze dowolnym sposobem asymetrycznie oraz ma możliwość zaimportowania kluczy publicznych. Program również ma możliwość podpisania oraz sprawdzenia podpisu
from Crypto.PublicKey import RSA
from Crypto.Signature.pkcs1_15 import PKCS115_SigScheme
from Crypto.Hash import SHA256
from configuration import *
from flask import request, jsonify
import os
import uuid


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
    try:
        file = request.files['file']
        private_key = request.form['private_key']
        nameOfFile = uuid.uuid4().hex + ".sig"
        file.save(os.path.join(app.config["UPLOAD_FOLDER"], nameOfFile))
        file = open(os.path.join(
            app.config["UPLOAD_FOLDER"], nameOfFile), 'r').read()
        key = RSA.import_key(private_key)
        hash = SHA256.new(file.encode())
        signature = PKCS115_SigScheme(key).sign(hash)
        file = open(os.path.join(
            app.config["UPLOAD_FOLDER"], nameOfFile), 'wb')
        file.write(signature)
        file.close()
        file = open(os.path.join(
            app.config["UPLOAD_FOLDER"], nameOfFile), 'rb')
        return jsonify({"status": "success", "data": f"http://127.0.0.1:5000/static/files/" + nameOfFile}), 200
    except (ValueError, TypeError):
        return jsonify({"status": "error", "data": "Błąd z podpisywaniem pliku"}), 200


@app.route("/verify", methods=['GET', 'POST'])
def verify():
    try:
        file = request.files['signature_file']
        original_file = request.files['original_file']
        public_key = request.form['public_key']
        nameOfFile = file.filename
        original_file_name = original_file.filename
        file.save(os.path.join(app.config["UPLOAD_FOLDER"], nameOfFile))
        file = open(os.path.join(
            app.config["UPLOAD_FOLDER"], nameOfFile), 'rb')
        signature = file.read()
        original_file.save(os.path.join(
            app.config["UPLOAD_FOLDER"], original_file.filename))
        original_file = open(os.path.join(
            app.config["UPLOAD_FOLDER"], original_file.filename), 'rb').read()
        key = RSA.import_key(public_key)
        hash = SHA256.new(original_file)
        try:
            PKCS115_SigScheme(key).verify(hash, signature)
            os.remove(os.path.join(app.config["UPLOAD_FOLDER"], nameOfFile))
            os.remove(os.path.join(
                app.config["UPLOAD_FOLDER"], original_file_name))
            return {"status": "success", "data": "Podpis jest poprawny"}, 200
        except:
            os.remove(os.path.join(app.config["UPLOAD_FOLDER"], nameOfFile))
            os.remove(os.path.join(
                app.config["UPLOAD_FOLDER"], original_file_name))
            return jsonify({"status": "success", "data": "Podpis jest nie poprawny"}), 200
    except (ValueError, TypeError):
        return jsonify({"status": "error", "data": "Błąd z podpisywaniem pliku"}), 200


@app.route("/import-keys", methods=['POST'])
def import_keys():
    public_key = request.json["public_key"]
    try:
        key = RSA.import_key(public_key)
        if (key.has_private()):
            response_body = {
                "status": "error",
                "data": "Klucz nie może zawierać prywatnego klucza"
            }
            return jsonify(response_body), 500
        response_body = {
            "status": "success"
        }
        return jsonify(response_body), 200
    except (ValueError, TypeError):
        response_body = {
            "status": "error", "data": "Klucz jest niepoprawny"
        }
        return jsonify(response_body), 500
