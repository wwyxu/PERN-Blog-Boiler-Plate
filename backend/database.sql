CREATE DATABASE blog;

--users

-- CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE users(
  user_id UUID DEFAULT uuid_generate_v4(),
  user_name CHAR(100) NOT NULL,
  description CHAR(255),
  date CHAR(25) NOT NULL,
  user_email CHAR(100) NOT NULL UNIQUE,
  user_password VARCHAR(100) NOT NULL,
  PRIMARY KEY (user_id)
);

--post

CREATE TABLE posts(
  post_id SERIAL,
  user_id UUID,
  header CHAR(30) NOT NULL,
  subheader CHAR(255) NOT NULL,
  post TEXT NOT NULL,
  category CHAR(30) NOT NULL,
  date CHAR(25) NOT NULL,
  date_updated CHAR(25),
  PRIMARY KEY (post_id),
  FOREIGN KEY (user_id) REFERENCES users(user_id)
);

-- --comments

-- CREATE TABLE comments(
--   comment_id SERIAL,
--   user_id UUID,
--   post_id SERIAL,
--   comment CHAR(150) NOT NULL,
--   date CHAR(25) NOT NULL,
--   PRIMARY KEY (comment_id),
--   FOREIGN KEY (post_id) REFERENCES posts(post_id),
--   FOREIGN KEY (user_id) REFERENCES users(user_id)
-- );

-- --likes

-- CREATE TABLE likes(
--   user_id UUID,
--   post_id SERIAL,
--   comment_id SERIAL,
--   PRIMARY KEY (user_id, post_id),
--   FOREIGN KEY (user_id) REFERENCES users(user_id),
--   FOREIGN KEY (post_id) REFERENCES posts(post_id)
-- );