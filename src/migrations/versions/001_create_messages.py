"""Create the starter message board."""
from alembic import op
import sqlalchemy as sa

revision = "001"
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.create_table(
        "messages",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("text", sa.String(200), nullable=False),
    )


def downgrade() -> None:
    op.drop_table("messages")
