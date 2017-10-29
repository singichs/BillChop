\set user :v1
\set password :v2

DROP DATABASE IF EXISTS chop_db;

/*DROP ROLE IF EXISTS :user; not sure if we want to do this, because it causes an error due to privileges */
CREATE ROLE :user WITH LOGIN PASSWORD :'password';
ALTER ROLE :user CREATEDB;
CREATE DATABASE chop_db;
GRANT ALL PRIVILEGES ON DATABASE chop_db TO :user;
