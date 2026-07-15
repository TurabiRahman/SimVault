Windows PowerShell
Copyright (C) Microsoft Corporation. All rights reserved.

Install the latest PowerShell for new features and improvements! https://aka.ms/PSWindows

PS C:\Users\USERAS> psql -U postgres
Password for user postgres:

psql (18.4)
WARNING: Console code page (437) differs from Windows code page (1252)
         8-bit characters might not work correctly. See psql reference
         page "Notes for Windows users" for details.
Type "help" for help.

postgres=# \d
Did not find any relations.
postgres=# \l
                                                                       List of databases
      Name      |  Owner   | Encoding | Locale Provider |          Collate           |           Ctype            | Locale | ICU Rules |   Access privileges
----------------+----------+----------+-----------------+----------------------------+----------------------------+--------+-----------+-----------------------
 postgres       | postgres | UTF8     | libc            | English_United States.1252 | English_United States.1252 |        |           |
 project01_test | postgres | UTF8     | libc            | English_United States.1252 | English_United States.1252 |        |           |
 template0      | postgres | UTF8     | libc            | English_United States.1252 | English_United States.1252 |        |           | =c/postgres          +
                |          |          |                 |                            |                            |        |           | postgres=CTc/postgres
 template1      | postgres | UTF8     | libc            | English_United States.1252 | English_United States.1252 |        |           | =c/postgres          +
                |          |          |                 |                            |                            |        |           | postgres=CTc/postgres
(4 rows)


postgres=# create database simvault;
CREATE DATABASE
postgres=# \c simvault
You are now connected to database "simvault" as user "postgres".
simvault=# \l
                                                                       List of databases
      Name      |  Owner   | Encoding | Locale Provider |          Collate           |           Ctype            | Locale | ICU Rules |   Access privileges
----------------+----------+----------+-----------------+----------------------------+----------------------------+--------+-----------+-----------------------
 postgres       | postgres | UTF8     | libc            | English_United States.1252 | English_United States.1252 |        |           |
 project01_test | postgres | UTF8     | libc            | English_United States.1252 | English_United States.1252 |        |           |
 simvault       | postgres | UTF8     | libc            | English_United States.1252 | English_United States.1252 |        |           |
 template0      | postgres | UTF8     | libc            | English_United States.1252 | English_United States.1252 |        |           | =c/postgres          +
                |          |          |                 |                            |                            |        |           | postgres=CTc/postgres
 template1      | postgres | UTF8     | libc            | English_United States.1252 | English_United States.1252 |        |           | =c/postgres          +
                |          |          |                 |                            |                            |        |           | postgres=CTc/postgres
(5 rows)


simvault=# SELECT current_database();
 current_database
------------------
 simvault
(1 row)


simvault=# create table citizen (
simvault(# id bigserial primary key,
simvault(# voter_id varchar(20) not null,
simvault(# first_name varchar(100) not null,
simvault(# last_name varchar(100) not null );
CREATE TABLE
simvault=# create table sim (
simvault(# id bigserial primary key,
simvault(# citizen_id bigint not null,
simvault(# sim_company varchar(50) not null,
simvault(# sim_number varchar(20) unique not null,
simvault(# registration_date date not null,
simvault(# expiry_date date,
simvault(# constraint fk_citizen foreign key(citizen_id) references citizen(id) on delete cascade );
CREATE TABLE
simvault=# \d
               List of relations
 Schema |      Name      |   Type   |  Owner
--------+----------------+----------+----------
 public | citizen        | table    | postgres
 public | citizen_id_seq | sequence | postgres
 public | sim            | table    | postgres
 public | sim_id_seq     | sequence | postgres
(4 rows)


simvault=# \dt
           List of tables
 Schema |  Name   | Type  |  Owner
--------+---------+-------+----------
 public | citizen | table | postgres
 public | sim     | table | postgres
(2 rows)


simvault=# \d citizen
                                      Table "public.citizen"
   Column   |          Type          | Collation | Nullable |               Default
------------+------------------------+-----------+----------+-------------------------------------
 id         | bigint                 |           | not null | nextval('citizen_id_seq'::regclass)
 voter_id   | character varying(20)  |           | not null |
 first_name | character varying(100) |           | not null |
 last_name  | character varying(100) |           | not null |
Indexes:
    "citizen_pkey" PRIMARY KEY, btree (id)
Referenced by:
    TABLE "sim" CONSTRAINT "fk_citizen" FOREIGN KEY (citizen_id) REFERENCES citizen(id) ON DELETE CASCADE


simvault=# \d sim
                                         Table "public.sim"
      Column       |         Type          | Collation | Nullable |             Default
-------------------+-----------------------+-----------+----------+---------------------------------
 id                | bigint                |           | not null | nextval('sim_id_seq'::regclass)
 citizen_id        | bigint                |           | not null |
 sim_company       | character varying(50) |           | not null |
 sim_number        | character varying(20) |           | not null |
 registration_date | date                  |           | not null |
 expiry_date       | date                  |           |          |
Indexes:
    "sim_pkey" PRIMARY KEY, btree (id)
    "sim_sim_number_key" UNIQUE CONSTRAINT, btree (sim_number)
Foreign-key constraints:
    "fk_citizen" FOREIGN KEY (citizen_id) REFERENCES citizen(id) ON DELETE CASCADE


simvault=#