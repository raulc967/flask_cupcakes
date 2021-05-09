"""Flask app for Cupcakes"""
from flask import Flask, redirect, render_template, request, jsonify
import json
from models import db, connect_db, Cupcakes
import requests

app = Flask(__name__)

connect_db(app)
db.create_all()

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:Mochii007@localhost:5432/cupcakes'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/api/cupcakes")
def cupcakes():
    res = [cupcake.to_dict() for cupcake in Cupcakes.query.all()]
    return jsonify(res=res)

@app.route("/api/cupcakes/<cupcake_id>")
def cupcake(cupcake_id):
    res = Cupcakes.query.get(cupcake_id)
    response = res.to_dict()
    return jsonify(response)

@app.route("/api/cupcakes", methods = ["POST"])
def add_cupcake():
    flavor = request.form.get('flavor')
    size = request.form.get('size')
    rating = request.form.get('rating')
    image = request.form.get('image')
    new_cupcake = Cupcakes(flavor=flavor, size=size, rating=rating, image=image)
    db.session.add(new_cupcake)
    db.session.commit()
    return redirect("/")

@app.route("/api/cupcakes/<cupcake_id>", methods = ["POST"])
def edit_cupcake(cupcake_id):
    cupcake = Cupcakes.query.get(cupcake_id)
    cupcake.flavor = request.form.flavor
    cupcake.size = request.form.size
    cupcake.rating = request.form.rating
    cupcake.image = request.form.image
    db.session.add(cupcake)
    db.session.commit()
    return redirect("/")

@app.route("/api/cupcakes/<cupcake_id>", methods = ["DELETE"])
def delete_cupcake(cupcake_id):
    cupcake = Cupcakes.query.get(cupcake_id)
    db.session.delete(cupcake)
    db.session.commit()
    return redirect("/")