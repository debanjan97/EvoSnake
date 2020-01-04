set -e

echo "SSssssSSSssssSSSssssSSSssss"

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" <<-EOSQL
 CREATE DATABASE evodb;
EOSQL