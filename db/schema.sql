DROP SCHEMA BIRDOGIE CASCADE;

CREATE SCHEMA BIRDOGIE;

CREATE TABLE BIRDOGIE.POSTS (id SERIAL, title VARCHAR (1024), content VARCHAR(1024), votes INTEGER, user_id INTEGER, start_date DATETIME, end_date DATETIME);

CREATE TABLE BIRDOGIE.COMMENTS (id SERIAL, post_id INTEGER, content VARCHAR (1024), votes INTEGER, user_id INTEGER, start_date DATETIME, end_date DATETIME);

CREATE TABLE BIRDOGIE.TAGS (id SERIAL, post_id INTEGER, tag_name VARCHAR(255));


CREATE TABLE BIRDOGIE.USERS (id SERIAL, username VARCHAR(255));