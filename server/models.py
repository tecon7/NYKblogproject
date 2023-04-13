from extensions import db
from sqlalchemy.orm import validates
from extensions import db
import datetime 

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String)
    image_url = db.Column(db.String)
    username = db.Column(db.String)
    password = db.Column(db.String)
    comments = db.relationship('Comment', backref='user')

    def to_dict(self):
        return {
            "id": self.id,
            "email": self.email,
            "image_url": self.image_url,
            "username": self.username,
            "password": self.password,
            "comments": [comment.to_dict() for comment in self.comments]
        }

class Comment(db.Model):
    __tablename__ = 'comments'
    id = db.Column(db.Integer, primary_key=True)
    body = db.Column(db.String)
    created_at = db.Column(db.Date, default=datetime.date.today())

    username = db.Column(db.String)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    parent_id = db.Column(db.Integer, db.ForeignKey("comments.id"), nullable=True)

    parent = db.relationship("Comment", remote_side=[id])

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "username": self.username,
            "body": self.body,
            "parentId": self.parent_id,
            "created_at": self.created_at.strftime('%Y-%m-%d')
        }