#Tomasz Ogrodnik - Napisz program, który tworzy klucze dowolnym sposobem asymetrycznie oraz ma możliwość zaimportowania kluczy publicznych. Program również ma możliwość podpisania oraz sprawdzenia podpisu

from configuration import *


@app.route('/tak', methods=['GET', 'POST'])
def my_profile():
    response_body = {
        "name": "Starter",
        "about": "this is react starter witch backend (flask)!"
    }
    return response_body
