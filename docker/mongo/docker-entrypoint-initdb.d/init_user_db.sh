mongo<<-EOSQL
use evodb
db.evodb.insert({"name": "evodb"})
EOSQL