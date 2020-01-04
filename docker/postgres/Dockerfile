FROM postgres:latest
ADD docker-entrypoint-initdb.d/init_user_db.sh /docker-entrypoint-initdb.d/
USER root
RUN chmod ugo+x docker-entrypoint-initdb.d/*