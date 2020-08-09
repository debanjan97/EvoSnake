"""add moves to snake table

Revision ID: 9a5e3fb34a98
Revises: 
Create Date: 2020-08-08 12:44:48.177938

"""
from alembic import op
import sqlalchemy as sa
from core.utils import get_columns


# revision identifiers, used by Alembic.
revision = '9a5e3fb34a98'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    table_name = 'snakes'
    columns = get_columns(table_name, engine=op.get_bind())
    if 'no_of_moves' not in columns:
        op.add_column(table_name, sa.Column('no_of_moves', sa.Integer(), nullable=False, server_default="100"))


def downgrade():
    table_name = 'snakes'
    columns = get_columns(table_name, engine=op.get_bind())
    if 'no_of_moves' in columns:
        op.drop_column('snakes', 'no_of_moves')
