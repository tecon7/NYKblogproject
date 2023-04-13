from app import app
from models import db, Comment, User
from datetime import datetime

if __name__ == '__main__':
    with app.app_context():
        print("Clearing db...")
        User.query.delete()
        Comment.query.delete()

        print("Seeding users...")
        users = [
            User(email='gsato@gmail.com', password='stablerandbenson', username='dodgerfan5', image_url='https://people.com/thmb/n6zjbIsnTHhTwWucu6wWK1lqPX4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc():focal(704x239:706x241)/svu-1-2fd9a991316a4e459b2ca69d724bd8ff.jpg'),
            User(email='tecon@gmail.com', password='brunsonisbest', username='knickfan7', image_url='https://cdn.vox-cdn.com/thumbor/VSeBtV2J1uNJIaTuXzy6U5i2qmI=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/23320586/usa_today_17877750.jpg'),
            User(email='siddykittens@aol.com', password='stocksarebad', username='dntknowsports', image_url='https://www.sfspca.org/wp-content/uploads/2023/04/34c2c2c6-1834-4a9e-b69a-2b9aa756e9d6.jpg'),
            User(email='nicks@gmail.com', password='athensbound', username='grksports', image_url='https://whyathens.com/wp-content/uploads/2019/03/Evzones-Uniform-Ypodetes-Greek-Soldier-1024x683.jpg')
        ]

        db.session.add_all(users)

        print("Seeding comments...")
        
        comment = Comment( body="This is a comment.", user_id=2, username='knickfan7', created_at=datetime.now())
        db.session.add(comment)
        db.session.commit()

        # Create four replies to the comment
        reply1 = Comment( body="This is a reply to the comment.", user_id=1, username='dodgerfan5', created_at=datetime.now(), parent_id=comment.id)

        # Create the parent comment before its child comments
        parent_comment = Comment( body="This is a parent comment.", user_id=3, username='dntknowsports', created_at=datetime.now())
        db.session.add(parent_comment)
        db.session.commit()

        # Create four replies to the parent comment
        reply2 = Comment( body="This is a reply to the parent comment.", user_id=1, username='dodgerfan5', created_at=datetime.now(), parent_id=parent_comment.id)
        reply3 = Comment( body="This is another reply to the parent comment.", user_id=2, username='knickfan7', created_at=datetime.now(), parent_id=parent_comment.id)
        reply4 = Comment( body="This is yet another reply to the parent comment.", user_id=4, username='grksports', created_at=datetime.now(), parent_id=parent_comment.id)

        db.session.add_all([reply1, reply2, reply3, reply4])
        db.session.commit()