from django.urls import path
from . import views

urlpatterns = [
    path('', views.home),
    path('about/', views.about),
]

from flask import flask, render_template
from flask_sqlalchemy import SQLAlchemy

app = flask(__name__)

@app.route('/home')
def homepage():
    return render_template('public\index.html')

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(20), unique=True, nullable=False)

    def __repr__(self):
        return f"User('{self.username}')"
