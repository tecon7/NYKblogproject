from flask import Flask, jsonify, render_template, request, make_response, session as browser_session
from extensions import *
from models import db, User, Comment
import datetime

import os

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
app.secret_key = "this_is_my_secret_key"

db.init_app(app)
migrate.init_app(app, db)


@app.route('/')
def home():
    return ''

@app.route('/user_info', methods=['POST'])
def user_info():

    if request.method == 'POST':
        data = request.get_json()

        userInfo = User(
            username=data['username'],
            password=data['password']
        )

        db.session.add(userInfo)
        db.session.commit()
        
        return make_response(jsonify(userInfo.to_dict()), 201)

@app.route('/check_user')
def get():
    user = User.query.filter(User.id == browser_session.get('user_id')).first()

    if user:
        return jsonify(user.to_dict())
    else:
        return jsonify({'message': '401: Not Authorized'}), 401

@app.route('/login', methods=['POST'])
def login():

    if request.method == 'POST':
        data = request.get_json()
        username = data.get('username')
        password = data.get('password')
        user = User.query.filter_by(username=username).first()

        if not user:
            return jsonify({'error': 'invalid login'}), 404

        browser_session['user_id'] = user.id

        return jsonify(user.to_dict()), 201

@app.route('/logintest', methods=['GET'])
def logintest():
    if request.method == 'GET':
        users = User.query.order_by(User.id).all()
        return make_response(jsonify(user.to_dict() for user in users),200)

@app.route('/comments', methods=['GET'])
def comments():
    if request.method == 'GET':
        comments = Comment.query.order_by(Comment.id).all()
        return make_response(jsonify([comment.to_dict() for comment in comments]), 200)


@app.route('/comments', methods=["POST"])
def comments_info():
    if request.method == 'POST':
        data = request.get_json()

        comments = Comment(
            body = data['body'],
            user_id = data['user_id'],
            parent_id = data['parent_id'],
            username = data['username'],
            created_at = datetime.datetime.now()
        )

    db.session.add(comments)
    db.session.commit()

    return make_response(jsonify(comments.to_dict()), 201)

@app.route('/comments/<int:id>', methods=['GET', 'PATCH', 'DELETE'])
def comments_by_id(id):
    comment = Comment.query.filter_by(id=id).first()

    if request.method == 'GET':
        replies = Comment.query.filter_by(parent_id=comment.id).all()
        return make_response(jsonify({
            'comment': comment.to_dict(),
            'replies': [reply.to_dict() for reply in replies]
        }), 200)
    
    elif request.method == 'PATCH':
        updated_comment = request.json
        if updated_comment is not None:
            comment.body = updated_comment.get('body')
            db.session.commit()

            return make_response(jsonify({'message': 'Comment updated'}), 200)
        else:
            return make_response(jsonify({'message': 'Invalid request payload'}), 400)
    
    elif request.method == 'DELETE':
        db.session.delete(comment)
        db.session.commit()

        return make_response(jsonify({'delete': 'You have deleted this message'}))

@app.route('/user/<int:id>')
def user_by_id(id):
    user = User.query.filter_by(id=id).first()

    if request.method == 'GET':
        user_dict = [comment.to_dict() for comment in user.comments]
        return make_response(jsonify(user_dict), 200)

@app.route('/users')
def all_users():
    users = User.query.all()

    if request.method == 'GET':
        user_dicts = [user.to_dict() for user in users]
        return make_response(jsonify(user_dicts), 200)

if __name__ == '__main__':
    app.run(port=5555, debug=True)
