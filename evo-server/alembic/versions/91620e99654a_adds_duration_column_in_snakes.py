"""adds duration column in snakes

Revision ID: 91620e99654a
Revises: 9a5e3fb34a98
Create Date: 2020-08-09 08:22:10.861630

"""
from alembic import op
import sqlalchemy as sa
from core.utils import get_columns


# revision identifiers, used by Alembic.
revision = '91620e99654a'
down_revision = '9a5e3fb34a98'
branch_labels = None
depends_on = None


def upgrade():
    table_name = 'snakes'
    new_column = 'duration'
    columns = get_columns(table_name, engine=op.get_bind())
    if new_column not in columns:
        op.add_column(table_name, sa.Column(new_column, sa.Integer()))


def downgrade():
    table_name = 'snakes'
    new_column = 'duration'
    columns = get_columns(table_name, engine=op.get_bind())
    if new_column in columns:
        op.drop_column(table_name, new_column)
