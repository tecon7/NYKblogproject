"""add images

Revision ID: 1948b05b57a2
Revises: 095a54cc6d0d
Create Date: 2023-04-12 14:47:37.715247

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '1948b05b57a2'
down_revision = '095a54cc6d0d'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.add_column(sa.Column('image_url', sa.String(), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('users', schema=None) as batch_op:
        batch_op.drop_column('image_url')

    # ### end Alembic commands ###
