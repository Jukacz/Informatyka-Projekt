from flask import Flask, redirect, render_template, request, url_for, flash
from flask_login import LoginManager, current_user, logout_user, login_user, UserMixin, login_required
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flask_cors import CORS
app = Flask(__name__)
app.config['SECRET_KEY'] = "df0331cefc6c2b9a5d0208a726a5d1c0fd37324feba25506"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'
app.config['UPLOAD_FOLDER'] = 'static/files'
CORS(app)
db = SQLAlchemy(app)
login_manager = LoginManager()
login_manager.init_app(app)
